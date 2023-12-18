package eu.more2020.visual.domain.Forecasting.DBs;

import com.influxdb.annotations.Column;
import com.influxdb.annotations.Measurement;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import com.opencsv.bean.AbstractBeanField;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Measurement(name = "BEZ1")
public class BEZ1 {

    @Column(timestamp = true)
    @CsvCustomBindByName(column = "datetime", converter = EpochConverter.class)
    private Instant datetime;

    @Column
    @CsvBindByName(column = "wind_speed")
    private double wind_speed;

    @Column
    @CsvBindByName(column = "pitch_angle")
    private double pitch_angle;

    @Column
    @CsvBindByName(column = "rotor_speed")
    private double rotor_speed;

    @Column
    @CsvBindByName(column = "active_power")
    private double active_power;

    @Column
    @CsvBindByName(column = "cos_nacelle_dir")
    private double cos_nacelle_dir;

    @Column
    @CsvBindByName(column = "sin_nacelle_dir")
    private double sin_nacelle_dir;

    @Column
    @CsvBindByName(column = "cos_wind_dir")
    private double cos_wind_dir;

    @Column
    @CsvBindByName(column = "sin_wind_dir")
    private double sin_wind_dir;

    @Column
    @CsvBindByName(column = "nacelle_direction")
    private double nacelle_direction;

    @Column
    @CsvBindByName(column = "wind_direction")
    private double wind_direction;

    public Point toPoint() {
        return Point.measurement("BEZ1")
                .time(datetime, WritePrecision.NS)
                .addField("wind_speed", wind_speed)
                .addField("pitch_angle", pitch_angle)
                .addField("rotor_speed", rotor_speed)
                .addField("active_power", active_power)
                .addField("cos_nacelle_dir", cos_nacelle_dir)
                .addField("sin_nacelle_dir", sin_nacelle_dir)
                .addField("cos_wind_dir", cos_wind_dir)
                .addField("sin_wind_dir", sin_wind_dir)
                .addField("nacelle_direction", nacelle_direction)
                .addField("wind_direction", wind_direction);
    }

    public BEZ1(Instant datetime, double wind_speed, double pitch_angle, double rotor_speed,
                  double active_power, double cos_nacelle_dir, double sin_nacelle_dir,
                  double cos_wind_dir, double sin_wind_dir, double nacelle_direction,
                  double wind_direction) {
        this.datetime = datetime;
        this.wind_speed = wind_speed;
        this.pitch_angle = pitch_angle;
        this.rotor_speed = rotor_speed;
        this.active_power = active_power;
        this.cos_nacelle_dir = cos_nacelle_dir;
        this.sin_nacelle_dir = sin_nacelle_dir;
        this.cos_wind_dir = cos_wind_dir;
        this.sin_wind_dir = sin_wind_dir;
        this.nacelle_direction = nacelle_direction;
        this.wind_direction = wind_direction;
    }

    public static class EpochConverter extends AbstractBeanField {

        @Override
        public Instant convert(String s) {
            try {
                String format = "yyyy-MM-dd HH:mm:ss";
                SimpleDateFormat sdf = new SimpleDateFormat(format);
                Date date = sdf.parse(s);
                return date.toInstant();
            } catch (ParseException e) {
                e.printStackTrace();
            }
            return null;
        }
    }

    @Override
    public String toString() {
        return "BEZ1 [datetime=" + datetime + ", wind_speed=" + wind_speed + ", pitch_angle="
                + pitch_angle + ", rotor_speed=" + rotor_speed + ", active_power=" + active_power
                + ", cos_nacelle_dir=" + cos_nacelle_dir + ", sin_nacelle_dir=" + sin_nacelle_dir
                + ", cos_wind_dir=" + cos_wind_dir + ", sin_wind_dir=" + sin_wind_dir
                + ", nacelle_direction=" + nacelle_direction + ", wind_direction=" + wind_direction + "]";
    }
}
