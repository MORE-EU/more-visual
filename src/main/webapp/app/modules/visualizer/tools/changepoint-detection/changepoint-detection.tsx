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
  const [detectAuto, setDetectAuto] = useState(false);
  const [detectIntervals, setDetectIntervals] = useState(false);

  const handleCpDetection = (id) => {
    props.enableCpDetection(true);
    props.applyCpDetection(id, from, to, customChangePoints,
      detectAuto, detectIntervals);
  }

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Changepoint Detection
        </Typography>
        <Typography gutterBottom sx={{fontWeight: 'bold'}}>
          Select Dates
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
            <Box sx={{pt: 1}}>Detect Automatically</Box>
            <Tooltip describeChild title={dataset.washes ? "Use Existing Data" : "No Data Found"}>
              <Switch
                checked={detectAuto}
                onChange={() => setDetectAuto(!detectAuto)}
                disabled={cpDetectionEnabled}
                inputProps={{'aria-label': 'controlled'}}
              />
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Intervals on Chart</Box>
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'roffrw',
            pt: 2,
            justifyContent: 'flex-end',
          }}>
            <Button
              disabled={!cpDetectionEnabled}
              onClick={e => props.enableCpDetection(false)}
            >STOP</Button>
            <Button
              disabled={!(detectAuto || detectIntervals) || cpDetectionEnabled}
              onClick={e => handleCpDetection(dataset.id)}
            >APPLY</Button>
          </Box>
        </Box>

      }
    </Box>
  );
}

export default ChangepointDetection;

