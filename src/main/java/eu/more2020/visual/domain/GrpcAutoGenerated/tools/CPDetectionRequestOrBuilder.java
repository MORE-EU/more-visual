// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: tools.proto

package eu.more2020.visual.domain.GrpcAutoGenerated.tools;

public interface CPDetectionRequestOrBuilder extends
    // @@protoc_insertion_point(interface_extends:grpc.CPDetectionRequest)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>string dataset_id = 1;</code>
   */
  java.lang.String getDatasetId();
  /**
   * <code>string dataset_id = 1;</code>
   */
  com.google.protobuf.ByteString
      getDatasetIdBytes();

  /**
   * <code>string start_date = 2;</code>
   */
  java.lang.String getStartDate();
  /**
   * <code>string start_date = 2;</code>
   */
  com.google.protobuf.ByteString
      getStartDateBytes();

  /**
   * <code>string end_date = 3;</code>
   */
  java.lang.String getEndDate();
  /**
   * <code>string end_date = 3;</code>
   */
  com.google.protobuf.ByteString
      getEndDateBytes();

  /**
   * <code>int32 w_train = 4;</code>
   */
  int getWTrain();

  /**
   * <code>int32 wa1 = 5;</code>
   */
  int getWa1();

  /**
   * <code>int32 wa2 = 6;</code>
   */
  int getWa2();

  /**
   * <code>int32 wa3 = 7;</code>
   */
  int getWa3();

  /**
   * <code>int32 thrsh = 8;</code>
   */
  int getThrsh();

  /**
   * <code>repeated string cp_starts = 9;</code>
   */
  java.util.List<java.lang.String>
      getCpStartsList();
  /**
   * <code>repeated string cp_starts = 9;</code>
   */
  int getCpStartsCount();
  /**
   * <code>repeated string cp_starts = 9;</code>
   */
  java.lang.String getCpStarts(int index);
  /**
   * <code>repeated string cp_starts = 9;</code>
   */
  com.google.protobuf.ByteString
      getCpStartsBytes(int index);

  /**
   * <code>repeated string cp_ends = 10;</code>
   */
  java.util.List<java.lang.String>
      getCpEndsList();
  /**
   * <code>repeated string cp_ends = 10;</code>
   */
  int getCpEndsCount();
  /**
   * <code>repeated string cp_ends = 10;</code>
   */
  java.lang.String getCpEnds(int index);
  /**
   * <code>repeated string cp_ends = 10;</code>
   */
  com.google.protobuf.ByteString
      getCpEndsBytes(int index);
}
