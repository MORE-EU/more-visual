package eu.more2020.visual.grpc.tools;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.42.1)",
    comments = "Source: tools.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class DataServiceGrpc {

  private DataServiceGrpc() {}

  public static final String SERVICE_NAME = "grpc.DataService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.GetDatasetDataRequest,
      eu.more2020.visual.grpc.tools.DatasetDataResponse> getGetDatasetDataMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetDatasetData",
      requestType = eu.more2020.visual.grpc.tools.GetDatasetDataRequest.class,
      responseType = eu.more2020.visual.grpc.tools.DatasetDataResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.GetDatasetDataRequest,
      eu.more2020.visual.grpc.tools.DatasetDataResponse> getGetDatasetDataMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.GetDatasetDataRequest, eu.more2020.visual.grpc.tools.DatasetDataResponse> getGetDatasetDataMethod;
    if ((getGetDatasetDataMethod = DataServiceGrpc.getGetDatasetDataMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getGetDatasetDataMethod = DataServiceGrpc.getGetDatasetDataMethod) == null) {
          DataServiceGrpc.getGetDatasetDataMethod = getGetDatasetDataMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.GetDatasetDataRequest, eu.more2020.visual.grpc.tools.DatasetDataResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetDatasetData"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.GetDatasetDataRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.DatasetDataResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("GetDatasetData"))
              .build();
        }
      }
    }
    return getGetDatasetDataMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.WashesRequest,
      eu.more2020.visual.grpc.tools.WashesResponse> getCheckWashesMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CheckWashes",
      requestType = eu.more2020.visual.grpc.tools.WashesRequest.class,
      responseType = eu.more2020.visual.grpc.tools.WashesResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.WashesRequest,
      eu.more2020.visual.grpc.tools.WashesResponse> getCheckWashesMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.WashesRequest, eu.more2020.visual.grpc.tools.WashesResponse> getCheckWashesMethod;
    if ((getCheckWashesMethod = DataServiceGrpc.getCheckWashesMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getCheckWashesMethod = DataServiceGrpc.getCheckWashesMethod) == null) {
          DataServiceGrpc.getCheckWashesMethod = getCheckWashesMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.WashesRequest, eu.more2020.visual.grpc.tools.WashesResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CheckWashes"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.WashesRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.WashesResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("CheckWashes"))
              .build();
        }
      }
    }
    return getCheckWashesMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.CPDetectionRequest,
      eu.more2020.visual.grpc.tools.CPDetectionResponse> getCPDetectionMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CPDetection",
      requestType = eu.more2020.visual.grpc.tools.CPDetectionRequest.class,
      responseType = eu.more2020.visual.grpc.tools.CPDetectionResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.CPDetectionRequest,
      eu.more2020.visual.grpc.tools.CPDetectionResponse> getCPDetectionMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.CPDetectionRequest, eu.more2020.visual.grpc.tools.CPDetectionResponse> getCPDetectionMethod;
    if ((getCPDetectionMethod = DataServiceGrpc.getCPDetectionMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getCPDetectionMethod = DataServiceGrpc.getCPDetectionMethod) == null) {
          DataServiceGrpc.getCPDetectionMethod = getCPDetectionMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.CPDetectionRequest, eu.more2020.visual.grpc.tools.CPDetectionResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CPDetection"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.CPDetectionRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.CPDetectionResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("CPDetection"))
              .build();
        }
      }
    }
    return getCPDetectionMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.ExtractRainsRequest,
      eu.more2020.visual.grpc.tools.ExtractRainsResponse> getExtractRainsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "ExtractRains",
      requestType = eu.more2020.visual.grpc.tools.ExtractRainsRequest.class,
      responseType = eu.more2020.visual.grpc.tools.ExtractRainsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.ExtractRainsRequest,
      eu.more2020.visual.grpc.tools.ExtractRainsResponse> getExtractRainsMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.ExtractRainsRequest, eu.more2020.visual.grpc.tools.ExtractRainsResponse> getExtractRainsMethod;
    if ((getExtractRainsMethod = DataServiceGrpc.getExtractRainsMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getExtractRainsMethod = DataServiceGrpc.getExtractRainsMethod) == null) {
          DataServiceGrpc.getExtractRainsMethod = getExtractRainsMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.ExtractRainsRequest, eu.more2020.visual.grpc.tools.ExtractRainsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "ExtractRains"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.ExtractRainsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.ExtractRainsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("ExtractRains"))
              .build();
        }
      }
    }
    return getExtractRainsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest,
      eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse> getCalculatePowerIndexMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "CalculatePowerIndex",
      requestType = eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest.class,
      responseType = eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest,
      eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse> getCalculatePowerIndexMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest, eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse> getCalculatePowerIndexMethod;
    if ((getCalculatePowerIndexMethod = DataServiceGrpc.getCalculatePowerIndexMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getCalculatePowerIndexMethod = DataServiceGrpc.getCalculatePowerIndexMethod) == null) {
          DataServiceGrpc.getCalculatePowerIndexMethod = getCalculatePowerIndexMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest, eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "CalculatePowerIndex"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("CalculatePowerIndex"))
              .build();
        }
      }
    }
    return getCalculatePowerIndexMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.ForecastingRequest,
      eu.more2020.visual.grpc.tools.ForecastingResponse> getForecastingMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "Forecasting",
      requestType = eu.more2020.visual.grpc.tools.ForecastingRequest.class,
      responseType = eu.more2020.visual.grpc.tools.ForecastingResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.ForecastingRequest,
      eu.more2020.visual.grpc.tools.ForecastingResponse> getForecastingMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.ForecastingRequest, eu.more2020.visual.grpc.tools.ForecastingResponse> getForecastingMethod;
    if ((getForecastingMethod = DataServiceGrpc.getForecastingMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getForecastingMethod = DataServiceGrpc.getForecastingMethod) == null) {
          DataServiceGrpc.getForecastingMethod = getForecastingMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.ForecastingRequest, eu.more2020.visual.grpc.tools.ForecastingResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "Forecasting"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.ForecastingRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.ForecastingResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("Forecasting"))
              .build();
        }
      }
    }
    return getForecastingMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest,
      eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse> getEstimateYawMisalignmentMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "EstimateYawMisalignment",
      requestType = eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest.class,
      responseType = eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest,
      eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse> getEstimateYawMisalignmentMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest, eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse> getEstimateYawMisalignmentMethod;
    if ((getEstimateYawMisalignmentMethod = DataServiceGrpc.getEstimateYawMisalignmentMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getEstimateYawMisalignmentMethod = DataServiceGrpc.getEstimateYawMisalignmentMethod) == null) {
          DataServiceGrpc.getEstimateYawMisalignmentMethod = getEstimateYawMisalignmentMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest, eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "EstimateYawMisalignment"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("EstimateYawMisalignment"))
              .build();
        }
      }
    }
    return getEstimateYawMisalignmentMethod;
  }

  private static volatile io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.FrechetCalculatorRequest,
      eu.more2020.visual.grpc.tools.FrechetCalculatorResponse> getFrechetCalculatorMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "FrechetCalculator",
      requestType = eu.more2020.visual.grpc.tools.FrechetCalculatorRequest.class,
      responseType = eu.more2020.visual.grpc.tools.FrechetCalculatorResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.FrechetCalculatorRequest,
      eu.more2020.visual.grpc.tools.FrechetCalculatorResponse> getFrechetCalculatorMethod() {
    io.grpc.MethodDescriptor<eu.more2020.visual.grpc.tools.FrechetCalculatorRequest, eu.more2020.visual.grpc.tools.FrechetCalculatorResponse> getFrechetCalculatorMethod;
    if ((getFrechetCalculatorMethod = DataServiceGrpc.getFrechetCalculatorMethod) == null) {
      synchronized (DataServiceGrpc.class) {
        if ((getFrechetCalculatorMethod = DataServiceGrpc.getFrechetCalculatorMethod) == null) {
          DataServiceGrpc.getFrechetCalculatorMethod = getFrechetCalculatorMethod =
              io.grpc.MethodDescriptor.<eu.more2020.visual.grpc.tools.FrechetCalculatorRequest, eu.more2020.visual.grpc.tools.FrechetCalculatorResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "FrechetCalculator"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.FrechetCalculatorRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  eu.more2020.visual.grpc.tools.FrechetCalculatorResponse.getDefaultInstance()))
              .setSchemaDescriptor(new DataServiceMethodDescriptorSupplier("FrechetCalculator"))
              .build();
        }
      }
    }
    return getFrechetCalculatorMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static DataServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DataServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DataServiceStub>() {
        @java.lang.Override
        public DataServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DataServiceStub(channel, callOptions);
        }
      };
    return DataServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static DataServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DataServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DataServiceBlockingStub>() {
        @java.lang.Override
        public DataServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DataServiceBlockingStub(channel, callOptions);
        }
      };
    return DataServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static DataServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<DataServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<DataServiceFutureStub>() {
        @java.lang.Override
        public DataServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new DataServiceFutureStub(channel, callOptions);
        }
      };
    return DataServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public static abstract class DataServiceImplBase implements io.grpc.BindableService {

    /**
     */
    public void getDatasetData(eu.more2020.visual.grpc.tools.GetDatasetDataRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.DatasetDataResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetDatasetDataMethod(), responseObserver);
    }

    /**
     */
    public void checkWashes(eu.more2020.visual.grpc.tools.WashesRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.WashesResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCheckWashesMethod(), responseObserver);
    }

    /**
     */
    public void cPDetection(eu.more2020.visual.grpc.tools.CPDetectionRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.CPDetectionResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCPDetectionMethod(), responseObserver);
    }

    /**
     */
    public void extractRains(eu.more2020.visual.grpc.tools.ExtractRainsRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.ExtractRainsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getExtractRainsMethod(), responseObserver);
    }

    /**
     */
    public void calculatePowerIndex(eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getCalculatePowerIndexMethod(), responseObserver);
    }

    /**
     */
    public void forecasting(eu.more2020.visual.grpc.tools.ForecastingRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.ForecastingResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getForecastingMethod(), responseObserver);
    }

    /**
     */
    public void estimateYawMisalignment(eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getEstimateYawMisalignmentMethod(), responseObserver);
    }

    /**
     */
    public void frechetCalculator(eu.more2020.visual.grpc.tools.FrechetCalculatorRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.FrechetCalculatorResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getFrechetCalculatorMethod(), responseObserver);
    }

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
          .addMethod(
            getGetDatasetDataMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.GetDatasetDataRequest,
                eu.more2020.visual.grpc.tools.DatasetDataResponse>(
                  this, METHODID_GET_DATASET_DATA)))
          .addMethod(
            getCheckWashesMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.WashesRequest,
                eu.more2020.visual.grpc.tools.WashesResponse>(
                  this, METHODID_CHECK_WASHES)))
          .addMethod(
            getCPDetectionMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.CPDetectionRequest,
                eu.more2020.visual.grpc.tools.CPDetectionResponse>(
                  this, METHODID_CPDETECTION)))
          .addMethod(
            getExtractRainsMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.ExtractRainsRequest,
                eu.more2020.visual.grpc.tools.ExtractRainsResponse>(
                  this, METHODID_EXTRACT_RAINS)))
          .addMethod(
            getCalculatePowerIndexMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest,
                eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse>(
                  this, METHODID_CALCULATE_POWER_INDEX)))
          .addMethod(
            getForecastingMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.ForecastingRequest,
                eu.more2020.visual.grpc.tools.ForecastingResponse>(
                  this, METHODID_FORECASTING)))
          .addMethod(
            getEstimateYawMisalignmentMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest,
                eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse>(
                  this, METHODID_ESTIMATE_YAW_MISALIGNMENT)))
          .addMethod(
            getFrechetCalculatorMethod(),
            io.grpc.stub.ServerCalls.asyncUnaryCall(
              new MethodHandlers<
                eu.more2020.visual.grpc.tools.FrechetCalculatorRequest,
                eu.more2020.visual.grpc.tools.FrechetCalculatorResponse>(
                  this, METHODID_FRECHET_CALCULATOR)))
          .build();
    }
  }

  /**
   */
  public static final class DataServiceStub extends io.grpc.stub.AbstractAsyncStub<DataServiceStub> {
    private DataServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DataServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DataServiceStub(channel, callOptions);
    }

    /**
     */
    public void getDatasetData(eu.more2020.visual.grpc.tools.GetDatasetDataRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.DatasetDataResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetDatasetDataMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void checkWashes(eu.more2020.visual.grpc.tools.WashesRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.WashesResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCheckWashesMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void cPDetection(eu.more2020.visual.grpc.tools.CPDetectionRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.CPDetectionResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCPDetectionMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void extractRains(eu.more2020.visual.grpc.tools.ExtractRainsRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.ExtractRainsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getExtractRainsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void calculatePowerIndex(eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getCalculatePowerIndexMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void forecasting(eu.more2020.visual.grpc.tools.ForecastingRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.ForecastingResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getForecastingMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void estimateYawMisalignment(eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getEstimateYawMisalignmentMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void frechetCalculator(eu.more2020.visual.grpc.tools.FrechetCalculatorRequest request,
        io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.FrechetCalculatorResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getFrechetCalculatorMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   */
  public static final class DataServiceBlockingStub extends io.grpc.stub.AbstractBlockingStub<DataServiceBlockingStub> {
    private DataServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DataServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DataServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.DatasetDataResponse getDatasetData(eu.more2020.visual.grpc.tools.GetDatasetDataRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetDatasetDataMethod(), getCallOptions(), request);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.WashesResponse checkWashes(eu.more2020.visual.grpc.tools.WashesRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCheckWashesMethod(), getCallOptions(), request);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.CPDetectionResponse cPDetection(eu.more2020.visual.grpc.tools.CPDetectionRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCPDetectionMethod(), getCallOptions(), request);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.ExtractRainsResponse extractRains(eu.more2020.visual.grpc.tools.ExtractRainsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getExtractRainsMethod(), getCallOptions(), request);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse calculatePowerIndex(eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getCalculatePowerIndexMethod(), getCallOptions(), request);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.ForecastingResponse forecasting(eu.more2020.visual.grpc.tools.ForecastingRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getForecastingMethod(), getCallOptions(), request);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse estimateYawMisalignment(eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getEstimateYawMisalignmentMethod(), getCallOptions(), request);
    }

    /**
     */
    public eu.more2020.visual.grpc.tools.FrechetCalculatorResponse frechetCalculator(eu.more2020.visual.grpc.tools.FrechetCalculatorRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getFrechetCalculatorMethod(), getCallOptions(), request);
    }
  }

  /**
   */
  public static final class DataServiceFutureStub extends io.grpc.stub.AbstractFutureStub<DataServiceFutureStub> {
    private DataServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected DataServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new DataServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.DatasetDataResponse> getDatasetData(
        eu.more2020.visual.grpc.tools.GetDatasetDataRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetDatasetDataMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.WashesResponse> checkWashes(
        eu.more2020.visual.grpc.tools.WashesRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCheckWashesMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.CPDetectionResponse> cPDetection(
        eu.more2020.visual.grpc.tools.CPDetectionRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCPDetectionMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.ExtractRainsResponse> extractRains(
        eu.more2020.visual.grpc.tools.ExtractRainsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getExtractRainsMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse> calculatePowerIndex(
        eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getCalculatePowerIndexMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.ForecastingResponse> forecasting(
        eu.more2020.visual.grpc.tools.ForecastingRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getForecastingMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse> estimateYawMisalignment(
        eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getEstimateYawMisalignmentMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<eu.more2020.visual.grpc.tools.FrechetCalculatorResponse> frechetCalculator(
        eu.more2020.visual.grpc.tools.FrechetCalculatorRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getFrechetCalculatorMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GET_DATASET_DATA = 0;
  private static final int METHODID_CHECK_WASHES = 1;
  private static final int METHODID_CPDETECTION = 2;
  private static final int METHODID_EXTRACT_RAINS = 3;
  private static final int METHODID_CALCULATE_POWER_INDEX = 4;
  private static final int METHODID_FORECASTING = 5;
  private static final int METHODID_ESTIMATE_YAW_MISALIGNMENT = 6;
  private static final int METHODID_FRECHET_CALCULATOR = 7;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final DataServiceImplBase serviceImpl;
    private final int methodId;

    MethodHandlers(DataServiceImplBase serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_GET_DATASET_DATA:
          serviceImpl.getDatasetData((eu.more2020.visual.grpc.tools.GetDatasetDataRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.DatasetDataResponse>) responseObserver);
          break;
        case METHODID_CHECK_WASHES:
          serviceImpl.checkWashes((eu.more2020.visual.grpc.tools.WashesRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.WashesResponse>) responseObserver);
          break;
        case METHODID_CPDETECTION:
          serviceImpl.cPDetection((eu.more2020.visual.grpc.tools.CPDetectionRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.CPDetectionResponse>) responseObserver);
          break;
        case METHODID_EXTRACT_RAINS:
          serviceImpl.extractRains((eu.more2020.visual.grpc.tools.ExtractRainsRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.ExtractRainsResponse>) responseObserver);
          break;
        case METHODID_CALCULATE_POWER_INDEX:
          serviceImpl.calculatePowerIndex((eu.more2020.visual.grpc.tools.CalculatePowerIndexRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.CalculatePowerIndexResponse>) responseObserver);
          break;
        case METHODID_FORECASTING:
          serviceImpl.forecasting((eu.more2020.visual.grpc.tools.ForecastingRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.ForecastingResponse>) responseObserver);
          break;
        case METHODID_ESTIMATE_YAW_MISALIGNMENT:
          serviceImpl.estimateYawMisalignment((eu.more2020.visual.grpc.tools.EstimateYawMisalignmentRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.EstimateYawMisalignmentResponse>) responseObserver);
          break;
        case METHODID_FRECHET_CALCULATOR:
          serviceImpl.frechetCalculator((eu.more2020.visual.grpc.tools.FrechetCalculatorRequest) request,
              (io.grpc.stub.StreamObserver<eu.more2020.visual.grpc.tools.FrechetCalculatorResponse>) responseObserver);
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

  private static abstract class DataServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    DataServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return eu.more2020.visual.grpc.tools.GrpcProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("DataService");
    }
  }

  private static final class DataServiceFileDescriptorSupplier
      extends DataServiceBaseDescriptorSupplier {
    DataServiceFileDescriptorSupplier() {}
  }

  private static final class DataServiceMethodDescriptorSupplier
      extends DataServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final String methodName;

    DataServiceMethodDescriptorSupplier(String methodName) {
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
      synchronized (DataServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new DataServiceFileDescriptorSupplier())
              .addMethod(getGetDatasetDataMethod())
              .addMethod(getCheckWashesMethod())
              .addMethod(getCPDetectionMethod())
              .addMethod(getExtractRainsMethod())
              .addMethod(getCalculatePowerIndexMethod())
              .addMethod(getForecastingMethod())
              .addMethod(getEstimateYawMisalignmentMethod())
              .addMethod(getFrechetCalculatorMethod())
              .build();
        }
      }
    }
    return result;
  }
}
