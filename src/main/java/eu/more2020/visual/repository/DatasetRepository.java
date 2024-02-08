package eu.more2020.visual.repository;
import eu.more2020.visual.domain.DbColumns;
import eu.more2020.visual.domain.DbConnector;
import eu.more2020.visual.domain.SchemaInfo;
import eu.more2020.visual.domain.SchemaMeta;
import eu.more2020.visual.domain.Sample;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
import eu.more2020.visual.middleware.domain.DatabaseConnection;
import eu.more2020.visual.middleware.domain.Dataset.AbstractDataset;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

/**
 * Repository for the Dataset entity.
 */
@SuppressWarnings("unused")
public interface DatasetRepository {

    String DATASETS_CACHE = "datasets";

    List<AbstractDataset> findAll();

    List<Object[]> findSample(String id, QueryExecutor queryExecutor) throws SQLException;
    
    Optional<SchemaMeta> findSchema (DatabaseConnection connection, String schema, QueryExecutor queryExecutor) throws SQLException, IOException;

    Optional<SchemaMeta> findUserStudySchema(String schema) throws IOException;

    @Cacheable(cacheNames = DATASETS_CACHE)
    Optional<AbstractDataset> findById(String id, String schema, DatabaseConnection databaseConnection) throws IOException, SQLException;

    AbstractDataset save(AbstractDataset dataset) throws IOException;
    
    String getSchemaType();

    SchemaInfo updateSchemaInfo(SchemaInfo info);

    SchemaInfo updateSchemaInfoColumns(String id, DbColumns dbColumns);

    void deleteById(String id);

    void deleteAll();

    List<String> getColumnNames(String id, QueryExecutor queryExecutor);

}