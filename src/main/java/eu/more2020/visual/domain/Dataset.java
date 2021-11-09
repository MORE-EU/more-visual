package eu.more2020.visual.domain;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.LinkedHashSet;

/**
 * A Dataset.
 */
public class Dataset implements Serializable {

    private static final long serialVersionUID = 1L;


    private String id;

    @NotNull
    private String name;

    private Boolean hasHeader;

    private String[] header;

    private Integer timeCol;

    private LinkedHashSet<Integer> measures = new LinkedHashSet<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getHasHeader() {
        return hasHeader;
    }

    public void setHasHeader(Boolean hasHeader) {
        this.hasHeader = hasHeader;
    }

    public String[] getHeader() {
        return header;
    }

    public void setHeader(String[] header) {
        this.header = header;
    }

    public Integer getTimeCol() {
        return timeCol;
    }

    public void setTimeCol(Integer timeCol) {
        this.timeCol = timeCol;
    }

    public LinkedHashSet<Integer> getMeasures() {
        return measures;
    }

    public void setMeasures(LinkedHashSet<Integer> measures) {
        this.measures = measures;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dataset)) {
            return false;
        }
        return id != null && id.equals(((Dataset) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

}
