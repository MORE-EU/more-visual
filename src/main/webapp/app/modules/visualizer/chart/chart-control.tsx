import React from 'react';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import {ChartChangepointFunctions} from './chart-control-buttons/chart-changepoint-functions';
import { useAppSelector } from 'app/modules/store/storeConfig';
import { ChartType } from './chart-control-buttons/chart-type-picker';
import { ChartAlerting } from './chart-control-buttons/chart-alerting-button';
import ChartDatePicker from './chart-control-buttons/chart-datepicker';
import Grid from '@mui/material/Grid';
import ChartView from './chart-control-buttons/chart-view-buttons';

export const ChartControl = () => {

  const {showChangepointFunction } = useAppSelector(state => state.visualizer);


  return (
    <Grid container direction="row">
      <Grid item alignItems="center" sx={{display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", columnGap: 2}}>
          <ChartDatePicker />
          {/* <ChartType /> */}
          <ChartCompare />
          <ChartAlerting />
      </Grid>
      <ChartView />
      {showChangepointFunction && <ChartChangepointFunctions />}
    </Grid>
  );
};
