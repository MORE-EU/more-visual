package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.*;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
import eu.more2020.visual.middleware.datasource.QueryExecutor.InfluxDBQueryExecutor;
import eu.more2020.visual.middleware.datasource.QueryExecutor.SQLQueryExecutor;
import eu.more2020.visual.middleware.domain.TableInfo;
import eu.more2020.visual.middleware.domain.DatabaseConnection;
import eu.more2020.visual.middleware.domain.Dataset.*;
import eu.more2020.visual.middleware.domain.InfluxDB.InfluxDBConnection;
import eu.more2020.visual.middleware.util.io.SerializationUtilities;

import org.h2.engine.Database;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.io.*;
import java.nio.file.Paths;
import java.sql.SQLException;
import java.util.*;

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
    public Optional<SchemaMeta> findSchema(DatabaseConnection connection, String schema, QueryExecutor queryExecutor) throws SQLException, IOException {
        if (schemaMeta.getType() != null && schemaMeta.getName().equals(schema)) return Optional.ofNullable(schemaMeta);
        schemaMeta = new SchemaMeta();
        List<SchemaInfo> schemaInfos = new ArrayList<SchemaInfo>();
        List<TableInfo> tableInfoArray = new ArrayList<TableInfo>();
        schemaMeta.setName(schema);
        schemaMeta.setType(connection.getType());
        if(connection instanceof InfluxDBConnection) schemaMeta.setIsTimeSeries(true);
        else schemaMeta.setIsTimeSeries(false);
        try {
            tableInfoArray = queryExecutor.getTableInfo();
            for (TableInfo tableInfo : tableInfoArray) {
                SchemaInfo schemaInfo = new SchemaInfo();
                schemaInfo.setId(tableInfo.getTable());
                schemaInfo.setSchema(tableInfo.getSchema());
                if (connection instanceof InfluxDBConnection) schemaInfo.setIsConfiged(true);
                else schemaInfo.setIsConfiged(false);
                schemaInfos.add(schemaInfo);
            }
            if (tableInfoArray.isEmpty()) throw new SQLException("No available data.");
            schemaMeta.setData(schemaInfos);
            return Optional.ofNullable(schemaMeta);
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public Optional<SchemaMeta> findUserStudySchema(String schema) throws IOException {
        if (schemaMeta.getType() != null && schemaMeta.getName().equals(schema)) return Optional.ofNullable(schemaMeta);
        ObjectMapper mapper = new ObjectMapper();
        try {
            File metadataFile = new File(applicationProperties.getWorkspacePath() + "/more.meta.json");
            if (metadataFile.exists()) {
                FileReader reader = new FileReader(metadataFile);
                schemaMeta = mapper.readValue(reader, SchemaMeta.class);
            }
            log.debug("{}", schemaMeta);
            for (SchemaInfo schemaInfo : schemaMeta.getData()) schemaInfo.setIsConfiged(true);
            if (schemaMeta.getData().isEmpty()) throw new IOException("No available data.");
            return Optional.ofNullable(schemaMeta);
        } catch(Exception e) {
            throw e;
        }
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
    public List<Object[]> findSample(String id, QueryExecutor queryExecutor) throws SQLException {
        List<Object[]> resultList = new ArrayList<>();
        String schema = null;
        for (SchemaInfo schemaInfo : schemaMeta.getData()) {
            if (schemaInfo.getId().equals(id)) {
                schema = schemaInfo.getSchema();
                break;
            }
        }
        try {
        resultList = queryExecutor.getSample(schema, id);
        } catch (Exception e) {
            throw e;
        }
        return resultList;
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
    public Optional<AbstractDataset> findById(String id, String schema, DatabaseConnection databaseConnection) throws SQLException {
        Assert.notNull(id, "ID must not be null!");
        String datasetID = databaseConnection.getType() + "_" + id + "_" + schema;
        AbstractDataset dataset = null;
        if(datasets.containsKey(datasetID)) dataset = datasets.get(datasetID);
        else {
            for(SchemaInfo schemaInfo : schemaMeta.getData()) {
                if (schemaInfo.getId().equals(id)) {
                    dataset = createDBDataset(databaseConnection.getType(), schemaInfo, databaseConnection.getQueryExecutor());
                    datasets.put(schemaInfo.getId(), dataset);
                    break;
                }
            }
        }
        return Optional.ofNullable(dataset);
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

    private AbstractDataset createDBDataset(String type, SchemaInfo schemaInfo, QueryExecutor queryExecutor) throws SQLException {
        AbstractDataset dataset = null;
        log.debug("creating new dataset {}", schemaInfo.getId());
        String p = "";
        switch (type) {
            case "jdbc":
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

    public List<String> getColumnNames(String id, QueryExecutor queryExecutor) {
        List<String> columnNames = new ArrayList<>();
        try {
            columnNames = queryExecutor.getColumns(id);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return columnNames;
    }
}
