package eu.more2020.visual.repository;
import eu.more2020.visual.domain.DbColumns;
import eu.more2020.visual.domain.DbConnector;
import eu.more2020.visual.domain.SchemaInfo;
import eu.more2020.visual.domain.SchemaMeta;
import eu.more2020.visual.domain.Sample;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
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

    ResponseEntity<String> checkConnection(String url, String port) throws IOException;

    List<AbstractDataset> findAll();

    List<Object[]> findSample(String tableName, QueryExecutor queryExecutor) throws SQLException;

    List<String> findDirectories() throws IOException;

    Optional<SchemaMeta> findSchema(String schema) throws IOException;

    @Cacheable(cacheNames = DATASETS_CACHE)
    Optional<AbstractDataset> findById(String id, String schemaName, QueryExecutor queryExecutor) throws IOException, SQLException;

    AbstractDataset save(AbstractDataset dataset) throws IOException;

    SchemaMeta getSchemaMetadata (String database, String schema, QueryExecutor queryExecutor) throws SQLException;
    
    String getSchemaType();

    SchemaInfo updateSchemaInfo(SchemaInfo info);

    SchemaInfo updateSchemaInfoColumns(String id, DbColumns dbColumns);

    void deleteById(String id);

    void deleteAll();

    List<String> getColumnNames(String tableName, QueryExecutor queryExecutor);

}