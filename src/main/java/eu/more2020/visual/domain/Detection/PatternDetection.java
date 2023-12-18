package eu.more2020.visual.domain.Detection;

import eu.more2020.visual.middleware.domain.TimeRange;

public class PatternDetection {

    private int id;
    private String datasetId;
    private String measure;
    private TimeRange range;

    public PatternDetection(){}
    public PatternDetection(int id, String datasetId, String measure, TimeRange range) {
        this.id = id;
        this.datasetId = datasetId;
        this.measure = measure;
        this.range = range;
    }

    public int getId() {
        return id;
    }

    public String getDatasetId() {
        return datasetId;
    }

    public String getMeasure() {
        return measure;
    }

    public TimeRange getRange() {
        return range;
    }

    @Override
    public String toString() {
        return "PatternDetection{" +
            "id=" + id +
            ", datasetId='" + datasetId + '\'' +
            ", measure=" + measure +
            ", range=" + range +
            '}';
    }
}
