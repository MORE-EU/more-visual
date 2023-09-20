// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: forecasting.proto

package eu.more2020.visual.grpc;

/**
 * Protobuf type {@code Results}
 */
public final class Results extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:Results)
    ResultsOrBuilder {
private static final long serialVersionUID = 0L;
  // Use Results.newBuilder() to construct.
  private Results(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private Results() {
    target_ = "";
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new Results();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private Results(
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

            target_ = s;
            break;
          }
          case 18: {
            if (!((mutable_bitField0_ & 0x00000001) != 0)) {
              metrics_ = com.google.protobuf.MapField.newMapField(
                  MetricsDefaultEntryHolder.defaultEntry);
              mutable_bitField0_ |= 0x00000001;
            }
            com.google.protobuf.MapEntry<java.lang.String, eu.more2020.visual.grpc.Predictions>
            metrics__ = input.readMessage(
                MetricsDefaultEntryHolder.defaultEntry.getParserForType(), extensionRegistry);
            metrics_.getMutableMap().put(
                metrics__.getKey(), metrics__.getValue());
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
    return eu.more2020.visual.grpc.GrpcProto.internal_static_Results_descriptor;
  }

  @SuppressWarnings({"rawtypes"})
  @java.lang.Override
  protected com.google.protobuf.MapField internalGetMapField(
      int number) {
    switch (number) {
      case 2:
        return internalGetMetrics();
      default:
        throw new RuntimeException(
            "Invalid map field number: " + number);
    }
  }
  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return eu.more2020.visual.grpc.GrpcProto.internal_static_Results_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            eu.more2020.visual.grpc.Results.class, eu.more2020.visual.grpc.Results.Builder.class);
  }

  public static final int TARGET_FIELD_NUMBER = 1;
  private volatile java.lang.Object target_;
  /**
   * <code>string target = 1;</code>
   * @return The target.
   */
  @java.lang.Override
  public java.lang.String getTarget() {
    java.lang.Object ref = target_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = 
          (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      target_ = s;
      return s;
    }
  }
  /**
   * <code>string target = 1;</code>
   * @return The bytes for target.
   */
  @java.lang.Override
  public com.google.protobuf.ByteString
      getTargetBytes() {
    java.lang.Object ref = target_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = 
          com.google.protobuf.ByteString.copyFromUtf8(
              (java.lang.String) ref);
      target_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
  }

  public static final int METRICS_FIELD_NUMBER = 2;
  private static final class MetricsDefaultEntryHolder {
    static final com.google.protobuf.MapEntry<
        java.lang.String, eu.more2020.visual.grpc.Predictions> defaultEntry =
            com.google.protobuf.MapEntry
            .<java.lang.String, eu.more2020.visual.grpc.Predictions>newDefaultInstance(
                eu.more2020.visual.grpc.GrpcProto.internal_static_Results_MetricsEntry_descriptor, 
                com.google.protobuf.WireFormat.FieldType.STRING,
                "",
                com.google.protobuf.WireFormat.FieldType.MESSAGE,
                eu.more2020.visual.grpc.Predictions.getDefaultInstance());
  }
  private com.google.protobuf.MapField<
      java.lang.String, eu.more2020.visual.grpc.Predictions> metrics_;
  private com.google.protobuf.MapField<java.lang.String, eu.more2020.visual.grpc.Predictions>
  internalGetMetrics() {
    if (metrics_ == null) {
      return com.google.protobuf.MapField.emptyMapField(
          MetricsDefaultEntryHolder.defaultEntry);
    }
    return metrics_;
  }

  public int getMetricsCount() {
    return internalGetMetrics().getMap().size();
  }
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
   */

  @java.lang.Override
  public boolean containsMetrics(
      java.lang.String key) {
    if (key == null) { throw new NullPointerException("map key"); }
    return internalGetMetrics().getMap().containsKey(key);
  }
  /**
   * Use {@link #getMetricsMap()} instead.
   */
  @java.lang.Override
  @java.lang.Deprecated
  public java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> getMetrics() {
    return getMetricsMap();
  }
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
   */
  @java.lang.Override

  public java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> getMetricsMap() {
    return internalGetMetrics().getMap();
  }
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
   */
  @java.lang.Override

  public eu.more2020.visual.grpc.Predictions getMetricsOrDefault(
      java.lang.String key,
      eu.more2020.visual.grpc.Predictions defaultValue) {
    if (key == null) { throw new NullPointerException("map key"); }
    java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> map =
        internalGetMetrics().getMap();
    return map.containsKey(key) ? map.get(key) : defaultValue;
  }
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
   */
  @java.lang.Override

  public eu.more2020.visual.grpc.Predictions getMetricsOrThrow(
      java.lang.String key) {
    if (key == null) { throw new NullPointerException("map key"); }
    java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> map =
        internalGetMetrics().getMap();
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
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(target_)) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 1, target_);
    }
    com.google.protobuf.GeneratedMessageV3
      .serializeStringMapTo(
        output,
        internalGetMetrics(),
        MetricsDefaultEntryHolder.defaultEntry,
        2);
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(target_)) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(1, target_);
    }
    for (java.util.Map.Entry<java.lang.String, eu.more2020.visual.grpc.Predictions> entry
         : internalGetMetrics().getMap().entrySet()) {
      com.google.protobuf.MapEntry<java.lang.String, eu.more2020.visual.grpc.Predictions>
      metrics__ = MetricsDefaultEntryHolder.defaultEntry.newBuilderForType()
          .setKey(entry.getKey())
          .setValue(entry.getValue())
          .build();
      size += com.google.protobuf.CodedOutputStream
          .computeMessageSize(2, metrics__);
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
    if (!(obj instanceof eu.more2020.visual.grpc.Results)) {
      return super.equals(obj);
    }
    eu.more2020.visual.grpc.Results other = (eu.more2020.visual.grpc.Results) obj;

    if (!getTarget()
        .equals(other.getTarget())) return false;
    if (!internalGetMetrics().equals(
        other.internalGetMetrics())) return false;
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
    hash = (37 * hash) + TARGET_FIELD_NUMBER;
    hash = (53 * hash) + getTarget().hashCode();
    if (!internalGetMetrics().getMap().isEmpty()) {
      hash = (37 * hash) + METRICS_FIELD_NUMBER;
      hash = (53 * hash) + internalGetMetrics().hashCode();
    }
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static eu.more2020.visual.grpc.Results parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Results parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Results parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.grpc.Results parseFrom(
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
  public static Builder newBuilder(eu.more2020.visual.grpc.Results prototype) {
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
   * Protobuf type {@code Results}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:Results)
      eu.more2020.visual.grpc.ResultsOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Results_descriptor;
    }

    @SuppressWarnings({"rawtypes"})
    protected com.google.protobuf.MapField internalGetMapField(
        int number) {
      switch (number) {
        case 2:
          return internalGetMetrics();
        default:
          throw new RuntimeException(
              "Invalid map field number: " + number);
      }
    }
    @SuppressWarnings({"rawtypes"})
    protected com.google.protobuf.MapField internalGetMutableMapField(
        int number) {
      switch (number) {
        case 2:
          return internalGetMutableMetrics();
        default:
          throw new RuntimeException(
              "Invalid map field number: " + number);
      }
    }
    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Results_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              eu.more2020.visual.grpc.Results.class, eu.more2020.visual.grpc.Results.Builder.class);
    }

    // Construct using eu.more2020.visual.grpc.Results.newBuilder()
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
      target_ = "";

      internalGetMutableMetrics().clear();
      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return eu.more2020.visual.grpc.GrpcProto.internal_static_Results_descriptor;
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Results getDefaultInstanceForType() {
      return eu.more2020.visual.grpc.Results.getDefaultInstance();
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Results build() {
      eu.more2020.visual.grpc.Results result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public eu.more2020.visual.grpc.Results buildPartial() {
      eu.more2020.visual.grpc.Results result = new eu.more2020.visual.grpc.Results(this);
      int from_bitField0_ = bitField0_;
      result.target_ = target_;
      result.metrics_ = internalGetMetrics();
      result.metrics_.makeImmutable();
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
      if (other instanceof eu.more2020.visual.grpc.Results) {
        return mergeFrom((eu.more2020.visual.grpc.Results)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(eu.more2020.visual.grpc.Results other) {
      if (other == eu.more2020.visual.grpc.Results.getDefaultInstance()) return this;
      if (!other.getTarget().isEmpty()) {
        target_ = other.target_;
        onChanged();
      }
      internalGetMutableMetrics().mergeFrom(
          other.internalGetMetrics());
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
      eu.more2020.visual.grpc.Results parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (eu.more2020.visual.grpc.Results) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }
    private int bitField0_;

    private java.lang.Object target_ = "";
    /**
     * <code>string target = 1;</code>
     * @return The target.
     */
    public java.lang.String getTarget() {
      java.lang.Object ref = target_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs =
            (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        target_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }
    /**
     * <code>string target = 1;</code>
     * @return The bytes for target.
     */
    public com.google.protobuf.ByteString
        getTargetBytes() {
      java.lang.Object ref = target_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = 
            com.google.protobuf.ByteString.copyFromUtf8(
                (java.lang.String) ref);
        target_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    /**
     * <code>string target = 1;</code>
     * @param value The target to set.
     * @return This builder for chaining.
     */
    public Builder setTarget(
        java.lang.String value) {
      if (value == null) {
    throw new NullPointerException();
  }
  
      target_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>string target = 1;</code>
     * @return This builder for chaining.
     */
    public Builder clearTarget() {
      
      target_ = getDefaultInstance().getTarget();
      onChanged();
      return this;
    }
    /**
     * <code>string target = 1;</code>
     * @param value The bytes for target to set.
     * @return This builder for chaining.
     */
    public Builder setTargetBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
    throw new NullPointerException();
  }
  checkByteStringIsUtf8(value);
      
      target_ = value;
      onChanged();
      return this;
    }

    private com.google.protobuf.MapField<
        java.lang.String, eu.more2020.visual.grpc.Predictions> metrics_;
    private com.google.protobuf.MapField<java.lang.String, eu.more2020.visual.grpc.Predictions>
    internalGetMetrics() {
      if (metrics_ == null) {
        return com.google.protobuf.MapField.emptyMapField(
            MetricsDefaultEntryHolder.defaultEntry);
      }
      return metrics_;
    }
    private com.google.protobuf.MapField<java.lang.String, eu.more2020.visual.grpc.Predictions>
    internalGetMutableMetrics() {
      onChanged();;
      if (metrics_ == null) {
        metrics_ = com.google.protobuf.MapField.newMapField(
            MetricsDefaultEntryHolder.defaultEntry);
      }
      if (!metrics_.isMutable()) {
        metrics_ = metrics_.copy();
      }
      return metrics_;
    }

    public int getMetricsCount() {
      return internalGetMetrics().getMap().size();
    }
    /**
     * <pre>
     * string = model name
     * </pre>
     *
     * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
     */

    @java.lang.Override
    public boolean containsMetrics(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      return internalGetMetrics().getMap().containsKey(key);
    }
    /**
     * Use {@link #getMetricsMap()} instead.
     */
    @java.lang.Override
    @java.lang.Deprecated
    public java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> getMetrics() {
      return getMetricsMap();
    }
    /**
     * <pre>
     * string = model name
     * </pre>
     *
     * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
     */
    @java.lang.Override

    public java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> getMetricsMap() {
      return internalGetMetrics().getMap();
    }
    /**
     * <pre>
     * string = model name
     * </pre>
     *
     * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
     */
    @java.lang.Override

    public eu.more2020.visual.grpc.Predictions getMetricsOrDefault(
        java.lang.String key,
        eu.more2020.visual.grpc.Predictions defaultValue) {
      if (key == null) { throw new NullPointerException("map key"); }
      java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> map =
          internalGetMetrics().getMap();
      return map.containsKey(key) ? map.get(key) : defaultValue;
    }
    /**
     * <pre>
     * string = model name
     * </pre>
     *
     * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
     */
    @java.lang.Override

    public eu.more2020.visual.grpc.Predictions getMetricsOrThrow(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> map =
          internalGetMetrics().getMap();
      if (!map.containsKey(key)) {
        throw new java.lang.IllegalArgumentException();
      }
      return map.get(key);
    }

    public Builder clearMetrics() {
      internalGetMutableMetrics().getMutableMap()
          .clear();
      return this;
    }
    /**
     * <pre>
     * string = model name
     * </pre>
     *
     * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
     */

    public Builder removeMetrics(
        java.lang.String key) {
      if (key == null) { throw new NullPointerException("map key"); }
      internalGetMutableMetrics().getMutableMap()
          .remove(key);
      return this;
    }
    /**
     * Use alternate mutation accessors instead.
     */
    @java.lang.Deprecated
    public java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions>
    getMutableMetrics() {
      return internalGetMutableMetrics().getMutableMap();
    }
    /**
     * <pre>
     * string = model name
     * </pre>
     *
     * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
     */
    public Builder putMetrics(
        java.lang.String key,
        eu.more2020.visual.grpc.Predictions value) {
      if (key == null) { throw new NullPointerException("map key"); }
      if (value == null) {
  throw new NullPointerException("map value");
}

      internalGetMutableMetrics().getMutableMap()
          .put(key, value);
      return this;
    }
    /**
     * <pre>
     * string = model name
     * </pre>
     *
     * <code>map&lt;string, .Predictions&gt; metrics = 2;</code>
     */

    public Builder putAllMetrics(
        java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions> values) {
      internalGetMutableMetrics().getMutableMap()
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


    // @@protoc_insertion_point(builder_scope:Results)
  }

  // @@protoc_insertion_point(class_scope:Results)
  private static final eu.more2020.visual.grpc.Results DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new eu.more2020.visual.grpc.Results();
  }

  public static eu.more2020.visual.grpc.Results getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<Results>
      PARSER = new com.google.protobuf.AbstractParser<Results>() {
    @java.lang.Override
    public Results parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new Results(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<Results> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<Results> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public eu.more2020.visual.grpc.Results getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

