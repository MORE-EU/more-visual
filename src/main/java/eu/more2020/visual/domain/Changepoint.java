package eu.more2020.visual.domain;

public class Changepoint {

    private Integer id;
    private TimeRange range;

    public Changepoint(){}

    public Changepoint(Integer id, TimeRange range) {
        this.id = id;
        this.range = range;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TimeRange getRange() {
        return range;
    }

    public void setRange(TimeRange range) {
        this.range = range;
    }

    @Override
    public String toString() {
        return "Changepoint{" +
            "id=" + id +
            ", range=" + range +
            '}';
    }
}
