// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: helloworld.proto

package eu.more2020.visual.grpc;

public interface ProgressOrBuilder extends
    // @@protoc_insertion_point(interface_extends:eu.more2020.visual.grpc.Progress)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string id = 1;</code>
   * @return The id.
   */
  java.lang.String getId();
  /**
   * <code>string id = 1;</code>
   * @return The bytes for id.
   */
  com.google.protobuf.ByteString
      getIdBytes();

  /**
   * <code>map&lt;string, string&gt; data = 2;</code>
   */
  int getDataCount();
  /**
   * <code>map&lt;string, string&gt; data = 2;</code>
   */
  boolean containsData(
      java.lang.String key);
  /**
   * Use {@link #getDataMap()} instead.
   */
  @java.lang.Deprecated
  java.util.Map<java.lang.String, java.lang.String>
  getData();
  /**
   * <code>map&lt;string, string&gt; data = 2;</code>
   */
  java.util.Map<java.lang.String, java.lang.String>
  getDataMap();
  /**
   * <code>map&lt;string, string&gt; data = 2;</code>
   */

  java.lang.String getDataOrDefault(
      java.lang.String key,
      java.lang.String defaultValue);
  /**
   * <code>map&lt;string, string&gt; data = 2;</code>
   */

  java.lang.String getDataOrThrow(
      java.lang.String key);
}
