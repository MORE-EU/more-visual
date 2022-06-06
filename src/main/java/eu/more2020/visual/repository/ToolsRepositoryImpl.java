package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.Changepoint;
import eu.more2020.visual.domain.ChangepointDetection;
import eu.more2020.visual.domain.TimeRange;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Repository
public class ToolsRepositoryImpl implements ToolsRepository {

    private final ApplicationProperties applicationProperties;

    private final Logger log = LoggerFactory.getLogger(ToolsRepositoryImpl.class);


    public ToolsRepositoryImpl(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    public List<String> toDateArray(Iterator<JsonNode> iterator, DateTimeFormatter formatter) {

        List<String> dates = new ArrayList<>();
        while (iterator.hasNext()) {
            JsonNode dateNode = iterator.next();
            dates.add(dateNode.asText());
        }
        return dates;
    }

    public JsonNode getRains(String id, Map<String, Object> params) throws IOException {
        URL dataURL = new URL(applicationProperties.getToolApi() + "rains/" + id);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(params);
        HttpURLConnection conn = (HttpURLConnection) dataURL.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestProperty("Accept", "application/json");
        conn.setDoOutput(true);
        try (OutputStream os = conn.getOutputStream()) {
            byte[] input = json.getBytes("utf-8");
            os.write(input, 0, input.length);
        }
        BufferedReader in = new BufferedReader(
            new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            content.append(inputLine);
        }
        JsonNode responseObject = objectMapper.readTree(content.toString());

        in.close();
        return responseObject;
    }

    @Override
    public List<Changepoint> cpDetection(String id, ChangepointDetection changepoints) {
        try {
            URL dataURL = new URL(applicationProperties.getToolApi() + "cp_detection/" + id);
            Map<String, Object> params = new LinkedHashMap<>();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(applicationProperties.getTimeFormat());
            params.put("start_date", changepoints.getRange().getFrom().format(formatter));
            params.put("end_date", changepoints.getRange().getTo().format(formatter));
            if (changepoints.getChangepoints() != null) {
                params.put("c_starts", changepoints.getChangepoints().stream().map(changepoint -> changepoint.getRange().getFrom().format(formatter)).collect(Collectors.toList()));
                params.put("c_ends", changepoints.getChangepoints().stream().map(changepoint -> changepoint.getRange().getTo().format(formatter)).collect(Collectors.toList()));
            }
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(params);
            HttpURLConnection conn = (HttpURLConnection) dataURL.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);
            try (OutputStream os = conn.getOutputStream()) {
                byte[] input = json.getBytes("utf-8");
                os.write(input, 0, input.length);
            }
            BufferedReader in = new BufferedReader(
                new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            JsonNode responseObject = objectMapper.readTree(content.toString());
            JsonNode scores = responseObject.get("Score");
            JsonNode starts = responseObject.get("Starting date");
            JsonNode ends = responseObject.get("Ending date");
            Integer noOfIntervals = scores.size();
            List<Changepoint> detectedChangepoints = new ArrayList<>();
            for (Integer i = 0; i < noOfIntervals; i++) {
                String ii = i.toString();
                detectedChangepoints.add(new Changepoint(i, new TimeRange(LocalDateTime.parse(starts.get(ii).asText(), formatter),
                    LocalDateTime.parse(ends.get(ii).asText(), formatter)), scores.get(ii).asDouble()));
            }
            return detectedChangepoints;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


}
