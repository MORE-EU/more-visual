// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: athForecasting.proto

package eu.more2020.visual.domain.GrpcAutoGenerated.AthenaForecasting;

public interface HandleDataResponseOrBuilder extends
    // @@protoc_insertion_point(interface_extends:csv_service.HandleDataResponse)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>map&lt;string, float&gt; results = 1;</code>
   */
  int getResultsCount();
  /**
   * <code>map&lt;string, float&gt; results = 1;</code>
   */
  boolean containsResults(
      java.lang.String key);
  /**
   * Use {@link #getResultsMap()} instead.
   */
  @java.lang.Deprecated
  java.util.Map<java.lang.String, java.lang.Float>
  getResults();
  /**
   * <code>map&lt;string, float&gt; results = 1;</code>
   */
  java.util.Map<java.lang.String, java.lang.Float>
  getResultsMap();
  /**
   * <code>map&lt;string, float&gt; results = 1;</code>
   */

  float getResultsOrDefault(
      java.lang.String key,
      float defaultValue);
  /**
   * <code>map&lt;string, float&gt; results = 1;</code>
   */

  float getResultsOrThrow(
      java.lang.String key);
}
