package eu.more2020.visual.domain;

import java.util.List;

public class ChangepointDetection {

    TimeRange range;

    List<Changepoint> changepoints;


    public ChangepointDetection() {
    }

    public ChangepointDetection(TimeRange range, List<Changepoint> changepoints) {
        this.range = range;
        this.changepoints = changepoints;
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


    @Override
    public String toString() {
        return "ChangepointDetection{" +
            "range=" + range +
            ", changepoints=" + changepoints +
            '}';
    }
}
