package eu.more2020.visual.repository;

import eu.more2020.visual.domain.Changepoint;
import eu.more2020.visual.domain.ChangepointDetection;

import java.io.IOException;
import java.util.List;

/**
 * Repository for the Dataset entity.
 */
@SuppressWarnings("unused")
public interface ToolsRepository {

    List<Changepoint> cpDetection(String id, ChangepointDetection changepoints) throws IOException;


}
