package eu.more2020.visual.index.csv;

import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import eu.more2020.visual.domain.*;
import eu.more2020.visual.index.TimeSeriesIndexUtil;
import eu.more2020.visual.index.TreeNode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class CsvTTI {

    private static final Logger LOG = LogManager.getLogger(CsvTTI.class);


    protected CsvTreeNode root;
    private Map<Integer, DoubleSummaryStatistics> measureStats;
    private Dataset dataset;
    private String csv;
    private int objectsIndexed = 0;
    private boolean isInitialized = false;
    private DateTimeFormatter formatter;

    public CsvTTI(String csv, Dataset dataset) {
        this.dataset = dataset;
        this.csv = csv;
        this.formatter = DateTimeFormatter.ofPattern(dataset.getTimeFormat(), Locale.ENGLISH);
    }

    private TreeNode addPoint(Stack<Integer> labels, long fileOffset, String[] row) {
        if (root == null) {
            root = new CsvTreeNode(0, 0);
        }

        CsvTreeNode node = root;
        if (node.getDataPointCount() == 0) {
            node.setFileOffsetStart(fileOffset);
        }
        node.setDataPointCount(node.getDataPointCount() + 1);
        node.adjustStats(row, dataset);

        for (Integer label : labels) {
            CsvTreeNode child = (CsvTreeNode) node.getOrAddChild(label);
            node = child;
            if (node.getDataPointCount() == 0) {
                node.setFileOffsetStart(fileOffset);
            }
            node.setDataPointCount(node.getDataPointCount() + 1);
            node.adjustStats(row, dataset);
        }
        return node;
    }

    public void initialize(Query q0) throws IOException {
        measureStats = new HashMap<>();
        for (Integer measureIndex : dataset.getMeasures()) {
            measureStats.put(measureIndex, new DoubleSummaryStatistics());
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

        int queryFrequencyLevel = TimeSeriesIndexUtil.getTemporalLevelIndex(q0.getFrequency()) + 1;
        while ((row = parser.parseNext()) != null) {
            LocalDateTime dateTime = parseStringToDate(row[dataset.getTimeCol()]);
            if (dateTime.isBefore(from)) {
                from = dateTime;
            } else if (dateTime.isAfter(to)) {
                to = dateTime;
            }
            Stack<Integer> labels = new Stack<>();
            int lastIndex = q0.getRange() != null && q0.getRange().contains(dateTime) ? queryFrequencyLevel : queryFrequencyLevel - 1;
            for (int i = 0; i < lastIndex; i++) {
                labels.add(dateTime.get(TimeSeriesIndexUtil.TEMPORAL_HIERARCHY.get(i)));
            }
            for (Integer measureIndex : dataset.getMeasures()) {
                measureStats.get(measureIndex).accept(Double.parseDouble(row[measureIndex]));
            }

            this.addPoint(labels, rowOffset, row);
            objectsIndexed++;
            rowOffset = parser.getContext().currentChar() - 1;
        }

        parser.stopParsing();
        isInitialized = true;

       /* measureStats = statsMap.entrySet().stream().collect(Collectors.toMap(Map.Entry::getKey,
            e -> new MeasureStats(e.getValue().getAverage(), e.getValue().getMin(), e.getValue().getMax())));*/


        LOG.debug("Indexing Complete. Total Indexed Objects: " + objectsIndexed);

//        traverse(root);
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
            initialize(query);
        }
        CsvQueryProcessor queryProcessor = new CsvQueryProcessor(query, dataset, this);
        return queryProcessor.prepareQueryResults(root);
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

    public Map<Integer, DoubleSummaryStatistics> getMeasureStats() {
        return measureStats;
    }

}
