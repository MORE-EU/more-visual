package eu.more2020.visual.domain;

import java.util.List;

public class Query {

    private TimeRange range;

    private Filter filter;

    private List<Integer> measures;

    private String frequency;

    public Query() {
    }

    public Query(TimeRange range, List<Integer> measures, String frequency, Filter filter) {
        this.range = range;
        this.measures = measures;
        this.frequency = frequency;
        this.filter = filter;
    }

    public TimeRange getRange() {
        return range;
    }

    public void setRange(TimeRange range) {
        this.range = range;
    }

    public String getFrequency() {
        return frequency;
    }

    public Filter getFilter() {
        return this.filter;
    }

    public void setFilter(Filter filter) {
        this.filter = filter;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public List<Integer> getMeasures() {
        return measures;
    }

    public void setMeasures(List<Integer> measures) {
        this.measures = measures;
    }

    @Override
    public String toString() {
        return "Query{" +
            "range=" + range +
            ", measures=" + measures +
            ", frequency=" + frequency + 
            ", filter=" + (filter != null ? filter.toString() : "null") +
            '}';
    }
}
