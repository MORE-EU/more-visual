package eu.more2020.visual.domain.Grpc;

public class AllResultsRes {
    private ResultsRes[] results;

    public ResultsRes[] getResults() {
        return results;
    }

    public void setResults(ResultsRes[] results) {
        this.results = results;
    }

    public AllResultsRes(ResultsRes[] results) {
        this.results = results;
    }

}
