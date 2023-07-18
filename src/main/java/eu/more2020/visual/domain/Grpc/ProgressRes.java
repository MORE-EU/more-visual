package eu.more2020.visual.domain.Grpc;

import java.util.Map;

public class ProgressRes {
    private String target;
    private Map<String, String> metrics;

    public String getTarget() {
        return target;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public Map<String, String> getMetrics() {
        return metrics;
    }

    public void setMetrics(Map<String, String> metrics) {
        this.metrics = metrics;
    }

    public ProgressRes() {
    }

    public ProgressRes(String target, Map<String, String> metrics) {
        this.target = target;
        this.metrics = metrics;
    }

}
