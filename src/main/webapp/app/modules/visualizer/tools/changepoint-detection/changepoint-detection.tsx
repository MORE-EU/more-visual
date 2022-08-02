import {IDataset} from "app/shared/model/dataset.model";
import {Box, Switch, Tooltip, Typography} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import React, {useEffect, useState} from "react";
import {
  applyChangepointDetection,
  enableChangepointDetection,
  updateSelectedMeasures,
  enableManualChangepoints,
  getManualChangePoints,
} from "app/modules/visualizer/visualizer.reducer";
import {IChangePointDate} from "app/shared/model/changepoint-date.model";

export interface IChangepointDetectionProps {
  dataset: IDataset,
  customChangePoints: any,
  from: number,
  to: number,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  applyChangepointDetection: typeof applyChangepointDetection,
  enableManualChangepoints: typeof enableManualChangepoints,
  enableChangepointDetection: typeof enableChangepointDetection,
  getManualChangePoints: typeof getManualChangePoints,
  manualChangepointsEnabled: boolean,
  changepointDetectionEnabled: boolean,
  changepointsName: string,
  manualChangepointsName: string,
  potentialChangepointsName: string,
  shownMeasures: number[],
  manualChangePoints: IChangePointDate[],
}



export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const {dataset, customChangePoints, from, to,
    changepointDetectionEnabled, manualChangepointsEnabled, manualChangePoints,
    changepointsName, manualChangepointsName, potentialChangepointsName,
    shownMeasures,} = props;

  const [detectIntervals, setDetectIntervals] = useState(false);

  useEffect(()=>{
    props.getManualChangePoints(dataset.id);

    }, []);

  const handleManualChangepointsChange = () => {
    props.updateSelectedMeasures(shownMeasures);
    props.enableManualChangepoints(!manualChangepointsEnabled);
  }

  const handleCpDetection = () => {
    const action = !changepointDetectionEnabled;
    props.enableChangepointDetection(action);
    props.updateSelectedMeasures(shownMeasures)
    if(action)
      props.applyChangepointDetection(dataset.id, from, to,
        customChangePoints);
  }
  return (
    <Box>
      <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            p:0,
           }}>
        <ManageSearchIcon/>
        <Typography variant="body1" gutterBottom sx={{fontWeight:600}}>
          {changepointsName}
        </Typography>

      </Box>
      <Box sx={{
        display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
      }}>
        <Box sx={{pt: 1}}>{manualChangepointsName}</Box>
        <Tooltip describeChild title={manualChangePoints ? "Show " + manualChangepointsName : "No Data Found"}>
        <Switch
          checked={manualChangepointsEnabled}
        onChange={() => handleManualChangepointsChange()}
        disabled={manualChangePoints.length === 0}
        inputProps={{'aria-label': 'controlled'}}
        />
        </Tooltip>
      </Box>
      <Box sx={{
        display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
      }}>
        <Box sx={{pt: 1}}>{potentialChangepointsName}</Box>
        <Switch
          checked={changepointDetectionEnabled}
        onChange={() => handleCpDetection()}
        inputProps={{'aria-label': 'controlled'}}
        />
      </Box>
      {/* <Box sx={{*/}
      {/*   display: 'flex',*/}
      {/*     flexDirection: 'row',*/}
      {/*     justifyContent: 'space-between',*/}
      {/* }}>*/}
      {/*   <Box sx={{pt: 1}}>Use Annotations</Box>*/}
      {/*   <Tooltip describeChild*/}
      {/*   title={customChangePoints.length === 0 ? "Use Intervals on Chart" : "Select Intervals on the Chart"}>*/}
      {/*   <Switch*/}
      {/*     checked={detectIntervals && customChangePoints.length > 0}*/}
      {/*   onChange={() => setDetectIntervals(!detectIntervals)}*/}
      {/*   disabled={customChangePoints.length === 0 || changepointDetectionEnabled}*/}
      {/*   inputProps={{'aria-label': 'controlled'}}*/}
      {/*   />*/}
      {/* </Tooltip>*/}
      {/* </Box>*/}
  </Box>
  );

}

export default ChangepointDetection;
