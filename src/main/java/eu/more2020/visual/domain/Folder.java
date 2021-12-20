package eu.more2020.visual.domain;

import java.util.List;

public class Folder {

        String folderName;
        List<String> folderFileNames;

    public String getFolderName() {
        return this.folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }

    public List<String> getFolderFileNames() {
        return this.folderFileNames;
    }

    public void setFolderFileNames(List<String> folderFileNames) {
        this.folderFileNames = folderFileNames;
    }
 
}
