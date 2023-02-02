package eu.more2020.visual.web.rest;

import eu.more2020.visual.domain.*;
import eu.more2020.visual.domain.Detection.ChangepointDetection;
import eu.more2020.visual.domain.Detection.DeviationDetection;
import eu.more2020.visual.domain.Detection.RangeDetection;
import eu.more2020.visual.repository.AlertRepository;
import eu.more2020.visual.repository.DatasetRepository;
import eu.more2020.visual.repository.FileHandlingRepository;
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
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
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
    private final AlertRepository alertRepository;
    private final FileHandlingRepository fileHandlingRepository;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    @Value("${application.workspacePath}")
    private String workspacePath;

    public DatasetResource(DatasetRepository datasetRepository,
                           ToolsRepository toolsRepository,
                           CsvDataService csvDataService, ModelarDataService modelarDataService, 
                           IndexedModelarDataService indexedModelarDataService, AlertRepository alertRepository,
                           FileHandlingRepository fileHandlingRepository) {
        this.datasetRepository = datasetRepository;
        this.toolsRepository = toolsRepository;
        this.csvDataService = csvDataService;
        this.modelarDataService = modelarDataService;
        this.indexedModelarDataService = indexedModelarDataService;
        this.alertRepository = alertRepository;
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
    public ResponseEntity<FarmMeta> getFarm(@PathVariable String farmName) throws IOException {
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
                    return modelarDataService.executeQuery(dataset, query);
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

    @PostMapping("/tools/changepoint_detection")
    public ResponseEntity<List<Changepoint>> changepointDetection(@Valid @RequestBody ChangepointDetection changepoints) throws IOException {
        log.debug("CP for {}", changepoints);
        List<Changepoint> detectedChangepoints = toolsRepository.changepointDetection(changepoints);
        log.debug("Detected CP for {}", detectedChangepoints);

        return new ResponseEntity<>(detectedChangepoints, HttpStatus.OK);
    }

    @GetMapping("/tools/changepoint_detection/washes/{id}")
    public List<Changepoint> getManualChangepoints(@PathVariable String id) throws IOException {
        log.debug("REST request to get manual changepoints ");
        return toolsRepository.getManualChangepoints(id);
    }

    @PostMapping("/tools/forecasting/{id}")
    public List<DataPoint> forecast(@PathVariable String id) throws IOException {
        log.debug("REST request to get Forecast");
        return toolsRepository.forecasting(id);
    }

    @PostMapping("/tools/soiling")
    public List<DataPoint> soilingDetection(@Valid @RequestBody DeviationDetection deviationDetection) {
        return toolsRepository.soilingDetection(deviationDetection);
    }


    @PostMapping("/tools/yaw_misalignment")
    public List<DataPoint> yawMisalignmentDetection(@Valid @RequestBody RangeDetection yawMisalignmentDetection) {
        return toolsRepository.yawMisalignmentDetection(yawMisalignmentDetection);
    }

    @GetMapping("/alerts/{datasetId}")
    public List<Alert> getAlerts(@PathVariable String datasetId) throws IOException {
        log.debug("REST request to find alerts for {} dataset", datasetId);
        return alertRepository.getAlerts(datasetId);
    }

    @PostMapping("/alerts/add")
    public List<Alert> saveAlert(@Valid @RequestBody Alert alertInfo) throws IOException {
        log.debug("REST request to add alert with name: {}", alertInfo.getName());
        return alertRepository.saveAlert(alertInfo);
    }

    @PostMapping("/alerts/remove/{alertName}")
    public List<Alert> deleteAlert(@PathVariable String alertName) throws IOException {
        log.debug("REST request to remove alert with name: {}", alertName);
        return alertRepository.deleteAlert(alertName);
    }
    
    @PostMapping("/alerts/edit")
    public List<Alert> editAlert(@Valid @RequestBody Alert editedAlert) throws IOException {
        log.debug("REST request to edit alert with name: {}", editedAlert.getName());
        return alertRepository.editAlert(editedAlert);
    }

    @PostMapping("/files/upload/{farmName}")
    public ResponseEntity<FarmMeta> saveUploadedFile (@PathVariable String farmName, @RequestParam("files") MultipartFile[] files) throws URISyntaxException, IOException {
    log.debug("Rest request to save uploaded file to {} farm", farmName);
    try {
      List<String> fileNames = new ArrayList<>();
      Arrays.asList(files).stream().forEach(file -> {
        fileHandlingRepository.saveFile(farmName, file, null);
        fileNames.add(file.getOriginalFilename());
      });
      log.debug("Uploaded the files successfully: {}", fileNames);
      return ResponseUtil.wrapOrNotFound(datasetRepository.findFarm(farmName));
    } catch (Exception e) {
      log.debug("Fail to upload files!");
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    }
    
    @PostMapping("/files/upload/farm")
    public ResponseEntity<FarmMeta> createNewFarm (@RequestParam("meta") String metaInfo, @RequestParam("files") MultipartFile[] files) throws URISyntaxException, IOException {
    ObjectMapper ob = new ObjectMapper();
    FarmMeta m = ob.readValue(metaInfo, FarmMeta.class);
    log.debug("Rest request to save farm with name {}", m.getName());
    try {
      fileHandlingRepository.saveFarm(m, files);
      return ResponseUtil.wrapOrNotFound(datasetRepository.findFarm(m.getName()));
    } catch (Exception e) {
      log.debug("Fail to upload files! {}", e.getMessage());
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    }
}
