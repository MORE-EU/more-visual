import React, { useEffect } from 'react';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import { useAppSelector } from 'app/modules/store/storeConfig';
import { ChartAlerting } from './chart-control-buttons/chart-alerting-button';
import ChartDatePicker from './chart-control-buttons/chart-datepicker';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import ChartView from './chart-control-buttons/chart-view-buttons';
import Typography from '@mui/material/Typography';

export const ChartControl = ({isSurvey}) => {
  const [value, setValue] = React.useState<number>(95);
  const {datasetChoice} = useAppSelector(state => state.visualizer);
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  useEffect(() => {
    setValue(95);
  },[datasetChoice]);

  return (
    <Grid container direction="row">
      <Grid item alignItems="center" sx={{display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", columnGap: 2}}>
          <ChartDatePicker />
          <ChartCompare />
          <ChartAlerting />
          {isSurvey && (
            <Box sx={{width: '30%', margin: 'auto'}}>
              <Typography id="slidebar-label">
                Accuracy: {value}%
              </Typography>
              <Slider 
              value={value}
              min={60}
              step={1}
              max={100}
              onChange={handleChange}
              // onChangeCommitted={}
              valueLabelDisplay="auto"
              aria-labelledby="lidebar-label"
              />
            </Box>
          )}
      </Grid>
      <ChartView />
  
    </Grid>
  );
};
