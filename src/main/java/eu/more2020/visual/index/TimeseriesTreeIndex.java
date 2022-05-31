package eu.more2020.visual.index;

import com.google.common.collect.BiMap;
import com.google.common.collect.HashBiMap;
import com.google.common.math.StatsAccumulator;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import eu.more2020.visual.domain.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalField;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoField.*;

public class TimeseriesTreeIndex {

    public static final List<TemporalField> TEMPORAL_HIERARCHY = Arrays.asList(YEAR, MONTH_OF_YEAR, DAY_OF_MONTH, HOUR_OF_DAY, MINUTE_OF_HOUR, SECOND_OF_MINUTE, MILLI_OF_SECOND);
    private static final Logger LOG = LogManager.getLogger(TimeseriesTreeIndex.class);
    private static BiMap<String, TemporalField> temporalFielMap = HashBiMap.create();

    static {
        temporalFielMap.put("YEAR", YEAR);
        temporalFielMap.put("MONTH", MONTH_OF_YEAR);
        temporalFielMap.put("DAY", DAY_OF_MONTH);
        temporalFielMap.put("HOUR", HOUR_OF_DAY);
        temporalFielMap.put("MINUTE", MINUTE_OF_HOUR);
        temporalFielMap.put("SECOND", SECOND_OF_MINUTE);
        temporalFielMap.put("MILLI", MILLI_OF_SECOND);
    }

    protected TreeNode root;
    private TimeRange timeRange;
    private Map<Integer, MeasureStats> measureStats;
    private Dataset dataset;
    private String csv;
    private LocalDateTime firstDate,lastDate;
    private int objectsIndexed = 0;
    private boolean isInitialized = false;
    private DateTimeFormatter formatter;

    public TimeseriesTreeIndex(String csv, Dataset dataset) {
        this.dataset = dataset;
        this.csv = csv;
        this.formatter = DateTimeFormatter.ofPattern(dataset.getTimeFormat(), Locale.ENGLISH);
    }

    public static TemporalField getTemporalFieldByName(String name) {
        return temporalFielMap.get(name);
    }

    public static String getTemporalFieldName(TemporalField temporalField) {
        return temporalFielMap.inverse().get(temporalField);
    }

    public static int getTemporalLevelIndex(String temporalLevel) {
        return TEMPORAL_HIERARCHY.indexOf(getTemporalFieldByName(temporalLevel));
    }

    private TreeNode addPoint(Stack<Integer> labels, long fileOffset, String[] row) {
        if (root == null) {
            root = new TreeNode(0, 0);
        }

        TreeNode node = root;
        if (node.getDataPointCount() == 0) {
            node.setFileOffsetStart(fileOffset);
        }
        node.setDataPointCount(node.getDataPointCount() + 1);
        node.adjustStats(row, dataset);

        for (Integer label : labels) {
            TreeNode child = node.getOrAddChild(label);
            node = child;
            if (node.getDataPointCount() == 0) {
                node.setFileOffsetStart(fileOffset);
            }
            node.setDataPointCount(node.getDataPointCount() + 1);
            node.adjustStats(row, dataset);
        }
        return node;
    }

