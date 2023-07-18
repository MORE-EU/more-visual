package eu.more2020.visual.service.grpc;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;

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
import eu.more2020.visual.grpc.AllResults;
import eu.more2020.visual.grpc.RouteGuideGrpc;
import eu.more2020.visual.grpc.Inference;
import eu.more2020.visual.grpc.JobID;
import eu.more2020.visual.grpc.ModelInfo;
import eu.more2020.visual.grpc.Progress;
import eu.more2020.visual.grpc.Results;
import eu.more2020.visual.grpc.TrainingInfo;
import eu.more2020.visual.grpc.Status;
import eu.more2020.visual.grpc.Target;
import eu.more2020.visual.grpc.Timestamp;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

@Service
public class AutoMLCallsImpl extends RouteGuideGrpc.RouteGuideImplBase {
    
    public StatusRes AutoMLStartTraining (TrainingInfoReq info) throws InvalidProtocolBufferException, JsonProcessingException {
        TrainingInfo request = TrainingInfo.newBuilder()
                .setId(info.getId())
                .setConfig(info.getConfig())
                .build();

        // Create a channel to connect to the target gRPC server
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        // Create a stub using the generated code and the channel
        RouteGuideGrpc.RouteGuideBlockingStub stub = RouteGuideGrpc.newBlockingStub(channel);

        // Invoke the remote method on the target server
        Status response = stub.startTraining(request);

        // Convert the response to JSON string
        String json = JsonFormat.printer().print(response);

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Deserialize the JSON string into a Response object
        StatusRes responseObject = objectMapper.readValue(json, StatusRes.class);

        // Shutdown the channel
        channel.shutdown();

        return responseObject;
    }
    
    public ProgressRes AutoMLGetProgress (JobIdReq jobId) throws InvalidProtocolBufferException, JsonProcessingException {
        JobID request = JobID.newBuilder()
                .setId(jobId.getId())
                .build();

        // Create a channel to connect to the target gRPC server
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        // Create a stub using the generated code and the channel
        RouteGuideGrpc.RouteGuideBlockingStub stub = RouteGuideGrpc.newBlockingStub(channel);

        // Invoke the remote method on the target server
        Progress response = stub.getProgress(request);

        // Convert the response to JSON string
        String json = JsonFormat.printer().print(response);

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Deserialize the JSON string into a Response object
        ProgressRes responseObject = objectMapper.readValue(json, ProgressRes.class);

        // Shutdown the channel
        channel.shutdown();

        return responseObject;
    }
    
    public ResultsRes AutoMLSpecificResults (TargetReq target) throws InvalidProtocolBufferException, JsonProcessingException {
        Target request = Target.newBuilder()
                .setId(target.getId())
                .setName(target.getName())
                .build();

        // Create a channel to connect to the target gRPC server
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        // Create a stub using the generated code and the channel
        RouteGuideGrpc.RouteGuideBlockingStub stub = RouteGuideGrpc.newBlockingStub(channel);

        // Invoke the remote method on the target server
        Results response = stub.getSpecificTargetResults(request);

        // Convert the response to JSON string
        String json = JsonFormat.printer().print(response);

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Deserialize the JSON string into a Response object
        ResultsRes responseObject = objectMapper.readValue(json, ResultsRes.class);

        // Shutdown the channel
        channel.shutdown();

        return responseObject;
    }
    
    public AllResultsRes AutoMLAllResults (JobIdReq jobId) throws InvalidProtocolBufferException, JsonProcessingException {
        JobID request = JobID.newBuilder()
                .setId(jobId.getId())
                .build();

        // Create a channel to connect to the target gRPC server
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        // Create a stub using the generated code and the channel
        RouteGuideGrpc.RouteGuideBlockingStub stub = RouteGuideGrpc.newBlockingStub(channel);

        // Invoke the remote method on the target server
        AllResults response = stub.getAllTargetsResults(request);

        // Convert the response to JSON string
        String json = JsonFormat.printer().print(response);

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Deserialize the JSON string into a Response object
        AllResultsRes responseObject = objectMapper.readValue(json, AllResultsRes.class);

        // Shutdown the channel
        channel.shutdown();

        return responseObject;
    }
    
    public InferenceRes AutoMLInference (TimestampReq timestamp) throws InvalidProtocolBufferException, JsonProcessingException {
        Timestamp request = Timestamp.newBuilder()
                .setTimestamp(timestamp.getTimestamp())
                .setModelName(timestamp.getModel_name())
                .build();

        // Create a channel to connect to the target gRPC server
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        // Create a stub using the generated code and the channel
        RouteGuideGrpc.RouteGuideBlockingStub stub = RouteGuideGrpc.newBlockingStub(channel);

        // Invoke the remote method on the target server
        Inference response = stub.getInference(request);

        // Convert the response to JSON string
        String json = JsonFormat.printer().print(response);

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Deserialize the JSON string into a Response object
        InferenceRes responseObject = objectMapper.readValue(json, InferenceRes.class);

        // Shutdown the channel
        channel.shutdown();

        return responseObject;
    }
    
    public StatusRes AutoMLSaveModel (ModelInfoReq modelInfo) throws InvalidProtocolBufferException, JsonProcessingException {
        ModelInfo request = ModelInfo.newBuilder()
                .setModelType(modelInfo.getModel_type())
                .setModelName(modelInfo.getModel_name())
                .setTarget(modelInfo.getTarget())
                .build();

        // Create a channel to connect to the target gRPC server
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

        // Create a stub using the generated code and the channel
        RouteGuideGrpc.RouteGuideBlockingStub stub = RouteGuideGrpc.newBlockingStub(channel);

        // Invoke the remote method on the target server
        Status response = stub.saveModel(request);

        // Convert the response to JSON string
        String json = JsonFormat.printer().print(response);

        // Create an ObjectMapper
        ObjectMapper objectMapper = new ObjectMapper();

        // Deserialize the JSON string into a Response object
        StatusRes responseObject = objectMapper.readValue(json, StatusRes.class);

        // Shutdown the channel
        channel.shutdown();

        return responseObject;
    }
}