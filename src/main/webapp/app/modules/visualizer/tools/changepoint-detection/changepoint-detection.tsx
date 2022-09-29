import {Box, Button, Switch, Tooltip, Typography} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  getManualChangePoints, updateSelectedMeasures,
  toggleChangepointDetection, applyChangepointDetection,
  toggleManualChangepoints, toggleSoilingDetection,
} from "app/modules/store/visualizerSlice";
import {AddCustomChangepoint} from "./add-custom-changepoint";



export interface IChangepointDetectionProps {
  changepointsName: string,
  manualChangepointsName: string,
  potentialChangepointsName: string,
  shownMeasures: number[],
}

export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const { dataset, from, to,
    changepointDetectionEnabled, manualChangePoints,
    manualChangepointsEnabled,
  } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const {changepointsName, manualChangepointsName, potentialChangepointsName,
  shownMeasures} = props;

  useEffect(()=>{
    dispatch(getManualChangePoints(dataset.id));
  }, []);

  const handleManualChangepointsChange = () => {
    const action = !manualChangepointsEnabled;
    dispatch(toggleManualChangepoints(action));
    dispatch(updateSelectedMeasures(shownMeasures));
  }

  const handleCpDetection = () => {
    const action = !changepointDetectionEnabled;
    dispatch(toggleChangepointDetection(action));
    dispatch(updateSelectedMeasures(shownMeasures));
    if(action)
      dispatch(applyChangepointDetection({id: dataset.id, from, to}));
    else{
      dispatch(toggleSoilingDetection(false));
    }
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
      <AddCustomChangepoint/>
    </Box>
  );

}

export default ChangepointDetection;
