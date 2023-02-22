package eu.more2020.visual.domain;

import java.util.List;

public class FarmInfo {
    private String id;
    private String path;
    private String type;
    private String name;
    private Boolean hasHeader;
    private List<Integer> measures;
    private Integer timeCol;

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isHasHeader() {
        return this.hasHeader;
    }

    public Boolean getHasHeader() {
        return this.hasHeader;
    }

    public void setHasHeader(Boolean hasHeader) {
        this.hasHeader = hasHeader;
    }

    public List<Integer> getMeasures() {
        return this.measures;
    }

    public void setMeasures(List<Integer> measures) {
        this.measures = measures;
    }

    public Integer getTimeCol() {
        return this.timeCol;
    }

    public void setTimeCol(Integer timeCol) {
        this.timeCol = timeCol;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", name='" + getName() + "'" +
            ", type='" + getType() + "'" +
            ", path='" + getPath() + "'" +
            ", hasHeader='" + isHasHeader() + "'" +
            ", measures='" + getMeasures() + "'" +
            ", timeCol='" + getTimeCol() + "'" +
            "}";
    }

}
