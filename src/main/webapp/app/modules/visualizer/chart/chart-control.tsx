import {Button, Grid, TextField, Tooltip, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {updateActiveTool, updateChangeChart, updateChangePointDates, updateCompare, updateCompareQueryResults, updateFrom, updateGraphZoom, updateQueryResults, updateTo,} from '../visualizer.reducer';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ChartDatePicker} from './chart-control-buttons/chart-datepicker';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import {IChangePointDate} from 'app/shared/model/changepoint-date.model';
import { ChartChangePointFunctions } from './chart-control-buttons/chart-changepoint-functions';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { IDataset } from 'app/shared/model/dataset.model';

interface IChartControlProps {
  dataset: IDataset,
  from: Date,
  to: Date,
  wdFiles: any[],
  updateChangeChart: typeof updateChangeChart,
  updateGraphZoom: typeof updateGraphZoom,
  changeChart: boolean,
  data: any,
  changePointDates: IChangePointDate[],
  compare: string,
  showDatePick: boolean,
  showCompare: boolean,
  showChangePointFunction: boolean,
  folder: string,
  selectedMeasures: number[],
  updateCompare: typeof updateCompare,
  updateChangePointDates: typeof updateChangePointDates,
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
  const {changeChart, from, to, wdFiles, data, changePointDates, compare, showDatePick, showCompare, showChangePointFunction, folder, selectedMeasures, dataset} = props;

  const handleZoom = (zoomNum) => {
    props.updateGraphZoom(zoomNum)
  }

  const [timeBut, setTimeBut] = useState(4);

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
      {from && 
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(p) => <TextField size="small" {...p} />}
          label="From"
          value={from}
          minDateTime={from}
          maxDateTime={to}
          onChange={props.updateFrom}
          onClose={() => {props.updateQueryResults(folder, dataset.id, from.getTime(), to.getTime(), selectedMeasures)}}
        />
        <Typography variant="body1" sx={{pl: 1, pr: 1}}>{" - "}</Typography>
        <DateTimePicker
          renderInput={(p) => <TextField size="small" {...p} />}
          label="To"
          value={to}
          minDateTime={from}
          maxDateTime={to}
          onChange={props.updateTo}
          onClose={() => {props.updateQueryResults(folder, dataset.id, from.getTime(), to.getTime(), selectedMeasures)}}
        />
    </LocalizationProvider>}
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
                         changePointDates={changePointDates}
                         updateChangePointDates={props.updateChangePointDates} setOpen={props.setOpen}
                         updateActiveTool={props.updateActiveTool}/>}
      {showCompare && <ChartCompare showCompare={showCompare} setCompare={props.setCompare} compare={compare} updateCompare={props.updateCompare} wdFiles={wdFiles} data={data} 
                        updateCompareQueryResults={props.updateCompareQueryResults} folder={folder} from={from} to={to} selectedMeasures={selectedMeasures} dataset={dataset}/>}
      {showChangePointFunction && <ChartChangePointFunctions showChangePointFunction={showChangePointFunction} setShowChangePointFunction={props.setShowChangePointFunction} setOpen={props.setOpen} updateActiveTool={props.updateActiveTool}/>}
    </Grid>
  );
};
