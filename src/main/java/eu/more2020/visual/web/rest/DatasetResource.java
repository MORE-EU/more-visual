package eu.more2020.visual.web.rest;

import eu.more2020.visual.domain.*;
import eu.more2020.visual.repository.DatasetRepository;
import eu.more2020.visual.repository.ToolsRepository;
import eu.more2020.visual.service.CsvDataService;
import eu.more2020.visual.service.IndexedModelarDataService;
import eu.more2020.visual.service.ModelarDataService;
import eu.more2020.visual.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link Dataset}.
 */
@RestController
@RequestMapping("/api")
public class DatasetResource {
    private static final String ENTITY_NAME = "dataset";
    private final Logger log = LoggerFactory.getLogger(DatasetResource.class);
    private final DatasetRepository datasetRepository;
    private final ToolsRepository toolsRepository;
    private final CsvDataService csvDataService;
    private final ModelarDataService modelarDataService;
    private final IndexedModelarDataService indexedModelarDataService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Value("${application.workspacePath}")
    private String workspacePath;

    public DatasetResource(DatasetRepository datasetRepository,
                           ToolsRepository toolsRepository,
                           CsvDataService csvDataService, ModelarDataService modelarDataService, IndexedModelarDataService indexedModelarDataService) {
        this.datasetRepository = datasetRepository;
        this.toolsRepository = toolsRepository;
        this.csvDataService = csvDataService;
        this.modelarDataService = modelarDataService;
        this.indexedModelarDataService = indexedModelarDataService;
    }

    /**
     * {@code POST  /datasets} : Create a new dataset.
     *
     * @param dataset the dataset to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new dataset, or with status {@code 400 (Bad Request)} if the dataset has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/datasets")
    public ResponseEntity<Dataset> createDataset(@Valid @RequestBody Dataset dataset) throws URISyntaxException, IOException {
        log.debug("REST request to save Dataset : {}", dataset);
        if (dataset.getId() != null) {
            throw new BadRequestAlertException("A new dataset cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Dataset result = datasetRepository.save(dataset);
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
    public ResponseEntity<Dataset> updateDataset(@Valid @RequestBody Dataset dataset) throws URISyntaxException, IOException {
        log.debug("REST request to update Dataset : {}", dataset);
        if (dataset.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dataset result = datasetRepository.save(dataset);
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
    public List<Dataset> getAllDatasets() throws IOException {
        log.debug("REST request to get all Datasets");
        return datasetRepository.findAll();
    }

    /**
     * {@code GET  /datasets/:id} : get the "id" dataset.
     * @param farmName the name of the farm
     * @param id the id of the dataset to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the dataset, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/datasets/{farmName}/{id}")
    public ResponseEntity<Dataset> getDataset(@PathVariable String farmName, @PathVariable String id) throws IOException {
        log.debug("REST request to get Dataset : {}/{}", farmName, id);
        Optional<Dataset> dataset = datasetRepository.findById(id, farmName);


        log.debug(dataset.toString());
        return ResponseUtil.wrapOrNotFound(dataset);
    }

    @GetMapping("/datasets/{farmName}")
    public ResponseEntity<Farm> getFarm(@PathVariable String farmName) throws IOException {
        log.debug("REST request to get farm metadata");
        return ResponseUtil.wrapOrNotFound(datasetRepository.findFarm(farmName));
    }

    @GetMapping("/datasets/{farmName}/sample")
    public List<Sample> getSample(@PathVariable String farmName) throws IOException {
        log.debug("REST request to get Sample File");
        return datasetRepository.findSample(farmName);
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
    @PostMapping("/datasets/{farmName}/{id}/query")
    public ResponseEntity<QueryResults> executeQuery(@PathVariable String farmName, @PathVariable String id, @Valid @RequestBody Query query) throws IOException {
        log.debug("REST request to execute Query: {}", query);
        Optional<QueryResults> queryResultsOptional;
            queryResultsOptional = datasetRepository.findById(id, farmName).map(dataset -> {
                if (dataset.getType().equals("modelar")) {
                try {
                    return indexedModelarDataService.executeQuery(dataset, query);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            } else {
                return csvDataService.executeQuery(dataset, query);
            }
        });
        // queryResultsOptional.ifPresent(queryResults -> log.debug(queryResults.toString()));
        return ResponseUtil.wrapOrNotFound(queryResultsOptional);
    }

    @PostMapping("/tools/cp_detection/{id}")
    public ResponseEntity<List<Changepoint>> changePointDetection(@PathVariable String id, @Valid @RequestBody ChangepointDetection changepoints) throws IOException {
        log.debug("CP for {}", changepoints);
        List<Changepoint> detectedChangepoints = toolsRepository.cpDetection(id, changepoints);
        log.debug("Detected CP for {}", detectedChangepoints);

        return new ResponseEntity<>(detectedChangepoints, HttpStatus.OK);
    }

    @GetMapping("/tools/cp_detection/washes/{id}")
    public List<Changepoint> getManualChangepoints(@PathVariable String id) throws IOException {
        log.debug("REST request to get manual changepoints ");
        return toolsRepository.getManualChangepoints(id);
    }

    @PostMapping("/tools/forecasting/{id}")
    public List<DataPoint> forecast(@PathVariable String id) throws IOException {
        log.debug("REST request to get Forecast");
        return toolsRepository.forecasting(id);
    }

//    @PostMapping("/tools/soiling/{folder}/{id}")
//    public List<String> soilingDetection(@PathVariable String folder, @PathVariable String id,
//                                            @Valid @RequestBody DeviationDetection deviationDetection) throws IOException {
//        List<String> extraMeasures = new ArrayList<>();
//        extraMeasures.add("soiling1");
//        extraMeasures.add("soiling2");
//        log.debug("REST request to apply Soiling Detection ");
//        String soilingPath =  toolsRepository.soilingDetection(id, deviationDetection);
//        datasetRepository.findById(id, folder).map(dataset -> {
//            try {
//                if (dataset.getType().equals("modelar")) {
//                    return null;
//                }
//                else {
//                    TimeseriesTreeIndex index = csvDataService.getIndex(folder, dataset);
//                    index.enhance(soilingPath, deviationDetection.getFrequency(), deviationDetection.getRange());
//                }
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//            return extraMeasures;
//        });
//        return extraMeasures;
//    }

    @PostMapping("/tools/soiling/{folder}/{id}")
    public List<DataPoint> soilingDetection(@PathVariable String folder, @PathVariable String id,
                                         @Valid @RequestBody DeviationDetection deviationDetection) {
        return toolsRepository.soilingDetection(id, deviationDetection);
    }

}
