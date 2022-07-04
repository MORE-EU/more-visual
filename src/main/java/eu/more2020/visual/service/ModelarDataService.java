package eu.more2020.visual.service;

import eu.more2020.visual.domain.*;
import org.apache.arrow.flight.FlightClient;
import org.apache.arrow.flight.FlightStream;
import org.apache.arrow.flight.Location;
import org.apache.arrow.flight.Ticket;
import org.apache.arrow.memory.RootAllocator;
import org.apache.arrow.vector.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ModelarDataService {

    private final Logger log = LoggerFactory.getLogger(ModelarDataService.class);

    @Value("${application.modelardb.url}")
    private String modelarUrl = "leviathan.imsi.athenarc.gr";

    @Value("${application.modelardb.port}")
    private Integer modelarPort = 9999;


    public QueryResults executeQuery(Dataset dataset, Query query) throws Exception {
        log.debug(query.toString());
        Location location = Location.forGrpcInsecure(modelarUrl, modelarPort);
        List<Integer> measures = query.getMeasures() != null ? query.getMeasures() : dataset.getMeasures();
        // " + query.getFrequency() + "

        String sql = "SELECT tid,  DATE_TRUNC('" + query.getFrequency() + "', timestamp) AS ts, AVG(value) AS value FROM DataPoint "
            + " WHERE tid IN ("
            + measures.stream().map(i -> i.toString()).collect(Collectors.joining(",")) + ") ";
        if (query.getRange() != null) {
            sql += " AND timestamp BETWEEN '"
                + query.getRange().getFrom().toInstant(ZoneOffset.UTC) + "' AND '"
                + query.getRange().getTo().toInstant(ZoneOffset.UTC) + "' ";
        }
        sql += " GROUP BY tid, ts ORDER BY ts, tid";
        log.debug("Executing SQL query: " + sql);
        RootAllocator rootAllocator = new RootAllocator();
        FlightClient flightClient = FlightClient.builder()
            .location(location).allocator(rootAllocator).build();
        //Query
        Ticket ticket = new Ticket(sql.getBytes());
        FlightStream flightStream = flightClient.getStream(ticket);

        QueryResults queryResults = new QueryResults();
        List<DataPoint> dataPoints = new ArrayList<>();

        // System.out.println(flightStream.getSchema());
        while (flightStream.next()) {
            VectorSchemaRoot vsr = flightStream.getRoot();
            int rowCount = vsr.getRowCount();
            // System.out.println(rowCount);
            // System.out.println(vsr);

            DataPoint dataPoint = null;
            LocalDateTime timeStamp = null;
            Map<Integer, Double> measureMap = null;
            for (int row = 0; row < rowCount; row++) {
                LocalDateTime currentTimeStamp = Instant.ofEpochMilli(((TimeStampVector) vsr.getVector("ts")).get(row)).atZone(ZoneOffset.UTC).toLocalDateTime();
                if (!currentTimeStamp.equals(timeStamp)) {
                    if (timeStamp != null) {
                        Map<Integer, Double> finalMeasureMap = measureMap;
                        dataPoint = new DataPoint(timeStamp, measures.stream().mapToDouble(m -> finalMeasureMap.get(m)).toArray());
                        dataPoints.add(dataPoint);
                    }
                    measureMap = new HashMap<>();
                    timeStamp = currentTimeStamp;
                }
                int tid = ((IntVector) vsr.getVector("tid")).get(row);
                Double value = ((Float8Vector) vsr.getVector("value")).get(row);
                measureMap.put(tid, value);
                // System.out.println(tid + " | " + timeStamp + " | " + value);
            }
            flightStream.close();
        }

        queryResults.setData(dataPoints);
        queryResults.setMeasureStats(dataset.getMeasureStats());
        queryResults.setTimeRange(dataset.getTimeRange().toList());

        log.debug(dataPoints.toString());

        return queryResults;

    }

    public void fillDatasetStats(Dataset dataset) throws Exception {
        List<Integer> measures = dataset.getMeasures();

        String sql = "SELECT tid, MIN(value) as min_value, MAX(value) as max_value, AVG(value) as mean_value, MIN(timestamp) as min_timestamp, MAX(timestamp) as max_timestamp FROM DataPoint "
            + " WHERE tid IN ("
            + measures.stream().map(i -> i.toString()).collect(Collectors.joining(",")) + ")  GROUP BY tid";

        log.debug("Executing SQL query to get dataset metadata: " + sql);

        RootAllocator rootAllocator = new RootAllocator();
        FlightClient flightClient = FlightClient.builder()
            .location(Location.forGrpcInsecure(modelarUrl, modelarPort)).allocator(rootAllocator).build();
        //Query
        Ticket ticket = new Ticket(sql.getBytes());
        FlightStream flightStream = flightClient.getStream(ticket);

        Map<Integer, MeasureStats> measureStatsMap = new HashMap<>();

        TimeRange timeRange = null;

        while (flightStream.next()) {
            VectorSchemaRoot vsr = flightStream.getRoot();
            int rowCount = vsr.getRowCount();
            LocalDateTime timeStamp = null;
            for (int row = 0; row < rowCount; row++) {
                if (timeRange == null) {
                        timeRange = new TimeRange();
                        timeRange.setFrom(Instant.ofEpochMilli(((TimeStampVector) vsr.getVector("min_timestamp")).get(row)).atZone(ZoneOffset.UTC).toLocalDateTime());
                        timeRange.setTo(Instant.ofEpochMilli(((TimeStampVector) vsr.getVector("max_timestamp")).get(row)).atZone(ZoneOffset.UTC).toLocalDateTime());
                }
                int tid = ((IntVector) vsr.getVector("tid")).get(row);
                MeasureStats measureStats = new MeasureStats(((Float8Vector) vsr.getVector("mean_value")).get(row),
                    ((Float4Vector) vsr.getVector("min_value")).get(row),
                    ((Float4Vector) vsr.getVector("max_value")).get(row));
                measureStatsMap.put(tid, measureStats);
            }
            flightStream.close();
        }

        dataset.setMeasureStats(measureStatsMap);
        dataset.setTimeRange(timeRange);
    }

}
