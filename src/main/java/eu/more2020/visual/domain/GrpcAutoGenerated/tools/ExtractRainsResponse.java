// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: tools.proto

package eu.more2020.visual.domain.GrpcAutoGenerated.tools;

/**
 * Protobuf type {@code ExtractRainsResponse}
 */
public final class ExtractRainsResponse extends
    com.google.protobuf.GeneratedMessageV3 implements
    // @@protoc_insertion_point(message_implements:ExtractRainsResponse)
    ExtractRainsResponseOrBuilder {
private static final long serialVersionUID = 0L;
  // Use ExtractRainsResponse.newBuilder() to construct.
  private ExtractRainsResponse(com.google.protobuf.GeneratedMessageV3.Builder<?> builder) {
    super(builder);
  }
  private ExtractRainsResponse() {
    result_ = "";
  }

  @java.lang.Override
  @SuppressWarnings({"unused"})
  protected java.lang.Object newInstance(
      UnusedPrivateParameter unused) {
    return new ExtractRainsResponse();
  }

  @java.lang.Override
  public final com.google.protobuf.UnknownFieldSet
  getUnknownFields() {
    return this.unknownFields;
  }
  private ExtractRainsResponse(
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

            result_ = s;
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
    return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_ExtractRainsResponse_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_ExtractRainsResponse_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse.class, eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse.Builder.class);
  }

  public static final int RESULT_FIELD_NUMBER = 1;
  private volatile java.lang.Object result_;
  /**
   * <code>string result = 1;</code>
   * @return The result.
   */
  @java.lang.Override
  public java.lang.String getResult() {
    java.lang.Object ref = result_;
    if (ref instanceof java.lang.String) {
      return (java.lang.String) ref;
    } else {
      com.google.protobuf.ByteString bs = 
          (com.google.protobuf.ByteString) ref;
      java.lang.String s = bs.toStringUtf8();
      result_ = s;
      return s;
    }
  }
  /**
   * <code>string result = 1;</code>
   * @return The bytes for result.
   */
  @java.lang.Override
  public com.google.protobuf.ByteString
      getResultBytes() {
    java.lang.Object ref = result_;
    if (ref instanceof java.lang.String) {
      com.google.protobuf.ByteString b = 
          com.google.protobuf.ByteString.copyFromUtf8(
              (java.lang.String) ref);
      result_ = b;
      return b;
    } else {
      return (com.google.protobuf.ByteString) ref;
    }
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
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(result_)) {
      com.google.protobuf.GeneratedMessageV3.writeString(output, 1, result_);
    }
    unknownFields.writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (!com.google.protobuf.GeneratedMessageV3.isStringEmpty(result_)) {
      size += com.google.protobuf.GeneratedMessageV3.computeStringSize(1, result_);
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
    if (!(obj instanceof eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse)) {
      return super.equals(obj);
    }
    eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse other = (eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse) obj;

    if (!getResult()
        .equals(other.getResult())) return false;
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
    hash = (37 * hash) + RESULT_FIELD_NUMBER;
    hash = (53 * hash) + getResult().hashCode();
    hash = (29 * hash) + unknownFields.hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessageV3
        .parseWithIOException(PARSER, input);
  }
  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parseFrom(
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
  public static Builder newBuilder(eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse prototype) {
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
   * Protobuf type {@code ExtractRainsResponse}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessageV3.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:ExtractRainsResponse)
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponseOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_ExtractRainsResponse_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_ExtractRainsResponse_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse.class, eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse.Builder.class);
    }

    // Construct using eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse.newBuilder()
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
      result_ = "";

      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.GrpcProto.internal_static_ExtractRainsResponse_descriptor;
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse getDefaultInstanceForType() {
      return eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse.getDefaultInstance();
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse build() {
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse buildPartial() {
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse result = new eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse(this);
      result.result_ = result_;
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
      if (other instanceof eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse) {
        return mergeFrom((eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse other) {
      if (other == eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse.getDefaultInstance()) return this;
      if (!other.getResult().isEmpty()) {
        result_ = other.result_;
        onChanged();
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
      eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse parsedMessage = null;
      try {
        parsedMessage = PARSER.parsePartialFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        parsedMessage = (eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse) e.getUnfinishedMessage();
        throw e.unwrapIOException();
      } finally {
        if (parsedMessage != null) {
          mergeFrom(parsedMessage);
        }
      }
      return this;
    }

    private java.lang.Object result_ = "";
    /**
     * <code>string result = 1;</code>
     * @return The result.
     */
    public java.lang.String getResult() {
      java.lang.Object ref = result_;
      if (!(ref instanceof java.lang.String)) {
        com.google.protobuf.ByteString bs =
            (com.google.protobuf.ByteString) ref;
        java.lang.String s = bs.toStringUtf8();
        result_ = s;
        return s;
      } else {
        return (java.lang.String) ref;
      }
    }
    /**
     * <code>string result = 1;</code>
     * @return The bytes for result.
     */
    public com.google.protobuf.ByteString
        getResultBytes() {
      java.lang.Object ref = result_;
      if (ref instanceof String) {
        com.google.protobuf.ByteString b = 
            com.google.protobuf.ByteString.copyFromUtf8(
                (java.lang.String) ref);
        result_ = b;
        return b;
      } else {
        return (com.google.protobuf.ByteString) ref;
      }
    }
    /**
     * <code>string result = 1;</code>
     * @param value The result to set.
     * @return This builder for chaining.
     */
    public Builder setResult(
        java.lang.String value) {
      if (value == null) {
    throw new NullPointerException();
  }
  
      result_ = value;
      onChanged();
      return this;
    }
    /**
     * <code>string result = 1;</code>
     * @return This builder for chaining.
     */
    public Builder clearResult() {
      
      result_ = getDefaultInstance().getResult();
      onChanged();
      return this;
    }
    /**
     * <code>string result = 1;</code>
     * @param value The bytes for result to set.
     * @return This builder for chaining.
     */
    public Builder setResultBytes(
        com.google.protobuf.ByteString value) {
      if (value == null) {
    throw new NullPointerException();
  }
  checkByteStringIsUtf8(value);
      
      result_ = value;
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


    // @@protoc_insertion_point(builder_scope:ExtractRainsResponse)
  }

  // @@protoc_insertion_point(class_scope:ExtractRainsResponse)
  private static final eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse();
  }

  public static eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<ExtractRainsResponse>
      PARSER = new com.google.protobuf.AbstractParser<ExtractRainsResponse>() {
    @java.lang.Override
    public ExtractRainsResponse parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      return new ExtractRainsResponse(input, extensionRegistry);
    }
  };

  public static com.google.protobuf.Parser<ExtractRainsResponse> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<ExtractRainsResponse> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public eu.more2020.visual.domain.GrpcAutoGenerated.tools.ExtractRainsResponse getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}

