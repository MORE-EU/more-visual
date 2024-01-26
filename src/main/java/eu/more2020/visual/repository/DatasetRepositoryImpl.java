package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import eu.more2020.visual.middleware.util.io.SerializationUtilities;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
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

    private SchemaMeta schemaMeta = new SchemaMeta();

    @Value("${application.timeFormat}")
    private String timeFormat;

    public DatasetRepositoryImpl(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @Override 
    public List<AbstractDataset> findAll() {
        List<AbstractDataset> allDatasets = new ArrayList<AbstractDataset>(datasets.values());
        log.debug(allDatasets.toString());
        return allDatasets;
    }

    @Override
    public Optional<SchemaMeta> findSchema(String schemaName) throws IOException {
        if (schemaMeta.getType() != null && schemaMeta.getName().equals(schemaName)) return Optional.ofNullable(schemaMeta);
        SchemaMeta schema = null;
        ObjectMapper mapper = new ObjectMapper();
        File metadataFile = new File(applicationProperties.getWorkspacePath() + "/" + schemaName, schemaName + ".meta.json");
        if (metadataFile.exists()) {
            FileReader reader = new FileReader(metadataFile);
            schema = mapper.readValue(reader, SchemaMeta.class);
            for (SchemaInfo schemaInfo : schema.getData()) schemaInfo.setIsConfiged(true);
        }
        return Optional.ofNullable(schema);
    }

    // @Override
    // public Optional<AbstractDataset> findById(String id, String schemaName) throws IOException, SQLException {
    //     Assert.notNull(id, "Id must not be null!");
    //     ObjectMapper mapper = new ObjectMapper();
    //     AbstractDataset dataset = null;
    //     File metadataFile = new File(applicationProperties.getWorkspacePath() + "/" + schemaName,
    //             schemaName + ".meta.json");
    //     ObjectMapper objectMapper = new ObjectMapper();
    //     if(datasets.containsKey(id)) dataset = datasets.get(id);
    //     else {
    //         if (metadataFile.exists()) {
    //             JsonNode jsonNode = objectMapper.readTree(metadataFile);
    //             SchemaMeta schemaMeta = objectMapper.treeToValue(jsonNode, SchemaMeta.class);
    //             String type = schemaMeta.getType();
    //             for (JsonNode datasetNode : jsonNode.get("data")) {
    //                 String datasetId = datasetNode.get("id").asText();
    //                 if (!datasetId.equals(id))
    //                     continue;
    //                 // Extract data from JSON node and create the desired subclass of
    //                 // AbstractDataset
    //                 String name = datasetNode.get("name").asText();
    //                 String path = datasetNode.get("path").asText();
    //                 String timeCol = datasetNode.get("timeCol").asText();
    //                 String delimiter = datasetNode.get("delimiter").asText();
    //                 boolean hasHeader = datasetNode.get("hasHeader").asBoolean();
    //                 File file = new File(applicationProperties.getWorkspacePath() + "/" + schemaName, id + ".csv");
    //                 dataset = new CsvDataset(path, id, name, timeCol, timeFormat, delimiter, hasHeader);
    //                 CsvDataset finalDataset = (CsvDataset) dataset;
    //                 if (!file.isDirectory()) {
    //                     DataFileInfo dataFileInfo = new DataFileInfo(file.getAbsolutePath());
    //                     fillDataFileInfo((CsvDataset) dataset, dataFileInfo);
    //                     dataset.getFileInfoList().add(dataFileInfo);
    //                } else {
    //                     List<DataFileInfo> fileInfoList = Arrays
    //                             .stream(file.listFiles(f -> !f.isDirectory() && f.getName().endsWith(".csv")))
    //                             .map(f -> {
    //                                 DataFileInfo dataFileInfo = new DataFileInfo(f.getAbsolutePath());
    //                                 try {
    //                                     fillDataFileInfo(finalDataset, dataFileInfo);
    //                                 } catch (IOException e) {
    //                                     new RuntimeException(e);
    //                                 }
    //                                 return dataFileInfo;
    //                             }).collect(Collectors.toList());
    //                     // sort csv files by their time ranges ascending
    //                     fileInfoList.sort(Comparator.comparing(i -> i.getTimeRange().getFrom()));
    //                     dataset.setFileInfoList(fileInfoList);
    //                 }
    //                 List<Integer> measures = IntStream.rangeClosed(0, dataset.getHeader().length - 1)
    //                         .boxed()
    //                         .filter(i -> i != finalDataset.getMeasureIndex(finalDataset.getTimeCol()))
    //                         .collect(Collectors.toList());
    //                 finalDataset.setMeasures(measures);
    //                 if (dataset.getTimeRange() == null) {
    //                     dataset.setTimeRange(dataset.getFileInfoList().get(0).getTimeRange());
    //                 }
    //                 dataset.setTimeRange(dataset.getFileInfoList().stream().map(DataFileInfo::getTimeRange)
    //                     .reduce(dataset.getTimeRange(), TimeRange::span));
    //                 dataset.setType(type);
    //                 datasets.put(name,dataset);
    //             }
    //             log.info(String.valueOf(dataset));
    //         }
    //     }
    //     return Optional.ofNullable(dataset);
    // }


    // private void fillDataFileInfo(CsvDataset dataset, DataFileInfo dataFileInfo) throws IOException {
    //     CsvParserSettings parserSettings = new CsvParserSettings();
    //     parserSettings.getFormat().setDelimiter(',');
    //     parserSettings.setLineSeparatorDetectionEnabled(true);
    //     parserSettings.setIgnoreLeadingWhitespaces(false);
    //     parserSettings.setIgnoreTrailingWhitespaces(false);
    //     CsvParser parser = new CsvParser(parserSettings);
    //     parser.beginParsing(new File(dataFileInfo.getFilePath()), Charset.forName("US-ASCII"));
    //     if (dataset.getHasHeader()) {
    //         parser.parseNext(); // skip header row
    //         dataset.setHeader(parser.getContext().parsedHeaders());
    //     }
    //     int timeColId = dataset.getMeasureIndex(dataset.getTimeCol());

    //     long from = DateTimeUtil.parseDateTimeString(parser.parseNext()[timeColId], dataset.getTimeFormat());
    //     parser.stopParsing();

    //     ReversedLinesFileReader reversedLinesFileReader = new ReversedLinesFileReader(
    //             new File(dataFileInfo.getFilePath()), StandardCharsets.US_ASCII);
    //     String lastRow = reversedLinesFileReader.readLine();
    //     reversedLinesFileReader.close();
    //     long to = DateTimeUtil.parseDateTimeString(parser.parseLine(lastRow)[timeColId], dataset.getTimeFormat());
    //     dataFileInfo.setTimeRange(new TimeRange(from, to));
    // }

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
    public List<Object[]> findSample(String tableName, QueryExecutor queryExecutor) throws SQLException {
        List<Object[]> resultList = new ArrayList<>();
        String schemaName = null;
        for (SchemaInfo schemaInfo : schemaMeta.getData()) {
            if (schemaInfo.getId().equals(tableName)) {
                schemaName = schemaInfo.getSchema();
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
            if (new File(applicationProperties.getWorkspacePath() + "/" + name).isDirectory()
                    && !name.equals("config")) {
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
    public String getSchemaType() {
        return schemaMeta.getType();
    }

    @Override
    public void deleteById(String id) {
        throw new UnsupportedOperationException();
    }

    @Override
    public void deleteAll() {
        if(!datasets.isEmpty()) datasets.clear();
        if (schemaMeta != null) {
            if (schemaMeta.getData() != null) schemaMeta.getData().clear();
            schemaMeta.setType(null);
        }
    }

    @Override
    public Optional<AbstractDataset> findById(String id, String schemaName, QueryExecutor queryExecutor) throws SQLException {
        Assert.notNull(id, "ID must not be null!");
        AbstractDataset dataset = null;
        if(datasets.containsKey(id)) dataset = datasets.get(id);
        else {
            for(SchemaInfo schemaInfo : schemaMeta.getData()) {
                if (schemaInfo.getId().equals(id)) {
                    dataset = createDBDataset(schemaInfo, queryExecutor);
                    datasets.put(schemaInfo.getId(), dataset);
                    break;
                }
            }
        }
        return Optional.ofNullable(dataset);
    }

    @Override
    public SchemaMeta getSchemaMetadata (String database, String schemaName, QueryExecutor queryExecutor) throws SQLException {
        List<SchemaInfo> schemaInfos = new ArrayList<SchemaInfo>();
        List<TableInfo> tableInfoArray = new ArrayList<TableInfo>();
        schemaMeta.setName(schemaName);
        schemaMeta.setType(database);
        if(database.equals("influx")) schemaMeta.setIsTimeSeries(true);
        else schemaMeta.setIsTimeSeries(false);
        try {
            tableInfoArray = queryExecutor.getTableInfo();
            for (TableInfo tableInfo : tableInfoArray) {
                SchemaInfo schemaInfo = new SchemaInfo();
                schemaInfo.setId(tableInfo.getTable());
                schemaInfo.setSchema(tableInfo.getSchema());
                schemaInfo.setName(tableInfo.getTable());
                schemaInfo.setType(database);
                if (database.equals("influx")) schemaInfo.setIsConfiged(true);
                else schemaInfo.setIsConfiged(false);
                schemaInfos.add(schemaInfo);
            }
            if (tableInfoArray.isEmpty()) throw new SQLException("No available data.");
            schemaMeta.setData(schemaInfos);
            return schemaMeta;
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public SchemaInfo updateSchemaInfoColumns(String id, DbColumns columns) {
        Assert.notNull(id, "Schema ID must not be null");
        for (SchemaInfo schemaInfo : schemaMeta.getData()) {
            if (schemaInfo.getId().equals(id)) {
                schemaInfo.setTimeCol(columns.getTimeCol());
                schemaInfo.setIdCol(columns.getIdCol());
                schemaInfo.setValueCol(columns.getValueCol());
                schemaInfo.setIsConfiged(true);
                return schemaInfo;
            }
        }
        return null;
    }

    @Override
    public SchemaInfo updateSchemaInfo(SchemaInfo info) {
        Assert.notNull(info.getId(), "schemaInfo must not be null");
        for (SchemaInfo schemaInfo : schemaMeta.getData()) {
            if (schemaInfo.getId().equals(info.getId())) {
                schemaInfo.setIsConfiged(info.getIsConfiged());
                return schemaInfo;
            }
        }
        return null;
    }


    private AbstractDataset createDBDataset(SchemaInfo schemaInfo, QueryExecutor queryExecutor) throws SQLException {
        AbstractDataset dataset = null;
        log.debug("creating new dataset {}", schemaInfo.getId());
        String p = "";
        switch (schemaInfo.getType()) {
            case "postgres":
                SQLQueryExecutor sqlQueryExecutor = (SQLQueryExecutor) queryExecutor;
                p = String.valueOf(Paths.get(applicationProperties.getWorkspacePath(), "postgres-" + schemaInfo.getId()));
                if (new File(p).exists()) dataset = (PostgreSQLDataset) SerializationUtilities.loadSerializedObject(p);
                else{
                    dataset = new PostgreSQLDataset(sqlQueryExecutor, schemaInfo.getId(), schemaInfo.getSchema(), schemaInfo.getId(), timeFormat, 
                                                schemaInfo.getTimeCol(),schemaInfo.getIdCol(), schemaInfo.getValueCol());
                    SerializationUtilities.storeSerializedObject(dataset, p);
                }
                break; 
            case "influx":
                InfluxDBQueryExecutor influxDBQueryExecutor = (InfluxDBQueryExecutor) queryExecutor;
                p = String.valueOf(Paths.get(applicationProperties.getWorkspacePath(), "influx-" + schemaInfo.getId()));
                if (new File(p).exists()) dataset = (InfluxDBDataset) SerializationUtilities.loadSerializedObject(p);
                else{
                    dataset = new InfluxDBDataset(influxDBQueryExecutor, schemaInfo.getId(), schemaInfo.getSchema(), schemaInfo.getId(), timeFormat, schemaInfo.getTimeCol());
                    SerializationUtilities.storeSerializedObject(dataset, p);
                }
                break;
            default:
                break;
        }
        return dataset;
    }

    public List<String> getColumnNames(String tableName, QueryExecutor queryExecutor) {
        List<String> columnNames = new ArrayList<>();
        try {
            columnNames = queryExecutor.getColumns(tableName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return columnNames;
    }
}
