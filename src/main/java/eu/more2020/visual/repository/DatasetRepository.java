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

    List<Sample> findSample(String schemaName) throws IOException;

    List<Object[]> findDbSample(String tableName, QueryExecutor queryExecutor) throws SQLException;

    List<String> findDirectories() throws IOException;

    Optional<SchemaMeta> findSchema(String schema) throws IOException;

    @Cacheable(cacheNames = DATASETS_CACHE)
    Optional<AbstractDataset> findById(String id, String schemaName) throws IOException, SQLException;

    AbstractDataset save(AbstractDataset dataset) throws IOException;

    Optional<AbstractDataset> findDBDatasetById(String id, QueryExecutor queryExecutor) throws SQLException;

    SchemaMeta getDBMetadata (String database, String schema, QueryExecutor queryExecutor) throws SQLException;
    
    String getSchemaType();

    SchemaInfo updateSchemaInfoColumns(String id, DbColumns columns);

    SchemaInfo updateSchemaInfo(SchemaInfo info);

    void deleteById(String id);

    void deleteAll();

}