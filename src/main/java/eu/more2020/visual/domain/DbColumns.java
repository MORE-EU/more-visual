package eu.more2020.visual.domain;

public class DbColumns {
    String timeCol;
    String idCol;
    String valueCol;
    
    public DbColumns() {
    }
    public DbColumns(String timeCol, String idCol, String valueCol) {
        this.timeCol = timeCol;
        this.idCol = idCol;
        this.valueCol = valueCol;
    }
    public DbColumns(String timeCol) {
        this.timeCol = timeCol;
    }
    public String getTimeCol() {
        return timeCol;
    }
    public void setTimeCol(String timeCol) {
        this.timeCol = timeCol;
    }
    public String getIdCol() {
        return idCol;
    }
    public void setIdCol(String idCol) {
        this.idCol = idCol;
    }
    public String getValueCol() {
        return valueCol;
    }
    public void setValueCol(String valueCol) {
        this.valueCol = valueCol;
    }
}
