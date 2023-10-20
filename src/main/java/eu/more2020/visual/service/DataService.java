package eu.more2020.visual.service;

import eu.more2020.visual.index.domain.Query.Query;
import eu.more2020.visual.index.domain.QueryResults;
import eu.more2020.visual.index.domain.Dataset.AbstractDataset;
import eu.more2020.visual.index.index.TTI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;


@Service
public class DataService {

    private final Logger LOG = LoggerFactory.getLogger(DataService.class);
    private HashMap<String, TTI> indexes = new HashMap<>();

    public void removeIndex(String id, String farmName) {
        indexes.remove(id, farmName);
    }

    private synchronized TTI getIndex(AbstractDataset dataset, Query query) {
        TTI tti = indexes.get(dataset.getTable());
        if(tti == null){
            tti = new TTI(dataset, 1, 4, 4);
            indexes.put(dataset.getTable(), tti);
        }
        return tti;
    }

    public QueryResults executeQuery(AbstractDataset dataset, Query query) {
        TTI tti = getIndex(dataset, query);
        return tti.executeQueryMinMax(query);
    }
}
