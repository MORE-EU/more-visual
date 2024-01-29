import React, { useEffect, useState } from 'react';
import {ChartCompare} from './chart-control-buttons/chart-compare';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { ChartAlerting } from './chart-control-buttons/chart-alerting-button';
import ChartDatePicker from './chart-control-buttons/chart-datepicker';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import ChartView from './chart-control-buttons/chart-view-buttons';
import Typography from '@mui/material/Typography';
import { updateAccuracy } from 'app/modules/store/visualizerSlice';

export const ChartControl = ({}) => {
  const [value, setValue] = useState<number>(95);
  const {datasetChoice, accuracy, isUserStudy} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
        setValue(newValue);
      }
  };

  const handleCommitChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      dispatch(updateAccuracy(newValue / 100));
    }
  };

  useEffect(() => {
    setValue(accuracy * 100);
  },[datasetChoice]);

  return (
    <Grid container direction="row">
      <Grid item alignItems="center" sx={{display: "flex", flex: 1, flexDirection: "row", justifyContent: "flex-start", columnGap: 2}}>
          <ChartDatePicker />
          {!isUserStudy && 
            <>
              <ChartCompare />
              <ChartAlerting />
            </>
          }
          {isUserStudy && (
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
              onChangeCommitted={handleCommitChange}
              valueLabelDisplay="auto"
              aria-labelledby="lidebar-label"
              />
            </Box>
          )}
      </Grid>
      {!isUserStudy && <ChartView /> }
  
    </Grid>
  );
};
