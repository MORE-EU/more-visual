import React, {useState} from 'react';
import {Box, Divider, Switch, Tooltip, Typography,} from "@mui/material";
import { useAppSelector, useAppDispatch } from 'app/modules/store/storeConfig';
import { applyCpDetection, enableCpDetection } from 'app/modules/store/visualizerSlice';

export const ChangepointDetection = () => {

  const {cpDetectionEnabled, dataset, from, to, customChangePoints} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [detectIntervals, setDetectIntervals] = useState(false);

  const handleCpDetection = () => {
    const action = !cpDetectionEnabled;
    dispatch(enableCpDetection(action));
    if(action)
      dispatch(applyCpDetection({id: dataset.id, from, to,
        customChangePoints}));
  }

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Changepoints
        </Typography>
        <Divider orientation="horizontal" flexItem>
        </Divider>
      </Box>
      {dataset.washes
        &&
        <Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Show</Box>
            <Tooltip describeChild title={dataset.washes ? "Show Changepoints" : "No Data Found"}>
              <Switch
                checked={cpDetectionEnabled}
                onChange={() => handleCpDetection()}
                disabled={!dataset.washes}
                inputProps={{'aria-label': 'controlled'}}
              />
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Use Annotations</Box>
            <Tooltip describeChild
                     title={customChangePoints.length === 0 ? "Use Intervals on Chart" : "Select Intervals on the Chart"}>
              <Switch
                checked={detectIntervals && customChangePoints.length > 0}
                onChange={() => setDetectIntervals(!detectIntervals)}
                disabled={customChangePoints.length === 0 || cpDetectionEnabled}
                inputProps={{'aria-label': 'controlled'}}
              />
            </Tooltip>
          </Box>
        </Box>

      }
    </Box>
  );
}

export default ChangepointDetection;

