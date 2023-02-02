import './home.scss';
import React, {useEffect} from 'react';
import {HomeMap} from './home-map';
import {HomeLeftMenu} from './home-left-menu';
import {HomeRightStatsPanel} from './home-right-stats-panel';
import {HomeRightChartPanel} from './home-right-chart-panel';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { getDirectories, getSampleFile, getWdFiles } from '../store/visualizerSlice';
import { setAllFilters, setFilSamples, setItems, setSelectedDir } from '../store/homeSlice';
import 'simplebar-react/dist/simplebar.min.css';
import EditFarmModal from './home-edit-modal';
import HomeEditFarmModal from './home-edit-modal';

export const Home = () => {

  const { directories, sampleFile } = useAppSelector(state => state.visualizer);
  const { selectedDir, bounds, items } = useAppSelector(state => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDirectories());
  }, []);

  useEffect(() => {
    if (directories.length !== 0) {
      dispatch(getWdFiles(directories[0]));
      dispatch(setSelectedDir(directories[0]));
    }
  }, [directories])

  useEffect(() => {
    selectedDir.length !== 0 && dispatch(getSampleFile(selectedDir))
    selectedDir.length !== 0 && dispatch(getWdFiles(selectedDir))
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
    dispatch(setItems(farms));

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
      dispatch(setAllFilters(filters));
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
    dispatch(setFilSamples(filteredSamples));
  }, [bounds]);

  return (
    sampleFile.length !== 0 && (
      <div>
        <HomeLeftMenu />
        <HomeRightStatsPanel />
        <HomeRightChartPanel />
        <HomeEditFarmModal />
        <HomeMap />
      </div>
    )
  );
};

export default Home;
