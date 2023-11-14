package eu.more2020.visual.service;

import eu.more2020.visual.middleware.cache.MinMaxCache;
import eu.more2020.visual.middleware.datasource.QueryExecutor.InfluxDBQueryExecutor;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
import eu.more2020.visual.middleware.domain.InfluxDB.InfluxDBConnection;
import eu.more2020.visual.middleware.domain.ModelarDB.ModelarDBConnection;
import eu.more2020.visual.middleware.domain.PostgreSQL.JDBCConnection;
import eu.more2020.visual.middleware.domain.Query.Query;
import eu.more2020.visual.middleware.domain.QueryResults;
import eu.more2020.visual.middleware.domain.Dataset.AbstractDataset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;


@Service
public class DataService {

    private final Logger LOG = LoggerFactory.getLogger(DataService.class);
    private HashMap<String, MinMaxCache> indexes = new HashMap<>();

    public void removeIndex(String id, String farmName) {
        indexes.remove(id, farmName);
    }

    private synchronized MinMaxCache getIndex(QueryExecutor queryExecutor, AbstractDataset dataset, Query query) {
        MinMaxCache minMaxCache = indexes.get(dataset.getTable());
        if(minMaxCache == null){
            minMaxCache = new MinMaxCache(queryExecutor, dataset, 1, 4, 4);
            indexes.put(dataset.getTable(), minMaxCache);
        }
        return minMaxCache;
    }

    public QueryResults executeQuery(AbstractDataset dataset, Query query) {
        MinMaxCache minMaxCache = getIndex(createQueryExecutor(dataset), dataset, query);
        return minMaxCache.executeQuery(query);
    }

    private QueryExecutor createQueryExecutor(AbstractDataset dataset)  {
        String p = "";
        QueryExecutor queryExecutor = null;
        switch (dataset.getType()) {
            case "postgres":
                // JDBCConnection postgreSQLConnection =
                //     new JDBCConnection("", "", "");
                // queryExecutor = postgreSQLConnection.getSqlQueryExecutor(dataset);
                break;
            case "modelar":
                ModelarDBConnection modelarDBConnection =
                    new ModelarDBConnection("83.212.75.52", 31000);
                queryExecutor = modelarDBConnection.getSqlQueryExecutor(dataset);
                break;
            case "influx":
                String url = "http://leviathan.imsi.athenarc.gr:8086";
                String token = "jGlRrSisGuDn6MEyIcJMMoiqirFXwbdNnKPtoZAasaRSQZJ0iTRx8FQrQ-zob5j_UlUBuGzq_mYdf1LNWtSbqg==";
                String org = "ATHENA";
                // InfluxDBConnection influxDBConnection = new InfluxDBConnection(url, org, token);
                // queryExecutor = influxDBConnection.getSqlQueryExecutor(dataset);
            default:
                break;
        }
        return queryExecutor;
    }
}
