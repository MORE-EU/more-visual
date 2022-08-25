package eu.more2020.visual.index.csv;

import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import eu.more2020.visual.domain.DataPoint;
import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.domain.Query;
import eu.more2020.visual.domain.QueryResults;
import eu.more2020.visual.index.TimeSeriesIndexUtil;
import eu.more2020.visual.index.TreeNode;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalField;
import java.util.*;
import java.util.stream.Collectors;

public class CsvQueryProcessor {

    private static final Logger LOG = LogManager.getLogger(CsvQueryProcessor.class);
    private Query query;
    private QueryResults queryResults;
    private Dataset dataset;
    private int freqLevel;
    private Stack<TreeNode> stack = new Stack<>();
    private FileInputStream fileInputStream;
    private CsvParser parser;
    private TimeseriesTreeIndex timeseriesTreeIndex;
    private List<Integer> measures;


    public CsvQueryProcessor(Query query, Dataset dataset, TimeseriesTreeIndex timeseriesTreeIndex) {
        this.query = query;
        this.measures = query.getMeasures() != null ? query.getMeasures() : dataset.getMeasures();
        this.queryResults = new QueryResults();
        this.dataset = dataset;
        this.timeseriesTreeIndex = timeseriesTreeIndex;
        this.freqLevel = TimeSeriesIndexUtil.getTemporalLevelIndex(query.getFrequency()) + 1;
        CsvParserSettings parserSettings = timeseriesTreeIndex.createCsvParserSettings();
        parser = new CsvParser(parserSettings);
    }

    public QueryResults prepareQueryResults(CsvTreeNode root) throws IOException {
        LocalDateTime start;
        LocalDateTime end;
        if (query.getRange() == null) {
            start = timeseriesTreeIndex.getTimeRange().getTo()
                .minus(7, ChronoUnit.DAYS);
            end = timeseriesTreeIndex.getTimeRange().getTo();
        } else {
            start = query.getRange().getFrom();
            end = query.getRange().getTo();
        }
        List<Integer> startLabels = getLabels(start);
        List<Integer> endLabels = getLabels(end);

        fileInputStream = new FileInputStream(timeseriesTreeIndex.getCsv());
        this.processQueryNodes(root, startLabels, endLabels, true, true, 0);
        fileInputStream.close();

        queryResults.setMeasureStats(timeseriesTreeIndex.getMeasureStats());
        queryResults.setTimeRange(timeseriesTreeIndex.getFirstLastDate());
        return queryResults;
    }

    public void processNode(CsvTreeNode treeNode) throws IOException {
        if (treeNode.getLevel() == freqLevel) {
            queryResults.getData().add(new DataPoint(getCurrentNodeDateTime(), measures.stream().mapToDouble(measure -> treeNode.getStats().get(measure).getAverage()).toArray()));
        } else {
            fileInputStream.getChannel().position(treeNode.getFileOffsetStart());
            String[] row;
            LocalDateTime previousDate, currentDate = null;
            DoubleSummaryStatistics[] statsAccumulators = new DoubleSummaryStatistics[measures.size()];
            for (int i = 0; i < statsAccumulators.length; i++) {
                statsAccumulators[i] = new DoubleSummaryStatistics();
            }

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(fileInputStream, StandardCharsets.UTF_8));
            for (int i = 0; i < treeNode.getDataPointCount(); i++) {
                String s;
                while ((s = bufferedReader.readLine()).isEmpty()) ;
                row = this.parser.parseLine(s);
                queryResults.setIoCount(queryResults.getIoCount() + 1);
                previousDate = currentDate;
                currentDate = timeseriesTreeIndex.parseStringToDate(row[dataset.getTimeCol()]).truncatedTo(TimeSeriesIndexUtil.TEMPORAL_HIERARCHY.get(freqLevel - 1).getBaseUnit());
                if (!currentDate.equals(previousDate) && previousDate != null) {
                    if (query.getRange() == null || query.getRange().contains(previousDate)) {
                        queryResults.getData().add(new DataPoint(previousDate, Arrays.stream(statsAccumulators).mapToDouble(DoubleSummaryStatistics::getAverage).toArray()));
                    }
                    statsAccumulators = new DoubleSummaryStatistics[measures.size()];
                    for (int j = 0; j < statsAccumulators.length; j++) {
                        statsAccumulators[j] = new DoubleSummaryStatistics();
                    }
                }
                for (int j = 0; j < measures.size(); j++) {
                    statsAccumulators[j].accept(Double.parseDouble(row[measures.get(j)]));
                }
                if (i == treeNode.getDataPointCount() - 1 && (query.getRange() == null || query.getRange().contains(currentDate))) {
                    queryResults.getData().add(new DataPoint(currentDate, Arrays.stream(statsAccumulators).mapToDouble(DoubleSummaryStatistics::getAverage).toArray()));
                }
            }
        }
    }

    private void processQueryNodes(CsvTreeNode node, List<Integer> startLabels,
                                   List<Integer> endLabels, boolean isFirst, boolean isLast, int level) throws IOException {
        stack.push(node);
        // we are at a leaf node
        Collection<TreeNode> children = node.getChildren();
        if (node.getLevel() == freqLevel || children == null || children.isEmpty()) {
            processNode(node);
            stack.pop();
            return;
        }

        // these are the children's filters
        int start = startLabels.get(level);
        int end = endLabels.get(level);
        /* We filter in each level only in the first node and the last. If we are on the first node, we get everything that is from the start filter
         * and after. Else if we are in the last node we get everything before the end filter. Finally, if we re in intermediary nodes we get all children
         * that are below the filtered values of the current node.*/
        if (isFirst)
            children = children.stream().filter(child -> child.getLabel() >= start).collect(Collectors.toList());
        if (isLast)
            children = children.stream().filter(child -> child.getLabel() <= end).collect(Collectors.toList());

        for (TreeNode child : children) {
            // The child's first node will be the first node of the current first node and the same for the end
            boolean childIsFirst = child.getLabel() == start && isFirst;
            boolean childIsLast = child.getLabel() == end && isLast;
            processQueryNodes((CsvTreeNode) child, startLabels, endLabels, childIsFirst, childIsLast, level + 1);
        }

        stack.pop();

    }

    private LocalDateTime getCurrentNodeDateTime() {
        LocalDateTime dateTime = LocalDateTime.of(0, 1, 1, 0, 0, 0, 0);
        for (int i = 1; i <= freqLevel; i++) {
            dateTime = dateTime.with(TimeSeriesIndexUtil.TEMPORAL_HIERARCHY.get(i - 1), stack.get(i).getLabel());
        }
        return dateTime;
    }

    private List<Integer> getLabels(LocalDateTime date) {
        List<Integer> labels = new ArrayList<>();
        for (TemporalField temporalField : TimeSeriesIndexUtil.TEMPORAL_HIERARCHY) {
            labels.add(date.get(temporalField));
        }
        return labels;
    }

}
