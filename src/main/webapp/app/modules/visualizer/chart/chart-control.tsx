import React from 'react';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import { useAppSelector } from 'app/modules/store/storeConfig';
import { ChartAlerting } from './chart-control-buttons/chart-alerting-button';
import ChartDatePicker from './chart-control-buttons/chart-datepicker';
import Grid from '@mui/material/Grid';
import ChartView from './chart-control-buttons/chart-view-buttons';

export const ChartControl = () => {

  return (
    <Grid container direction="row">
      <Grid item alignItems="center" sx={{display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", columnGap: 2}}>
          <ChartDatePicker />
          <ChartCompare />
          <ChartAlerting />
      </Grid>
      <ChartView />
  
    </Grid>
  );
};
