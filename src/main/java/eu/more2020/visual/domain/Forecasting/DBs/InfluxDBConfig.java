package eu.more2020.visual.domain.Forecasting.DBs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class InfluxDBConfig {

    @Value("0ehmd5lRU3mlnfojqEBQLHksrCbw-rIwz34bLG0yebtYY4PBRazICAPKz7NodJxXHlV23RWKd8lI7q0irXt2wQ==")
    private String token;
    
    @Value("more")
    private String bucket;

    @Value("Athena")
    private String org;

    public String getToken() {
        return token;
    }

    public String getBucket() {
        return bucket;
    }

    public String getOrg() {
        return org;
    }

    public InfluxDBConfig() {
    }

}
