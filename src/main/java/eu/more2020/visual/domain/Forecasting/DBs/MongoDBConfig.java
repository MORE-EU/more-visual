package eu.more2020.visual.domain.Forecasting.DBs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MongoDBConfig {

    @Value("mongodb://admin:password@localhost:27017/admin")
    private String connectionString;

    @Value("more")
    private String databaseName;

    @Value("user")
    private String userName;

    @Value("password")
    private String password;

    public MongoDBConfig() {
    }

    public String getConnectionString() {
        return connectionString;
    }

    public void setConnectionString(String connectionString) {
        this.connectionString = connectionString;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
