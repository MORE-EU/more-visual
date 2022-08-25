package eu.more2020.visual.service;

import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.domain.Query;
import eu.more2020.visual.domain.QueryResults;
import eu.more2020.visual.index.csv.TimeseriesTreeIndex;
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

    private synchronized TimeseriesTreeIndex getIndex(String folder, Dataset dataset) throws IOException {
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

/*    public QueryResults executeQuery(String folder, Dataset dataset, Query query) {
        log.debug(query.toString());
        CsvParserSettings parserSettings = new CsvParserSettings();
        parserSettings.getFormat().setDelimiter(',');
        parserSettings.getFormat().setQuote('"');
        parserSettings.setIgnoreLeadingWhitespaces(false);
        parserSettings.setIgnoreTrailingWhitespaces(false);
        parserSettings.setSkipEmptyLines(true);
        parserSettings.setHeaderExtractionEnabled(dataset.getHasHeader());
        CsvParser parser = new CsvParser(parserSettings);
        parser.beginParsing(new File(applicationProperties.getWorkspacePath() + "/" + folder, dataset.getName()), Charset.forName("US-ASCII"));
        String[] row;
        QueryResults results = new QueryResults();
        List<String[]> data = new ArrayList<>();
        results.setData(data);
        Map<Integer, StatsAccumulator> statsMap = new HashMap<>();
        for (Integer measureIndex : dataset.getMeasures()) {
            statsMap.put(measureIndex, new StatsAccumulator());
        }

        while ((row = parser.parseNext()) != null) {
            // LocalDateTime time = LocalDateTime.parse(row[dataset.getTimeCol()]);
            data.add(row);
            for (Integer measureIndex : dataset.getMeasures()) {
                statsMap.get(measureIndex).add(Double.parseDouble(row[measureIndex]));
            }
        }
        parser.stopParsing();
        Map<Integer, MeasureStats> measureStats = statsMap.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey,
            e -> new MeasureStats(e.getValue().mean(), e.getValue().min(), e.getValue().max())));
        results.setMeasureStats(measureStats);
        return results;
    }*/
}
