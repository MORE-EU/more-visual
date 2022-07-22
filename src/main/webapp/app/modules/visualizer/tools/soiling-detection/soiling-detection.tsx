import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  applyCpDetection, applySoilingDetection,
  enableCpDetection, enableSoilingDetection, updateSelectedMeasures,
  updateShowGroundTruthChangepoints
} from "app/modules/visualizer/visualizer.reducer";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HelpIcon from '@mui/icons-material/Help';

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
  enableSoilingDetection: typeof enableSoilingDetection,
  applySoilingDetection: typeof applySoilingDetection,
  groundTruthChangepointsEnabled: boolean,
}


export const SoilingDetection = (props: ISoilingDetectionProps) => {
  const {dataset, customChangePoints, from, to,
    cpDetectionEnabled, groundTruthChangepointsEnabled} = props;
  const [detectIntervals, setDetectIntervals] = useState(false);

  const [weeks, setWeeks] = useState(1);
  const [soilingIsEnabled, setSoilingIsEnabled] = useState(false);

  const handleWeeksChange = (e) => {
    setWeeks(e.target.value);
  }

  const handleEnableSoiling = () => {
    const action = !soilingIsEnabled;
    setSoilingIsEnabled(action);
    props.enableSoilingDetection(action);
    if(action)
      props.applySoilingDetection(dataset.id, from, to);
  }

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
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'left',
              alignItems: 'center',
              p:0,
            }}
          >
            <FormControl sx={{ m: 1, minWidth: "80%" }}>
              <InputLabel id="select-week-input-label">Weeks</InputLabel>
              <Select
                labelId="select-weeks"
                id="select-weeks-id"
                value={weeks}
                onChange={handleWeeksChange}
                label="Weeks"
              >
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Two</MenuItem>
                <MenuItem value={3}>Three</MenuItem>
                <MenuItem value={4}>Four</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title='Weeks after wash in which panel is considered clean' >
              <HelpIcon/>
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Enable</Box>
            <Switch
              checked={soilingIsEnabled}
              onChange={() => handleEnableSoiling()}
              inputProps={{'aria-label': 'controlled'}}
            />
          </Box>
        </Box>
      }
    </Box>
  );
}

export default SoilingDetection;

