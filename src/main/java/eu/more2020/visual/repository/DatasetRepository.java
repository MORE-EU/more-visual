package eu.more2020.visual.repository;

import eu.more2020.visual.domain.Dataset;
import eu.more2020.visual.domain.Sample;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Repository for the Dataset entity.
 */
@SuppressWarnings("unused")
public interface DatasetRepository {


    List<Dataset> findAll() throws IOException;
    
    List<Sample> findSample(String folder) throws IOException;
    
    List<String> findDirectories() throws IOException;

    List<String> findFiles(String folder) throws IOException;

    Optional<Dataset> findById(String id, String folder) throws IOException;

    Dataset save(Dataset dataset) throws IOException;

    void deleteById(String id);


}