    public QueryResults initialize(Query q0) throws IOException {
        Map<Integer, StatsAccumulator> statsMap = new HashMap<>();
        for (Integer measureIndex : dataset.getMeasures()) {
            statsMap.put(measureIndex, new StatsAccumulator());
        }
        LocalDateTime from = LocalDateTime.MIN;
        LocalDateTime to = LocalDateTime.MAX;

        CsvParserSettings parserSettings = createCsvParserSettings();
        // to be able to get file offset of first measurement
        parserSettings.setHeaderExtractionEnabled(false);
        CsvParser parser = new CsvParser(parserSettings);
        objectsIndexed = 0;

        parser.beginParsing(new File(csv), Charset.forName("US-ASCII"));
        long rowOffset = 0l;
        if (dataset.getHasHeader()) {
            parser.parseNext();  //skip header row
            rowOffset = parser.getContext().currentChar() - 1;
        }

        String[] row;

        int queryFrequencyLevel = getTemporalLevelIndex(q0.getFrequency()) + 1;
        while ((row = parser.parseNext()) != null) {
            LocalDateTime dateTime = parseStringToDate(row[dataset.getTimeCol()]);
            if(objectsIndexed == 0){
                this.firstDate = dateTime;
            }else{
                this.lastDate = dateTime;
            }
            if (dateTime.isBefore(from)) {
                from = dateTime;
            } else if (dateTime.isAfter(to)) {
                to = dateTime;
            }
            Stack<Integer> labels = new Stack<>();
            int lastIndex = q0.getRange() != null && q0.getRange().contains(dateTime) ? queryFrequencyLevel : queryFrequencyLevel - 1;
            for (int i = 0; i < lastIndex; i++) {
                labels.add(dateTime.get(TEMPORAL_HIERARCHY.get(i)));
            }
            for (Integer measureIndex : dataset.getMeasures()) {
                statsMap.get(measureIndex).add(Double.parseDouble(row[measureIndex]));
            }

            this.addPoint(labels, rowOffset, row);
            objectsIndexed++;
            rowOffset = parser.getContext().currentChar() - 1;

        }
        parser.stopParsing();
        isInitialized = true;
        timeRange = new TimeRange(this.firstDate, this.lastDate);

        measureStats = statsMap.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey,
            e -> new MeasureStats(e.getValue().mean(), e.getValue().min(), e.getValue().max())));

        LOG.debug("Indexing Complete. Total Indexed Objects: " + objectsIndexed);

//        traverse(root);

        return this.executeQuery(q0);
    }

//    public int getLevel(TreeNode node) {
//        int level = 0;
//        if (node != root)
//            do {
//                level++;
//                node = node.getParent();
//            } while (node != root);
//        return level;
//    }

    public synchronized QueryResults executeQuery(Query query) throws IOException {
        if (!isInitialized) {
            return initialize(query);
        }
        QueryProcessor queryProcessor = new QueryProcessor(query, dataset, this);
        return queryProcessor.prepareQueryResults(root);
    }

    public Map<Integer, StatsAccumulator> getStats(List<TreeNode> queryNodes) {
        Map<Integer, StatsAccumulator> stats = new HashMap<>();
        for (TreeNode node : queryNodes) {
            node.getStats().forEach(
                (key, value) ->
                    stats.merge(key, value, (v1, v2) -> {
                        v1.addAll(v2);
                        return v1;
                    }));
        }
        return stats;
    }

    public void traverse(TreeNode node) {
        LOG.debug(node);
        Collection<TreeNode> children = node.getChildren();
        if (children != null && !children.isEmpty()) {
            for (TreeNode child : children) {
                traverse(child);
            }
        }
    }

    public LocalDateTime parseStringToDate(String s) {
        return LocalDateTime.parse(s, formatter);
    }

    public CsvParserSettings createCsvParserSettings() {
        CsvParserSettings parserSettings = new CsvParserSettings();
        parserSettings.getFormat().setDelimiter(dataset.getDelimiter().charAt(0));
        parserSettings.setIgnoreLeadingWhitespaces(false);
        parserSettings.setIgnoreTrailingWhitespaces(false);
        parserSettings.setLineSeparatorDetectionEnabled(true);

        return parserSettings;
    }

    public String getCsv() {
        return csv;
    }

    public TimeRange getTimeRange() {
        return timeRange;
    }

    public Map<Integer, MeasureStats> getMeasureStats() {
        return measureStats;
    }

    public List<LocalDateTime> getFirstLastDate() {
        List<LocalDateTime> timerange = new ArrayList<>();
        timerange.add(firstDate);
        timerange.add(lastDate);
        return timerange;
    }
}
