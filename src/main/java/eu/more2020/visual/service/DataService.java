package eu.more2020.visual.service;

import eu.more2020.visual.middleware.cache.MinMaxCache;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
import eu.more2020.visual.middleware.domain.Query.Query;
import eu.more2020.visual.middleware.domain.QueryResults;
import eu.more2020.visual.middleware.domain.Dataset.AbstractDataset;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
public class DataService {

    private final Logger LOG = LoggerFactory.getLogger(DataService.class);
    private HashMap<String, MinMaxCache> caches = new HashMap<>();

    public void removeIndex(String id, String schema) {
        caches.remove(id, schema);
    }

    private synchronized MinMaxCache getCache(QueryExecutor queryExecutor, AbstractDataset dataset, Query query) {
        MinMaxCache minMaxCache = caches.get(dataset.getTable());
        if(minMaxCache == null){
            minMaxCache = new MinMaxCache(queryExecutor, dataset, 1, 8, 4);
            caches.put(dataset.getTable(), minMaxCache);
        }
        return minMaxCache;
    }

    public QueryResults executeQuery(QueryExecutor queryExecutor, AbstractDataset dataset, Query query) {
        MinMaxCache minMaxCache = getCache(queryExecutor, dataset, query);
        return minMaxCache.executeQuery(query);
    }
}