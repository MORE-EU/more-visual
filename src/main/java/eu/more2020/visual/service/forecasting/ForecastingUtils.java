package eu.more2020.visual.service.forecasting;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.bson.Document;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import com.influxdb.client.InfluxDBClientOptions;
import com.influxdb.client.QueryApi;
import com.influxdb.client.WriteApi;
import com.influxdb.client.WriteOptions;
import com.influxdb.client.write.Point;
import com.influxdb.exceptions.InfluxException;
import com.influxdb.query.FluxTable;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoClient;

import eu.more2020.visual.domain.Forecasting.DBs.Bebeze;
import eu.more2020.visual.domain.Forecasting.DBs.InfluxDBConfig;
import eu.more2020.visual.domain.Forecasting.DBs.Meta;
import eu.more2020.visual.domain.Forecasting.DBs.MongoDBConfig;
import eu.more2020.visual.repository.MetaRepository;
import io.reactivex.rxjava3.core.BackpressureOverflowStrategy;

@Service
public class ForecastingUtils {

    private final Logger log = LoggerFactory.getLogger(ForecastingUtils.class);

    @Autowired
    private MetaRepository metaRepository;
    private InfluxDBConfig influxDBConfig = new InfluxDBConfig();
    private MongoDBConfig mongoDBConfig;
    private MongoTemplate mongoTemplate;

    public ForecastingUtils(MetaRepository metaRepository, InfluxDBConfig influxDBConfig) {
        this.metaRepository = metaRepository;
        this.influxDBConfig = influxDBConfig;
    }

    public ResponseEntity<List<Meta>> deleteForecastingModel(String modelName) {
        long deletedCount = metaRepository.deleteByModelName(modelName);
        if (deletedCount > 0) {
            List<Meta> remainingModels = metaRepository.findAllByModelNameNot(modelName);

            File directory = new File("/data/1/models");
            if (directory.exists() && directory.isDirectory()) {
                Arrays.stream(directory.listFiles())
                        .filter(file -> getFileNameWithoutExtension(file.getName()).equals(modelName))
                        .forEach(file -> {
                            if (file.delete()) {
                                log.debug("File deleted successfully: " + file.getName());
                            } else {
                                log.debug("Failed to delete the file: " + file.getName());
                            }
                        });
            } else {
                log.debug("The specified directory does not exist or is not a directory.");
            }
            return ResponseEntity.ok().body(remainingModels);
        } else {
            // Handle the case when no documents were deleted
            return ResponseEntity.notFound().build();
        }
    }

    private static String getFileNameWithoutExtension(String fileName) {
        int lastDotIndex = fileName.lastIndexOf('.');
        return lastDotIndex != -1 ? fileName.substring(0, lastDotIndex) : fileName;
    }

    public String dbsInitialization () {
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        executorService.submit(() -> mongoInit());
        executorService.submit(() -> influxInit());
        return "done";
    }

    public List<Point> getPoints() {
        log.debug("Parsing CSV file...");
        long startTime = System.currentTimeMillis();
        Path pathInput = Paths.get("/home/bstam/ForecastingController/csv/bbz1big.csv");
        List<Point> list = List.of(); // Default to empty list.
        try {
            int initialCapacity = (int) Files.lines(pathInput).count();
            list = new ArrayList<>(initialCapacity);

            BufferedReader reader = Files.newBufferedReader(pathInput);
            Iterable<CSVRecord> records = CSVFormat.RFC4180.withFirstRecordAsHeader().parse(reader);
            for (CSVRecord record : records) {

                String format = "yyyy-MM-dd HH:mm:ss";
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                String dt = record.get("datetime");
                Date date = sdf.parse(dt);
                Instant datetime = date.toInstant();

                Double active_power = Double.parseDouble(record.get("active_power"));
                Double roto_speed = Double.parseDouble(record.get("roto_speed"));
                Double wind_speed = Double.parseDouble(record.get("wind_speed"));
                Double cos_nacelle_dir = Double.parseDouble(record.get("cos_nacelle_dir"));
                Double pitch_angle = Double.parseDouble(record.get("pitch_angle"));
                Double sin_nacelle_dir = Double.parseDouble(record.get("sin_nacelle_dir"));
                Double cos_wind_dir = Double.parseDouble(record.get("cos_wind_dir"));
                Double sin_wind_dir = Double.parseDouble(record.get("sin_wind_dir"));
                Double nacelle_direction = Double.parseDouble(record.get("nacelle_direction"));
                Double wind_direction = Double.parseDouble(record.get("wind_direction"));

                Point point = new Bebeze(datetime, active_power, roto_speed, wind_speed,
                        cos_nacelle_dir, pitch_angle,
                        sin_nacelle_dir, cos_wind_dir, sin_wind_dir, nacelle_direction,
                        wind_direction).toPoint();
                list.add(point);
            }
        } catch (IOException | ParseException e) {
            e.printStackTrace();
        }

        long endTime = System.currentTimeMillis();
        double elapsedTimeSeconds = (endTime - startTime) / 1000.0;
        log.debug("CSV parsing took: " + elapsedTimeSeconds + " seconds");

        return list;
    }

