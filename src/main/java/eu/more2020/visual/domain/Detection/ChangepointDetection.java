package eu.more2020.visual.domain.Detection;

import eu.more2020.visual.domain.Changepoint;

import java.util.List;

public class ChangepointDetection extends AbstractDetection {

    List<Changepoint> changepoints;

    public ChangepointDetection() {}

    public List<Changepoint> getChangepoints() {
        return changepoints;
    }

    public void setChangepoints(List<Changepoint> changepoints) {
        this.changepoints = changepoints;
    }


    @Override
    public String toString() {
        return "ChangepointDetection{" +
            "id=" + id +
            ", range=" + range +
            ", changepoints=" + changepoints +
            '}';
    }
}
