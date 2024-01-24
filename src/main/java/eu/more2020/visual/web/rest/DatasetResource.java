package eu.more2020.visual.web.rest;

import eu.more2020.visual.domain.*;
import eu.more2020.visual.middleware.datasource.QueryExecutor.QueryExecutor;
import eu.more2020.visual.middleware.domain.*;
import eu.more2020.visual.middleware.domain.Dataset.CsvDataset;
import eu.more2020.visual.middleware.domain.InfluxDB.InfluxDBConnection;
import eu.more2020.visual.middleware.domain.PostgreSQL.JDBCConnection;
import eu.more2020.visual.middleware.domain.Dataset.AbstractDataset;
import eu.more2020.visual.middleware.domain.Query.Query;
import eu.more2020.visual.repository.AlertRepository;
import eu.more2020.visual.repository.DatasetRepository;
import eu.more2020.visual.repository.FileHandlingRepository;
import eu.more2020.visual.service.CsvDataService;
import eu.more2020.visual.service.DataService;
import eu.more2020.visual.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link AbstractDataset}.
 */
@RestController
@RequestMapping("/api")
public class DatasetResource {
    private static final String ENTITY_NAME = "dataset";
    private final Logger log = LoggerFactory.getLogger(DatasetResource.class);
    private final DatasetRepository datasetRepository;
    private final DataService dataService;
    private final CsvDataService csvDataService;

    //db conncetion
    private DatabaseConnection databaseConnection;

    private final FileHandlingRepository fileHandlingRepository;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Value("${application.workspacePath}")
    private String workspacePath;

    public DatasetResource(DatasetRepository datasetRepository,
                           AlertRepository alertRepository,
                           CsvDataService csvDataService,
                           DataService dataService, FileHandlingRepository fileHandlingRepository) {
        this.datasetRepository = datasetRepository;
        this.csvDataService = csvDataService;
        this.dataService = dataService;
        this.fileHandlingRepository = fileHandlingRepository;
    }

    /**
     * {@code POST  /datasets} : Create a new dataset.
     *
     * @param dataset the dataset to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dataset, or with status {@code 400 (Bad Request)} if the dataset has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/datasets")
    public ResponseEntity<AbstractDataset> createDataset(@Valid @RequestBody AbstractDataset dataset) throws URISyntaxException, IOException {
        log.debug("REST request to save Dataset : {}", dataset);
        if (dataset.getId() != null) {
            throw new BadRequestAlertException("A new dataset cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AbstractDataset result = datasetRepository.save(dataset);
        return ResponseEntity.created(new URI("/api/datasets/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /datasets} : Updates an existing dataset.
     *
     * @param dataset the dataset to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated dataset,
     * or with status {@code 400 (Bad Request)} if the dataset is not valid,
     * or with status {@code 500 (Internal Server Error)} if the dataset couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/datasets")
    public ResponseEntity<AbstractDataset> updateDataset(@Valid @RequestBody AbstractDataset dataset) throws URISyntaxException, IOException {
        log.debug("REST request to update Dataset : {}", dataset);
        if (dataset.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AbstractDataset result = datasetRepository.save(dataset);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, dataset.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /datasets} : get all the datasets.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of datasets in body.
     */
    @GetMapping("/datasets")
    public List<AbstractDataset> getAllDatasets() {
        log.debug("REST request to get all Datasets");
        return datasetRepository.findAll();
    }

