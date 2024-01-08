package eu.more2020.visual.domain;

import java.io.Serializable;
import java.util.List;

public class FarmMeta implements Serializable {

    private String name;
    private String type;
    private Integer resType;
    private String config;
    private List<FarmInfo> data;
    private Float latitude;
    private Float longitude;
    private Boolean isTimeSeries;


    public FarmMeta () {

    }

    public FarmMeta(String name, String type, Integer resType, String config, List<FarmInfo> data, Float latitude, Float longitude) {
        this.name = name;
        this.type = type;
        this.resType = resType;
        this.config = config;
        this.data = data;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FarmInfo> getData() {
        return this.data;
    }

    public void setData(List<FarmInfo> data) {
        this.data = data;
    }

    public Float getLatitude() {
        return this.latitude;
    }

    public void setLatitude(Float latitude) {
        this.latitude = latitude;
    }

    public Float getLongitude() {
        return this.longitude;
    }

    public void setLongitude(Float longitude) {
        this.longitude = longitude;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getResType() {
        return resType;
    }

    public void setResType(Integer resType) {
        this.resType = resType;
    }

    public Boolean getIsTimeSeries() {
        return isTimeSeries;
    }

    public void setIsTimeSeries(Boolean isTimeSeries) {
        this.isTimeSeries = isTimeSeries;
    }


    @Override
    public String toString() {
        return "FarmMeta{" +
            "name='" + name + '\'' +
            ", type='" + type + '\'' +
            ", resType=" + resType +
            ", config='" + config + '\'' +
            ", data=" + data +
            ", latitude=" + latitude +
            ", longitude=" + longitude +
            '}';
    }
}
