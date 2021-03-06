import './home.scss';
import React, {useEffect, useState} from 'react';
import {FarmMap} from './map/farm-map';
import {IRootState} from 'app/shared/reducers';
import {connect} from 'react-redux';
import {getDirectories, getSampleFile, getWdFiles} from 'app/modules/visualizer/visualizer.reducer';
import {RouteComponentProps} from 'react-router-dom';
import {LatLng} from 'leaflet';
import {HomeLeftMenu} from './home-left-menu';
import {HomeRightStatsPanel} from './home-right-stats-panel';
import {HomeRightChartPanel} from './home-right-chart-panel';

export interface IHomeProps extends StateProps, DispatchProps, RouteComponentProps<{ folder: string; id: string }> {
}

export const Home = (props: IHomeProps) => {
  const {sampleFile, directories} = props;

  const [fly, setFly] = useState(new LatLng(51.505, -0.09));
  const [bounds, setBounds] = useState({_southWest: {lat: 0, lng: 0}, _northEast: {lat: 0, lng: 0}});
  const [filSamples, setFilSamples] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedDir, setSelectedDir] = useState("");

  useEffect(() => {
    props.getWdFiles('bbz');
    props.getDirectories();
  }, []);

  useEffect(() => {
    if (directories.length !== 0) {
      setSelectedDir(directories[0]);
    }
  }, [directories])

  useEffect(() => {
    selectedDir.length !== 0 && props.getSampleFile(selectedDir)
  }, [selectedDir])

  useEffect(() => {
    // Map Markers Creation
    let latlngs = [];
    let info = [];
    const farms = [];
    for (let i = 0; i < sampleFile.length; i++) {
      latlngs.push([sampleFile[i].lat, sampleFile[i].lng]);
      info.push(sampleFile[i]);
      (i + 1) % 10 === 0 &&
      (farms.push({
        name: `${info[0].country}`,
        fly: latlngs[0],
        locations: latlngs,
        farmInfo: info
      }), (latlngs = []), (info = []));
    }
    setItems(farms);

    // Filter Array Creation
    if (sampleFile.length !== 0) {
      const filters = [];
      const nofilters = ['lat', 'lng', 'capturedExceptions'];
      Object.getOwnPropertyNames(sampleFile[0]).forEach(
        prop => !nofilters.includes(`${[prop]}`) && filters.push({category: `${prop}`, values: []})
      );
      filters.map(filter => {
        sampleFile.map(sample => {
          for (const [key, value] of Object.entries(sample)) {
            filter.category === key && !filter.values.includes(value) && filter.values.push(value);
          }
        });
        filter.values.sort();
      });
      setAllFilters(filters);
    }
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

  return (
    sampleFile.length !== 0 && (
      <div>
        <HomeLeftMenu setFly={setFly} items={items} selected={selected}
                      allFilters={allFilters} setSelected={setSelected} directories={directories}
                      selectedDir={selectedDir} setSelectedDir={setSelectedDir}/>
        <HomeRightStatsPanel filSamples={filSamples} selected={selected}/>
        <HomeRightChartPanel filSamples={filSamples} selected={selected}/>
        <FarmMap fly={fly} setBounds={setBounds} items={items} selected={selected}/>
      </div>
    )
  );
};

const mapStateToProps = ({visualizer}: IRootState) => ({
  wdFiles: visualizer.wdFiles,
  sampleFile: visualizer.sampleFile,
  directories: visualizer.directories,
});

const mapDispatchToProps = {
  getWdFiles,
  getSampleFile,
  getDirectories,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
