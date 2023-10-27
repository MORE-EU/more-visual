// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: tools.proto

package eu.more2020.visual.domain.GrpcAutoGenerated.tools;

public interface CalculatePowerIndexRequestOrBuilder extends
    // @@protoc_insertion_point(interface_extends:CalculatePowerIndexRequest)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string dataset_id = 1;</code>
   * @return The datasetId.
   */
  java.lang.String getDatasetId();
  /**
   * <code>string dataset_id = 1;</code>
   * @return The bytes for datasetId.
   */
  com.google.protobuf.ByteString
      getDatasetIdBytes();

  /**
   * <code>string start_date = 2;</code>
   * @return The startDate.
   */
  java.lang.String getStartDate();
  /**
   * <code>string start_date = 2;</code>
   * @return The bytes for startDate.
   */
  com.google.protobuf.ByteString
      getStartDateBytes();

  /**
   * <code>string end_date = 3;</code>
   * @return The endDate.
   */
  java.lang.String getEndDate();
  /**
   * <code>string end_date = 3;</code>
   * @return The bytes for endDate.
   */
  com.google.protobuf.ByteString
      getEndDateBytes();

  /**
   * <code>int32 weeks_train = 4;</code>
   * @return The weeksTrain.
   */
  int getWeeksTrain();

  /**
   * <code>repeated string cp_starts = 5;</code>
   * @return A list containing the cpStarts.
   */
  java.util.List<java.lang.String>
      getCpStartsList();
  /**
   * <code>repeated string cp_starts = 5;</code>
   * @return The count of cpStarts.
   */
  int getCpStartsCount();
  /**
   * <code>repeated string cp_starts = 5;</code>
   * @param index The index of the element to return.
   * @return The cpStarts at the given index.
   */
  java.lang.String getCpStarts(int index);
  /**
   * <code>repeated string cp_starts = 5;</code>
   * @param index The index of the value to return.
   * @return The bytes of the cpStarts at the given index.
   */
  com.google.protobuf.ByteString
      getCpStartsBytes(int index);

  /**
   * <code>repeated string cp_ends = 6;</code>
   * @return A list containing the cpEnds.
   */
  java.util.List<java.lang.String>
      getCpEndsList();
  /**
   * <code>repeated string cp_ends = 6;</code>
   * @return The count of cpEnds.
   */
  int getCpEndsCount();
  /**
   * <code>repeated string cp_ends = 6;</code>
   * @param index The index of the element to return.
   * @return The cpEnds at the given index.
   */
  java.lang.String getCpEnds(int index);
  /**
   * <code>repeated string cp_ends = 6;</code>
   * @param index The index of the value to return.
   * @return The bytes of the cpEnds at the given index.
   */
  com.google.protobuf.ByteString
      getCpEndsBytes(int index);

  /**
   * <code>bool query_modelar = 7;</code>
   * @return The queryModelar.
   */
  boolean getQueryModelar();
}
