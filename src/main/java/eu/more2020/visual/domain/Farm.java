package eu.more2020.visual.domain;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * A Dataset.
 */
public class Farm implements Serializable {

    private static final long serialVersionUID = 1L;


    private String id;

    private Float latitude;
    
    private Float longitude;

    @NotNull
    private String name;

    @NotNull
    private Integer type;

    private ArrayList<Dataset> data;

    public Float getLatitude() {
        return this.latitude;
    }

    public Float getLongitude() {
        return this.longitude;
    }
    
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getType() {
        return type;
    }

    public ArrayList<Dataset> getData() {
        return data;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Farm)) {
            return false;
        }
        return id != null && id.equals(((Farm) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

}
