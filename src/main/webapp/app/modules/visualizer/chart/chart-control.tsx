import {Button, Grid, TextField, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {
  updateActiveTool,
  updateChangeChart,
  updateCompare,
  updateCompareQueryResults,
  updateCustomChangePoints,
  updateFrom,
  updateGraphZoom,
  updateQueryResults,
  updateTo,
} from '../visualizer.reducer';
import {ChartDatePicker} from './chart-control-buttons/chart-datepicker';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import {IChangePointDate} from 'app/shared/model/changepoint-date.model';
import {ChartChangePointFunctions} from './chart-control-buttons/chart-changepoint-functions';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {IDataset} from 'app/shared/model/dataset.model';
import Highcharts from 'highcharts';

interface IChartControlProps {
  dataset: IDataset,
  from: number,
  to: number,
  wdFiles: any[],
  updateChangeChart: typeof updateChangeChart,
  updateGraphZoom: typeof updateGraphZoom,
  changeChart: boolean,
  data: any,
  resampleFreq: any,
  queryResults: any,
  customChangePoints: IChangePointDate[],
  compare: any[],
  showDatePick: boolean,
  showCompare: boolean,
  showChangePointFunction: boolean,
  folder: string,
  selectedMeasures: number[],
  chartRef: any,
  updateCompare: typeof updateCompare,
  updateCustomChangePoints: typeof updateCustomChangePoints,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setShowDatePick: Dispatch<SetStateAction<boolean>>,
  setShowChangePointFunction: Dispatch<SetStateAction<boolean>>,
  updateCompareQueryResults: typeof updateCompareQueryResults,
  setCompare: Dispatch<SetStateAction<boolean>>,
  updateFrom: typeof updateFrom,
  updateTo: typeof updateTo,
  updateQueryResults: typeof updateQueryResults,
  updateActiveTool: typeof updateActiveTool,

}

export const ChartControl = (props: IChartControlProps) => {
  const {
    changeChart, from, to, wdFiles, data, customChangePoints, compare, showDatePick, chartRef,
    showCompare, showChangePointFunction, folder, selectedMeasures, dataset, resampleFreq, queryResults
  } = props;

  const handleOnAccept = (e, category) => {
    if(category === "from"){
      chartRef.xAxis[0].setExtremes(e.getTime() + 200, to - 200);
      props.updateQueryResults(folder, dataset.id, e.getTime(), to, resampleFreq, selectedMeasures);
    }else{
      chartRef.xAxis[0].setExtremes(from + 200, e.getTime() - 200);
      props.updateQueryResults(folder, dataset.id, from, e.getTime(), resampleFreq, selectedMeasures);
    }
  }

  return (
    <Grid container direction="row" sx={{mb: 1}}>
      <Grid item alignItems="center" sx={{display: "flex", flexGrow: 1, flexDirection: "row"}}>
        <Typography variant="body1" sx={{pr: 1}}>Time</Typography>
        {/* <Button variant="text" size="small" onClick={() => {
          setTimeBut(0), handleZoom(1 * 1000)
        }} sx={{textTransform: "none", color: !(timeBut === 0) ? "#424242" : "#0277bd"}}>1s</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(1), handleZoom(60 * 1000)
        }} sx={{textTransform: "none", color: !(timeBut === 1) ? "#424242" : "#0277bd"}}>1m</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(2), handleZoom(1800 * 1000)
        }} sx={{textTransform: "none", color: !(timeBut === 2) ? "#424242" : "#0277bd"}}>30m</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(3), handleZoom(3600 * 1000)
        }} sx={{textTransform: "none", color: !(timeBut === 3) ? "#424242" : "#0277bd"}}>1h</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(4), handleZoom(null)
        }} sx={{textTransform: "none", color: !(timeBut === 4) ? "#424242" : "#0277bd"}}>ALL</Button> */}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(p) => <TextField size="small" {...p} />}
              label="From"
              value={from ? from : null}
              minDateTime={queryResults ? queryResults.timeRange[0] : null}
              maxDateTime={queryResults ? queryResults.timeRange[1] : null}
              onAccept={(e) => {handleOnAccept(e, "from")}}
              onChange={(e) => {}}
              inputFormat="dd/MM/yyyy"
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
              inputFormat="dd/MM/yyyy"
            />
          </LocalizationProvider>
      </Grid>
      <Grid item>
        <Button variant="text" size="small" onClick={() => {
          props.updateChangeChart(false)
        }} sx={{mr: 1, color: changeChart ? "#424242" : "#0277bd"}}>Overlay</Button>
        <Button variant="text" size='small' onClick={() => {
          props.updateChangeChart(true)
        }} sx={{mr: 1, color: !changeChart ? "#424242" : "#0277bd"}}>Stacked</Button>
      </Grid>
      {showDatePick &&
        <ChartDatePicker showDatePick={showDatePick} setShowDatePick={props.setShowDatePick} from={from} to={to}
                         customChangePoints={customChangePoints}
                         updateCustomChangePoints={props.updateCustomChangePoints} setOpen={props.setOpen}
                         updateActiveTool={props.updateActiveTool}/>}
      {showCompare && <ChartCompare showCompare={showCompare} setCompare={props.setCompare} compare={compare}
                                    updateCompare={props.updateCompare} wdFiles={wdFiles} data={data} resampleFreq={resampleFreq}
                                    updateCompareQueryResults={props.updateCompareQueryResults} folder={folder}
                                    from={from} to={to} selectedMeasures={selectedMeasures} dataset={dataset}/>}
      {showChangePointFunction && <ChartChangePointFunctions showChangePointFunction={showChangePointFunction}
                                                             setShowChangePointFunction={props.setShowChangePointFunction}
                                                             setOpen={props.setOpen}
                                                             updateActiveTool={props.updateActiveTool}/>}
    </Grid>
  );
};
