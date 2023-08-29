// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: helloworld.proto

package eu.more2020.visual.grpc;

public final class GrpcProto {
  private GrpcProto() {}
  public static void registerAllExtensions(
      com.google.protobuf.ExtensionRegistryLite registry) {
  }

  public static void registerAllExtensions(
      com.google.protobuf.ExtensionRegistry registry) {
    registerAllExtensions(
        (com.google.protobuf.ExtensionRegistryLite) registry);
  }
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_TrainingInfo_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_TrainingInfo_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Target_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Target_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Status_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Status_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_JobID_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_JobID_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Timestamp_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Timestamp_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Progress_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Progress_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Progress_DataEntry_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Progress_DataEntry_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Predictions_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Predictions_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Predictions_PredictionsEntry_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Predictions_PredictionsEntry_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Predictions_EvaluationEntry_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Predictions_EvaluationEntry_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Results_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Results_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Results_MetricsEntry_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Results_MetricsEntry_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_AllResults_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_AllResults_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_Inference_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_Inference_fieldAccessorTable;
  static final com.google.protobuf.Descriptors.Descriptor
    internal_static_ModelInfo_descriptor;
  static final 
    com.google.protobuf.GeneratedMessageV3.FieldAccessorTable
      internal_static_ModelInfo_fieldAccessorTable;

