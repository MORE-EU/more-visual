package eu.more2020.visual.index.csv;

import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.index.TreeNode;

import java.util.DoubleSummaryStatistics;
import java.util.HashMap;

public class CsvTreeNode extends TreeNode {
    private long fileOffsetStart;
    private int dataPointCount = 0;

    public CsvTreeNode(int label, int level) {
        super(label, level);
    }

    public long getFileOffsetStart() {
        return fileOffsetStart;
    }

    public void setFileOffsetStart(long fileOffsetStart) {
        this.fileOffsetStart = fileOffsetStart;
    }

    public int getDataPointCount() {
        return dataPointCount;
    }

    public void setDataPointCount(int dataPointCount) {
        this.dataPointCount = dataPointCount;
    }

    public void adjustStats(String[] row, Dataset dataset) {
        if (statisticsMap == null) {
            statisticsMap = new HashMap<>();
        }
        for (int colIndex : dataset.getMeasures()) {
            DoubleSummaryStatistics statistics = statisticsMap.computeIfAbsent(colIndex, i -> new DoubleSummaryStatistics());
            statistics.accept(Double.parseDouble(row[colIndex]));
        }
    }
}
