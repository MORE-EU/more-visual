package eu.more2020.visual.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
@PropertySource("file:${application.dbSettings}")
public class MongoDBConfig extends AbstractMongoClientConfiguration {

    @Value("${mongo_uri}")
    private String mongoUri;
   
    @Value("${mongo_db_name}")
    private String mongoDBName;

    @Override
    protected String getDatabaseName() {
        return mongoDBName; // Specify your database name here
    }

    @Override
    public com.mongodb.client.MongoClient mongoClient() {
        return com.mongodb.client.MongoClients.create(mongoUri);
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoClient(), getDatabaseName());
    }
}