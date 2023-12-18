package eu.more2020.visual.domain.Forecasting.Grpc;

import java.io.Serializable;
import java.util.List;

public class ModelsRes implements Serializable {
    private List<String> models;

    public List<String> getModels() {
        return models;
    }

    public void setModels(List<String> models) {
        this.models = models;
    }

    public ModelsRes() {
    }

    public ModelsRes(List<String> models) {
        this.models = models;
    }

}
