import {Button, Grid, Tooltip, Typography} from '@mui/material';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {updateActiveTool, updateChangeChart, updateChangePointDates, updateCompare, updateGraphZoom,} from '../visualizer.reducer';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {ChartDatePicker} from './chart-control-buttons/chart-datepicker';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import {IChangePointDate} from 'app/shared/model/changepoint-date.model';

interface IChartControlProps {
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
  updateCompare: typeof updateCompare,
  updateChangePointDates: typeof updateChangePointDates,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setShowDatePick: Dispatch<SetStateAction<boolean>>,
  setCompare: Dispatch<SetStateAction<boolean>>,
  updateActiveTool: typeof updateActiveTool,

}

export const ChartControl = (props: IChartControlProps) => {
  const {changeChart, from, to, wdFiles, data, changePointDates, compare, showDatePick, showCompare} = props;

  const handleZoom = (zoomNum) => {
    props.updateGraphZoom(zoomNum)
  }

  const [timeBut, setTimeBut] = useState(4);

  return (
    <Grid container direction="row">
      <Grid item alignItems="center" sx={{display: "flex", flexGrow: 1, flexDirection: "row"}}>
        <Typography variant="body1">Time</Typography>
        <Button variant="text" size="small" onClick={() => {
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
        }} sx={{textTransform: "none", color: !(timeBut === 4) ? "#424242" : "#0277bd"}}>ALL</Button>
        {/* <Tooltip title="Indicators">
        <Button variant="text" size="small"><TuneIcon color='action'/></Button>
        </Tooltip> */}

        {/* <Tooltip title="Pick Intervals">
          <Button variant="text" size="small" onClick={() => {
            props.setShowDatePick(true)
          }}><EventNoteIcon color='action'/></Button>
        </Tooltip>
        <Tooltip title="Compare">
          <Button variant="text" size="small" onClick={() => {
            props.setCompare(true)
          }}><AddCircleIcon color='action'/></Button>
        </Tooltip> */}
      </Grid>
      <Grid item>
        <Button variant="text" size="small" onClick={() => {
          props.updateChangeChart(false)
        }} sx={{mr: 1, color: changeChart ? "#424242" : "#0277bd"}}>Original</Button>
        <Button variant="text" size='small' onClick={() => {
          props.updateChangeChart(true)
        }} sx={{mr: 1, color: !changeChart ? "#424242" : "#0277bd"}}>ExpandedView</Button>
      </Grid>
      {showDatePick &&
        <ChartDatePicker showDatePick={showDatePick} setShowDatePick={props.setShowDatePick} from={from} to={to}
                         changePointDates={changePointDates}
                         updateChangePointDates={props.updateChangePointDates} setOpen={props.setOpen}
                         updateActiveTool={props.updateActiveTool}/>}
      {showCompare && <ChartCompare showCompare={showCompare} setCompare={props.setCompare} compare={compare} updateCompare={props.updateCompare} wdFiles={wdFiles} data={data}/>}
    </Grid>
  );
};
