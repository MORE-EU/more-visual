package eu.more2020.visual.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.bean.CsvToBeanBuilder;
import com.univocity.parsers.csv.CsvParser;
import com.univocity.parsers.csv.CsvParserSettings;
import eu.more2020.visual.config.ApplicationProperties;
import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.domain.Farm;
import eu.more2020.visual.domain.Sample;
import eu.more2020.visual.service.ModelarDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class DatasetRepositoryImpl implements DatasetRepository {

    private final ApplicationProperties applicationProperties;

    private final Logger log = LoggerFactory.getLogger(DatasetRepositoryImpl.class);

    private final ModelarDataService modelarDataService;


    @Value("${application.timeFormat}")
    private String timeFormat;

    @Value("${application.delimiter}")
    private String delimiter;

    public DatasetRepositoryImpl(ApplicationProperties applicationProperties, ModelarDataService modelarDataService) {
        this.applicationProperties = applicationProperties;
        this.modelarDataService = modelarDataService;
    }

    @Override
    public List<Dataset> findAll() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        List<Dataset> datasets = new ArrayList<>();
        List<File> metadataFiles = Files.list(Paths.get(applicationProperties.getWorkspacePath()))
            .filter(path -> path.toString().endsWith(".meta.json")).map(Path::toFile).collect(Collectors.toList());
        for (File metadataFile : metadataFiles) {
            FileReader reader = new FileReader(metadataFile);
            datasets.add(mapper.readValue(reader, Dataset.class));
        }
        return datasets;
    }

    public Boolean hasWashes(String id) {
        try {
            URL dataURL = new URL(applicationProperties.getToolApi() + "washes/" + id);
            HttpURLConnection con = (HttpURLConnection) dataURL.openConnection();
            con.setRequestMethod("POST");
            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while ((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();
            return Boolean.parseBoolean(String.valueOf(content));

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public Farm getFarm(String folder) throws IOException {
        Farm farm = new Farm();
        ObjectMapper mapper = new ObjectMapper();
        File metadataFile = new File(applicationProperties.getWorkspacePath() + "/" + folder, folder + ".meta.json");

        if (metadataFile.exists()) {
            FileReader reader = new FileReader(metadataFile);
            farm = mapper.readValue(reader, Farm.class);
        }
        return farm;
    }

    @Override
    public Optional<Dataset> findById(String id, String folder) throws IOException {
        Assert.notNull(id, "Id must not be null!");
        ObjectMapper mapper = new ObjectMapper();
        Dataset dataset = null;
        List<Dataset> allDatasets = null;
        Farm farm = new Farm();
        File metadataFile = new File(applicationProperties.getWorkspacePath() + "/" + folder, folder + ".meta.json");

        if (metadataFile.exists()) {
            FileReader reader = new FileReader(metadataFile);
            farm = mapper.readValue(reader, Farm.class);
        }
        allDatasets = farm.getData();
        for (Dataset d : allDatasets) {
            if (d.getId().equals(id)) {
                dataset = d;
                dataset.setFarmName(farm.getName());
                dataset.setWashes(false);
                if (farm.getType().contains("Solar"))
                    // dataset.setWashes(hasWashes(dataset.getId()));
                    dataset.setWashes(null);

                if (dataset.getTimeFormat() == null || dataset.getTimeFormat().isEmpty()) {
                    dataset.setTimeFormat(timeFormat);
                }
                if (dataset.getDelimiter() == null || dataset.getDelimiter().isEmpty()) {
                    dataset.setDelimiter(delimiter);
                }
                break;
            }
        }
        if (dataset != null) {
            switch (dataset.getType()) {
                case "modelar":
                    try {
                        modelarDataService.fillDatasetStats(dataset);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                    break;
                default:
                    CsvParserSettings parserSettings = new CsvParserSettings();
                    parserSettings.getFormat().setDelimiter(',');
                    parserSettings.setIgnoreLeadingWhitespaces(false);
                    parserSettings.setIgnoreTrailingWhitespaces(false);
                    CsvParser parser = new CsvParser(parserSettings);
                    parser.beginParsing(new File(applicationProperties.getWorkspacePath() + "/" + folder, dataset.getName()), Charset.forName("US-ASCII"));
                    parser.parseNext();
                    dataset.setHeader(parser.getContext().parsedHeaders());
                    log.debug("Headers: " + Arrays.toString(dataset.getHeader()));
                    parser.stopParsing();
                    break;
            }

            if (dataset.getType().equals("csv")) {
                CsvParserSettings parserSettings = new CsvParserSettings();
                parserSettings.getFormat().setDelimiter(',');
                parserSettings.setIgnoreLeadingWhitespaces(false);
                parserSettings.setIgnoreTrailingWhitespaces(false);
                CsvParser parser = new CsvParser(parserSettings);
                parser.beginParsing(new File(applicationProperties.getWorkspacePath() + "/" + folder, dataset.getName()), Charset.forName("US-ASCII"));
                parser.parseNext();
                dataset.setHeader(parser.getContext().parsedHeaders());
                log.debug("Headers: " + Arrays.toString(dataset.getHeader()));
                parser.stopParsing();
            }
        }
        return Optional.ofNullable(dataset);
    }

    @Override
    public Dataset save(Dataset dataset) throws IOException {
        Assert.notNull(dataset, "Dataset must not be null!");
        ObjectMapper mapper = new ObjectMapper();
        File metadataFile = new File(applicationProperties.getWorkspacePath(), dataset.getId() + ".meta.json");
        FileWriter writer = new FileWriter(metadataFile);
        mapper.writeValue(writer, Dataset.class);
        return dataset;
    }

    @Override
    public List<String> findFiles(String folder) throws IOException {
        File file = new File(applicationProperties.getWorkspacePath() + "/" + folder);
        FileFilter fileFilter = f -> !f.isDirectory() && f.getName().endsWith(".csv") && !f.getName().contains("sample");
        File[] fileNames = file.listFiles(fileFilter);
        List<String> fileList = new ArrayList<>();
        for (File newFile : fileNames) {
            fileList.add(newFile.getName().toString());
        }
        return fileList;
    }

    @Override
    public List<Sample> findSample(String folder) throws IOException {
        File f = new File(applicationProperties.getWorkspacePath() + "/" + folder);
        File[] matchingFiles = f.listFiles(new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.contains("sample") && name.endsWith("csv");
            }
        });
        List<Sample> beans = new CsvToBeanBuilder(new FileReader(matchingFiles[0]))
            .withType(Sample.class).build().parse();
        return beans;
    }

    public List<String> findDirectories() throws IOException {
        File file = new File(applicationProperties.getWorkspacePath());
        String[] names = file.list();
        List<String> dirs = new ArrayList<>();

        for (String name : names) {

            if (new File(applicationProperties.getWorkspacePath() + "/" + name).isDirectory()) {
                log.debug(name);
                dirs.add(name);
            }
        }
        return dirs;
    }


    @Override
    public void deleteById(String id) {
        throw new UnsupportedOperationException();
    }
}
