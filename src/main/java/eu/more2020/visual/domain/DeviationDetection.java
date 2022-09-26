package eu.more2020.visual.domain;

import java.util.List;

public class DeviationDetection {
    private TimeRange range;

    private String frequency;

    private List<Changepoint> changepoints;

    private Integer weeks;

    public DeviationDetection() {
    }

    public DeviationDetection(TimeRange range, String frequency, List<Changepoint> changepoints, Integer weeks) {
        this.range = range;
        this.changepoints = changepoints;
        this.frequency = frequency;
        this.weeks = weeks;
    }

    public TimeRange getRange() {
        return range;
    }

    public void setRange(TimeRange range) {
        this.range = range;
    }

    public List<Changepoint> getChangepoints() {
        return changepoints;
    }

    public void setChangepoints(List<Changepoint> changepoints) {
        this.changepoints = changepoints;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public Integer getWeeks() {
        return weeks;
    }

    public void setWeeks(Integer weeks) {
        this.weeks = weeks;
    }

    @Override
    public String toString() {
        return "DeviationDetection{" +
            "range=" + range +
            ", frequency=" + frequency +
            ", changepoints=" + changepoints +
            ", weeks=" + weeks +
            '}';
    }
}
