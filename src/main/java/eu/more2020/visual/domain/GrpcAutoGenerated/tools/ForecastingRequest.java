// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: tools.proto

package eu.more2020.visual.domain.GrpcAutoGenerated.tools;

/**
 * Protobuf type {@code grpc.ForecastingRequest}
 */
public  final class ForecastingRequest extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:grpc.ForecastingRequest)
    ForecastingRequestOrBuilder {
private static final long serialVersionUID = 0L;
  // Use ForecastingRequest.newBuilder() to construct.
  private ForecastingRequest(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private ForecastingRequest() {
    datasetId_ = "";
    startDate_ = "";
    endDate_ = "";
    lags_ = 0;
    futureSteps_ = 0;
    queryModelar_ = false;
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private ForecastingRequest(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    if (extensionRegistry == null) {
      throw new java.lang.NullPointerException();
    }
    int mutable_bitField0_ = 0;
    com.google.protobuf.UnknownFieldSet.Builder unknownFields =
        com.google.protobuf.UnknownFieldSet.newBuilder();
    try {
      boolean done = false;
      while (!done) {
        int tag = input.readTag();
        switch (tag) {
          case 0:
            done = true;
            break;
          case 10: {
            java.lang.String s = input.readStringRequireUtf8();

            datasetId_ = s;
            break;
          }
          case 18: {
            java.lang.String s = input.readStringRequireUtf8();

            startDate_ = s;
            break;
          }
          case 26: {
            java.lang.String s = input.readStringRequireUtf8();

            endDate_ = s;
            break;
          }
          case 32: {

            lags_ = input.readInt32();
            break;
          }
          case 40: {

            futureSteps_ = input.readInt32();
            break;
          }
          case 48: {

            queryModelar_ = input.readBool();
            break;
          }
          default: {
            if (!parseUnknownFieldProto3(
                input, unknownFields, extensionRegistry, tag)) {
              done = true;
            }
            break;
          }
        }
      }
    } catch (com.google.protobuf.InvalidProtocolBufferException e) {
      throw e.setUnfinishedMessage(this);
    } catch (java.io.IOException e) {
      throw new com.google.protobuf.InvalidProtocolBufferException(
          e).setUnfinishedMessage(this);
    } finally {
      this.unknownFields = unknownFields.build();
      makeExtensionsImmutable();
    }
  }
  public static final com.google.protobuf.Descriptors.Descriptor
      getDescriptor() {
    return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_ForecastingRequest_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_ForecastingRequest_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest.class, eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest.Builder.class);
  }

  public static final int DATASET_ID_FIELD_NUMBER = 1;
  private volatile java.lang.Object datasetId_;
  /**
   * <code>string dataset_id = 1;</code>
   */
  public java.lang.String getDatasetId() {
    java.lang.Object ref = datasetId_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = 
          (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      datasetId_ = s;
      return s;
    }
  }
  /**
   * <code>string dataset_id = 1;</code>
   */
  public com.google.protobuf.ByteString
      getDatasetIdBytes() {
    java.lang.Object ref = datasetId_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = 
          com.google.protobuf.ByteString.copyFromUtf8(
              (java.lang.String) ref);
      datasetId_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }

  public static final int START_DATE_FIELD_NUMBER = 2;
  private volatile java.lang.Object startDate_;
  /**
   * <code>string start_date = 2;</code>
   */
  public java.lang.String getStartDate() {
    java.lang.Object ref = startDate_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = 
          (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      startDate_ = s;
      return s;
    }
  }
  /**
   * <code>string start_date = 2;</code>
   */
  public com.google.protobuf.ByteString
      getStartDateBytes() {
    java.lang.Object ref = startDate_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = 
          com.google.protobuf.ByteString.copyFromUtf8(
              (java.lang.String) ref);
      startDate_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }

  public static final int END_DATE_FIELD_NUMBER = 3;
  private volatile java.lang.Object endDate_;
  /**
   * <code>string end_date = 3;</code>
   */
  public java.lang.String getEndDate() {
    java.lang.Object ref = endDate_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = 
          (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      endDate_ = s;
      return s;
    }
  }
  /**
   * <code>string end_date = 3;</code>
   */
  public com.google.protobuf.ByteString
      getEndDateBytes() {
    java.lang.Object ref = endDate_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = 
          com.google.protobuf.ByteString.copyFromUtf8(
              (java.lang.String) ref);
      endDate_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }

  public static final int LAGS_FIELD_NUMBER = 4;
  private int lags_;
  /**
   * <code>int32 lags = 4;</code>
   */
  public int getLags() {
    return lags_;
  }

  public static final int FUTURE_STEPS_FIELD_NUMBER = 5;
  private int futureSteps_;
  /**
   * <code>int32 future_steps = 5;</code>
   */
  public int getFutureSteps() {
    return futureSteps_;
  }

  public static final int QUERY_MODELAR_FIELD_NUMBER = 6;
  private boolean queryModelar_;
  /**
   * <code>bool query_modelar = 6;</code>
   */
  public boolean getQueryModelar() {
    return queryModelar_;
  }

  private byte memoizedIsInitialized = -1;
  @java.lang.Override
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1) return true;
    if (isInitialized == 0) return false;

    memoizedIsInitialized = 1;
    return true;
  }

  @java.lang.Override
  public void writeTo(com.google.protobuf.CodedOutputStream output)
                      throws java.io.IOException {
    if (!getDatasetIdBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 1, datasetId_);
    }
    if (!getStartDateBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 2, startDate_);
    }
    if (!getEndDateBytes().isEmpty()) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 3, endDate_);
    }
    if (lags_ != 0) {
      output.writeInt32(4, lags_);
    }
    if (futureSteps_ != 0) {
      output.writeInt32(5, futureSteps_);
    }
    if (queryModelar_ != false) {
      output.writeBool(6, queryModelar_);
    }
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (!getDatasetIdBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(1, datasetId_);
    }
    if (!getStartDateBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(2, startDate_);
    }
    if (!getEndDateBytes().isEmpty()) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(3, endDate_);
    }
    if (lags_ != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeInt32Size(4, lags_);
    }
    if (futureSteps_ != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeInt32Size(5, futureSteps_);
    }
    if (queryModelar_ != false) {
      size += com.google.protobuf.CodedOutputStream
        .computeBoolSize(6, queryModelar_);
    }
    size += unknownFields.getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest)) {
      return super.equals(obj);
    }
    eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest other = (eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest) obj;

    boolean result = true;
    result = result && getDatasetId()
        .equals(other.getDatasetId());
    result = result && getStartDate()
        .equals(other.getStartDate());
    result = result && getEndDate()
        .equals(other.getEndDate());
    result = result && (getLags()
        == other.getLags());
    result = result && (getFutureSteps()
        == other.getFutureSteps());
    result = result && (getQueryModelar()
        == other.getQueryModelar());
    result = result && unknownFields.equals(other.unknownFields);
    return result;
  }

  @java.lang.Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptor().hashCode();
    hash = (37 * hash) + DATASET_ID_FIELD_NUMBER;
    hash = (53 * hash) + getDatasetId().hashCode();
    hash = (37 * hash) + START_DATE_FIELD_NUMBER;
    hash = (53 * hash) + getStartDate().hashCode();
    hash = (37 * hash) + END_DATE_FIELD_NUMBER;
    hash = (53 * hash) + getEndDate().hashCode();
    hash = (37 * hash) + LAGS_FIELD_NUMBER;
    hash = (53 * hash) + getLags();
    hash = (37 * hash) + FUTURE_STEPS_FIELD_NUMBER;
    hash = (53 * hash) + getFutureSteps();
    hash = (37 * hash) + QUERY_MODELAR_FIELD_NUMBER;
    hash = (53 * hash) + com.google.protobuf.Internal.hashBoolean(
        getQueryModelar());
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parseFrom(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  @java.lang.Override
  public Builder newBuilderForType() { return newBuilder(); }
  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }
  public static Builder newBuilder(eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }
  @java.lang.Override
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE
        ? new Builder() : new Builder().mergeFrom(this);
  }

  @java.lang.Override
  protected Builder newBuilderForType(
      com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }
  /**
   * Protobuf type {@code grpc.ForecastingRequest}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:grpc.ForecastingRequest)
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequestOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_ForecastingRequest_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_ForecastingRequest_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest.class, eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest.Builder.class);
    }

    // Construct using eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest.newBuilder()
    private Builder() {
      maybeForceBuilderInitialization();
    }

    private Builder(
        com.google.protobuf.GeneratedMessageV3.BuilderParent parent) {
      super(parent);
      maybeForceBuilderInitialization();
    }
    private void maybeForceBuilderInitialization() {
      if (com.google.protobuf.GeneratedMessageV3
              .alwaysUseFieldBuilders) {
      }
    }
    @java.lang.Override
    public Builder clear() {
      super.clear();
      datasetId_ = "";

      startDate_ = "";

      endDate_ = "";

      lags_ = 0;

      futureSteps_ = 0;

      queryModelar_ = false;

      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_ForecastingRequest_descriptor;
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest getDefaultInstanceForType() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest.getDefaultInstance();
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest build() {
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest buildPartial() {
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest result = new eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest(this);
      result.datasetId_ = datasetId_;
      result.startDate_ = startDate_;
      result.endDate_ = endDate_;
      result.lags_ = lags_;
      result.futureSteps_ = futureSteps_;
      result.queryModelar_ = queryModelar_;
      onBuilt();
      return result;
    }

    @java.lang.Override
    public Builder clone() {
      return (Builder) super.clone();
    }
    @java.lang.Override
    public Builder setField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return (Builder) super.setField(field, value);
    }
    @java.lang.Override
    public Builder clearField(
        com.google.protobuf.Descriptors.FieldDescriptor field) {
      return (Builder) super.clearField(field);
    }
    @java.lang.Override
    public Builder clearOneof(
        com.google.protobuf.Descriptors.OneofDescriptor oneof) {
      return (Builder) super.clearOneof(oneof);
    }
    @java.lang.Override
    public Builder setRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        int index, java.lang.Object value) {
      return (Builder) super.setRepeatedField(field, index, value);
    }
    @java.lang.Override
    public Builder addRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return (Builder) super.addRepeatedField(field, value);
    }
    @java.lang.Override
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest) {
        return mergeFrom((eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest other) {
      if (other == eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest.getDefaultInstance()) return this;
      if (!other.getDatasetId().isEmpty()) {
        datasetId_ = other.datasetId_;
        onChanged();
      }
      if (!other.getStartDate().isEmpty()) {
        startDate_ = other.startDate_;
        onChanged();
      }
      if (!other.getEndDate().isEmpty()) {
        endDate_ = other.endDate_;
        onChanged();
      }
      if (other.getLags() != 0) {
        setLags(other.getLags());
      }
      if (other.getFutureSteps() != 0) {
        setFutureSteps(other.getFutureSteps());
      }
      if (other.getQueryModelar() != false) {
        setQueryModelar(other.getQueryModelar());
      }
      this.mergeUnknownFields(other.unknownFields);
      onChanged();
      return this;
    }

    @java.lang.Override
    public final boolean isInitialized() {
      return true;
    }

    @java.lang.Override
    public Builder mergeFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }

    private java.lang.Object datasetId_ = "";
    /**
     * <code>string dataset_id = 1;</code>
     */
    public java.lang.String getDatasetId() {
      java.lang.Object ref = datasetId_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs =
            (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        datasetId_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }
    /**
     * <code>string dataset_id = 1;</code>
     */
    public com.google.protobuf.ByteString
        getDatasetIdBytes() {
      java.lang.Object ref = datasetId_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = 
            com.google.protobuf.ByteString.copyFromUtf8(
                (java.lang.String) ref);
        datasetId_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    /**
     * <code>string dataset_id = 1;</code>
     */
    public Builder setDatasetId(
        java.lang.String value) {
      if (value == null) {
    throw new NullPointerException();
  }
  
      datasetId_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>string dataset_id = 1;</code>
     */
    public Builder clearDatasetId() {
      
      datasetId_ = getDefaultInstance().getDatasetId();
      onChanged();
      return this;
    }
    /**
     * <code>string dataset_id = 1;</code>
     */
    public Builder setDatasetIdBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
    throw new NullPointerException();
  }
  checkByteStringIsUtf8(value);
      
      datasetId_ = value;
      onChanged();
      return this;
    }

    private java.lang.Object startDate_ = "";
    /**
     * <code>string start_date = 2;</code>
     */
    public java.lang.String getStartDate() {
      java.lang.Object ref = startDate_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs =
            (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        startDate_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }
    /**
     * <code>string start_date = 2;</code>
     */
    public com.google.protobuf.ByteString
        getStartDateBytes() {
      java.lang.Object ref = startDate_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = 
            com.google.protobuf.ByteString.copyFromUtf8(
                (java.lang.String) ref);
        startDate_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    /**
     * <code>string start_date = 2;</code>
     */
    public Builder setStartDate(
        java.lang.String value) {
      if (value == null) {
    throw new NullPointerException();
  }
  
      startDate_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>string start_date = 2;</code>
     */
    public Builder clearStartDate() {
      
      startDate_ = getDefaultInstance().getStartDate();
      onChanged();
      return this;
    }
    /**
     * <code>string start_date = 2;</code>
     */
    public Builder setStartDateBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
    throw new NullPointerException();
  }
  checkByteStringIsUtf8(value);
      
      startDate_ = value;
      onChanged();
      return this;
    }

    private java.lang.Object endDate_ = "";
    /**
     * <code>string end_date = 3;</code>
     */
    public java.lang.String getEndDate() {
      java.lang.Object ref = endDate_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs =
            (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        endDate_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }
    /**
     * <code>string end_date = 3;</code>
     */
    public com.google.protobuf.ByteString
        getEndDateBytes() {
      java.lang.Object ref = endDate_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = 
            com.google.protobuf.ByteString.copyFromUtf8(
                (java.lang.String) ref);
        endDate_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    /**
     * <code>string end_date = 3;</code>
     */
    public Builder setEndDate(
        java.lang.String value) {
      if (value == null) {
    throw new NullPointerException();
  }
  
      endDate_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>string end_date = 3;</code>
     */
    public Builder clearEndDate() {
      
      endDate_ = getDefaultInstance().getEndDate();
      onChanged();
      return this;
    }
    /**
     * <code>string end_date = 3;</code>
     */
    public Builder setEndDateBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
    throw new NullPointerException();
  }
  checkByteStringIsUtf8(value);
      
      endDate_ = value;
      onChanged();
      return this;
    }

    private int lags_ ;
    /**
     * <code>int32 lags = 4;</code>
     */
    public int getLags() {
      return lags_;
    }
    /**
     * <code>int32 lags = 4;</code>
     */
    public Builder setLags(int value) {
      
      lags_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>int32 lags = 4;</code>
     */
    public Builder clearLags() {
      
      lags_ = 0;
      onChanged();
      return this;
    }

    private int futureSteps_ ;
    /**
     * <code>int32 future_steps = 5;</code>
     */
    public int getFutureSteps() {
      return futureSteps_;
    }
    /**
     * <code>int32 future_steps = 5;</code>
     */
    public Builder setFutureSteps(int value) {
      
      futureSteps_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>int32 future_steps = 5;</code>
     */
    public Builder clearFutureSteps() {
      
      futureSteps_ = 0;
      onChanged();
      return this;
    }

    private boolean queryModelar_ ;
    /**
     * <code>bool query_modelar = 6;</code>
     */
    public boolean getQueryModelar() {
      return queryModelar_;
    }
    /**
     * <code>bool query_modelar = 6;</code>
     */
    public Builder setQueryModelar(boolean value) {
      
      queryModelar_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>bool query_modelar = 6;</code>
     */
    public Builder clearQueryModelar() {
      
      queryModelar_ = false;
      onChanged();
      return this;
    }
    @java.lang.Override
    public final Builder setUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.setUnknownFieldsProto3(unknownFields);
    }

    @java.lang.Override
    public final Builder mergeUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.mergeUnknownFields(unknownFields);
    }


    // @@protoc_insertion_point(builder_scope:grpc.ForecastingRequest)
  }

  // @@protoc_insertion_point(class_scope:grpc.ForecastingRequest)
  private static final eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest();
  }

  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<ForecastingRequest>
      PARSER = new com.google.protobuf.AbstractParser<ForecastingRequest>() {
    @java.lang.Override
    public ForecastingRequest parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new ForecastingRequest(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<ForecastingRequest> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<ForecastingRequest> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ForecastingRequest getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

