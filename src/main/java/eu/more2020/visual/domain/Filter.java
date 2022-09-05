package eu.more2020.visual.domain;
import java.util.List;

public class Filter {

    private List<Integer> filterMes;
    private List<Double> filValues;

    public Filter() {
    }

    public Filter(List<Integer> filterMes, List<Double> filValues) {
        this.filterMes = filterMes;
        this.filValues = filValues;
    }


    public List<Integer> getFilterMes() {
        return this.filterMes;
    }

    public void setFilterMes(List<Integer> filterMes) {
        this.filterMes = filterMes;
    }

    public List<Double> getFilValues() {
        return this.filValues;
    }

    public void setFilvalues(List<Double> filValues) {
        this.filValues = filValues;
    }

    @Override
    public String toString() {
        return "{" +
            " filterMes=" + getFilterMes() + 
            ", filvalues=" + getFilValues() +
            "}";
    }
    

}
