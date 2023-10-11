package eu.more2020.visual.service.soiling;

import eu.more2020.visual.grpc.RouteGuideGrpc;
import eu.more2020.visual.repository.MetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SoilingDetectionImpl extends RouteGuideGrpc.RouteGuideImplBase {

    @Autowired
    private MetaRepository metaRepository;

    @Autowired
    public SoilingDetectionImpl(MetaRepository metaRepository) {
        this.metaRepository = metaRepository;
    }
}