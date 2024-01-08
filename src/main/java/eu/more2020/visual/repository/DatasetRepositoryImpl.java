package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.bean.CsvToBeanBuilder;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.*;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
import eu.more2020.visual.middleware.datasource.QueryExecutor.InfluxDBQueryExecutor;
import eu.more2020.visual.middleware.datasource.QueryExecutor.ModelarDBQueryExecutor;
import eu.more2020.visual.middleware.datasource.QueryExecutor.SQLQueryExecutor;
import eu.more2020.visual.middleware.domain.TableInfo;
import eu.more2020.visual.middleware.domain.DataFileInfo;
import eu.more2020.visual.middleware.domain.Dataset.*;
import eu.more2020.visual.middleware.domain.TimeRange;
import eu.more2020.visual.middleware.util.DateTimeUtil;
import org.apache.commons.io.input.ReversedLinesFileReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.io.*;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Repository
public class DatasetRepositoryImpl implements DatasetRepository {

    private final ApplicationProperties applicationProperties;

    private final Logger log = LoggerFactory.getLogger(DatasetRepositoryImpl.class);

    private Map<String, AbstractDataset> datasets = new HashMap<String, AbstractDataset>();

    private FarmMeta farm = new FarmMeta();

    @Value("${application.timeFormat}")
    private String timeFormat;

    public DatasetRepositoryImpl(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Override
    public List<AbstractDataset> findAll() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<AbstractDataset> datasets = new ArrayList<>();
        List<File> metadataFiles = Files.list(Paths.get(applicationProperties.getWorkspacePath()))
            .filter(path -> path.toString().endsWith(".meta.json")).map(Path::toFile).collect(Collectors.toList());
        for (File metadataFile : metadataFiles) {
            FileReader reader = new FileReader(metadataFile);
            datasets.add(mapper.readValue(reader, AbstractDataset.class));
        }
        return datasets;
    }

    @Override
    public Optional<FarmMeta> findFarm(String farmName) throws IOException {
        FarmMeta farm = null;
        ObjectMapper mapper = new ObjectMapper();
        File metadataFile = new File(applicationProperties.getWorkspacePath() + "/" + farmName, farmName + ".meta.json");

        if (metadataFile.exists()) {
            FileReader reader = new FileReader(metadataFile);
            farm = mapper.readValue(reader, FarmMeta.class);
            for (FarmInfo farmInfo : farm.getData()) farmInfo.setIsConfiged(true);
        }
        return Optional.ofNullable(farm);
    }

    @Override
    public Optional<AbstractDataset> findById(String id, String farmName) throws IOException, SQLException {
        Assert.notNull(id, "Id must not be null!");
        AbstractDataset dataset = null;
        File metadataFile = new File(applicationProperties.getWorkspacePath() + "/" + farmName, farmName + ".meta.json");
        ObjectMapper objectMapper = new ObjectMapper();
        if(datasets.containsKey(id)) dataset = datasets.get(id);
        else{
            if (metadataFile.exists()) {
                JsonNode jsonNode = objectMapper.readTree(metadataFile);
                FarmMeta farm = objectMapper.treeToValue(jsonNode, FarmMeta.class);
                String type = farm.getType();

                for (JsonNode datasetNode : jsonNode.get("data")) {
                    String datasetId = datasetNode.get("id").asText();
                    if(!datasetId.equals(id)) continue;
                    // Extract data from JSON node and create the desired subclass of AbstractDataset
                    String name = datasetNode.get("name").asText();
                    String path = datasetNode.get("path").asText();
                    String timeCol = datasetNode.get("timeCol").asText();
                    String delimiter = datasetNode.get("delimiter").asText();
                    boolean hasHeader = datasetNode.get("hasHeader").asBoolean();
                    File file = new File(applicationProperties.getWorkspacePath() + "/" + farmName, id + ".csv");
                    dataset = new CsvDataset(path, id, name, timeCol, timeFormat, delimiter, hasHeader);
                    CsvDataset finalDataset = (CsvDataset) dataset;
                    if (!file.isDirectory()) {
                        DataFileInfo dataFileInfo = new DataFileInfo(file.getAbsolutePath());
                        fillDataFileInfo((CsvDataset) dataset, dataFileInfo);
                        dataset.getFileInfoList().add(dataFileInfo);
                    } else {
                        List<DataFileInfo> fileInfoList = Arrays.stream(file.listFiles(f -> !f.isDirectory() && f.getName().endsWith(".csv"))).map(f -> {
                            DataFileInfo dataFileInfo = new DataFileInfo(f.getAbsolutePath());
                            try {
                                fillDataFileInfo(finalDataset, dataFileInfo);
                            } catch (IOException e) {
                                new RuntimeException(e);
                            }
                            return dataFileInfo;
                        }).collect(Collectors.toList());
                        // sort csv files by their time ranges ascending
                        fileInfoList.sort(Comparator.comparing(i -> i.getTimeRange().getFrom()));
                        dataset.setFileInfoList(fileInfoList);
                    }
                    List<Integer> measures =  IntStream.rangeClosed(0, dataset.getHeader().length - 1)
                        .boxed()
                        .filter(i -> i != finalDataset.getMeasureIndex(finalDataset.getTimeCol()))
                        .collect(Collectors.toList());
                    finalDataset.setMeasures(measures);
                    if (dataset.getTimeRange() == null) {
                        dataset.setTimeRange(dataset.getFileInfoList().get(0).getTimeRange());
                    }
                    dataset.setTimeRange(dataset.getFileInfoList().stream().map(DataFileInfo::getTimeRange)
                        .reduce(dataset.getTimeRange(), TimeRange::span));
                    dataset.setType(type);
                }
                log.info(String.valueOf(dataset));
                datasets.put(id, dataset);
            }
        }
        return Optional.ofNullable(dataset);
    }

