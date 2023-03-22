import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateChangeChart } from 'app/modules/store/visualizerSlice';
import React from 'react';

const ChartView = () => {

    const dispatch = useAppDispatch();
    const {changeChart} = useAppSelector(state => state.visualizer);
    
    return (
        <Grid item sx={{alignSelf: "center"}}>
        <Button variant="text" size="small" onClick={() => {
          dispatch(updateChangeChart(false))
        }} sx={{mr: 1, color: changeChart ? "text.primary" : "primary"}}>Overlay</Button>
        <Button variant="text" size='small' onClick={() => {
          dispatch(updateChangeChart(true))
        }} sx={{mr: 1, color: !changeChart ? "text.primary" : "primary"}}>Stacked</Button>
      </Grid>
    )
}

export default ChartView;