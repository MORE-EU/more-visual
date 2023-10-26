package eu.more2020.visual.domain;

public class DbConnector {
    String host;
    String port;
    String username;
    String password;
    
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


    public DbConnector() {}

    public DbConnector(String host, String port, String username, String password) {
        this.host = host;
        this.port = port;
        this.username = username;
        this. password = password;
    }
}