    private void fillDataFileInfo(CsvDataset dataset, DataFileInfo dataFileInfo) throws IOException {
        CsvParserSettings parserSettings = new CsvParserSettings();
        parserSettings.getFormat().setDelimiter(',');
        parserSettings.setLineSeparatorDetectionEnabled(true);
        parserSettings.setIgnoreLeadingWhitespaces(false);
        parserSettings.setIgnoreTrailingWhitespaces(false);
        CsvParser parser = new CsvParser(parserSettings);
        parser.beginParsing(new File(dataFileInfo.getFilePath()), Charset.forName("US-ASCII"));
        if (dataset.getHasHeader()) {
            parser.parseNext();  //skip header row
            dataset.setHeader(parser.getContext().parsedHeaders());
        }
        int timeColId = dataset.getMeasureIndex(dataset.getTimeCol());

        long from = DateTimeUtil.parseDateTimeString(parser.parseNext()[timeColId], dataset.getTimeFormat());
        parser.stopParsing();

        ReversedLinesFileReader reversedLinesFileReader = new ReversedLinesFileReader(new File(dataFileInfo.getFilePath()), StandardCharsets.US_ASCII);
        String lastRow = reversedLinesFileReader.readLine();
        reversedLinesFileReader.close();
        long to = DateTimeUtil.parseDateTimeString(parser.parseLine(lastRow)[timeColId], dataset.getTimeFormat());
        dataFileInfo.setTimeRange(new TimeRange(from, to));
    }

    @Override
    public AbstractDataset save(AbstractDataset dataset) throws IOException {
        Assert.notNull(dataset, "Dataset must not be null!");
        ObjectMapper mapper = new ObjectMapper();
        File metadataFile = new File(applicationProperties.getWorkspacePath(), dataset.getId() + ".meta.json");
        FileWriter writer = new FileWriter(metadataFile);
        mapper.writeValue(writer, AbstractDataset.class);
        return dataset;
    }

