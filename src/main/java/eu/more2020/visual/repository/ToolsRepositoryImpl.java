package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.*;

import eu.more2020.visual.domain.Detection.ChangepointDetection;
import eu.more2020.visual.domain.Detection.DeviationDetection;
import eu.more2020.visual.domain.Detection.RangeDetection;
import eu.more2020.visual.grpc.RouteGuideGrpc;
import eu.more2020.visual.grpc.tools.*;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.ChronoField;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class ToolsRepositoryImpl extends RouteGuideGrpc.RouteGuideImplBase implements ToolsRepository {

    private final ApplicationProperties applicationProperties;

    private final DateTimeFormatter formatter;

    private final Logger log = LoggerFactory.getLogger(ToolsRepositoryImpl.class);

    public ToolsRepositoryImpl(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
        this.formatter =
            new DateTimeFormatterBuilder().appendPattern(applicationProperties.getTimeFormat())
                .parseDefaulting(ChronoField.HOUR_OF_DAY, 0)
                .parseDefaulting(ChronoField.MINUTE_OF_HOUR, 0)
                .parseDefaulting(ChronoField.SECOND_OF_MINUTE, 0)
                .toFormatter();
    }

    public List<String> toDateArray(Iterator<JsonNode> iterator) {

        List<String> dates = new ArrayList<>();
        while (iterator.hasNext()) {
            JsonNode dateNode = iterator.next();
            dates.add(dateNode.asText());
        }
        return dates;
    }

    @Override
    public List<Changepoint> getManualChangepoints(String id) {
        List<Changepoint> gtChangepoints = new ArrayList<>();
        try {
            WashesRequest request = WashesRequest.newBuilder()
                .setDatasetId(id)
                .build();

            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

            // Create a stub using the generated code and the channel
            DataServiceGrpc.DataServiceBlockingStub stub = DataServiceGrpc.newBlockingStub(channel);

            // Invoke the remote method on the target server
            WashesResponse response = stub.checkWashes(request);

            // Convert the response to JSON string
            String json = response.getWashes();
            // Create an ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            // Deserialize the JSON string into a Response object
            JsonNode responseObject = objectMapper.readTree(json);
            log.info("READ JSON: {}", responseObject);
            JsonNode starts = responseObject.get("Starting_date");
            JsonNode ends = responseObject.get("Ending_date");
            Integer noOfIntervals = starts.size();
            for (Integer i = 0; i < noOfIntervals; i++) {
                String ii = i.toString();
                gtChangepoints.add(new Changepoint(i, new TimeRange(LocalDateTime.parse(starts.get(ii).asText(), formatter),
                    LocalDateTime.parse(ends.get(ii).asText(), formatter)), 0.0));
            }
            // Shutdown the channel
            channel.shutdown();
        }
        catch(Exception e){
            e.printStackTrace();
        }
        return gtChangepoints;
    }

    @Override
    public List<DataPoint> forecasting(String id){
        String jsonName = applicationProperties.getWorkspacePath() + "/" + id + "_predict.json";
        File json = new File(jsonName);
        List<DataPoint> forecastData = new ArrayList<>();
        if(json.exists()){
            // read json
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                BufferedReader in = new BufferedReader(
                    new FileReader(json));
                String inputLine;
                StringBuffer content = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
                }
                JsonNode responseObject = objectMapper.readTree(content.toString());
                Iterator<Map.Entry<String, JsonNode>> iter = responseObject.fields();
                while(iter.hasNext()){
                    Map.Entry<String, JsonNode> datum = iter.next();
                    double[] vals = new double[1];
                    vals[0] = datum.getValue().asDouble();
                    DataPoint dataPoint = new DataPoint(LocalDateTime.ofInstant(Instant.ofEpochMilli(Long.parseLong(datum.getKey())), ZoneId.systemDefault()),
                        vals);
                    forecastData.add(dataPoint);
                }
            }
            catch (Exception e){
                e.printStackTrace();
            }

        }
        return forecastData;
    }

    @Override
    public List<Changepoint> changepointDetection(ChangepointDetection changepointDetection) {
        List<Changepoint> detectedChangepoints = new ArrayList<>();
        try {
            CPDetectionRequest request = CPDetectionRequest.newBuilder()
                .setDatasetId(changepointDetection.getId())
                .setStartDate(changepointDetection.getRange().getFrom().format(formatter))
                .setEndDate(changepointDetection.getRange().getTo().format(formatter))
                .setThrsh(1)
                .setWa1(10)
                .setWa2(5)
                .setWa3(10)
                .build();

            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

            // Create a stub using the generated code and the channel
            DataServiceGrpc.DataServiceBlockingStub stub = DataServiceGrpc.newBlockingStub(channel);

            // Invoke the remote method on the target server
            CPDetectionResponse response = stub.cPDetection(request);

            // Convert the response to JSON string
            String json = response.getResult();
            // Create an ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode responseObject = objectMapper.readTree(json);
            log.info("READ JSON: {}", responseObject);
            JsonNode starts = responseObject.get("Starting date");
            JsonNode ends = responseObject.get("Ending date");
            Integer noOfIntervals = starts.size();
            for (Integer i = 0; i < noOfIntervals; i++) {
                String ii = i.toString();
                detectedChangepoints.add(new Changepoint(i, new TimeRange(LocalDateTime.parse(starts.get(ii).asText(), formatter),
                    LocalDateTime.parse(ends.get(ii).asText(), formatter)),0));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return detectedChangepoints;
    }

    @Override
    public List<DataPoint> soilingDetection(DeviationDetection deviationDetection) {
        if(deviationDetection.getType().equals("soilingRatio")){
            return getSoilingIndex(deviationDetection);
        }
        else if(deviationDetection.getType().equals("powerLoss")){
            return getPowerLoss(deviationDetection);
        }
        else return getSoilingIndex(deviationDetection);
    }

    private List<DataPoint> getSoilingIndex(DeviationDetection deviationDetection){
        List<DataPoint> dataPoints = new ArrayList<>();
        try {
            List<String> cpStarts = new ArrayList<>();
            List<String> cpEnds = new ArrayList<>();
            if (deviationDetection.getChangepoints() != null) {
                cpStarts = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getFrom().format(formatter)).collect(Collectors.toList());
                cpEnds = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getTo().format(formatter)).collect(Collectors.toList());
            }
            CalculatePowerIndexRequest request = CalculatePowerIndexRequest.newBuilder()
                .setDatasetId(deviationDetection.getId())
                .setStartDate(deviationDetection.getRange().getFrom().format(formatter))
                .setEndDate(deviationDetection.getRange().getTo().format(formatter))
                .setWeeksTrain(deviationDetection.getWeeks())
                .addAllCpStarts(cpStarts)
                .addAllCpEnds(cpEnds)
                .build();


            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

            // Create a stub using the generated code and the channel
            DataServiceGrpc.DataServiceBlockingStub stub = DataServiceGrpc.newBlockingStub(channel);

            // Invoke the remote method on the target server
            CalculatePowerIndexResponse response = stub.calculatePowerIndex(request);

            // Convert the response to JSON string
            String json = response.getResult();
            // Create an ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode responseObject = null;

            responseObject = objectMapper.readTree(json);
            log.info("READ JSON: {}", responseObject.get("power_index"));
            JsonNode powerIndex = responseObject.get("power_index");
            powerIndex.fields().forEachRemaining(entry -> {
                long time = Long.parseLong(entry.getKey());
                LocalDateTime localDateTime = LocalDateTime.ofInstant(
                    Instant.ofEpochMilli(time),
                    ZoneId.systemDefault()
                );
                String value = entry.getValue().asText();
                DataPoint dataPoint = new DataPoint(localDateTime, new double[]{Double.parseDouble(value)});
                dataPoints.add(dataPoint);
            });
            // Create an ObjectMapper
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataPoints;
    }


    private List<DataPoint> getPowerLoss(DeviationDetection deviationDetection){
        List<DataPoint> dataPoints = new ArrayList<>();
        try {
            List<String> cpStarts = new ArrayList<>();
            List<String> cpEnds = new ArrayList<>();
            if (deviationDetection.getChangepoints() != null) {
                cpStarts = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getFrom().format(formatter)).collect(Collectors.toList());
                cpEnds = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getTo().format(formatter)).collect(Collectors.toList());
            }
            CalculatePowerIndexRequest request = CalculatePowerIndexRequest.newBuilder()
                .setDatasetId(deviationDetection.getId())
                .setStartDate(deviationDetection.getRange().getFrom().format(formatter))
                .setEndDate(deviationDetection.getRange().getTo().format(formatter))
                .setWeeksTrain(deviationDetection.getWeeks())
                .addAllCpStarts(cpStarts)
                .addAllCpEnds(cpEnds)
                .build();


            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

            // Create a stub using the generated code and the channel
            DataServiceGrpc.DataServiceBlockingStub stub = DataServiceGrpc.newBlockingStub(channel);

            // Invoke the remote method on the target server
            CalculatePowerIndexResponse response = stub.calculatePowerIndex(request);

            // Convert the response to JSON string
            String json = response.getResult();
            // Create an ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode responseObject = null;

            responseObject = objectMapper.readTree(json);
            log.info("READ JSON: {}", responseObject.get("estimated_power_lost"));
            JsonNode powerIndex = responseObject.get("estimated_power_lost");
            powerIndex.fields().forEachRemaining(entry -> {
                long time = Long.parseLong(entry.getKey());
                LocalDateTime localDateTime = LocalDateTime.ofInstant(
                    Instant.ofEpochMilli(time),
                    ZoneId.systemDefault()
                );
                String value = entry.getValue().asText();
                DataPoint dataPoint = new DataPoint(localDateTime, new double[]{Double.parseDouble(value)});
                dataPoints.add(dataPoint);
            });
            // Create an ObjectMapper
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataPoints;
    }

    @Override
    public List<DataPoint> yawMisalignmentDetection(RangeDetection rangeDetection) {
        List<DataPoint> dataPoints = new ArrayList<>();
        try {
            URL dataURL = new URL(applicationProperties.getToolApi() + "yaw_misalignment/" + rangeDetection.getId());
            Map<String, Object> params = new LinkedHashMap<>();
            params.put("start_date", rangeDetection.getRange().getFrom().format(formatter));
            params.put("end_date", rangeDetection.getRange().getTo().format(formatter));

            EstimateYawMisalignmentRequest request = EstimateYawMisalignmentRequest.newBuilder()
                .setDatasetId(rangeDetection.getId())
                .setStartDate(rangeDetection.getRange().getFrom().format(formatter))
                .setEndDate(rangeDetection.getRange().getTo().format(formatter))
                .build();

            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 50051)
                .usePlaintext()
                .build();

            // Create a stub using the generated code and the channel
//            DataServiceGrpc.DataServiceBlockingStub stub = DataServiceGrpc.newBlockingStub(channel);
//
//            // Invoke the remote method on the target server
//            EstimateYawMisalignmentResponse response = stub.estimateYawMisalignment(request);
//
//            // Convert the response to JSON string
//            String json = response.getResult();
//            // Create an ObjectMapper
//            ObjectMapper objectMapper = new ObjectMapper();
//
//            JsonNode responseObject = null;
//
//            responseObject = objectMapper.readTree(json);
//            log.info("READ JSON: {}", responseObject);
//            JsonNode powerLost = responseObject.get("estimated_power_lost");
//            powerLost.fields().forEachRemaining(entry -> {
//                long time = Long.parseLong(entry.getKey());
//                LocalDateTime localDateTime = LocalDateTime.ofInstant(
//                    Instant.ofEpochMilli(time),
//                    ZoneId.systemDefault()
//                );
//                String value = entry.getValue().asText();
//                DataPoint dataPoint = new DataPoint(localDateTime, new double[]{Double.parseDouble(value)});
//                dataPoints.add(dataPoint);
//            });
            dataPoints = generateSimulatedData(rangeDetection.getRange().getFrom(), rangeDetection.getRange().getTo());

        }
        catch (Exception e){
            e.printStackTrace();
        }
        return dataPoints;
    }

    public static List<DataPoint> generateSimulatedData(LocalDateTime startDate, LocalDateTime endDate) {
        List<DataPoint> dataPoints = new ArrayList<>();
        Random random = new Random();

        double yawAngle = 0; // Initialize yaw angle at 0 degrees
        LocalDateTime currentTime = startDate;

        while (currentTime.isBefore(endDate)) {
            // Simulate slower yaw angle changes (e.g., from -4 to 4 degrees over a longer time)
            yawAngle += (random.nextDouble() * 0.2 - 0.1) * 4; // Small random change (-0.4 to 0.4 degrees)
            yawAngle = Math.min(4, Math.max(-4, yawAngle)); // Ensure angle stays within -4 to 4 degrees
            DataPoint dataPoint = new DataPoint(currentTime, new double[]{yawAngle});
            dataPoints.add(dataPoint);

            // Add some randomness to the time intervals (change every long time)
            int minutesToAdd = random.nextInt(60) + 30; // Random interval between 30 and 90 minutes
            currentTime = currentTime.plusMinutes(minutesToAdd);
        }

        return dataPoints;
    }


}
