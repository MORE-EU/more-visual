package eu.more2020.visual.service;

import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.domain.Query;
import eu.more2020.visual.domain.QueryResults;
import eu.more2020.visual.index.TimeseriesTreeIndex;
import org.apache.commons.collections.map.MultiKeyMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class CsvDataService {

    private final Logger log = LoggerFactory.getLogger(CsvDataService.class);
    private final ApplicationProperties applicationProperties;
    private MultiKeyMap indexes = new MultiKeyMap();

    public CsvDataService(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    public void removeIndex(String id, String folder) {
        indexes.remove(id, folder);
    }

    public synchronized TimeseriesTreeIndex getIndex(String folder, Dataset dataset) throws IOException {
        TimeseriesTreeIndex index = (TimeseriesTreeIndex) indexes.get(dataset.getId(), folder);
        if (index != null) {
            return index;
        }
        index = new TimeseriesTreeIndex(applicationProperties.getWorkspacePath() + "/" + folder + "/" + dataset.getName(), dataset);
        this.indexes.put(dataset.getId(), folder, index);
        return index;
    }

    public QueryResults executeQuery(String folder, Dataset dataset, Query query) {
        log.debug(query.toString());
        try {
            TimeseriesTreeIndex index = this.getIndex(folder, dataset);
            return index.executeQuery(query);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

}
