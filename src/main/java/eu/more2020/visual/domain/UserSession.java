package eu.more2020.visual.domain;

import eu.more2020.visual.middleware.domain.DatabaseConnection;

public class UserSession {
    private String sessionId;
    private DatabaseConnection databaseConnection;
    
    public String getSessionId() {
        return sessionId;
    }
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
    public DatabaseConnection getDatabaseConnection() {
        return databaseConnection;
    }
    public void setDatabaseConnection(DatabaseConnection databaseConnection) {
        this.databaseConnection = databaseConnection;
    }

    
    
}