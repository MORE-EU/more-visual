package eu.more2020.visual.domain.Detection;

import eu.more2020.visual.domain.Changepoint;
import eu.more2020.visual.middleware.domain.TimeRange;

import java.util.List;

public class DeviationDetection extends ChangepointDetection {


    private Integer weeks;

    private String type;

    public DeviationDetection() {
    }

    public DeviationDetection(TimeRange range, List<Changepoint> changepoints, Integer weeks, String type) {
        this.range = range;
        this.type = type;
        this.changepoints = changepoints;
        this.weeks = weeks;
    }

    public Integer getWeeks() {
        return weeks;
    }

    public void setWeeks(Integer weeks) {
        this.weeks = weeks;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "DeviationDetection{" +
            "range=" + range +
            ", changepoints=" + changepoints +
            ", weeks=" + weeks +
            ", type=" + type +
            '}';
    }
}
