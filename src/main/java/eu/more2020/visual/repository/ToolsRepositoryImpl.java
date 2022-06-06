package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.bean.CsvToBeanBuilder;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import javax.tools.Tool;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @Override
    public List<Changepoint> cpDetection(String id, ChangepointDetection changepoints) {

        try {
            URL dataURL = new URL(applicationProperties.getToolApi() + "cp_detection/" + id);
            Map<String,Object> params = new LinkedHashMap<>();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            params.put("start_date", changepoints.getRange().getFrom().format(formatter));
            params.put("end_date", changepoints.getRange().getTo().format(formatter));
            params.put("c_starts", changepoints.getChangepoints().stream().map(changepoint -> changepoint.getRange().getFrom().format(formatter)).collect(Collectors.toList()));
            params.put("c_ends", changepoints.getChangepoints().stream().map(changepoint -> changepoint.getRange().getTo().format(formatter)).collect(Collectors.toList()));
            ObjectMapper objectMapper = new ObjectMapper();
            String json = objectMapper.writeValueAsString(params);
            System.out.println(params);
            HttpURLConnection conn = (HttpURLConnection) dataURL.openConnection();
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");
            conn.setRequestProperty("Accept", "application/json");
            conn.setDoOutput(true);
            try(OutputStream os = conn.getOutputStream()) {
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
            //conn.disconnect();
            System.out.println(content);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  null;
    }


}
