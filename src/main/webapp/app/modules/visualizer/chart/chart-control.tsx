import React from 'react';
import {Button, Grid, TextField, Typography} from '@mui/material';
import {ChartDatePicker} from './chart-control-buttons/chart-datepicker';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import {ChartChangePointFunctions} from './chart-control-buttons/chart-changepoint-functions';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateChangeChart, updateQueryResults } from 'app/modules/store/visualizerSlice';

export const ChartControl = () => {

  const {chartRef, folder, dataset, from, to, resampleFreq, selectedMeasures, 
  queryResults, changeChart, showChangePointFunction, showCompare, showDatePick } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleOnAccept = (e, category) => {
    if(category === "from"){
      chartRef.xAxis[0].setExtremes(e.getTime() + 200, to - 200);
      dispatch(updateQueryResults({folder, id: dataset.id, from: e.getTime(), to, resampleFreq, selectedMeasures, filter: null}));
    }else{
      chartRef.xAxis[0].setExtremes(from + 200, e.getTime() - 200);
      dispatch(updateQueryResults({folder, id: dataset.id, from, to: e.getTime(), resampleFreq, selectedMeasures, filter: null}));
    }
  }

  return (
    <Grid container direction="row" sx={{mb: 1}}>
      <Grid item alignItems="center" sx={{display: "flex", flexGrow: 1, flexDirection: "row"}}>
        <Typography variant="body1" sx={{pr: 1}}>Time</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(p) => <TextField size="small" {...p} />}
              label="From"
              value={from ? from : null}
              minDateTime={queryResults ? queryResults.timeRange[0] : null}
              maxDateTime={queryResults ? queryResults.timeRange[1] : null}
              onAccept={(e) => {handleOnAccept(e, "from")}}
              onChange={(e) => {}}
              inputFormat="dd/MM/yyyy hh:mm a"
              />
            <Typography variant="body1" sx={{pl: 1, pr: 1}}>{" - "}</Typography>
            <DateTimePicker
              renderInput={(p) => <TextField size="small" {...p} />}
              label="To"
              value={to ? to : null}
              minDateTime={queryResults ? queryResults.timeRange[0] : null}
              maxDateTime={queryResults ? queryResults.timeRange[1] : null}
              onAccept={(e) => {handleOnAccept(e, "to")}}
              onChange={(e) => {}}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </LocalizationProvider>
      </Grid>
      <Grid item>
        <Button variant="text" size="small" onClick={() => {
          dispatch(updateChangeChart(false))
        }} sx={{mr: 1, color: changeChart ? "#424242" : "#0277bd"}}>Overlay</Button>
        <Button variant="text" size='small' onClick={() => {
          dispatch(updateChangeChart(true))
        }} sx={{mr: 1, color: !changeChart ? "#424242" : "#0277bd"}}>Stacked</Button>
      </Grid>
      {showDatePick && <ChartDatePicker />}
      {showCompare && <ChartCompare />}
      {showChangePointFunction && <ChartChangePointFunctions />}
    </Grid>
  );
};
