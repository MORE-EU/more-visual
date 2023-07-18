package eu.more2020.visual.domain.Grpc;

import java.io.Serializable;

public class JobIdReq implements Serializable {
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
}
