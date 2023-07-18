package eu.more2020.visual.web.rest;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eu.more2020.visual.domain.Grpc.AllResultsRes;
import eu.more2020.visual.domain.Grpc.InferenceRes;
import eu.more2020.visual.domain.Grpc.JobIdReq;
import eu.more2020.visual.domain.Grpc.ModelInfoReq;
import eu.more2020.visual.domain.Grpc.ProgressRes;
import eu.more2020.visual.domain.Grpc.ResultsRes;
import eu.more2020.visual.domain.Grpc.StatusRes;
import eu.more2020.visual.domain.Grpc.TargetReq;
import eu.more2020.visual.domain.Grpc.TimestampReq;
import eu.more2020.visual.domain.Grpc.TrainingInfoReq;
import eu.more2020.visual.service.grpc.AutoMLCallsImpl;

@RestController
@RequestMapping("/api")
public class GrpcResource {
    private final Logger log = LoggerFactory.getLogger(GrpcResource.class);
    private final AutoMLCallsImpl autoMLCallsImpl;

    public GrpcResource(AutoMLCallsImpl autoMLCallsImpl) {
        this.autoMLCallsImpl = autoMLCallsImpl;
    }

    @PostMapping("/grpc/train")
    public ResponseEntity<StatusRes> StartTraining(@RequestBody TrainingInfoReq info) throws IOException {
        log.debug("REST request to start training");
        return ResponseEntity.ok().body(autoMLCallsImpl.AutoMLStartTraining(info));
    }

    @PostMapping("/grpc/progress")
    public ResponseEntity<ProgressRes> GetProgress(@RequestBody JobIdReq jobid) throws IOException {
        log.debug("REST request to get progress of job with id: ", jobid.getId());
        return ResponseEntity.ok().body(autoMLCallsImpl.AutoMLGetProgress(jobid));
    }
    
    @PostMapping("/grpc/target")
    public ResponseEntity<ResultsRes> GetTargetResult(@RequestBody TargetReq target) throws IOException {
        log.debug("REST request to get results of job with id: ", target.getId());
        return ResponseEntity.ok().body(autoMLCallsImpl.AutoMLSpecificResults(target));
    }
    
    @PostMapping("/grpc/target/all")
    public ResponseEntity<AllResultsRes> GetAllTargetsResults(@RequestBody JobIdReq jobId) throws IOException {
        log.debug("REST request to get all results for job with id: ", jobId.getId());
        return ResponseEntity.ok().body(autoMLCallsImpl.AutoMLAllResults(jobId));
    }
    
    @PostMapping("/grpc/inference")
    public ResponseEntity<InferenceRes> GetInference(@RequestBody TimestampReq timestamp) throws IOException {
        log.debug("REST request to get inference of model: ", timestamp.getModel_name());
        return ResponseEntity.ok().body(autoMLCallsImpl.AutoMLInference(timestamp));
    }
    
    @PostMapping("/grpc/save")
    public ResponseEntity<StatusRes> SaveModel(@RequestBody ModelInfoReq modelInfo) throws IOException {
        log.debug("REST request to get all results for job with model name: ", modelInfo.getModel_name());
        return ResponseEntity.ok().body(autoMLCallsImpl.AutoMLSaveModel(modelInfo));
    }
}