    /**
     * {@code GET  /datasets/:id} : get the "id" dataset.
     * @param schema the name of the schema
     * @param id the id of the dataset to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dataset, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/datasets/{schemaName}/{id}")
    public ResponseEntity<AbstractDataset> getDataset(@PathVariable String schemaName, @PathVariable String id) throws IOException, SQLException {
        log.debug("REST request to get Dataset : {}/{}", schemaName, id);
        Optional<AbstractDataset> dataset = null;
        if (datasetRepository.getSchemaType() == null)
            dataset = datasetRepository.findById(id, schemaName);
        else{
            QueryExecutor queryExecutor = databaseConnection.getQueryExecutor();
            dataset = datasetRepository.findDBDatasetById(id, queryExecutor);
        }
        log.debug(dataset.toString());
        return ResponseUtil.wrapOrNotFound(dataset);
    }

    @GetMapping("/datasets/{schema}")
    public ResponseEntity<SchemaMeta> getSchema(@PathVariable String schemaName) throws IOException {
        log.debug("REST request to get schema metadata");
        return ResponseUtil.wrapOrNotFound(datasetRepository.findSchema(schemaName));
    }

    @PutMapping("/datasets/{schema}")
    public ResponseEntity<SchemaInfo> updateSchemaInfo(@PathVariable String schemaName, @Valid @RequestBody SchemaInfo info) throws IOException {
        log.debug("REST request to update info dataset metadata");
        SchemaInfo result = datasetRepository.updateSchemaInfo(info);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, result.toString()))
            .body(result);
    }

    @GetMapping("/datasets/directories")
    public List<String> getDirectories() throws IOException {
        log.debug("REST request to get Directories");
        return datasetRepository.findDirectories();
    }

    /**
     * {@code DELETE  /datasets/:id} : delete the "id" dataset.
     *
     * @param id the id of the dataset to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/datasets/{id}")
    public ResponseEntity<Void> deleteDataset(@PathVariable String id) {
        log.debug("REST request to delete Dataset : {}", id);
        datasetRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * POST executeQuery
     */
    @PostMapping("/datasets/{schemaName}/{id}/query")
    public ResponseEntity<QueryResults> executeQuery(@PathVariable String schemaName, @PathVariable String id, @Valid @RequestBody Query query) throws IOException, SQLException {
        log.debug("REST request to execute Query: {}", query);
        Optional<QueryResults> queryResultsOptional = null;
        if (datasetRepository.getSchemaType() == null)
            queryResultsOptional =
                datasetRepository.findById(id, schemaName).map(dataset -> {
                        return csvDataService.executeQuery((CsvDataset) dataset, query);
                    });
        else {
            QueryExecutor queryExecutor = databaseConnection.getQueryExecutor();
            queryResultsOptional =  datasetRepository.findDBDatasetById(id, queryExecutor).map(dataset -> {
                return dataService.executeQuery(databaseConnection.getQueryExecutor(dataset), dataset, query);
            });
        }
        return ResponseUtil.wrapOrNotFound(queryResultsOptional);
    }



