// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: helloworld.proto

package eu.more2020.visual.grpc;

/**
 * Protobuf type {@code Inference}
 */
public final class Inference extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:Inference)
    InferenceOrBuilder {
private static final long serialVersionUID = 0L;
  // Use Inference.newBuilder() to construct.
  private Inference(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private Inference() {
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new Inference();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private Inference(
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
    return eu.more2020.visual.grpc.GrpcProto.internal_static_Inference_descriptor;
  }

  @SuppressWarnings({"rawtypes"})
  @java.lang.Override
  protected com.google.protobuf.MapField internalGetMapField(
      int number) {
    switch (number) {
      case 1:
        return internalGetPredictions();
      default:
        throw new RuntimeException(
            "Invalid map field number: " + number);
    }
  }
  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return eu.more2020.visual.grpc.GrpcProto.internal_static_Inference_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            eu.more2020.visual.grpc.Inference.class, eu.more2020.visual.grpc.Inference.Builder.class);
  }

  public static final int PREDICTIONS_FIELD_NUMBER = 1;
  private static final class PredictionsDefaultEntryHolder {
    static final com.google.protobuf.MapEntry<
        java.lang.String, java.lang.Float> defaultEntry =
            com.google.protobuf.MapEntry
            .<java.lang.String, java.lang.Float>newDefaultInstance(
                eu.more2020.visual.grpc.GrpcProto.internal_static_Inference_PredictionsEntry_descriptor, 
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
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */
  @java.lang.Override

  public java.util.Map<java.lang.String, java.lang.Float> getPredictionsMap() {
    return internalGetPredictions().getMap();
  }
  /**
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
    size += unknownFields.getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof eu.more2020.visual.grpc.Inference)) {
      return super.equals(obj);
    }
    eu.more2020.visual.grpc.Inference other = (eu.more2020.visual.grpc.Inference) obj;

    if (!internalGetPredictions().equals(
        other.internalGetPredictions())) return false;
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
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static eu.more2020.visual.grpc.Inference parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Inference parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Inference parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Inference parseFrom(
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
  public static Builder newBuilder(eu.more2020.visual.grpc.Inference prototype) {
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
   * Protobuf type {@code Inference}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:Inference)
      eu.more2020.visual.grpc.InferenceOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Inference_descriptor;
    }

    @SuppressWarnings({"rawtypes"})
    protected com.google.protobuf.MapField internalGetMapField(
        int number) {
      switch (number) {
        case 1:
          return internalGetPredictions();
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
        default:
          throw new RuntimeException(
              "Invalid map field number: " + number);
      }
    }
    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Inference_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              eu.more2020.visual.grpc.Inference.class, eu.more2020.visual.grpc.Inference.Builder.class);
    }

    // Construct using eu.more2020.visual.grpc.Inference.newBuilder()
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
      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Inference_descriptor;
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Inference getDefaultInstanceForType() {
      return eu.more2020.visual.grpc.Inference.getDefaultInstance();
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Inference build() {
      eu.more2020.visual.grpc.Inference result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Inference buildPartial() {
      eu.more2020.visual.grpc.Inference result = new eu.more2020.visual.grpc.Inference(this);
      int from_bitField0_ = bitField0_;
      result.predictions_ = internalGetPredictions();
      result.predictions_.makeImmutable();
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
      if (other instanceof eu.more2020.visual.grpc.Inference) {
        return mergeFrom((eu.more2020.visual.grpc.Inference)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(eu.more2020.visual.grpc.Inference other) {
      if (other == eu.more2020.visual.grpc.Inference.getDefaultInstance()) return this;
      internalGetMutablePredictions().mergeFrom(
          other.internalGetPredictions());
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
      eu.more2020.visual.grpc.Inference parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (eu.more2020.visual.grpc.Inference) e.getUnfinishedMessage();
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
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */
    @java.lang.Override

    public java.util.Map<java.lang.String, java.lang.Float> getPredictionsMap() {
      return internalGetPredictions().getMap();
    }
    /**
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
     * <code>map&lt;string, float&gt; predictions = 1;</code>
     */

    public Builder putAllPredictions(
        java.util.Map<java.lang.String, java.lang.Float> values) {
      internalGetMutablePredictions().getMutableMap()
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


    // @@protoc_insertion_point(builder_scope:Inference)
  }

  // @@protoc_insertion_point(class_scope:Inference)
  private static final eu.more2020.visual.grpc.Inference DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new eu.more2020.visual.grpc.Inference();
  }

  public static eu.more2020.visual.grpc.Inference getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<Inference>
      PARSER = new com.google.protobuf.AbstractParser<Inference>() {
    @java.lang.Override
    public Inference parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new Inference(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<Inference> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<Inference> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public eu.more2020.visual.grpc.Inference getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

