package eu.more2020.visual.domain;

import java.io.Serializable;
import java.util.List;

public class FarmMeta implements Serializable {

    private String name;
    private String type;
    private List<FarmInfo> data;
    private Float latitude;
    private Float longitude;
    


    public FarmMeta () {

    }

    public FarmMeta(String name, String type, List<FarmInfo> data, Float latitude, Float longitude) {
        this.name = name;
        this.type = type;
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

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
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


    @Override
    public String toString() {
        return "{" +
            " name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", data='" + getData() + "'" +
            ", latitude='" + getLatitude() + "'" +
            ", longitude='" + getLongitude() + "'" +
            "}";
    }


}
