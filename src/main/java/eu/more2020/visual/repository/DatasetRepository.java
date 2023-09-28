package eu.more2020.visual.repository;

import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.domain.Farm;
import eu.more2020.visual.domain.FarmMeta;
import eu.more2020.visual.domain.Sample;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Repository for the Dataset entity.
 */
@SuppressWarnings("unused")
public interface DatasetRepository {

    String DATASETS_CACHE = "datasets";

    ResponseEntity<String> checkConnection(String url, String port) throws IOException;

    List<Dataset> findAll() throws IOException;

    List<Sample> findSample(String farmName) throws IOException;

    List<String> findDirectories() throws IOException;

    Optional<FarmMeta> findFarm(String farmName) throws IOException;

    @Cacheable(cacheNames = DATASETS_CACHE)
    Optional<Dataset> findById(String id, String farmName) throws IOException;

    Dataset save(Dataset dataset) throws IOException;

    void deleteById(String id);


}
