package eu.more2020.visual.repository;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;

import eu.more2020.visual.domain.FarmInfo;
import eu.more2020.visual.domain.FarmMeta;

@SuppressWarnings("unused")
public interface FileHandlingRepository {

    void saveFile(String farmName, MultipartFile file, String fileName);
   
    void uploadDataset(FarmInfo metaInfo, MultipartFile file, String farmName) throws StreamWriteException, DatabindException, IOException;

    void saveFarm(FarmMeta metaInfo, MultipartFile[] files) throws StreamWriteException, DatabindException, IOException;

}
