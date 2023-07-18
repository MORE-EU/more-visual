package eu.more2020.visual.domain.Grpc;

public class InferenceRes {
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

}
