package eu.more2020.visual.web.rest;

import eu.more2020.visual.domain.Alert;
import eu.more2020.visual.domain.Changepoint;
import eu.more2020.visual.domain.Detection.ChangepointDetection;
import eu.more2020.visual.domain.Detection.DeviationDetection;
import eu.more2020.visual.domain.Detection.PatternDetection;
import eu.more2020.visual.domain.Detection.RangeDetection;
import eu.more2020.visual.middleware.domain.ImmutableDataPoint;
import eu.more2020.visual.repository.AlertRepository;
import eu.more2020.visual.service.ToolsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ToolsResource {
    private final Logger log = LoggerFactory.getLogger(DatasetResource.class);
    private final ToolsService toolsRepository;
    private final AlertRepository alertRepository;

    public ToolsResource(ToolsService toolsRepository,
                         AlertRepository alertRepository) {
        this.toolsRepository = toolsRepository;

        this.alertRepository = alertRepository;
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
    public List<ImmutableDataPoint> forecast(@PathVariable String id) throws IOException {
        log.debug("REST request to get Forecast");
        return toolsRepository.forecasting(id);
    }

    @PostMapping("/tools/soiling")
    public List<ImmutableDataPoint> soilingDetection(@Valid @RequestBody DeviationDetection deviationDetection) {
        return toolsRepository.soilingDetection(deviationDetection);
    }

     @PostMapping("/tools/pattern")
     public List<Changepoint> patternDetection(@Valid @RequestBody PatternDetection patternDetection) {
         return toolsRepository.patternDetection(patternDetection);
     }


    @PostMapping("/tools/yaw_misalignment")
    public List<ImmutableDataPoint> yawMisalignmentDetection(@Valid @RequestBody RangeDetection yawMisalignmentDetection) {
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
}