    public void influxInit() {

        InfluxDBClientOptions options = InfluxDBClientOptions
                .builder()
                .url("http://localhost:8086")
                .org(influxDBConfig.getOrg())
                .bucket(influxDBConfig.getBucket())
                .authenticateToken(influxDBConfig.getToken().toCharArray())
                .build();

        InfluxDBClient client = InfluxDBClientFactory.create(options);
        QueryApi queryApi = client.getQueryApi();

        String query = String.format(
                "from(bucket:\"%s\") |> range(start: 0) |> filter(fn: (r) => r._measurement == \"%s\") |> limit(n: 1)",
                influxDBConfig.getBucket(), "bebeze");

        List<FluxTable> tables = queryApi.query(query);
        if (tables.isEmpty()) {
            WriteApi writeApi = client.makeWriteApi(WriteOptions.builder()
        .batchSize(5000)
        .flushInterval(1000)
        .backpressureStrategy(BackpressureOverflowStrategy.DROP_OLDEST)
        .retryInterval(5000)
        .build());

        try {
        log.debug("Started influxDB data injection");
        long startTime = System.currentTimeMillis();
        writeApi.writePoints(getPoints());
        long endTime = System.currentTimeMillis();
        double elapsedTimeSeconds = (endTime - startTime) / 1000.0;
        log.debug("Influx data injection took: " + elapsedTimeSeconds + " seconds");
        log.debug("completed initialization");
        } catch (InfluxException e) {
        e.printStackTrace();
        }
        } else {
            log.debug("Initialization has already been completed");
        }
        client.close();
    }

    public void mongoInit() {
        // Create connection string
        ConnectionString connString = new ConnectionString(mongoDBConfig.getConnectionString());

        // Create MongoClientSettings
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connString)
                .build();

        // Create MongoClient
        try (MongoClient mongoClient = MongoClients.create(settings)) {
            // Get the admin database
            MongoDatabase adminDatabase = mongoClient.getDatabase("admin");

            // Check if the database exists
            boolean databaseExists = mongoClient.listDatabaseNames().into(new ArrayList<>())
                    .contains(mongoDBConfig.getDatabaseName());
            if (!databaseExists) {
                initializeMongoDatabase(mongoClient);
            }

            // Check if the user exists
            Document userFilter = new Document("user", mongoDBConfig.getUserName());
            boolean userExists = adminDatabase.getCollection("system.users").countDocuments(userFilter) > 0;
            if (!userExists) {
                initializeMongoUser(mongoClient);
            }
            mongoClient.close();
        }
    }

    public void initializeMongoUser(MongoClient mongoClient) {

        MongoDatabase targetDatabase = mongoClient.getDatabase(mongoDBConfig.getDatabaseName());
        // Create the user
        Document createUserCommand = new Document("createUser", mongoDBConfig.getUserName())
                .append("pwd", mongoDBConfig.getPassword())
                .append("roles", Arrays.asList(
                        new Document("role", "readWrite").append("db", mongoDBConfig.getDatabaseName()),
                        new Document("role", "dbAdmin").append("db", mongoDBConfig.getDatabaseName())));

        Document createUserResult = targetDatabase.runCommand(createUserCommand);
        if (createUserResult.getDouble("ok") == 1.0) {
            log.debug("User created successfully.");
        } else {
            log.debug("Failed to create user.");
        }
    }

    public void initializeMongoDatabase(MongoClient mongoClient) {

        MongoDatabase targetDatabase = mongoClient.getDatabase(mongoDBConfig.getDatabaseName());

        Document createDatabaseCommand = new Document("create", mongoDBConfig.getDatabaseName());
        Document databaseCreation = targetDatabase.runCommand(createDatabaseCommand);
        targetDatabase.createCollection("meta");
        targetDatabase.getCollection("more").drop();

        if (databaseCreation.getDouble("ok") == 1.0) {
            log.debug("Database created successfully.");
        } else {
            log.debug("Failed to create Database.");
        }
    }

}
