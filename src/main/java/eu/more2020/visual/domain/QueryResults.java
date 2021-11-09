package eu.more2020.visual.domain;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class QueryResults implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<String[]> data;

    private Map<Integer, MeasureStats> measureStats;

    public List<String[]> getData() {
        return data;
    }

    public void setData(List<String[]> data) {
        this.data = data;
    }

    public Map<Integer, MeasureStats> getMeasureStats() {
        return measureStats;
    }

    public void setMeasureStats(Map<Integer, MeasureStats> measureStats) {
        this.measureStats = measureStats;
    }
}
