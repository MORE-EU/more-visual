// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: helloworld.proto

package eu.more2020.visual.grpc;

public interface ResultsOrBuilder extends
    // @@protoc_insertion_point(interface_extends:eu.more2020.visual.grpc.Results)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string target = 1;</code>
   * @return The target.
   */
  java.lang.String getTarget();
  /**
   * <code>string target = 1;</code>
   * @return The bytes for target.
   */
  com.google.protobuf.ByteString
      getTargetBytes();

  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .eu.more2020.visual.grpc.Predictions&gt; metrics = 2;</code>
   */
  int getMetricsCount();
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .eu.more2020.visual.grpc.Predictions&gt; metrics = 2;</code>
   */
  boolean containsMetrics(
      java.lang.String key);
  /**
   * Use {@link #getMetricsMap()} instead.
   */
  @java.lang.Deprecated
  java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions>
  getMetrics();
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .eu.more2020.visual.grpc.Predictions&gt; metrics = 2;</code>
   */
  java.util.Map<java.lang.String, eu.more2020.visual.grpc.Predictions>
  getMetricsMap();
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .eu.more2020.visual.grpc.Predictions&gt; metrics = 2;</code>
   */

  eu.more2020.visual.grpc.Predictions getMetricsOrDefault(
      java.lang.String key,
      eu.more2020.visual.grpc.Predictions defaultValue);
  /**
   * <pre>
   * string = model name
   * </pre>
   *
   * <code>map&lt;string, .eu.more2020.visual.grpc.Predictions&gt; metrics = 2;</code>
   */

  eu.more2020.visual.grpc.Predictions getMetricsOrThrow(
      java.lang.String key);
}
