// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: helloworld.proto

package eu.more2020.visual.grpc;

/**
 * Protobuf type {@code Predictions}
 */
public final class Predictions extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:Predictions)
    PredictionsOrBuilder {
private static final long serialVersionUID = 0L;
  // Use Predictions.newBuilder() to construct.
  private Predictions(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private Predictions() {
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new Predictions();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private Predictions(
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
            if (!((mutable_bitField0_ & 0x00000001) != 0)) {
              predictions_ = com.google.protobuf.MapField.newMapField(
                  PredictionsDefaultEntryHolder.defaultEntry);
              mutable_bitField0_ |= 0x00000001;
            }
            com.google.protobuf.MapEntry<java.lang.String, java.lang.Float>
            predictions__ = input.readMessage(
                PredictionsDefaultEntryHolder.defaultEntry.getParserForType(), extensionRegistry);
            predictions_.getMutableMap().put(
                predictions__.getKey(), predictions__.getValue());
            break;
          }
          case 18: {
            if (!((mutable_bitField0_ & 0x00000002) != 0)) {
              evaluation_ = com.google.protobuf.MapField.newMapField(
                  EvaluationDefaultEntryHolder.defaultEntry);
              mutable_bitField0_ |= 0x00000002;
            }
            com.google.protobuf.MapEntry<java.lang.String, java.lang.Float>
            evaluation__ = input.readMessage(
                EvaluationDefaultEntryHolder.defaultEntry.getParserForType(), extensionRegistry);
            evaluation_.getMutableMap().put(
                evaluation__.getKey(), evaluation__.getValue());
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
    return eu.more2020.visual.grpc.GrpcProto.internal_static_Predictions_descriptor;
  }

  @SuppressWarnings({"rawtypes"})
  @java.lang.Override
  protected com.google.protobuf.MapField internalGetMapField(
      int number) {
    switch (number) {
      case 1:
        return internalGetPredictions();
      case 2:
        return internalGetEvaluation();
      default:
        throw new RuntimeException(
            "Invalid map field number: " + number);
    }
  }
  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return eu.more2020.visual.grpc.GrpcProto.internal_static_Predictions_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            eu.more2020.visual.grpc.Predictions.class, eu.more2020.visual.grpc.Predictions.Builder.class);
  }

  public static final int PREDICTIONS_FIELD_NUMBER = 1;
  private static final class PredictionsDefaultEntryHolder {
    static final com.google.protobuf.MapEntry<
        java.lang.String, java.lang.Float> defaultEntry =
            com.google.protobuf.MapEntry
            .<java.lang.String, java.lang.Float>newDefaultInstance(
                eu.more2020.visual.grpc.GrpcProto.internal_static_Predictions_PredictionsEntry_descriptor, 
                com.google.protobuf.WireFormat.FieldType.STRING,
                "",
                com.google.protobuf.WireFormat.FieldType.FLOAT,
                0F);
  }
  private com.google.protobuf.MapField<
      java.lang.String, java.lang.Float> predictions_;
  private com.google.protobuf.MapField<java.lang.String, java.lang.Float>
  internalGetPredictions() {
    if (predictions_ == null) {
      return com.google.protobuf.MapField.emptyMapField(
          PredictionsDefaultEntryHolder.defaultEntry);
    }
    return predictions_;
  }

  public int getPredictionsCount() {
    return internalGetPredictions().getMap().size();
  }
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */

  @java.lang.Override
  public boolean containsPredictions(
      java.lang.String key) {
    if (key == null) { throw new NullPointerException("map key"); }
    return internalGetPredictions().getMap().containsKey(key);
  }
  /**
   * Use {@link #getPredictionsMap()} instead.
   */
  @java.lang.Override
  @java.lang.Deprecated
  public java.util.Map<java.lang.String, java.lang.Float> getPredictions() {
    return getPredictionsMap();
  }
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */
  @java.lang.Override

  public java.util.Map<java.lang.String, java.lang.Float> getPredictionsMap() {
    return internalGetPredictions().getMap();
  }
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */
  @java.lang.Override

  public float getPredictionsOrDefault(
      java.lang.String key,
      float defaultValue) {
    if (key == null) { throw new NullPointerException("map key"); }
    java.util.Map<java.lang.String, java.lang.Float> map =
        internalGetPredictions().getMap();
    return map.containsKey(key) ? map.get(key) : defaultValue;
  }
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */
  @java.lang.Override

  public float getPredictionsOrThrow(
      java.lang.String key) {
    if (key == null) { throw new NullPointerException("map key"); }
    java.util.Map<java.lang.String, java.lang.Float> map =
        internalGetPredictions().getMap();
    if (!map.containsKey(key)) {
      throw new java.lang.IllegalArgumentException();
    }
    return map.get(key);
  }

  public static final int EVALUATION_FIELD_NUMBER = 2;
  private static final class EvaluationDefaultEntryHolder {
    static final com.google.protobuf.MapEntry<
        java.lang.String, java.lang.Float> defaultEntry =
            com.google.protobuf.MapEntry
            .<java.lang.String, java.lang.Float>newDefaultInstance(
                eu.more2020.visual.grpc.GrpcProto.internal_static_Predictions_EvaluationEntry_descriptor, 
                com.google.protobuf.WireFormat.FieldType.STRING,
                "",
                com.google.protobuf.WireFormat.FieldType.FLOAT,
                0F);
  }
  private com.google.protobuf.MapField<
      java.lang.String, java.lang.Float> evaluation_;
  private com.google.protobuf.MapField<java.lang.String, java.lang.Float>
  internalGetEvaluation() {
    if (evaluation_ == null) {
      return com.google.protobuf.MapField.emptyMapField(
          EvaluationDefaultEntryHolder.defaultEntry);
    }
    return evaluation_;
  }

  public int getEvaluationCount() {
    return internalGetEvaluation().getMap().size();
  }
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */

  @java.lang.Override
  public boolean containsEvaluation(
      java.lang.String key) {
    if (key == null) { throw new NullPointerException("map key"); }
    return internalGetEvaluation().getMap().containsKey(key);
  }
  /**
   * Use {@link #getEvaluationMap()} instead.
   */
  @java.lang.Override
  @java.lang.Deprecated
  public java.util.Map<java.lang.String, java.lang.Float> getEvaluation() {
    return getEvaluationMap();
  }
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */
  @java.lang.Override

  public java.util.Map<java.lang.String, java.lang.Float> getEvaluationMap() {
    return internalGetEvaluation().getMap();
  }
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */
  @java.lang.Override

  public float getEvaluationOrDefault(
      java.lang.String key,
      float defaultValue) {
    if (key == null) { throw new NullPointerException("map key"); }
    java.util.Map<java.lang.String, java.lang.Float> map =
        internalGetEvaluation().getMap();
    return map.containsKey(key) ? map.get(key) : defaultValue;
  }
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */
  @java.lang.Override

  public float getEvaluationOrThrow(
      java.lang.String key) {
    if (key == null) { throw new NullPointerException("map key"); }
    java.util.Map<java.lang.String, java.lang.Float> map =
        internalGetEvaluation().getMap();
    if (!map.containsKey(key)) {
      throw new java.lang.IllegalArgumentException();
    }
    return map.get(key);
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
    com.google.protobuf.GeneratedMessageV3
      .serializeStringMapTo(
        output,
        internalGetPredictions(),
        PredictionsDefaultEntryHolder.defaultEntry,
        1);
    com.google.protobuf.GeneratedMessageV3
      .serializeStringMapTo(
        output,
        internalGetEvaluation(),
        EvaluationDefaultEntryHolder.defaultEntry,
        2);
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    for (java.util.Map.Entry<java.lang.String, java.lang.Float> entry
         : internalGetPredictions().getMap().entrySet()) {
      com.google.protobuf.MapEntry<java.lang.String, java.lang.Float>
      predictions__ = PredictionsDefaultEntryHolder.defaultEntry.newBuilderForType()
          .setKey(entry.getKey())
          .setValue(entry.getValue())
          .build();
      size += com.google.protobuf.CodedOutputStream
          .computeMessageSize(1, predictions__);
    }
    for (java.util.Map.Entry<java.lang.String, java.lang.Float> entry
         : internalGetEvaluation().getMap().entrySet()) {
      com.google.protobuf.MapEntry<java.lang.String, java.lang.Float>
      evaluation__ = EvaluationDefaultEntryHolder.defaultEntry.newBuilderForType()
          .setKey(entry.getKey())
          .setValue(entry.getValue())
          .build();
      size += com.google.protobuf.CodedOutputStream
          .computeMessageSize(2, evaluation__);
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
    if (!(obj instanceof eu.more2020.visual.grpc.Predictions)) {
      return super.equals(obj);
    }
    eu.more2020.visual.grpc.Predictions other = (eu.more2020.visual.grpc.Predictions) obj;

    if (!internalGetPredictions().equals(
        other.internalGetPredictions())) return false;
    if (!internalGetEvaluation().equals(
        other.internalGetEvaluation())) return false;
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
    if (!internalGetPredictions().getMap().isEmpty()) {
      hash = (37 * hash) + PREDICTIONS_FIELD_NUMBER;
      hash = (53 * hash) + internalGetPredictions().hashCode();
    }
    if (!internalGetEvaluation().getMap().isEmpty()) {
      hash = (37 * hash) + EVALUATION_FIELD_NUMBER;
      hash = (53 * hash) + internalGetEvaluation().hashCode();
    }
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static eu.more2020.visual.grpc.Predictions parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Predictions parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Predictions parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Predictions parseFrom(
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
  public static Builder newBuilder(eu.more2020.visual.grpc.Predictions prototype) {
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
   * Protobuf type {@code Predictions}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:Predictions)
      eu.more2020.visual.grpc.PredictionsOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Predictions_descriptor;
    }

    @SuppressWarnings({"rawtypes"})
    protected com.google.protobuf.MapField internalGetMapField(
        int number) {
      switch (number) {
        case 1:
          return internalGetPredictions();
        case 2:
          return internalGetEvaluation();
        default:
          throw new RuntimeException(
              "Invalid map field number: " + number);
      }
    }
    @SuppressWarnings({"rawtypes"})
    protected com.google.protobuf.MapField internalGetMutableMapField(
        int number) {
      switch (number) {
        case 1:
          return internalGetMutablePredictions();
        case 2:
          return internalGetMutableEvaluation();
        default:
          throw new RuntimeException(
              "Invalid map field number: " + number);
      }
    }
    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Predictions_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              eu.more2020.visual.grpc.Predictions.class, eu.more2020.visual.grpc.Predictions.Builder.class);
    }

    // Construct using eu.more2020.visual.grpc.Predictions.newBuilder()
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
      internalGetMutablePredictions().clear();
      internalGetMutableEvaluation().clear();
      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Predictions_descriptor;
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Predictions getDefaultInstanceForType() {
      return eu.more2020.visual.grpc.Predictions.getDefaultInstance();
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Predictions build() {
      eu.more2020.visual.grpc.Predictions result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Predictions buildPartial() {
      eu.more2020.visual.grpc.Predictions result = new eu.more2020.visual.grpc.Predictions(this);
      int from_bitField0_ = bitField0_;
      result.predictions_ = internalGetPredictions();
      result.predictions_.makeImmutable();
      result.evaluation_ = internalGetEvaluation();
      result.evaluation_.makeImmutable();
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
      if (other instanceof eu.more2020.visual.grpc.Predictions) {
        return mergeFrom((eu.more2020.visual.grpc.Predictions)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(eu.more2020.visual.grpc.Predictions other) {
      if (other == eu.more2020.visual.grpc.Predictions.getDefaultInstance()) return this;
      internalGetMutablePredictions().mergeFrom(
          other.internalGetPredictions());
      internalGetMutableEvaluation().mergeFrom(
          other.internalGetEvaluation());
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
      eu.more2020.visual.grpc.Predictions parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (eu.more2020.visual.grpc.Predictions) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }
    private int bitField0_;

    private com.google.protobuf.MapField<
        java.lang.String, java.lang.Float> predictions_;
    private com.google.protobuf.MapField<java.lang.String, java.lang.Float>
    internalGetPredictions() {
      if (predictions_ == null) {
        return com.google.protobuf.MapField.emptyMapField(
            PredictionsDefaultEntryHolder.defaultEntry);
      }
      return predictions_;
    }
    private com.google.protobuf.MapField<java.lang.String, java.lang.Float>
    internalGetMutablePredictions() {
      onChanged();;
      if (predictions_ == null) {
        predictions_ = com.google.protobuf.MapField.newMapField(
            PredictionsDefaultEntryHolder.defaultEntry);
      }
      if (!predictions_.isMutable()) {
        predictions_ = predictions_.copy();
      }
      return predictions_;
    }

    public int getPredictionsCount() {
      return internalGetPredictions().getMap().size();
    }
    /**
     * <pre>
     *  timestamp -&gt; prediction
     * </pre>
     *
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */

    @java.lang.Override
    public boolean containsPredictions(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      return internalGetPredictions().getMap().containsKey(key);
    }
    /**
     * Use {@link #getPredictionsMap()} instead.
     */
    @java.lang.Override
    @java.lang.Deprecated
    public java.util.Map<java.lang.String, java.lang.Float> getPredictions() {
      return getPredictionsMap();
    }
    /**
     * <pre>
     *  timestamp -&gt; prediction
     * </pre>
     *
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */
    @java.lang.Override

    public java.util.Map<java.lang.String, java.lang.Float> getPredictionsMap() {
      return internalGetPredictions().getMap();
    }
    /**
     * <pre>
     *  timestamp -&gt; prediction
     * </pre>
     *
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */
    @java.lang.Override

    public float getPredictionsOrDefault(
        java.lang.String key,
        float defaultValue) {
      if (key == null) { throw new NullPointerException("map key"); }
      java.util.Map<java.lang.String, java.lang.Float> map =
          internalGetPredictions().getMap();
      return map.containsKey(key) ? map.get(key) : defaultValue;
    }
    /**
     * <pre>
     *  timestamp -&gt; prediction
     * </pre>
     *
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */
    @java.lang.Override

    public float getPredictionsOrThrow(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      java.util.Map<java.lang.String, java.lang.Float> map =
          internalGetPredictions().getMap();
      if (!map.containsKey(key)) {
        throw new java.lang.IllegalArgumentException();
      }
      return map.get(key);
    }

    public Builder clearPredictions() {
      internalGetMutablePredictions().getMutableMap()
          .clear();
      return this;
    }
    /**
     * <pre>
     *  timestamp -&gt; prediction
     * </pre>
     *
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */

    public Builder removePredictions(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      internalGetMutablePredictions().getMutableMap()
          .remove(key);
      return this;
    }
    /**
     * Use alternate mutation accessors instead.
     */
    @java.lang.Deprecated
    public java.util.Map<java.lang.String, java.lang.Float>
    getMutablePredictions() {
      return internalGetMutablePredictions().getMutableMap();
    }
    /**
     * <pre>
     *  timestamp -&gt; prediction
     * </pre>
     *
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */
    public Builder putPredictions(
        java.lang.String key,
        float value) {
      if (key == null) { throw new NullPointerException("map key"); }
      
      internalGetMutablePredictions().getMutableMap()
          .put(key, value);
      return this;
    }
    /**
     * <pre>
     *  timestamp -&gt; prediction
     * </pre>
     *
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */

    public Builder putAllPredictions(
        java.util.Map<java.lang.String, java.lang.Float> values) {
      internalGetMutablePredictions().getMutableMap()
          .putAll(values);
      return this;
    }

    private com.google.protobuf.MapField<
        java.lang.String, java.lang.Float> evaluation_;
    private com.google.protobuf.MapField<java.lang.String, java.lang.Float>
    internalGetEvaluation() {
      if (evaluation_ == null) {
        return com.google.protobuf.MapField.emptyMapField(
            EvaluationDefaultEntryHolder.defaultEntry);
      }
      return evaluation_;
    }
    private com.google.protobuf.MapField<java.lang.String, java.lang.Float>
    internalGetMutableEvaluation() {
      onChanged();;
      if (evaluation_ == null) {
        evaluation_ = com.google.protobuf.MapField.newMapField(
            EvaluationDefaultEntryHolder.defaultEntry);
      }
      if (!evaluation_.isMutable()) {
        evaluation_ = evaluation_.copy();
      }
      return evaluation_;
    }

    public int getEvaluationCount() {
      return internalGetEvaluation().getMap().size();
    }
    /**
     * <code>map&lt;string, float&gt; evaluation = 2;</code>
     */

    @java.lang.Override
    public boolean containsEvaluation(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      return internalGetEvaluation().getMap().containsKey(key);
    }
    /**
     * Use {@link #getEvaluationMap()} instead.
     */
    @java.lang.Override
    @java.lang.Deprecated
    public java.util.Map<java.lang.String, java.lang.Float> getEvaluation() {
      return getEvaluationMap();
    }
    /**
     * <code>map&lt;string, float&gt; evaluation = 2;</code>
     */
    @java.lang.Override

    public java.util.Map<java.lang.String, java.lang.Float> getEvaluationMap() {
      return internalGetEvaluation().getMap();
    }
    /**
     * <code>map&lt;string, float&gt; evaluation = 2;</code>
     */
    @java.lang.Override

    public float getEvaluationOrDefault(
        java.lang.String key,
        float defaultValue) {
      if (key == null) { throw new NullPointerException("map key"); }
      java.util.Map<java.lang.String, java.lang.Float> map =
          internalGetEvaluation().getMap();
      return map.containsKey(key) ? map.get(key) : defaultValue;
    }
    /**
     * <code>map&lt;string, float&gt; evaluation = 2;</code>
     */
    @java.lang.Override

    public float getEvaluationOrThrow(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      java.util.Map<java.lang.String, java.lang.Float> map =
          internalGetEvaluation().getMap();
      if (!map.containsKey(key)) {
        throw new java.lang.IllegalArgumentException();
      }
      return map.get(key);
    }

    public Builder clearEvaluation() {
      internalGetMutableEvaluation().getMutableMap()
          .clear();
      return this;
    }
    /**
     * <code>map&lt;string, float&gt; evaluation = 2;</code>
     */

    public Builder removeEvaluation(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      internalGetMutableEvaluation().getMutableMap()
          .remove(key);
      return this;
    }
    /**
     * Use alternate mutation accessors instead.
     */
    @java.lang.Deprecated
    public java.util.Map<java.lang.String, java.lang.Float>
    getMutableEvaluation() {
      return internalGetMutableEvaluation().getMutableMap();
    }
    /**
     * <code>map&lt;string, float&gt; evaluation = 2;</code>
     */
    public Builder putEvaluation(
        java.lang.String key,
        float value) {
      if (key == null) { throw new NullPointerException("map key"); }
      
      internalGetMutableEvaluation().getMutableMap()
          .put(key, value);
      return this;
    }
    /**
     * <code>map&lt;string, float&gt; evaluation = 2;</code>
     */

    public Builder putAllEvaluation(
        java.util.Map<java.lang.String, java.lang.Float> values) {
      internalGetMutableEvaluation().getMutableMap()
          .putAll(values);
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


    // @@protoc_insertion_point(builder_scope:Predictions)
  }

  // @@protoc_insertion_point(class_scope:Predictions)
  private static final eu.more2020.visual.grpc.Predictions DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new eu.more2020.visual.grpc.Predictions();
  }

  public static eu.more2020.visual.grpc.Predictions getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<Predictions>
      PARSER = new com.google.protobuf.AbstractParser<Predictions>() {
    @java.lang.Override
    public Predictions parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new Predictions(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<Predictions> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<Predictions> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public eu.more2020.visual.grpc.Predictions getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

