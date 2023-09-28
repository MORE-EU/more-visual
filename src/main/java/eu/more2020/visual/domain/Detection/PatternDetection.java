package eu.more2020.visual.domain.Detection;

public class PatternDetection extends AbstractDetection{

    public int measure;
    public PatternDetection() {}

    public PatternDetection(int measure) {
        this.measure = measure;
    }

    public int getMeasure() {
        return measure;
    }
}
