package eu.more2020.visual.domain;

public class DbConnector {
    String dbSystem;
    String host;
    String port;
    String username;
    String password;
    String database;
    
    public String getDbSystem() {
        return this.dbSystem;
    }

    public String getHost() {
        return this.host;
    }
    public String getPort() {
        return this.port;
    }
    public String getUsername() {
        return this.username;
    }
    public String getPassword() {
        return this.password;
    }

    public String getDatabase() {
        return this.database;
    }


    public DbConnector() {}

    public DbConnector(String dbSystem, String host, String port, String username, String password, String database) {
        this.dbSystem = dbSystem;
        this.host = host;
        this.port = port;
        this.username = username;
        this. password = password;
        this.database = database;
    }
}
