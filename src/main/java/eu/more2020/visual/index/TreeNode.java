package eu.more2020.visual.index;

import it.unimi.dsi.fastutil.ints.Int2ObjectLinkedOpenHashMap;
import it.unimi.dsi.fastutil.ints.Int2ObjectSortedMap;

import java.util.Collection;
import java.util.DoubleSummaryStatistics;
import java.util.Map;
import java.util.stream.Collectors;

public class TreeNode {


    private final int label;

    private final int level;
    protected Map<Integer, DoubleSummaryStatistics> statisticsMap;
    private Int2ObjectSortedMap<TreeNode> children;

    public TreeNode(int label, int level) {
        this.label = label;
        this.level = level;
    }

    public Map<Integer, DoubleSummaryStatistics> getStats() {
        return statisticsMap;
    }

    public void setStats(Map<Integer, DoubleSummaryStatistics> statisticsMap) {
        this.statisticsMap = statisticsMap;
    }

    public boolean hasStats() {
        return statisticsMap != null;
    }

    public void adjustStats(Map<Integer, DoubleSummaryStatistics> statisticsMap) {
        if (this.statisticsMap == null) {
            this.statisticsMap = statisticsMap;
        } else {
            statisticsMap.forEach((k, v) -> this.statisticsMap.get(k).combine(v));
        }
    }

    public TreeNode getChild(Integer label) {
        return children != null ? children.get(label) : null;
    }

    public TreeNode getOrAddChild(int label) {
        if (children == null) {
            children = new Int2ObjectLinkedOpenHashMap();
        }
        TreeNode child = getChild(label);
        if (child == null) {
            child = new TreeNode(label, level + 1);
            children.put(label, child);
        }
        return child;
    }

    public int getLabel() {
        return label;
    }

    public Collection<TreeNode> getChildren() {
        return children == null ? null : children.values();
    }

    public int getLevel() {
        return level;
    }

    public Map<Integer, DoubleSummaryStatistics> getStatisticsMap() {
        return statisticsMap;
    }


    @Override
    public String toString() {
        return "TreeNode{" +
            "label=" + label +
            ", level=" + level +
            ", stats = " + (statisticsMap == null ? null : "{" + statisticsMap.entrySet().stream().map(e -> e.getKey() + ": " + e.getValue().getAverage()).collect(Collectors.joining(", ")) + "}") +
            "}";
    }
}
