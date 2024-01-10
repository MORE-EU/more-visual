package eu.more2020.visual.repository;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import eu.more2020.visual.domain.FarmInfo;
import eu.more2020.visual.domain.FarmMeta;

@SuppressWarnings("unused")
public interface FileHandlingRepository {

    void saveFile(String farmName, MultipartFile file, String fileName);
   
    void uploadDataset(FarmInfo metaInfo, MultipartFile file, String farmName) throws IOException;

    void saveFarm(FarmMeta metaInfo, MultipartFile[] files) throws IOException;

}
