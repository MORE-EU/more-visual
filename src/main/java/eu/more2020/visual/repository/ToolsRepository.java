package eu.more2020.visual.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.protobuf.InvalidProtocolBufferException;
import eu.more2020.visual.domain.*;
import eu.more2020.visual.domain.Detection.ChangepointDetection;
import eu.more2020.visual.domain.Detection.DeviationDetection;
import eu.more2020.visual.domain.Detection.RangeDetection;
import eu.more2020.visual.middleware.domain.ImmutableDataPoint;

import java.io.IOException;
import java.util.List;

/**
 * Repository for the Dataset entity.
 */
@SuppressWarnings("unused")
public interface ToolsRepository {

    List<Changepoint> getManualChangepoints(String id) throws InvalidProtocolBufferException, JsonProcessingException;

    List<ImmutableDataPoint> forecasting(String id);

    List<Changepoint> changepointDetection(ChangepointDetection changepoints) throws IOException;

    List<ImmutableDataPoint> soilingDetection(DeviationDetection deviationDetection);

    List<ImmutableDataPoint> yawMisalignmentDetection(RangeDetection rangeDetection);

    // List<Changepoint> patternDetection(PatternDetection patternDetection);

}
