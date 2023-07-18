package eu.more2020.visual.domain.Grpc;

public class TimestampReq {
    private Integer timestamp;
    private String model_name;

    public Integer getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Integer timestamp) {
        this.timestamp = timestamp;
    }

    public String getModel_name() {
        return model_name;
    }

    public void setModel_name(String model_name) {
        this.model_name = model_name;
    }

    public TimestampReq(Integer timestamp, String model_name) {
        this.timestamp = timestamp;
        this.model_name = model_name;
    }

}
