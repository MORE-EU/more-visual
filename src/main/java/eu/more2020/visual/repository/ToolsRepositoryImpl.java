package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.*;

import eu.more2020.visual.domain.Detection.ChangepointDetection;
import eu.more2020.visual.domain.Detection.DeviationDetection;
import eu.more2020.visual.domain.Detection.PatternDetection;
import eu.more2020.visual.domain.Detection.RangeDetection;
import eu.more2020.visual.grpc.RouteGuideGrpc;
import eu.more2020.visual.grpc.tools.*;
import eu.more2020.visual.index.domain.ImmutableDataPoint;
import eu.more2020.visual.index.util.DateTimeUtil;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
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
            ManagedChannel channel = ManagedChannelBuilder.forAddress(applicationProperties.getToolHost(), applicationProperties.getToolPort())
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
    public List<ImmutableDataPoint> forecasting(String id){
        String jsonName = applicationProperties.getWorkspacePath() + "/" + id + "_predict.json";
        File json = new File(jsonName);
        List<ImmutableDataPoint> forecastData = new ArrayList<>();
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
                    ImmutableDataPoint dataPoint = new ImmutableDataPoint(Instant.ofEpochMilli(Long.parseLong(datum.getKey())).toEpochMilli(), vals);
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
                .setStartDate(changepointDetection.getRange().getFromDate())
                .setEndDate(changepointDetection.getRange().getToDate())
                .setThrsh(1)
                .setWa1(10)
                .setWa2(5)
                .setWa3(10)
                .build();

            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress(applicationProperties.getToolHost(), applicationProperties.getToolPort())
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
            channel.shutdown();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return detectedChangepoints;
    }

    @Override
    public List<ImmutableDataPoint> soilingDetection(DeviationDetection deviationDetection) {
        if(deviationDetection.getType().equals("soilingRatio")){
            return getSoilingIndex(deviationDetection);
        }
        else if(deviationDetection.getType().equals("powerLoss")){
            return getPowerLoss(deviationDetection);
        }
        else return getSoilingIndex(deviationDetection);
    }

    private List<ImmutableDataPoint> getSoilingIndex(DeviationDetection deviationDetection){
        List<ImmutableDataPoint> dataPoints = new ArrayList<>();
        try {
            List<String> cpStarts = new ArrayList<>();
            List<String> cpEnds = new ArrayList<>();
            if (deviationDetection.getChangepoints() != null) {
                cpStarts = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getFrom().format(formatter)).collect(Collectors.toList());
                cpEnds = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getTo().format(formatter)).collect(Collectors.toList());
            }
            CalculatePowerIndexRequest request = CalculatePowerIndexRequest.newBuilder()
                .setDatasetId(deviationDetection.getId())
                .setStartDate(deviationDetection.getRange().getFromDate())
                .setEndDate(deviationDetection.getRange().getToDate())
                .setWeeksTrain(deviationDetection.getWeeks())
                .addAllCpStarts(cpStarts)
                .addAllCpEnds(cpEnds)
                .build();


            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress(applicationProperties.getToolHost(), applicationProperties.getToolPort())
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
                String value = entry.getValue().asText();
                ImmutableDataPoint dataPoint = new ImmutableDataPoint(time, new double[]{Double.parseDouble(value)});
                dataPoints.add(dataPoint);
            });
            channel.shutdown();
            // Create an ObjectMapper
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataPoints;
    }


    private List<ImmutableDataPoint> getPowerLoss(DeviationDetection deviationDetection){
        List<ImmutableDataPoint> dataPoints = new ArrayList<>();
        try {
            List<String> cpStarts = new ArrayList<>();
            List<String> cpEnds = new ArrayList<>();
            if (deviationDetection.getChangepoints() != null) {
                cpStarts = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getFrom().format(formatter)).collect(Collectors.toList());
                cpEnds = deviationDetection.getChangepoints().stream().map(changepoint -> changepoint.getRange().getTo().format(formatter)).collect(Collectors.toList());
            }
            CalculatePowerIndexRequest request = CalculatePowerIndexRequest.newBuilder()
                .setDatasetId(deviationDetection.getId())
                .setStartDate(deviationDetection.getRange().getFromDate())
                .setEndDate(deviationDetection.getRange().getToDate())
                .setWeeksTrain(deviationDetection.getWeeks())
                .addAllCpStarts(cpStarts)
                .addAllCpEnds(cpEnds)
                .build();


            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress(applicationProperties.getToolHost(), applicationProperties.getToolPort())
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
                String value = entry.getValue().asText();
                ImmutableDataPoint dataPoint = new ImmutableDataPoint(time, new double[]{Double.parseDouble(value)});
                dataPoints.add(dataPoint);
            });
            channel.shutdown();
            // Create an ObjectMapper
        } catch (Exception e) {
            e.printStackTrace();
        }
        return dataPoints;
    }

    @Override
    public List<ImmutableDataPoint> yawMisalignmentDetection(RangeDetection rangeDetection) {
        List<ImmutableDataPoint> dataPoints = new ArrayList<>();
        try {
            Map<String, Object> params = new LinkedHashMap<>();
            params.put("start_date", rangeDetection.getRange().getFromDate());
            params.put("end_date", rangeDetection.getRange().getToDate());

            EstimateYawMisalignmentRequest request = EstimateYawMisalignmentRequest.newBuilder()
                .setDatasetId(rangeDetection.getId())
                .setStartDate(rangeDetection.getRange().getFromDate())
                .setEndDate(rangeDetection.getRange().getToDate())
                .build();

            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress(applicationProperties.getToolHost(),
                    applicationProperties.getToolPort())
                .usePlaintext()
                .build();

            // Invoke the remote method on the target server
            DataServiceGrpc.DataServiceBlockingStub stub = DataServiceGrpc.newBlockingStub(channel);
            EstimateYawMisalignmentResponse response = stub.estimateYawMisalignment(request);
//
//            // Convert the response to JSON string
            String json = response.getResult();
            // Create an ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode responseObject = null;

            responseObject = objectMapper.readTree(json);
            log.info("READ JSON: {}", responseObject);
            JsonNode yaw = responseObject.get("y_pred");

            yaw.fields().forEachRemaining(entry -> {
                String time = entry.getKey();
                String value = entry.getValue().asText();
                ImmutableDataPoint dataPoint = new ImmutableDataPoint(DateTimeUtil.parseDateTimeString(time, "yyyy-MM-dd[ HH:mm:ss]"),
                    new double[]{Double.parseDouble(value)});
                dataPoints.add(dataPoint);
            });
            channel.shutdown();
//            dataPoints = getYawData(rangeDetection.getRange().getFrom(), rangeDetection.getRange().getTo());
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return dataPoints;
    }

    @Override
    public List<Changepoint> patternDetection(PatternDetection patternDetection){
        try {
            log.info(String.valueOf(patternDetection));
             FrechetRequest request = FrechetRequest.newBuilder()
//                .setDatasetId(patternDetection.getDatasetId())
                .setStartDate(patternDetection.getRange().getFrom().format(formatter))
//                 .setColumn(patternDetection.getMeasure())
                .setEndDate(patternDetection.getRange().getTo().format(formatter))
//                 .setW(1)
                 .setR(1)
                .build();


            // Create a channel to connect to the target gRPC server
            ManagedChannel channel = ManagedChannelBuilder.forAddress(applicationProperties.getToolHost(), applicationProperties.getToolPort())
                .usePlaintext()
                .build();

            // Create a stub using the generated code and the channel
            DataServiceGrpc.DataServiceBlockingStub stub = DataServiceGrpc.newBlockingStub(channel);

            // Invoke the remote method on the target server
            FrechetResponse response = stub.frechet(request);

            // Convert the response to JSON string
            String json = response.getResult();
            log.info("READ JSON: {}", json);

            // Create an ObjectMapper
            ObjectMapper objectMapper = new ObjectMapper();

            JsonNode responseObject = null;

            responseObject = objectMapper.readTree(json);
            log.info("READ JSON: {}", responseObject);
//
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  null;
    }

    public static List<ImmutableDataPoint> getYawData(LocalDateTime startDate, LocalDateTime endDate) {
        List<ImmutableDataPoint> dataPoints = new ArrayList<>();
        Random random = new Random();

        double yawAngle = 0; // Initialize yaw angle at 0 degrees
        LocalDateTime currentTime = startDate;

        while (currentTime.isBefore(endDate)) {
            // Simulate slower yaw angle changes (e.g., from -4 to 4 degrees over a longer time)
            yawAngle += (random.nextDouble() * 0.2 - 0.1) * 4; // Small random change (-0.4 to 0.4 degrees)
            yawAngle = Math.min(4, Math.max(-4, yawAngle)); // Ensure angle stays within -4 to 4 degrees
            ImmutableDataPoint dataPoint = new ImmutableDataPoint(currentTime.toInstant(ZoneOffset.UTC).toEpochMilli(), new double[]{yawAngle});
            dataPoints.add(dataPoint);

            // Add some randomness to the time intervals (change every long time)
            int minutesToAdd = random.nextInt(60) + 30; // Random interval between 30 and 90 minutes
            currentTime = currentTime.plusMinutes(minutesToAdd);
        }

        return dataPoints;
    }


}
