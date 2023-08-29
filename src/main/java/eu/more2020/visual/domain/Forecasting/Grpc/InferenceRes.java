package eu.more2020.visual.domain.Forecasting.Grpc;

import java.io.Serializable;

public class InferenceRes implements Serializable {
    private byte[] predictions;

    public byte[] getPredictions() {
        return predictions;
    }

    public void setPredictions(byte[] predictions) {
        this.predictions = predictions;
    }

    public InferenceRes(byte[] predictions) {
        this.predictions = predictions;
    }

    public InferenceRes() {
    }

}
