package eu.more2020.visual.service;

import com.google.common.math.StatsAccumulator;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.MeasureStats;
import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.domain.Query;
import eu.more2020.visual.domain.QueryResults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class CsvDataService {

    private final Logger log = LoggerFactory.getLogger(CsvDataService.class);
    private final ApplicationProperties applicationProperties;

    public CsvDataService(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }


    public QueryResults executeQuery(String folder, Dataset dataset, Query query) {
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
    }
}
