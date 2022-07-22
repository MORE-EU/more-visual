import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Button, Divider, Switch, Tooltip, Typography,} from "@mui/material";
import {
  applyCpDetection,
  enableCpDetection, updateSelectedMeasures,
  updateShowGroundTruthChangepoints
} from "app/modules/visualizer/visualizer.reducer";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export interface ISoilingDetectionProps {
  dataset: IDataset,
  data: any,
  customChangePoints: any,
  from: number,
  to: number,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  applyCpDetection: typeof applyCpDetection,
  cpDetectionEnabled: boolean,
  updateShowGroundTruthChangepoints: typeof updateShowGroundTruthChangepoints,
  enableCpDetection: typeof enableCpDetection,
  groundTruthChangepointsEnabled: boolean,
}


export const SoilingDetection = (props: ISoilingDetectionProps) => {
  const {dataset, customChangePoints, from, to,
    cpDetectionEnabled, groundTruthChangepointsEnabled} = props;
  const [detectIntervals, setDetectIntervals] = useState(false);

  const handleCpDetection = () => {
    const action = !cpDetectionEnabled;
    props.enableCpDetection(action);
    props.updateSelectedMeasures([dataset.header.indexOf("power"), dataset.header.indexOf("precipitation")])
    if(action)
      props.applyCpDetection(dataset.id, from, to,
        customChangePoints);
  }
  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Soiling Detection
        </Typography>
        <Divider orientation="horizontal" flexItem>
        </Divider>
      </Box>
      {dataset.gtChangepoints
        &&
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
              p:0,
            }}
          >
            <ManageSearchIcon/>
            <Typography variant="body1" gutterBottom sx={{fontWeight:600}}>
              Changepoint Selection
            </Typography>

          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Washes</Box>
            <Tooltip describeChild title={dataset.gtChangepoints ? "Show Changepoints" : "No Data Found"}>
              <Switch
                checked={groundTruthChangepointsEnabled}
                onChange={() => props.updateShowGroundTruthChangepoints(!groundTruthChangepointsEnabled)}
                disabled={!dataset.gtChangepoints}
                inputProps={{'aria-label': 'controlled'}}
              />
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Washing Events</Box>
            <Tooltip describeChild title={dataset.gtChangepoints ? "Show Washing Event" : "No Data Found"}>
              <Switch
                checked={cpDetectionEnabled}
                onChange={() => handleCpDetection()}
                disabled={!dataset.gtChangepoints}
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
          <Divider sx={{paddingBottom:2}}/>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
              p:0,
            }}
          >
            <ManageSearchIcon/>
            <Typography variant="body1" gutterBottom sx={{fontWeight:600}}>
              Detect Soiling
            </Typography>
          </Box>
        </Box>

      }
    </Box>
  );
}

export default SoilingDetection;

