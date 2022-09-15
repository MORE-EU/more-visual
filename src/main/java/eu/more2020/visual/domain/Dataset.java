package eu.more2020.visual.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;

/**
 * A Dataset.
 */
public class Dataset implements Serializable {

    private static final long serialVersionUID = 1L;
    public String samplingFreq;
    public String delimiter;
    private String id;
    @NotNull
    private String name;
    private String resType; // 0: panel, 1: turbine
    private String type = "CSV";
    private Boolean hasHeader;
    private String[] header;
    private Integer timeCol;
    private String timeFormat;
    private String farmName;
    private String formalName;
    private List<Changepoint>  gtChangepoints;
    private List<Integer> measures = new ArrayList<>();
    private Map<Integer, DoubleSummaryStatistics> measureStats;

    // only used for csv dataset case
    List<DataFileInfo> fileInfoList = new ArrayList<>();


    private TimeRange timeRange;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Boolean getHasHeader() {
        return hasHeader;
    }

    public void setHasHeader(Boolean hasHeader) {
        this.hasHeader = hasHeader;
    }

    public String[] getHeader() {
        return header;
    }

    public void setHeader(String[] header) {
        this.header = header;
    }

    public Integer getTimeCol() {
        return timeCol;
    }

    public void setTimeCol(Integer timeCol) {
        this.timeCol = timeCol;
    }

    public List<Integer> getMeasures() {
        return measures;
    }

    public void setMeasures(List<Integer> measures) {
        this.measures = measures;
    }

    public String getTimeFormat() {
        return timeFormat;
    }

    public void setTimeFormat(String timeFormat) {
        this.timeFormat = timeFormat;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }

    public String getFormalName() {
        return formalName;
    }

    public void setFormalName(String formalName) {
        this.formalName = formalName;
    }

    public String getSamplingFreq() {
        return samplingFreq;
    }

    public void setSamplingFreq(String samplingFreq) {
        this.samplingFreq = samplingFreq;
    }

    public String getDelimiter() {
        return delimiter;
    }

    public void setDelimiter(String delimiter) {
        this.delimiter = delimiter;
    }

    public List<Changepoint> getgtChangepoints() {
        return gtChangepoints;
    }

    public void setGtChangepoints(List<Changepoint>  gtChangepoints) {
        this.gtChangepoints = gtChangepoints;
    }

    public Map<Integer, DoubleSummaryStatistics> getMeasureStats() {
        return measureStats;
    }

    public void setMeasureStats(Map<Integer, DoubleSummaryStatistics> measureStats) {
        this.measureStats = measureStats;
    }

    public TimeRange getTimeRange() {
        return timeRange;
    }

    public String getResType() {
        return resType;
    }

    public void setResType(String resType) {
        this.resType = resType;
    }

    public void setTimeRange(TimeRange timeRange) {
        this.timeRange = timeRange;
    }

    public List<DataFileInfo> getFileInfoList() {
        return fileInfoList;
    }

    public void setFileInfoList(List<DataFileInfo> fileInfoList) {
        this.fileInfoList = fileInfoList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Dataset)) {
            return false;
        }
        return id != null && id.equals(((Dataset) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Dataset{" +
            "id='" + id + '\'' +
            ", name='" + name + '\'' +
            ", hasHeader=" + hasHeader +
            ", header=" + Arrays.toString(header) +
            ", timeCol=" + timeCol +
            ", timeFormat='" + timeFormat + '\'' +
            ", farmName='" + farmName + '\'' +
            ", formalName='" + formalName + '\'' +
            ", measures=" + measures +
            ", samplingFreq='" + samplingFreq + '\'' +
            ", delimiter='" + delimiter + '\'' +
            ", gtChangepoints=" + gtChangepoints +
            '}';
    }
}
