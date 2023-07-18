package eu.more2020.visual.domain.Grpc;

import java.util.Map;

public class PredictionsRes {
    private Map<String, Float> predictions;
    private Map<String, Float> evaluation;

    public Map<String, Float> getPredictions() {
        return predictions;
    }

    public void setPredictions(Map<String, Float> predictions) {
        this.predictions = predictions;
    }

    public Map<String, Float> getEvaluation() {
        return evaluation;
    }

    public void setEvaluation(Map<String, Float> evaluation) {
        this.evaluation = evaluation;
    }

    public PredictionsRes() {
    }

    public PredictionsRes(Map<String, Float> predictions, Map<String, Float> evaluation) {
        this.predictions = predictions;
        this.evaluation = evaluation;
    }

}
