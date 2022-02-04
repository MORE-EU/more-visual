import {Button, Grid, Tooltip, Typography} from '@mui/material';
import React, {useState} from 'react';
import {updateChangeChart} from '../visualizer.reducer';
import TuneIcon from '@mui/icons-material/Tune';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IChartControlProps {
  updateChangeChart: typeof updateChangeChart,
  changeChart: boolean,
}

export const ChartControl = (props: IChartControlProps) => {
  const {changeChart} = props;

  const [timeBut, setTimeBut] = useState(4);

  return (
    <Grid container direction="row">
      <Grid item alignItems="center" sx={{display: "flex", flexGrow: 1, flexDirection: "row"}}>
        <Typography variant="body1">Time</Typography>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(0)
        }} sx={{textTransform: "none", color: !(timeBut === 0) ? "#424242" : "#0277bd"}}>1s</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(1)
        }} sx={{textTransform: "none", color: !(timeBut === 1) ? "#424242" : "#0277bd"}}>1m</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(2)
        }} sx={{textTransform: "none", color: !(timeBut === 2) ? "#424242" : "#0277bd"}}>30m</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(3)
        }} sx={{textTransform: "none", color: !(timeBut === 3) ? "#424242" : "#0277bd"}}>1h</Button>
        <Button variant="text" size="small" onClick={() => {
          setTimeBut(4)
        }} sx={{textTransform: "none", color: !(timeBut === 4) ? "#424242" : "#0277bd"}}>ALL</Button>
        <Tooltip title="Indicators">
          <Button variant="text" size="small"><TuneIcon color='action'/></Button>
        </Tooltip>
        <Tooltip title="Intervals">
          <Button variant="text" size="small"><EventNoteIcon color='action'/></Button>
        </Tooltip>
        <Tooltip title="Compare">
          <Button variant="text" size="small"><AddCircleIcon color='action'/></Button>
        </Tooltip>
      </Grid>
      <Grid item>
        <Button variant="text" size="small" onClick={() => {
          props.updateChangeChart(false)
        }} sx={{mr: 1, color: changeChart ? "#424242" : "#0277bd"}}>Original</Button>
        <Button variant="text" size='small' onClick={() => {
          props.updateChangeChart(true)
        }} sx={{mr: 1, color: !changeChart ? "#424242" : "#0277bd"}}>ExpandedView</Button>
      </Grid>
    </Grid>
  );
};
