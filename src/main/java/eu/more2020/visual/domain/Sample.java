package eu.more2020.visual.domain;

import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvToBean;
import java.util.Objects;

/**
 * A Dataset.
 */
public class Sample extends CsvToBean {

    @CsvBindByName(column = "ID")
    private String ID;

    @CsvBindByName(column = "Continent")
    private String continent;

    @CsvBindByName(column = "ISO code")
    private String IsoCode;
    
    @CsvBindByName(column = "Country")
    private String country;
    
    @CsvBindByName(column = "State code")
    private String stateCode;
   
    @CsvBindByName(column = "Area")
    private String area;
   
    @CsvBindByName(column = "City")
    private String city;
  
    @CsvBindByName(column = "Name")
    private String name;
    
    @CsvBindByName(column = "2nd name")
    private String secName;
    
    @CsvBindByName(column = "Latitude")
    private String lat;
    
    @CsvBindByName(column = "Longitude")
    private String lng;
    
    @CsvBindByName(column = "Altitude/Depth")
    private String AltDepth;
    
    @CsvBindByName(column = "Location accuracy")
    private String locAcc;
    
    @CsvBindByName(column = "Offshore Shore distance")
    private String shoreDist;
    
    @CsvBindByName(column = "Manufacturer")
    private String manufacturer;
    
    @CsvBindByName(column = "Turbine")
    private String turbine;
    
    @CsvBindByName(column = "Hub height")
    private String hubHeight;
    
    @CsvBindByName(column = "Number of turbines")
    private String noOfTurbines;
    
    @CsvBindByName(column = "Total power")
    private String power;
    
    @CsvBindByName(column = "Developer")
    private String dev;
   
    @CsvBindByName(column = "Operator")
    private String operator;

    @CsvBindByName(column = "Owner")
    private String owner;

    @CsvBindByName(column = "Commissioning date")
    private String ComDate;

    @CsvBindByName(column = "Decommissioning date")
    private String decDate;

    @CsvBindByName(column = "Update")
    private String update;


    public String getID() {
        return this.ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public String getContinent() {
        return this.continent;
    }

    public void setContinent(String continent) {
        this.continent = continent;
    }

    public String getIsoCode() {
        return this.IsoCode;
    }

    public void setIsoCode(String IsoCode) {
        this.IsoCode = IsoCode;
    }

    public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getStateCode() {
        return this.stateCode;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }

    public String getArea() {
        return this.area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSecName() {
        return this.secName;
    }

    public void setSecName(String secName) {
        this.secName = secName;
    }

    public String getLat() {
        return this.lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public String getLng() {
        return this.lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getAltDepth() {
        return this.AltDepth;
    }

    public void setAltDepth(String AltDepth) {
        this.AltDepth = AltDepth;
    }

    public String getLocAcc() {
        return this.locAcc;
    }

    public void setLocAcc(String locAcc) {
        this.locAcc = locAcc;
    }

    public String getShoreDist() {
        return this.shoreDist;
    }

    public void setShoreDist(String shoreDist) {
        this.shoreDist = shoreDist;
    }

    public String getManufacturer() {
        return this.manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getTurbine() {
        return this.turbine;
    }

    public void setTurbine(String turbine) {
        this.turbine = turbine;
    }

    public String getHubHeight() {
        return this.hubHeight;
    }

    public void setHubHeight(String hubHeight) {
        this.hubHeight = hubHeight;
    }

    public String getNoOfTurbines() {
        return this.noOfTurbines;
    }

    public void setNoOfTurbines(String noOfTurbines) {
        this.noOfTurbines = noOfTurbines;
    }

    public String getPower() {
        return this.power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public String getDev() {
        return this.dev;
    }

    public void setDev(String dev) {
        this.dev = dev;
    }

    public String getOperator() {
        return this.operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }

    public String getOwner() {
        return this.owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getComDate() {
        return this.ComDate;
    }

    public void setComDate(String ComDate) {
        this.ComDate = ComDate;
    }

    public String getDecDate() {
        return this.decDate;
    }

    public void setDecDate(String decDate) {
        this.decDate = decDate;
    }

    public String getUpdate() {
        return this.update;
    }

    public void setUpdate(String update) {
        this.update = update;
    }


    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Sample)) {
            return false;
        }
        Sample sample = (Sample) o;
        return Objects.equals(ID, sample.ID) && Objects.equals(continent, sample.continent) && Objects.equals(IsoCode, sample.IsoCode) && Objects.equals(country, sample.country) && Objects.equals(stateCode, sample.stateCode) && Objects.equals(area, sample.area) && Objects.equals(city, sample.city) && Objects.equals(name, sample.name) && Objects.equals(secName, sample.secName) && Objects.equals(lat, sample.lat) && Objects.equals(lng, sample.lng) && Objects.equals(AltDepth, sample.AltDepth) && Objects.equals(locAcc, sample.locAcc) && Objects.equals(shoreDist, sample.shoreDist) && Objects.equals(manufacturer, sample.manufacturer) && Objects.equals(turbine, sample.turbine) && Objects.equals(hubHeight, sample.hubHeight) && Objects.equals(noOfTurbines, sample.noOfTurbines) && Objects.equals(power, sample.power) && Objects.equals(dev, sample.dev) && Objects.equals(operator, sample.operator) && Objects.equals(owner, sample.owner) && Objects.equals(ComDate, sample.ComDate) && Objects.equals(decDate, sample.decDate) && Objects.equals(update, sample.update);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID, continent, IsoCode, country, stateCode, area, city, name, secName, lat, lng, AltDepth, locAcc, shoreDist, manufacturer, turbine, hubHeight, noOfTurbines, power, dev, operator, owner, ComDate, decDate, update);
    }
    

}

