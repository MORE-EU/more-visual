import './home.scss';
import React, { useEffect, useState } from 'react';
import { FarmMap } from './map/farm-map';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { getSampleFile, getWdFiles } from 'app/modules/visualizer/visualizer.reducer';
import { RouteComponentProps } from 'react-router-dom';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, ListSubheader, Paper, Tooltip, Typography } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import { LatLng } from 'leaflet';

export interface IHomeProps extends StateProps, DispatchProps, RouteComponentProps<{ folder: string; id: string }> {}

export const Home = (props: IHomeProps) => {
  const { wdFiles, sampleFile } = props;

  const [fly, setFly] = useState(new LatLng(51.505, -0.09));
  const [bounds, setBounds] = useState({ _southWest: { lat: 0, lng: 0 }, _northEast: { lat: 0, lng: 0 } });
  const [counter, setCounter] = useState(0);
  const [filSamples, setFilSamples] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    props.getWdFiles('bbz');
    props.getSampleFile('Sample_turbines');
  }, []);

  useEffect(() => {
    let latlngs = [];
    let info = [];
    const farms = [];
    for (let i = 0; i < sampleFile.length; i++) {
      latlngs.push([sampleFile[i].lat, sampleFile[i].lng]);
      info.push(sampleFile[i]);
      (i + 1) % 10 === 0 && (farms.push({ name: `Farm ${(i + 1)/10}`, fly: latlngs[0], locations: latlngs, farmInfo: info }), (latlngs = []), (info = []));
    }
    setItems(farms);
  }, [sampleFile]);

  useEffect(() => {
    let cnt = 0;
    items.map(item => {
      item.locations.map(location => {
        if (
          location[0] > bounds._southWest.lat &&
          location[0] < bounds._northEast.lat &&
          location[1] > bounds._southWest.lng &&
          location[1] < bounds._northEast.lng
        ) {
          cnt++;
        }
      });
    });
    setCounter(cnt);

    const filteredSamples = [];
    sampleFile.map(sample => {
      if (
        sample.lat > bounds._southWest.lat &&
        sample.lat < bounds._northEast.lat &&
        sample.lng > bounds._southWest.lng &&
        sample.lng < bounds._northEast.lng
      ) {
        filteredSamples.push(sample);
      }
    });
    setFilSamples(filteredSamples);
  }, [bounds]);

  const handleStats = (val) => {
    let newVals;
    if (val === "min"){
      newVals = filSamples.map(sample => {return parseInt(sample.power, 10)})
      newVals.length !== 0 ? newVals = Math.min(...newVals) : newVals = "N/A"
    }else if(val === "max"){
      newVals = filSamples.map(sample => {return parseInt(sample.power, 10)})
      newVals.length !== 0 ? newVals = Math.max(...newVals) : newVals = "N/A"
    }
    return newVals;
  }

  const options = {
    title: {
      text: 'Stats',
    },
    series: [
      {
        data: [counter],
      },
    ],
    stockTools: {
      gui: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      height: 200,
      type: 'bar',
    },
  };

  return (
    <div>
      <Paper sx={{ position: 'fixed', top: 10, left: 10, width: 'auto', height: 'auto', zIndex: 999 , maxHeight: "400px"}}>
        <List
          sx={{ width: '100%', overflowY: "scroll", maxHeight: "390px" }}
          dense={true}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" sx={{backgroundColor: "#eeeeee"}}>
              Available Farms
            </ListSubheader>
          }
        >
          {items.map((item, idx) => {
            return (
              <ListItem key={idx}>
                <ListItemAvatar>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <FactoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} sx={{ mr: 2 }} />
                <Tooltip title="Open Dashboard" placement="right">
                  <Button sx={{ mr: 1, width: 'auto' }} size="small" color="secondary">
                    <DashboardIcon />
                  </Button>
                </Tooltip>
                <Tooltip title="Show on Map" placement="right">
                  <Button
                    size="small"
                    color="info"
                    sx={{ width: 'auto' }}
                    onClick={() => {
                      setFly(new LatLng(item.fly[0], item.fly[1]));
                    }}
                  >
                    <MapIcon />
                  </Button>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <Paper sx={{ position: 'fixed', bottom: 10, right: 10, width: '300px', height: 'auto', zIndex: 999 }}>
        <Paper sx={{textAlign: "center"}}>
          <Typography variant="overline">
            power <br />
            min:
            {handleStats("min")}
            <br />
            max:
            {handleStats("max")}
            <br />
          </Typography>
        </Paper>
        <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />
      </Paper>
      <FarmMap fly={fly} setBounds={setBounds} items={items} />
    </div>
  );
};

const mapStateToProps = ({ visualizer }: IRootState) => ({
  wdFiles: visualizer.wdFiles,
  sampleFile: visualizer.sampleFile,
});

const mapDispatchToProps = {
  getWdFiles,
  getSampleFile,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
