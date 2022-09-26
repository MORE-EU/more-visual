import {Box, Switch, Tooltip, Typography} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {getManualChangePoints, updateSelectedMeasures,
  enableChangepointDetection, applyChangepointDetection,
  enableManualChangepoints,
} from "app/modules/store/visualizerSlice";



export interface IChangepointDetectionProps {
  changepointsName: string,
  manualChangepointsName: string,
  potentialChangepointsName: string,
  shownMeasures: number[],
}

export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const { dataset, from, to,
    changepointDetectionEnabled, manualChangePoints,
    manualChangepointsEnabled, customChangePoints,
  } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const {changepointsName, manualChangepointsName, potentialChangepointsName,
  shownMeasures} = props;

  const [detectIntervals, setDetectIntervals] = useState(false);

  useEffect(()=>{
    dispatch(getManualChangePoints(dataset.id));
  }, []);

  const handleManualChangepointsChange = () => {
    dispatch(updateSelectedMeasures(shownMeasures));
    dispatch(enableManualChangepoints(!manualChangepointsEnabled));
  }

  const handleCpDetection = () => {
    const action = !changepointDetectionEnabled;
    dispatch(enableChangepointDetection(action));
    dispatch(updateSelectedMeasures(shownMeasures));
    if(action)
      dispatch(applyChangepointDetection({id: dataset.id, from, to, changepoints: customChangePoints}));
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
            disabled={manualChangePoints === null}
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