    @Override
    public List<Sample> findSample(String farmName) throws IOException {
        File f = new File(applicationProperties.getWorkspacePath() + "/" + farmName);
        File[] matchingFiles = f.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.contains("sample") && name.endsWith("csv");
            }
        });
        List<Sample> beans = new CsvToBeanBuilder(new FileReader(matchingFiles[0]))
            .withType(Sample.class).build().parse();
        return beans;
    }

    @Override
    public List<Object[]> findDbSample(String tableName, QueryExecutor queryExecutor) throws SQLException {
        List<Object[]> resultList = new ArrayList<>();
        String schemaName = null;
        for (FarmInfo farmInfo : farm.getData()) {
            if (farmInfo.getId().equals(tableName)) {
                schemaName = farmInfo.getSchema();
                break;
            }
        }
        try {
        resultList = queryExecutor.getSample(schemaName, tableName);
        } catch (Exception e) {
            throw e;
        }
        return resultList;
    }

    public List<String> findDirectories() throws IOException {
        File file = new File(applicationProperties.getWorkspacePath());
        String[] names = file.list();
        List<String> dirs = new ArrayList<>();
        for (String name : names) {
            if (new File(applicationProperties.getWorkspacePath() + "/" + name).isDirectory() && !name.equals("config")) {
                dirs.add(name);
            }
        }
        return dirs;
    }

    public ResponseEntity<String> checkConnection(String url, String port) throws IOException {
        if (url.equalsIgnoreCase("83.212.75.52") && port.equalsIgnoreCase("31000")) {
            return new ResponseEntity<>("Connected Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Credentials Error", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public String getFarmType() {
        return farm.getType();
    }

    @Override
    public void deleteById(String id) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteAll() {
        datasets.clear();
        if (farm.getData() != null) farm.getData().clear();
        farm.setType(null); //remove
    }

    @Override
    public Optional<AbstractDataset> findDBDatasetById(String id,QueryExecutor queryExecutor) throws SQLException {
        Assert.notNull(id, "Id must not be null!");
        AbstractDataset dataset = null;
        if(datasets.containsKey(id)) dataset = datasets.get(id);
        else {
            for(FarmInfo farmInfo : farm.getData()) {
                if (farmInfo.getId().equals(id)) {
                    dataset = createDBDataset(farmInfo, queryExecutor);
                    datasets.put(farmInfo.getId(), dataset);
                    break;
                }
            }
        }
        return Optional.ofNullable(dataset);
    }

    @Override
    public FarmMeta getDBMetadata (String database, String farmName, QueryExecutor queryExecutor) throws SQLException {
        List<FarmInfo> farmInfos = new ArrayList<FarmInfo>();
        List<TableInfo> tableInfoArray = new ArrayList<TableInfo>();
        farm.setName(farmName);
        farm.setType(database);
        if(database.equals("influx")) farm.setIsTimeSeries(true);
        else farm.setIsTimeSeries(false);
        try {
            tableInfoArray = queryExecutor.getTableInfo();
            for (TableInfo tableInfo : tableInfoArray) {
                FarmInfo farmInfo = new FarmInfo();
                farmInfo.setId(tableInfo.getTable());
                farmInfo.setSchema(tableInfo.getSchema());
                farmInfo.setName(tableInfo.getTable());
                farmInfo.setType(database);
                if (database.equals("influx")) farmInfo.setIsConfiged(true);
                else farmInfo.setIsConfiged(false);
                farmInfos.add(farmInfo);
            }
            if (tableInfoArray.isEmpty()) throw new SQLException("No available data.");
            farm.setData(farmInfos);
            return farm;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public FarmInfo updateFarmInfoColumns(String id, DbColumns columns) {
        Assert.notNull(id, "FarmInfo must not be null");
        for (FarmInfo farmInfo : farm.getData()) {
            if (farmInfo.getId().equals(id)) {
                farmInfo.setTimeCol(columns.getTimeCol());
                farmInfo.setIdCol(columns.getIdCol());
                farmInfo.setValueCol(columns.getValueCol());
                farmInfo.setIsConfiged(true);
                return farmInfo;
            }
        }
        return null;
    }


    private AbstractDataset createDBDataset(FarmInfo farmInfo, QueryExecutor queryExecutor) throws SQLException {
        AbstractDataset dataset = null;
        log.debug("creating new dataset {}", farmInfo.getId());
        switch (farmInfo.getType()) {
            case "postgres":
                SQLQueryExecutor sqlQueryExecutor = (SQLQueryExecutor) queryExecutor;
                dataset = new PostgreSQLDataset(sqlQueryExecutor, farmInfo.getId(), farmInfo.getSchema(), farmInfo.getId(), timeFormat, 
                                                farmInfo.getTimeCol(),farmInfo.getIdCol(), farmInfo.getValueCol());
                break;           
            case "modelar":
                ModelarDBQueryExecutor modelarDBQueryExecutor = (ModelarDBQueryExecutor) queryExecutor;
                dataset = new ModelarDBDataset(modelarDBQueryExecutor, farmInfo.getId(), farmInfo.getSchema(), farmInfo.getId(), timeFormat, 
                                                farmInfo.getTimeCol(), farmInfo.getIdCol(), farmInfo.getValueCol());
                break;
            case "influx":
                InfluxDBQueryExecutor influxDBQueryExecutor = (InfluxDBQueryExecutor) queryExecutor;
                dataset = new InfluxDBDataset(influxDBQueryExecutor, farmInfo.getId(), farmInfo.getSchema(), farmInfo.getId(), timeFormat, farmInfo.getTimeCol());
                break;
            default:
                break;
        }
        return dataset;
    }
}
