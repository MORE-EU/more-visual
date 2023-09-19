package eu.more2020.visual.domain.Forecasting.Grpc;

import java.io.Serializable;

public class TimestampReq implements Serializable {
    private Long timestamp;
    private String model_name;

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public String getModel_name() {
        return model_name;
    }

    public void setModel_name(String model_name) {
        this.model_name = model_name;
    }

    public TimestampReq(Long timestamp, String model_name) {
        this.timestamp = timestamp;
        this.model_name = model_name;
    }

    public TimestampReq() {
    }

}
