package eu.more2020.visual.service;

import eu.more2020.visual.middleware.cache.MinMaxCache;
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
    private HashMap<String, MinMaxCache> indexes = new HashMap<>();

    public void removeIndex(String id, String farmName) {
        indexes.remove(id, farmName);
    }

    private synchronized MinMaxCache getIndex(AbstractDataset dataset, Query query) {
        MinMaxCache minMaxCache = indexes.get(dataset.getTable());
        if(minMaxCache == null){
            minMaxCache = new MinMaxCache(dataset, 1, 4, 4);
            indexes.put(dataset.getTable(), minMaxCache);
        }
        return minMaxCache;
    }

    public QueryResults executeQuery(AbstractDataset dataset, Query query) {
        MinMaxCache minMaxCache = getIndex(dataset, query);
        return minMaxCache.executeQueryMinMax(query);
    }
}
