package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.bean.CsvToBeanBuilder;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.index.domain.Dataset.CsvDataset;
import eu.more2020.visual.index.datasource.QueryExecutor.ModelarDBQueryExecutor;
import eu.more2020.visual.index.domain.DataFileInfo;
import eu.more2020.visual.index.domain.Dataset.*;
import eu.more2020.visual.index.domain.ModelarDB.ModelarDBConnection;
import eu.more2020.visual.domain.*;
import eu.more2020.visual.index.domain.TimeRange;
import eu.more2020.visual.index.util.DateTimeUtil;
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
        }
        return Optional.ofNullable(farm);
    }

    @Override
    public Optional<AbstractDataset> findById(String id, String farmName) throws IOException, SQLException {
        Assert.notNull(id, "Id must not be null!");
        ObjectMapper mapper = new ObjectMapper();
        AbstractDataset dataset = null;
        File metadataFile = new File(applicationProperties.getWorkspacePath() + "/" + farmName, farmName + ".meta.json");
        ObjectMapper objectMapper = new ObjectMapper();

        if (metadataFile.exists()) {
            JsonNode jsonNode = objectMapper.readTree(metadataFile);
            FarmMeta farm = objectMapper.treeToValue(jsonNode, FarmMeta.class);
            String type = farm.getType();

            for (JsonNode datasetNode : jsonNode.get("data")) {
                String datasetId = datasetNode.get("id").asText();
                if(!datasetId.equals(id)) continue;
                // Extract data from JSON node and create the desired subclass of AbstractDataset
                if(type.equals("csv")) {
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
                } else {
                    String config = jsonNode.get("config").asText();
                    String schema = datasetNode.get("schema").asText();
                    String name = datasetNode.get("name").asText();
                    String timeCol = datasetNode.get("timeCol").asText();
                    String valueCol = datasetNode.get("valueCol").asText();
                    String idCol = datasetNode.get("idCol").asText();
                    dataset = createDBDataset(datasetId, farm.getType(), schema, name, timeCol, valueCol, idCol, config);
                }
                dataset.setType(type);
            }
            log.info(String.valueOf(dataset));
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
    public void deleteById(String id) {
        throw new UnsupportedOperationException();
    }


    private AbstractDataset createDBDataset(String id, String type, String schema, String table, String timeCol,
                                          String valueCol, String idCol, String config) throws SQLException {
        AbstractDataset dataset = null;
        switch (type) {
            case "postgres":
                dataset = new PostgreSQLDataset(config, schema, table, timeFormat, timeCol);
                break;
            case "modelar":
                ModelarDBConnection modelarDBConnection = new ModelarDBConnection("83.212.75.52", 31000);
                ModelarDBQueryExecutor modelarDBQueryExecutor = modelarDBConnection.getSqlQueryExecutor();
                dataset = new ModelarDBDataset(modelarDBQueryExecutor, id, schema, table, timeFormat, timeCol, idCol, valueCol);
                break;
            case "influx":
                dataset = new InfluxDBDataset(config, schema, table, timeFormat, timeCol);
                break;
            default:
                break;
        }
        return dataset;
    }
}
