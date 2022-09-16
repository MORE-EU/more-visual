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
    private CsvTTI tti;
    private List<Integer> measures;
    private HashMap<Integer, Double[]> filter;


    public CsvQueryProcessor(Query query, Dataset dataset, CsvTTI tti) {
        this.query = query;
        this.filter = query.getFilter();
        this.measures = query.getMeasures() != null ? query.getMeasures() : dataset.getMeasures();
        this.queryResults = new QueryResults();
        this.dataset = dataset;
        this.tti = tti;
        this.freqLevel = TimeSeriesIndexUtil.getTemporalLevelIndex(query.getFrequency()) + 1;
        CsvParserSettings parserSettings = tti.createCsvParserSettings();
        parser = new CsvParser(parserSettings);
    }

    public QueryResults prepareQueryResults(CsvTreeNode root, HashMap<Integer, Double[]> filter) throws IOException {
        List<Integer> startLabels = getLabels(query.getRange().getFrom());
        List<Integer> endLabels = getLabels(query.getRange().getTo());

        fileInputStream = new FileInputStream(tti.getCsv());
        this.processQueryNodes(root, startLabels, endLabels, true, true, 0);
        fileInputStream.close();

        queryResults.setMeasureStats(tti.getMeasureStats());
        return queryResults;
    }

    public double[] nodeSelection(CsvTreeNode treeNode) throws IOException {
        List<Double> filteredVals = new ArrayList<Double>();
        Boolean notApplicable = false;
        if(filter != null){
            for(Map.Entry<Integer, Double[]> entry : filter.entrySet()){
                if(dataset.getMeasures().contains(entry.getKey())){
                    Double compareVal = treeNode.getStats().get(entry.getKey()).getAverage();
                    Double[] compareFil = entry.getValue();
                    if(!(compareVal > compareFil[0] && compareVal < compareFil[1])){
                        notApplicable = true;
                        break; 
                    };
                }
            }
        if(!notApplicable){
            measures.forEach(mez -> {
                filteredVals.add(treeNode.getStats().get(mez).getAverage());
            });
        };
        return filteredVals.stream().mapToDouble(val -> val).toArray();
        }else{
        return measures.stream()
        .mapToDouble(mes-> treeNode.getStats().get(mes).getAverage())
        .toArray();
        }
    }

    public double[] nodeSelectionFile(DoubleSummaryStatistics[] statsAccumulators) throws IOException {
        Boolean notApplicable = false;
        for(Map.Entry<Integer, Double[]> entry : filter.entrySet()){
            if(dataset.getMeasures().contains(entry.getKey())){
                Double[] compareFil = entry.getValue();
                Double compareVal = statsAccumulators[entry.getKey()].getAverage();
                        if(!(compareVal > compareFil[0] && compareVal < compareFil[1])){
                            notApplicable = true;
                            break;
                        }
            }
        }
        if(!notApplicable){
            return Arrays.stream(statsAccumulators).mapToDouble(DoubleSummaryStatistics::getAverage).toArray();
        }else{
            return new ArrayList<Double>().stream().mapToDouble(m -> m).toArray();
        }
    }

    public void processNode(CsvTreeNode treeNode) throws IOException {
        if (treeNode.getLevel() == freqLevel) {
            queryResults.getData().add(new DataPoint(getCurrentNodeDateTime(), nodeSelection(treeNode))); 
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
                currentDate = tti.parseStringToDate(row[dataset.getTimeCol()]).truncatedTo(TimeSeriesIndexUtil.TEMPORAL_HIERARCHY.get(freqLevel - 1).getBaseUnit());
                if (!currentDate.equals(previousDate) && previousDate != null) {
                    if (query.getRange() == null || query.getRange().contains(previousDate)) {
                        queryResults.getData().add(new DataPoint(previousDate, nodeSelectionFile(statsAccumulators)));
                    }
                    statsAccumulators = new DoubleSummaryStatistics[measures.size()];
                    for (int j = 0; j < statsAccumulators.length; j++) {
                        statsAccumulators[j] = new DoubleSummaryStatistics();
                    }
                }
                for (int j = 0; j < measures.size(); j++) {
                    statsAccumulators[j].accept(Double.parseDouble(row[measures.get(j)]));
                }
                // nodeSelectionFile(statsAccumulators);
                if (i == treeNode.getDataPointCount() - 1 && (query.getRange() == null || query.getRange().contains(currentDate))) {
                    queryResults.getData().add(new DataPoint(currentDate, nodeSelectionFile(statsAccumulators)));
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
