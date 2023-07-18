package eu.more2020.visual.grpc;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.42.1)",
    comments = "Source: helloworld.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class RouteGuideGrpc {

  private RouteGuideGrpc() {}

  public static final String SERVICE_NAME = "eu.more2020.visual.grpc.RouteGuide";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.TrainingInfo,
      eu.more2020.visual.grpc.Status> getStartTrainingMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "StartTraining",
      requestType = eu.more2020.visual.grpc.TrainingInfo.class,
      responseType = eu.more2020.visual.grpc.Status.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.TrainingInfo,
      eu.more2020.visual.grpc.Status> getStartTrainingMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.TrainingInfo, eu.more2020.visual.grpc.Status> getStartTrainingMethod;
    if ((getStartTrainingMethod = RouteGuideGrpc.getStartTrainingMethod) == null) {
      synchronized (RouteGuideGrpc.class) {
        if ((getStartTrainingMethod = RouteGuideGrpc.getStartTrainingMethod) == null) {
          RouteGuideGrpc.getStartTrainingMethod = getStartTrainingMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.TrainingInfo, eu.more2020.visual.grpc.Status>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "StartTraining"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.TrainingInfo.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.Status.getDefaultInstance()))
              .setSchemaDescriptor(new RouteGuideMethodDescriptorSupplier("StartTraining"))
              .build();
        }
      }
    }
    return getStartTrainingMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.JobID,
      eu.more2020.visual.grpc.Progress> getGetProgressMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetProgress",
      requestType = eu.more2020.visual.grpc.JobID.class,
      responseType = eu.more2020.visual.grpc.Progress.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.JobID,
      eu.more2020.visual.grpc.Progress> getGetProgressMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.JobID, eu.more2020.visual.grpc.Progress> getGetProgressMethod;
    if ((getGetProgressMethod = RouteGuideGrpc.getGetProgressMethod) == null) {
      synchronized (RouteGuideGrpc.class) {
        if ((getGetProgressMethod = RouteGuideGrpc.getGetProgressMethod) == null) {
          RouteGuideGrpc.getGetProgressMethod = getGetProgressMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.JobID, eu.more2020.visual.grpc.Progress>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetProgress"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.JobID.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.Progress.getDefaultInstance()))
              .setSchemaDescriptor(new RouteGuideMethodDescriptorSupplier("GetProgress"))
              .build();
        }
      }
    }
    return getGetProgressMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.Target,
      eu.more2020.visual.grpc.Results> getGetSpecificTargetResultsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetSpecificTargetResults",
      requestType = eu.more2020.visual.grpc.Target.class,
      responseType = eu.more2020.visual.grpc.Results.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.Target,
      eu.more2020.visual.grpc.Results> getGetSpecificTargetResultsMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.Target, eu.more2020.visual.grpc.Results> getGetSpecificTargetResultsMethod;
    if ((getGetSpecificTargetResultsMethod = RouteGuideGrpc.getGetSpecificTargetResultsMethod) == null) {
      synchronized (RouteGuideGrpc.class) {
        if ((getGetSpecificTargetResultsMethod = RouteGuideGrpc.getGetSpecificTargetResultsMethod) == null) {
          RouteGuideGrpc.getGetSpecificTargetResultsMethod = getGetSpecificTargetResultsMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.Target, eu.more2020.visual.grpc.Results>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetSpecificTargetResults"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.Target.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.Results.getDefaultInstance()))
              .setSchemaDescriptor(new RouteGuideMethodDescriptorSupplier("GetSpecificTargetResults"))
              .build();
        }
      }
    }
    return getGetSpecificTargetResultsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.JobID,
      eu.more2020.visual.grpc.AllResults> getGetAllTargetsResultsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetAllTargetsResults",
      requestType = eu.more2020.visual.grpc.JobID.class,
      responseType = eu.more2020.visual.grpc.AllResults.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.JobID,
      eu.more2020.visual.grpc.AllResults> getGetAllTargetsResultsMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.JobID, eu.more2020.visual.grpc.AllResults> getGetAllTargetsResultsMethod;
    if ((getGetAllTargetsResultsMethod = RouteGuideGrpc.getGetAllTargetsResultsMethod) == null) {
      synchronized (RouteGuideGrpc.class) {
        if ((getGetAllTargetsResultsMethod = RouteGuideGrpc.getGetAllTargetsResultsMethod) == null) {
          RouteGuideGrpc.getGetAllTargetsResultsMethod = getGetAllTargetsResultsMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.JobID, eu.more2020.visual.grpc.AllResults>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetAllTargetsResults"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.JobID.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.AllResults.getDefaultInstance()))
              .setSchemaDescriptor(new RouteGuideMethodDescriptorSupplier("GetAllTargetsResults"))
              .build();
        }
      }
    }
    return getGetAllTargetsResultsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.Timestamp,
      eu.more2020.visual.grpc.Inference> getGetInferenceMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetInference",
      requestType = eu.more2020.visual.grpc.Timestamp.class,
      responseType = eu.more2020.visual.grpc.Inference.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.Timestamp,
      eu.more2020.visual.grpc.Inference> getGetInferenceMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.Timestamp, eu.more2020.visual.grpc.Inference> getGetInferenceMethod;
    if ((getGetInferenceMethod = RouteGuideGrpc.getGetInferenceMethod) == null) {
      synchronized (RouteGuideGrpc.class) {
        if ((getGetInferenceMethod = RouteGuideGrpc.getGetInferenceMethod) == null) {
          RouteGuideGrpc.getGetInferenceMethod = getGetInferenceMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.Timestamp, eu.more2020.visual.grpc.Inference>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetInference"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.Timestamp.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.Inference.getDefaultInstance()))
              .setSchemaDescriptor(new RouteGuideMethodDescriptorSupplier("GetInference"))
              .build();
        }
      }
    }
    return getGetInferenceMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.ModelInfo,
      eu.more2020.visual.grpc.Status> getSaveModelMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "SaveModel",
      requestType = eu.more2020.visual.grpc.ModelInfo.class,
      responseType = eu.more2020.visual.grpc.Status.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.ModelInfo,
      eu.more2020.visual.grpc.Status> getSaveModelMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.ModelInfo, eu.more2020.visual.grpc.Status> getSaveModelMethod;
    if ((getSaveModelMethod = RouteGuideGrpc.getSaveModelMethod) == null) {
      synchronized (RouteGuideGrpc.class) {
        if ((getSaveModelMethod = RouteGuideGrpc.getSaveModelMethod) == null) {
          RouteGuideGrpc.getSaveModelMethod = getSaveModelMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.ModelInfo, eu.more2020.visual.grpc.Status>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "SaveModel"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.ModelInfo.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.Status.getDefaultInstance()))
              .setSchemaDescriptor(new RouteGuideMethodDescriptorSupplier("SaveModel"))
              .build();
        }
      }
    }
    return getSaveModelMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static RouteGuideStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<RouteGuideStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<RouteGuideStub>() {
        @java.lang.Override
        public RouteGuideStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new RouteGuideStub(channel, callOptions);
        }
      };
    return RouteGuideStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static RouteGuideBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<RouteGuideBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<RouteGuideBlockingStub>() {
        @java.lang.Override
        public RouteGuideBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new RouteGuideBlockingStub(channel, callOptions);
        }
      };
    return RouteGuideBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static RouteGuideFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<RouteGuideFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<RouteGuideFutureStub>() {
        @java.lang.Override
        public RouteGuideFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new RouteGuideFutureStub(channel, callOptions);
        }
      };
    return RouteGuideFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class RouteGuideImplBase implements io.grpc.BindableService {

    /**
     * <pre>
     * Start training a model
     * Return: Start of training job
     * </pre>
     */
    public void startTraining(eu.more2020.visual.grpc.TrainingInfo request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Status> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getStartTrainingMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get progress for a specific job 
     * Return: If the job is running, if it is done, or if it has not started yet
     * </pre>
     */
    public void getProgress(eu.more2020.visual.grpc.JobID request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Progress> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetProgressMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get results for a specific target of a job
     * Return: Model evaluation metrics and predictions for the selected target
     * </pre>
     */
    public void getSpecificTargetResults(eu.more2020.visual.grpc.Target request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Results> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetSpecificTargetResultsMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get results for all targets of a job
     * Return: Model evaluation metrics and predictions for all targets
     * </pre>
     */
    public void getAllTargetsResults(eu.more2020.visual.grpc.JobID request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.AllResults> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetAllTargetsResultsMethod(), responseObserver);
    }

    /**
     * <pre>
     * Get inference for a specific timestamp and model
     * Return: Predictions for a specific timestamp
     * </pre>
     */
    public void getInference(eu.more2020.visual.grpc.Timestamp request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Inference> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetInferenceMethod(), responseObserver);
    }

    /**
     * <pre>
     * Save the desired model given the algorithm and the target
     * Return: If information was saved successfully
     * </pre>
     */
    public void saveModel(eu.more2020.visual.grpc.ModelInfo request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Status> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getSaveModelMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getStartTrainingMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.TrainingInfo,
                eu.more2020.visual.grpc.Status>(
                  this, METHODID_START_TRAINING)))
          .addMethod(
            getGetProgressMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.JobID,
                eu.more2020.visual.grpc.Progress>(
                  this, METHODID_GET_PROGRESS)))
          .addMethod(
            getGetSpecificTargetResultsMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.Target,
                eu.more2020.visual.grpc.Results>(
                  this, METHODID_GET_SPECIFIC_TARGET_RESULTS)))
          .addMethod(
            getGetAllTargetsResultsMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.JobID,
                eu.more2020.visual.grpc.AllResults>(
                  this, METHODID_GET_ALL_TARGETS_RESULTS)))
          .addMethod(
            getGetInferenceMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.Timestamp,
                eu.more2020.visual.grpc.Inference>(
                  this, METHODID_GET_INFERENCE)))
          .addMethod(
            getSaveModelMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.ModelInfo,
                eu.more2020.visual.grpc.Status>(
                  this, METHODID_SAVE_MODEL)))
          .build();
    }
  }

  /**
   */
  public static final class RouteGuideStub extends io.grpc.stub.AbstractAsyncStub<RouteGuideStub> {
    private RouteGuideStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected RouteGuideStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new RouteGuideStub(channel, callOptions);
    }

    /**
     * <pre>
     * Start training a model
     * Return: Start of training job
     * </pre>
     */
    public void startTraining(eu.more2020.visual.grpc.TrainingInfo request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Status> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getStartTrainingMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get progress for a specific job 
     * Return: If the job is running, if it is done, or if it has not started yet
     * </pre>
     */
    public void getProgress(eu.more2020.visual.grpc.JobID request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Progress> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetProgressMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get results for a specific target of a job
     * Return: Model evaluation metrics and predictions for the selected target
     * </pre>
     */
    public void getSpecificTargetResults(eu.more2020.visual.grpc.Target request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Results> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetSpecificTargetResultsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get results for all targets of a job
     * Return: Model evaluation metrics and predictions for all targets
     * </pre>
     */
    public void getAllTargetsResults(eu.more2020.visual.grpc.JobID request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.AllResults> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetAllTargetsResultsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Get inference for a specific timestamp and model
     * Return: Predictions for a specific timestamp
     * </pre>
     */
    public void getInference(eu.more2020.visual.grpc.Timestamp request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Inference> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetInferenceMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Save the desired model given the algorithm and the target
     * Return: If information was saved successfully
     * </pre>
     */
    public void saveModel(eu.more2020.visual.grpc.ModelInfo request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Status> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getSaveModelMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class RouteGuideBlockingStub extends io.grpc.stub.AbstractBlockingStub<RouteGuideBlockingStub> {
    private RouteGuideBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected RouteGuideBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new RouteGuideBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Start training a model
     * Return: Start of training job
     * </pre>
     */
    public eu.more2020.visual.grpc.Status startTraining(eu.more2020.visual.grpc.TrainingInfo request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getStartTrainingMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get progress for a specific job 
     * Return: If the job is running, if it is done, or if it has not started yet
     * </pre>
     */
    public eu.more2020.visual.grpc.Progress getProgress(eu.more2020.visual.grpc.JobID request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetProgressMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get results for a specific target of a job
     * Return: Model evaluation metrics and predictions for the selected target
     * </pre>
     */
    public eu.more2020.visual.grpc.Results getSpecificTargetResults(eu.more2020.visual.grpc.Target request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetSpecificTargetResultsMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get results for all targets of a job
     * Return: Model evaluation metrics and predictions for all targets
     * </pre>
     */
    public eu.more2020.visual.grpc.AllResults getAllTargetsResults(eu.more2020.visual.grpc.JobID request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetAllTargetsResultsMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Get inference for a specific timestamp and model
     * Return: Predictions for a specific timestamp
     * </pre>
     */
    public eu.more2020.visual.grpc.Inference getInference(eu.more2020.visual.grpc.Timestamp request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetInferenceMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Save the desired model given the algorithm and the target
     * Return: If information was saved successfully
     * </pre>
     */
    public eu.more2020.visual.grpc.Status saveModel(eu.more2020.visual.grpc.ModelInfo request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getSaveModelMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class RouteGuideFutureStub extends io.grpc.stub.AbstractFutureStub<RouteGuideFutureStub> {
    private RouteGuideFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected RouteGuideFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new RouteGuideFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Start training a model
     * Return: Start of training job
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.Status> startTraining(
        eu.more2020.visual.grpc.TrainingInfo request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getStartTrainingMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get progress for a specific job 
     * Return: If the job is running, if it is done, or if it has not started yet
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.Progress> getProgress(
        eu.more2020.visual.grpc.JobID request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetProgressMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get results for a specific target of a job
     * Return: Model evaluation metrics and predictions for the selected target
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.Results> getSpecificTargetResults(
        eu.more2020.visual.grpc.Target request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetSpecificTargetResultsMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get results for all targets of a job
     * Return: Model evaluation metrics and predictions for all targets
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.AllResults> getAllTargetsResults(
        eu.more2020.visual.grpc.JobID request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetAllTargetsResultsMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Get inference for a specific timestamp and model
     * Return: Predictions for a specific timestamp
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.Inference> getInference(
        eu.more2020.visual.grpc.Timestamp request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetInferenceMethod(), getCallOptions()), request);
    }

    /**
     * <pre>
     * Save the desired model given the algorithm and the target
     * Return: If information was saved successfully
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.Status> saveModel(
        eu.more2020.visual.grpc.ModelInfo request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getSaveModelMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_START_TRAINING = 0;
  private static final int METHODID_GET_PROGRESS = 1;
  private static final int METHODID_GET_SPECIFIC_TARGET_RESULTS = 2;
  private static final int METHODID_GET_ALL_TARGETS_RESULTS = 3;
  private static final int METHODID_GET_INFERENCE = 4;
  private static final int METHODID_SAVE_MODEL = 5;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final RouteGuideImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(RouteGuideImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_START_TRAINING:
          serviceImpl.startTraining((eu.more2020.visual.grpc.TrainingInfo) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Status>) responseObserver);
          break;
        case METHODID_GET_PROGRESS:
          serviceImpl.getProgress((eu.more2020.visual.grpc.JobID) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Progress>) responseObserver);
          break;
        case METHODID_GET_SPECIFIC_TARGET_RESULTS:
          serviceImpl.getSpecificTargetResults((eu.more2020.visual.grpc.Target) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Results>) responseObserver);
          break;
        case METHODID_GET_ALL_TARGETS_RESULTS:
          serviceImpl.getAllTargetsResults((eu.more2020.visual.grpc.JobID) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.AllResults>) responseObserver);
          break;
        case METHODID_GET_INFERENCE:
          serviceImpl.getInference((eu.more2020.visual.grpc.Timestamp) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Inference>) responseObserver);
          break;
        case METHODID_SAVE_MODEL:
          serviceImpl.saveModel((eu.more2020.visual.grpc.ModelInfo) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.Status>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  private static abstract class RouteGuideBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    RouteGuideBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return eu.more2020.visual.grpc.GrpcProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("RouteGuide");
    }
  }

  private static final class RouteGuideFileDescriptorSupplier
      extends RouteGuideBaseDescriptorSupplier {
    RouteGuideFileDescriptorSupplier() {}
  }

  private static final class RouteGuideMethodDescriptorSupplier
      extends RouteGuideBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    RouteGuideMethodDescriptorSupplier(String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (RouteGuideGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new RouteGuideFileDescriptorSupplier())
              .addMethod(getStartTrainingMethod())
              .addMethod(getGetProgressMethod())
              .addMethod(getGetSpecificTargetResultsMethod())
              .addMethod(getGetAllTargetsResultsMethod())
              .addMethod(getGetInferenceMethod())
              .addMethod(getSaveModelMethod())
              .build();
        }
      }
    }
    return result;
  }
}
