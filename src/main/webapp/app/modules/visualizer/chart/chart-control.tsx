import React, {useRef} from 'react';
import {Button, Grid, IconButton, TextField, Tooltip, Typography} from '@mui/material';
import {ChartCompare} from './chart-control-buttons/chart-compare/chart-compare';
import {ChartChangepointFunctions} from './chart-control-buttons/chart-changepoint-functions';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateChangeChart, updateQueryResults } from 'app/modules/store/visualizerSlice';
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { ChartType } from './chart-control-buttons/chart-type-picker';
import { ChartAlerting } from './chart-control-buttons/chart-alerting-button';
import AutoMLButton from './chart-control-buttons/chart-autoML-button';

export const ChartControl = () => {

  const {chartRef, folder, dataset, from, to, resampleFreq, selectedMeasures,
  queryResults, changeChart, showChangepointFunction,  soilingEnabled } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const isSoilingEnabled = useRef(soilingEnabled);

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
    <Grid container direction="row">
      <Grid item alignItems="center" sx={{display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", columnGap: 2}}>
        <Typography variant="body1" fontWeight={600} fontSize={15} >Time</Typography>
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
            <Typography variant="body1" fontWeight={400} fontSize={30}>{" - "}</Typography>
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
          <ChartType />
          <ChartCompare />
          <ChartAlerting />
          <AutoMLButton />
      </Grid>
      <Grid item sx={{alignSelf: "center"}}>
        <Button variant="text" size="small" onClick={() => {
          dispatch(updateChangeChart(false))
        }} sx={{mr: 1, color: changeChart ? "#424242" : "#0277bd"}}>Overlay</Button>
        <Button variant="text" size='small' onClick={() => {
          dispatch(updateChangeChart(true))
        }} sx={{mr: 1, color: !changeChart ? "#424242" : "#0277bd"}}>Stacked</Button>
      </Grid>
      {showChangepointFunction && <ChartChangepointFunctions />}
    </Grid>
  );
};
