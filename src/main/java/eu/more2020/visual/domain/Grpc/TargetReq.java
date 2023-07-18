package eu.more2020.visual.domain.Grpc;

import java.io.Serializable;

public class TargetReq implements Serializable {

    private String name;
    private String id;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public TargetReq(String name, String id) {
        this.name = name;
        this.id = id;
    }

    public TargetReq() {
    }

}
