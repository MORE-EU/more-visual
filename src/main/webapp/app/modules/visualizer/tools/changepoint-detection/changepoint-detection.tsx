import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Button, Divider, Switch, Tooltip, Typography,} from "@mui/material";
import {applyCpDetection, enableCpDetection} from "app/modules/visualizer/visualizer.reducer";

export interface IChangepointDetectionProps {
  dataset: IDataset,
  data: any,
  customChangePoints: any,
  from: Date,
  to: Date,
  applyCpDetection: typeof applyCpDetection,
  cpDetectionEnabled: boolean,
  enableCpDetection: typeof enableCpDetection,
}


export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const {dataset, customChangePoints, from, to, cpDetectionEnabled} = props;
  const [detectIntervals, setDetectIntervals] = useState(false);

  const handleCpDetection = () => {
    const action = !cpDetectionEnabled;
    props.enableCpDetection(action);
    if(action)
      props.applyCpDetection(dataset.id, from, to,
        customChangePoints, detectIntervals);
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

