package eu.more2020.visual.service;

import eu.more2020.visual.middleware.cache.MinMaxCache;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
import eu.more2020.visual.middleware.domain.Query.Query;
import eu.more2020.visual.middleware.domain.DatabaseConnection;
import eu.more2020.visual.middleware.domain.QueryResults;
import eu.more2020.visual.middleware.domain.Dataset.AbstractDataset;

import org.apache.commons.configuration2.DatabaseConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
public class DataService {

    private final Logger LOG = LoggerFactory.getLogger(DataService.class);
    private HashMap<String, MinMaxCache> caches = new HashMap<>();

    public void deleteCache(String id) {
        caches.remove(id);
    }

    public void deleteCaches() {
        if(caches.isEmpty()) return;
        caches.clear();
        caches = new HashMap<>();
    }

    private synchronized MinMaxCache getCache(DatabaseConnection databaseConnection, AbstractDataset dataset, Query query) {
        String cacheId = databaseConnection.getType() + "_" + dataset.getTable();
        MinMaxCache minMaxCache = caches.get(cacheId); //TODO: change to name not type
        if(minMaxCache == null){
            minMaxCache = new MinMaxCache(databaseConnection.getQueryExecutor(dataset), dataset, 0, 2, 6);
            caches.put(cacheId, minMaxCache);
        }
        return minMaxCache;
    }

    public QueryResults executeQuery(DatabaseConnection databaseConnection, AbstractDataset dataset, Query query) {
        MinMaxCache minMaxCache = getCache(databaseConnection, dataset, query);
        return minMaxCache.executeQuery(query);
    }
}