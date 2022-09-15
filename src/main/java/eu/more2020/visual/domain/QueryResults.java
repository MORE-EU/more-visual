package eu.more2020.visual.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class QueryResults implements Serializable {

    private static final long serialVersionUID = 1L;

    private List<DataPoint> data = new ArrayList<>();

    private Map<Integer, MeasureStats> measureStats;

    private List<LocalDateTime> timeRange = new ArrayList<>();

    private int ioCount = 0;

    public List<LocalDateTime> getTimeRange() {
        return this.timeRange;
    }

    public void setTimeRange(List<LocalDateTime> timeRange) {
        this.timeRange = timeRange;
    }

    public List<DataPoint> getData() {
        return data;
    }

    public void setData(List<DataPoint> data) {
        this.data = data;
    }

    public Map<Integer, MeasureStats> getMeasureStats() {
        return measureStats;
    }

    public void setMeasureStats(Map<Integer, MeasureStats> measureStats) {
        this.measureStats = measureStats;
    }

    public int getIoCount() {
        return ioCount;
    }

    public void setIoCount(int ioCount) {
        this.ioCount = ioCount;
    }

    @Override
    public String toString() {
        return "QueryResults{" +
            "data=" + data +
            ", measureStats=" + measureStats +
            ", timeRange=" + timeRange +
            ", ioCount=" + ioCount +
            '}';
    }
}
