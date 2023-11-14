// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: tools.proto

package eu.more2020.visual.domain.GrpcAutoGenerated.tools;

/**
 * Protobuf type {@code grpc.EstimateYawMisalignmentRequest}
 */
public final class EstimateYawMisalignmentRequest extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:grpc.EstimateYawMisalignmentRequest)
    EstimateYawMisalignmentRequestOrBuilder {
private static final long serialVersionUID = 0L;
  // Use EstimateYawMisalignmentRequest.newBuilder() to construct.
  private EstimateYawMisalignmentRequest(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private EstimateYawMisalignmentRequest() {
    datasetId_ = "";
    startDate_ = "";
    endDate_ = "";
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new EstimateYawMisalignmentRequest();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private EstimateYawMisalignmentRequest(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    this();
    if (extensionRegistry == null) {
      throw new java.lang.NullPointerException();
    }
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

            window_ = input.readInt32();
            break;
          }
          case 40: {

            queryModelar_ = input.readBool();
            break;
          }
          default: {
            if (!parseUnknownField(
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
    return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_EstimateYawMisalignmentRequest_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_EstimateYawMisalignmentRequest_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest.class, eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest.Builder.class);
  }

  public static final int DATASET_ID_FIELD_NUMBER = 1;
  private volatile java.lang.Object datasetId_;
  /**
   * <code>string dataset_id = 1;</code>
   * @return The datasetId.
   */
  @java.lang.Override
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
   * @return The bytes for datasetId.
   */
  @java.lang.Override
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
   * @return The startDate.
   */
  @java.lang.Override
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
   * @return The bytes for startDate.
   */
  @java.lang.Override
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
   * @return The endDate.
   */
  @java.lang.Override
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
   * @return The bytes for endDate.
   */
  @java.lang.Override
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

  public static final int WINDOW_FIELD_NUMBER = 4;
  private int window_;
  /**
   * <code>int32 window = 4;</code>
   * @return The window.
   */
  @java.lang.Override
  public int getWindow() {
    return window_;
  }

  public static final int QUERY_MODELAR_FIELD_NUMBER = 5;
  private boolean queryModelar_;
  /**
   * <code>bool query_modelar = 5;</code>
   * @return The queryModelar.
   */
  @java.lang.Override
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
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(datasetId_)) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 1, datasetId_);
    }
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(startDate_)) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 2, startDate_);
    }
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(endDate_)) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 3, endDate_);
    }
    if (window_ != 0) {
      output.writeInt32(4, window_);
    }
    if (queryModelar_ != false) {
      output.writeBool(5, queryModelar_);
    }
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(datasetId_)) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(1, datasetId_);
    }
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(startDate_)) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(2, startDate_);
    }
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(endDate_)) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(3, endDate_);
    }
    if (window_ != 0) {
      size += com.google.protobuf.CodedOutputStream
        .computeInt32Size(4, window_);
    }
    if (queryModelar_ != false) {
      size += com.google.protobuf.CodedOutputStream
        .computeBoolSize(5, queryModelar_);
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
    if (!(obj instanceof eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest)) {
      return super.equals(obj);
    }
    eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest other = (eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest) obj;

    if (!getDatasetId()
        .equals(other.getDatasetId())) return false;
    if (!getStartDate()
        .equals(other.getStartDate())) return false;
    if (!getEndDate()
        .equals(other.getEndDate())) return false;
    if (getWindow()
        != other.getWindow()) return false;
    if (getQueryModelar()
        != other.getQueryModelar()) return false;
    if (!unknownFields.equals(other.unknownFields)) return false;
    return true;
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
    hash = (37 * hash) + WINDOW_FIELD_NUMBER;
    hash = (53 * hash) + getWindow();
    hash = (37 * hash) + QUERY_MODELAR_FIELD_NUMBER;
    hash = (53 * hash) + com.google.protobuf.Internal.hashBoolean(
        getQueryModelar());
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parseFrom(
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
  public static Builder newBuilder(eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest prototype) {
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
   * Protobuf type {@code grpc.EstimateYawMisalignmentRequest}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:grpc.EstimateYawMisalignmentRequest)
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequestOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_EstimateYawMisalignmentRequest_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_EstimateYawMisalignmentRequest_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest.class, eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest.Builder.class);
    }

    // Construct using eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest.newBuilder()
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

      window_ = 0;

      queryModelar_ = false;

      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_grpc_EstimateYawMisalignmentRequest_descriptor;
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest getDefaultInstanceForType() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest.getDefaultInstance();
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest build() {
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest buildPartial() {
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest result = new eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest(this);
      result.datasetId_ = datasetId_;
      result.startDate_ = startDate_;
      result.endDate_ = endDate_;
      result.window_ = window_;
      result.queryModelar_ = queryModelar_;
      onBuilt();
      return result;
    }

    @java.lang.Override
    public Builder clone() {
      return super.clone();
    }
    @java.lang.Override
    public Builder setField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.setField(field, value);
    }
    @java.lang.Override
    public Builder clearField(
        com.google.protobuf.Descriptors.FieldDescriptor field) {
      return super.clearField(field);
    }
    @java.lang.Override
    public Builder clearOneof(
        com.google.protobuf.Descriptors.OneofDescriptor oneof) {
      return super.clearOneof(oneof);
    }
    @java.lang.Override
    public Builder setRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        int index, java.lang.Object value) {
      return super.setRepeatedField(field, index, value);
    }
    @java.lang.Override
    public Builder addRepeatedField(
        com.google.protobuf.Descriptors.FieldDescriptor field,
        java.lang.Object value) {
      return super.addRepeatedField(field, value);
    }
    @java.lang.Override
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest) {
        return mergeFrom((eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest other) {
      if (other == eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest.getDefaultInstance()) return this;
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
      if (other.getWindow() != 0) {
        setWindow(other.getWindow());
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
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest) e.getUnfinishedMessage();
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
     * @return The datasetId.
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
     * @return The bytes for datasetId.
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
     * @param value The datasetId to set.
     * @return This builder for chaining.
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
     * @return This builder for chaining.
     */
    public Builder clearDatasetId() {
      
      datasetId_ = getDefaultInstance().getDatasetId();
      onChanged();
      return this;
    }
    /**
     * <code>string dataset_id = 1;</code>
     * @param value The bytes for datasetId to set.
     * @return This builder for chaining.
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
     * @return The startDate.
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
     * @return The bytes for startDate.
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
     * @param value The startDate to set.
     * @return This builder for chaining.
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
     * @return This builder for chaining.
     */
    public Builder clearStartDate() {
      
      startDate_ = getDefaultInstance().getStartDate();
      onChanged();
      return this;
    }
    /**
     * <code>string start_date = 2;</code>
     * @param value The bytes for startDate to set.
     * @return This builder for chaining.
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
     * @return The endDate.
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
     * @return The bytes for endDate.
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
     * @param value The endDate to set.
     * @return This builder for chaining.
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
     * @return This builder for chaining.
     */
    public Builder clearEndDate() {
      
      endDate_ = getDefaultInstance().getEndDate();
      onChanged();
      return this;
    }
    /**
     * <code>string end_date = 3;</code>
     * @param value The bytes for endDate to set.
     * @return This builder for chaining.
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

    private int window_ ;
    /**
     * <code>int32 window = 4;</code>
     * @return The window.
     */
    @java.lang.Override
    public int getWindow() {
      return window_;
    }
    /**
     * <code>int32 window = 4;</code>
     * @param value The window to set.
     * @return This builder for chaining.
     */
    public Builder setWindow(int value) {
      
      window_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>int32 window = 4;</code>
     * @return This builder for chaining.
     */
    public Builder clearWindow() {
      
      window_ = 0;
      onChanged();
      return this;
    }

    private boolean queryModelar_ ;
    /**
     * <code>bool query_modelar = 5;</code>
     * @return The queryModelar.
     */
    @java.lang.Override
    public boolean getQueryModelar() {
      return queryModelar_;
    }
    /**
     * <code>bool query_modelar = 5;</code>
     * @param value The queryModelar to set.
     * @return This builder for chaining.
     */
    public Builder setQueryModelar(boolean value) {
      
      queryModelar_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>bool query_modelar = 5;</code>
     * @return This builder for chaining.
     */
    public Builder clearQueryModelar() {
      
      queryModelar_ = false;
      onChanged();
      return this;
    }
    @java.lang.Override
    public final Builder setUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.setUnknownFields(unknownFields);
    }

    @java.lang.Override
    public final Builder mergeUnknownFields(
        final com.google.protobuf.UnknownFieldSet unknownFields) {
      return super.mergeUnknownFields(unknownFields);
    }


    // @@protoc_insertion_point(builder_scope:grpc.EstimateYawMisalignmentRequest)
  }

  // @@protoc_insertion_point(class_scope:grpc.EstimateYawMisalignmentRequest)
  private static final eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest();
  }

  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<EstimateYawMisalignmentRequest>
      PARSER = new com.google.protobuf.AbstractParser<EstimateYawMisalignmentRequest>() {
    @java.lang.Override
    public EstimateYawMisalignmentRequest parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new EstimateYawMisalignmentRequest(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<EstimateYawMisalignmentRequest> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<EstimateYawMisalignmentRequest> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public eu.more2020.visual.domain.GrpcAutoGenerated.tools.EstimateYawMisalignmentRequest getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}