    @PostMapping("/files/upload/{schemaName}")
    public ResponseEntity<SchemaMeta> saveUploadedFile (@PathVariable String schemaName, @RequestParam("files") MultipartFile[] files) throws URISyntaxException, IOException {
    log.debug("Rest request to save uploaded file to {} schema", schemaName);
    try {
      List<String> fileNames = new ArrayList<>();
      Arrays.asList(files).stream().forEach(file -> {
        fileHandlingRepository.saveFile(schemaName, file, null);
        fileNames.add(file.getOriginalFilename());
      });
      log.debug("Uploaded the files successfully: {}", fileNames);
      return ResponseUtil.wrapOrNotFound(datasetRepository.findSchema(schemaName));
    } catch (Exception e) {
      log.debug("Fail to upload files!");
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    }

    @PostMapping("/files/upload/schema")
    public ResponseEntity<SchemaMeta> createNewSchema (@RequestParam("meta") String metaInfo, @RequestParam("files") MultipartFile[] files) throws URISyntaxException, IOException {
    ObjectMapper ob = new ObjectMapper();
    SchemaMeta m = ob.readValue(metaInfo, SchemaMeta.class);
    log.debug("Rest request to save schema with name {}", m.getName());
    try {
      fileHandlingRepository.saveSchema(m, files);
      return ResponseUtil.wrapOrNotFound(datasetRepository.findSchema(m.getName()));
    } catch (Exception e) {
      log.debug("Fail to upload files! {}", e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    }

    @PostMapping("/files/upload/dataset")
    public ResponseEntity<SchemaMeta> uploadDataset (@RequestParam("meta") String metaInfo, @RequestParam("schemaName") String schemaName, @RequestParam("file") MultipartFile file) throws URISyntaxException, IOException {
    ObjectMapper ob = new ObjectMapper();
    SchemaInfo m = ob.readValue(metaInfo, SchemaInfo.class);
    log.debug("Rest request to save dataset with name {}", m.getName());
    try {
      fileHandlingRepository.uploadDataset(m, file, schemaName);
      return ResponseUtil.wrapOrNotFound(datasetRepository.findSchema(schemaName));
    } catch (Exception e) {
      log.debug("Fail to upload files! {}", e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    }

    @PostMapping("/datasets/checkConnection")
    public ResponseEntity<String> checkConnection (@RequestBody DbConfig dbConfig) throws URISyntaxException, IOException {
    log.debug("Rest request to connect to DB with url {} and port {}", dbConfig.getUrl(), dbConfig.getPort());
      return datasetRepository.checkConnection(dbConfig.getUrl(), dbConfig.getPort());
    }

    @PostMapping("/database/connect") 
    public ResponseEntity<Boolean> connector(@RequestBody DbConnector dbConnector) throws SQLException {
        log.debug("Rest request to connect to db");
        log.debug(dbConnector.toString());
        String url = null;
        switch (dbConnector.getType()) {
            case "postgres":
                url = "jdbc:postgresql://" + dbConnector.getHost() + ":" + dbConnector.getPort() + "/" + dbConnector.getDatabase();
                databaseConnection = new JDBCConnection(url, dbConnector.getUsername(), dbConnector.getPassword());
                break;
            case "influx":
                url = "http://" + dbConnector.getHost() + ":" + dbConnector.getPort();
                databaseConnection = new InfluxDBConnection(url, dbConnector.getUsername(), dbConnector.getPassword(), dbConnector.getDatabase());
                break;
            default:
                break;
        }
        try {
            databaseConnection.connect();
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        } catch (Exception e) {
        return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/datasets/metadata/{database}/{schemaName}")
    public ResponseEntity<SchemaMeta> getDbMetadata(@PathVariable String database, @PathVariable String schemaName) throws SQLException {
        log.debug("Rest request to get db metadata from {} database with name {}", database, schemaName);
        SchemaMeta schemaMeta = new SchemaMeta();
        try {
            QueryExecutor queryExecutor = databaseConnection.getQueryExecutor();
            schemaMeta = datasetRepository.getDBMetadata(database, schemaName, queryExecutor);
            return new ResponseEntity<SchemaMeta>(schemaMeta, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/datasets/metadata/columns/{tableName}")
    public ResponseEntity<List<String>> getDBColumnNames(@PathVariable String tableName) throws SQLException {
        log.debug("Rest request to get column names form table {}", tableName);
        List<String> columnNames = new ArrayList<>();
        try {
            QueryExecutor queryExecutor = databaseConnection.getQueryExecutor();
            columnNames = queryExecutor.getColumns(tableName);
            return new ResponseEntity<List<String>>(columnNames, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/datasets/metadata/columns/{tableName}")
    public ResponseEntity<SchemaInfo> updateSchemaInfoColumnNames( @PathVariable String tableName, @Valid @RequestBody DbColumns dbColumns) {
        log.debug("Rest request to update columns of schemaInfo with id {} with columns {}", tableName, dbColumns.toString());
        if (tableName == null) {
            throw new BadRequestAlertException("Invalid tableName", ENTITY_NAME, "tableNameNull");
        }
        SchemaInfo result = datasetRepository.updateSchemaInfoColumns(tableName, dbColumns);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, result.toString()))
            .body(result);
    }


    @PostMapping("/database/disconnect")
    public ResponseEntity<Boolean> disconnector() throws SQLException {
        log.debug("Rest request to close connection");
        datasetRepository.deleteAll();
        if (datasetRepository.getSchemaType() != null)
            databaseConnection.closeConnection();
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
    }
}
