// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: forecasting.proto

package eu.more2020.visual.grpc;

public interface PredictionsOrBuilder extends
    // @@protoc_insertion_point(interface_extends:Predictions)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */
  int getPredictionsCount();
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */
  boolean containsPredictions(
      java.lang.String key);
  /**
   * Use {@link #getPredictionsMap()} instead.
   */
  @java.lang.Deprecated
  java.util.Map<java.lang.String, java.lang.Float>
  getPredictions();
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */
  java.util.Map<java.lang.String, java.lang.Float>
  getPredictionsMap();
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */

  float getPredictionsOrDefault(
      java.lang.String key,
      float defaultValue);
  /**
   * <pre>
   *  timestamp -&gt; prediction
   * </pre>
   *
   * <code>map&lt;string, float&gt; predictions = 1;</code>
   */

  float getPredictionsOrThrow(
      java.lang.String key);

  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */
  int getEvaluationCount();
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */
  boolean containsEvaluation(
      java.lang.String key);
  /**
   * Use {@link #getEvaluationMap()} instead.
   */
  @java.lang.Deprecated
  java.util.Map<java.lang.String, java.lang.Float>
  getEvaluation();
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */
  java.util.Map<java.lang.String, java.lang.Float>
  getEvaluationMap();
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */

  float getEvaluationOrDefault(
      java.lang.String key,
      float defaultValue);
  /**
   * <code>map&lt;string, float&gt; evaluation = 2;</code>
   */

  float getEvaluationOrThrow(
      java.lang.String key);
}
