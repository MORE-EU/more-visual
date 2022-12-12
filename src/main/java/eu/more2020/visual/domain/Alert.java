package eu.more2020.visual.domain;

import java.io.Serializable;
import java.time.LocalDateTime;


public class Alert implements Serializable {

    class AlertValues {
        private String value1;
        private String value2;
    
        public AlertValues(){
        }
    
        public AlertValues(String value1, String value2) {
            this.value1 = value1;
            this.value2 = value2;
        }
    
        public String getValue1() {
            return this.value1;
        }
    
        public void setValue1(String value1) {
            this.value1 = value1;
        }
    
        public String getValue2() {
            return this.value2;
        }
    
        public void setValue2(String value2) {
            this.value2 = value2;
        }
    
    
        @Override
        public String toString() {
            return "{" +
                " value1='" + getValue1() + "'" +
                ", value2='" + getValue2() + "'" +
                "}";
        }
    
    
    }

    private String name;
    private LocalDateTime dateCreated;
    private Integer duration;
    private String measure;
    private String operation;
    private AlertValues values;
    private String datasetId;
    private Boolean active;



    public Boolean isActive() {
        return this.active;
    }

    public Boolean getActive() {
        return this.active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }    

    public String getOperation() {
        return this.operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public LocalDateTime getDateCreated() {
        return this.dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public String getDatasetId() {
        return this.datasetId;
    }

    public void setDatasetId(String datasetId) {
        this.datasetId = datasetId;
    }

    public Integer getDuration() {
        return this.duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public String getMeasure() {
        return this.measure;
    }

    public void setMeasure(String measure) {
        this.measure = measure;
    }

    public AlertValues getValues() {
        return this.values;
    }

    public void setValues(AlertValues values) {
        this.values = values;
    }

    @Override
    public String toString() {
        return "{" +
            " name='" + getName() + "'" +
            ", dateCreated='" + getDateCreated() + "'" +
            ", duration='" + getDuration() + "'" +
            ", measure='" + getMeasure() + "'" +
            ", values='" + getValues().toString() + "'" +
            "}";
    }

}