  public static com.google.protobuf.Descriptors.FileDescriptor
      getDescriptor() {
    return descriptor;
  }
  private static  com.google.protobuf.Descriptors.FileDescriptor
      descriptor;
  static {
    java.lang.String[] descriptorData = {
      "\n\020helloworld.proto\"*\n\014TrainingInfo\022\n\n\002id" +
      "\030\001 \001(\t\022\016\n\006config\030\002 \001(\t\"\"\n\006Target\022\014\n\004name" +
      "\030\001 \001(\t\022\n\n\002id\030\002 \001(\t\"$\n\006Status\022\n\n\002id\030\001 \001(\t" +
      "\022\016\n\006status\030\002 \001(\t\"\023\n\005JobID\022\n\n\002id\030\001 \001(\t\"2\n" +
      "\tTimestamp\022\021\n\ttimestamp\030\001 \001(\003\022\022\n\nmodel_n" +
      "ame\030\002 \001(\t\"f\n\010Progress\022\n\n\002id\030\001 \001(\t\022!\n\004dat" +
      "a\030\002 \003(\0132\023.Progress.DataEntry\032+\n\tDataEntr" +
      "y\022\013\n\003key\030\001 \001(\t\022\r\n\005value\030\002 \001(\t:\0028\001\"\332\001\n\013Pr" +
      "edictions\0222\n\013predictions\030\001 \003(\0132\035.Predict" +
      "ions.PredictionsEntry\0220\n\nevaluation\030\002 \003(" +
      "\0132\034.Predictions.EvaluationEntry\0322\n\020Predi" +
      "ctionsEntry\022\013\n\003key\030\001 \001(\t\022\r\n\005value\030\002 \001(\002:" +
      "\0028\001\0321\n\017EvaluationEntry\022\013\n\003key\030\001 \001(\t\022\r\n\005v" +
      "alue\030\002 \001(\002:\0028\001\"\177\n\007Results\022\016\n\006target\030\001 \001(" +
      "\t\022&\n\007metrics\030\002 \003(\0132\025.Results.MetricsEntr" +
      "y\032<\n\014MetricsEntry\022\013\n\003key\030\001 \001(\t\022\033\n\005value\030" +
      "\002 \001(\0132\014.Predictions:\0028\001\"\'\n\nAllResults\022\031\n" +
      "\007results\030\001 \003(\0132\010.Results\" \n\tInference\022\023\n" +
      "\013predictions\030\001 \001(\014\"C\n\tModelInfo\022\022\n\nmodel" +
      "_type\030\001 \001(\t\022\022\n\nmodel_name\030\002 \001(\t\022\016\n\006targe" +
      "t\030\003 \001(\t2\211\002\n\nRouteGuide\022)\n\rStartTraining\022" +
      "\r.TrainingInfo\032\007.Status\"\000\022\"\n\013GetProgress" +
      "\022\006.JobID\032\t.Progress\"\000\022/\n\030GetSpecificTarg" +
      "etResults\022\007.Target\032\010.Results\"\000\022-\n\024GetAll" +
      "TargetsResults\022\006.JobID\032\013.AllResults\"\000\022(\n" +
      "\014GetInference\022\n.Timestamp\032\n.Inference\"\000\022" +
      "\"\n\tSaveModel\022\n.ModelInfo\032\007.Status\"\000B&\n\027e" +
      "u.more2020.visual.grpcB\tGrpcProtoP\001b\006pro" +
      "to3"
    };
    descriptor = com.google.protobuf.Descriptors.FileDescriptor
      .internalBuildGeneratedFileFrom(descriptorData,
        new com.google.protobuf.Descriptors.FileDescriptor[] {
        });
    internal_static_TrainingInfo_descriptor =
      getDescriptor().getMessageTypes().get(0);
    internal_static_TrainingInfo_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_TrainingInfo_descriptor,
        new java.lang.String[] { "Id", "Config", });
    internal_static_Target_descriptor =
      getDescriptor().getMessageTypes().get(1);
    internal_static_Target_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Target_descriptor,
        new java.lang.String[] { "Name", "Id", });
    internal_static_Status_descriptor =
      getDescriptor().getMessageTypes().get(2);
    internal_static_Status_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Status_descriptor,
        new java.lang.String[] { "Id", "Status", });
    internal_static_JobID_descriptor =
      getDescriptor().getMessageTypes().get(3);
    internal_static_JobID_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_JobID_descriptor,
        new java.lang.String[] { "Id", });
    internal_static_Timestamp_descriptor =
      getDescriptor().getMessageTypes().get(4);
    internal_static_Timestamp_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Timestamp_descriptor,
        new java.lang.String[] { "Timestamp", "ModelName", });
    internal_static_Progress_descriptor =
      getDescriptor().getMessageTypes().get(5);
    internal_static_Progress_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Progress_descriptor,
        new java.lang.String[] { "Id", "Data", });
    internal_static_Progress_DataEntry_descriptor =
      internal_static_Progress_descriptor.getNestedTypes().get(0);
    internal_static_Progress_DataEntry_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Progress_DataEntry_descriptor,
        new java.lang.String[] { "Key", "Value", });
    internal_static_Predictions_descriptor =
      getDescriptor().getMessageTypes().get(6);
    internal_static_Predictions_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Predictions_descriptor,
        new java.lang.String[] { "Predictions", "Evaluation", });
    internal_static_Predictions_PredictionsEntry_descriptor =
      internal_static_Predictions_descriptor.getNestedTypes().get(0);
    internal_static_Predictions_PredictionsEntry_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Predictions_PredictionsEntry_descriptor,
        new java.lang.String[] { "Key", "Value", });
    internal_static_Predictions_EvaluationEntry_descriptor =
      internal_static_Predictions_descriptor.getNestedTypes().get(1);
    internal_static_Predictions_EvaluationEntry_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Predictions_EvaluationEntry_descriptor,
        new java.lang.String[] { "Key", "Value", });
    internal_static_Results_descriptor =
      getDescriptor().getMessageTypes().get(7);
    internal_static_Results_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Results_descriptor,
        new java.lang.String[] { "Target", "Metrics", });
    internal_static_Results_MetricsEntry_descriptor =
      internal_static_Results_descriptor.getNestedTypes().get(0);
    internal_static_Results_MetricsEntry_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Results_MetricsEntry_descriptor,
        new java.lang.String[] { "Key", "Value", });
    internal_static_AllResults_descriptor =
      getDescriptor().getMessageTypes().get(8);
    internal_static_AllResults_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_AllResults_descriptor,
        new java.lang.String[] { "Results", });
    internal_static_Inference_descriptor =
      getDescriptor().getMessageTypes().get(9);
    internal_static_Inference_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_Inference_descriptor,
        new java.lang.String[] { "Predictions", });
    internal_static_ModelInfo_descriptor =
      getDescriptor().getMessageTypes().get(10);
    internal_static_ModelInfo_fieldAccessorTable = new
      com.google.protobuf.GeneratedMessageV3.FieldAccessorTable(
        internal_static_ModelInfo_descriptor,
        new java.lang.String[] { "ModelType", "ModelName", "Target", });
  }

  // @@protoc_insertion_point(outer_class_scope)
}