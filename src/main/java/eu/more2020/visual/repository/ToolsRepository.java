package eu.more2020.visual.repository;

import eu.more2020.visual.domain.Changepoint;
import eu.more2020.visual.domain.ChangepointDetection;
import eu.more2020.visual.domain.DataPoint;
import eu.more2020.visual.domain.TimeRange;

import java.io.IOException;
import java.util.List;

/**
 * Repository for the Dataset entity.
 */
@SuppressWarnings("unused")
public interface ToolsRepository {

    List<DataPoint> forecasting(String id);

    List<Changepoint> cpDetection(String id, ChangepointDetection changepoints) throws IOException;

    List<DataPoint> soilingDetection(String id, TimeRange range);
}
