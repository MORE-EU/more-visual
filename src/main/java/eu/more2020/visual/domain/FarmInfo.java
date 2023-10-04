package eu.more2020.visual.domain;

import java.util.List;

public class FarmInfo {
    private String id;
    private String path;
    private String type;
    private String schema;
    private String name;
    private Boolean hasHeader;
    private List<Integer> measures;
    private String timeCol;
    private String valueCol;
    private String idCol;


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

    public String getTimeCol() {
        return timeCol;
    }

    public void setTimeCol(String timeCol) {
        this.timeCol = timeCol;
    }

    public String getValueCol() {
        return valueCol;
    }

    public void setValueCol(String valueCol) {
        this.valueCol = valueCol;
    }

    public String getIdCol() {
        return idCol;
    }

    public void setIdCol(String idCol) {
        this.idCol = idCol;
    }

    public String getSchema() {
        return schema;
    }

    public void setSchema(String schema) {
        this.schema = schema;
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
