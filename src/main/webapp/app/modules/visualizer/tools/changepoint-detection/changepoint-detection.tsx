import {Box, Button, Slider, Switch, Tooltip, Typography} from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  getManualChangepoints, updateSelectedMeasures,
  toggleChangepointDetection, applyChangepointDetection,
  toggleManualChangepoints, toggleSoilingDetection, setDetectedChangepointFilter, toggleCustomChangepoints,
} from "app/modules/store/visualizerSlice";
import {AddCustomChangepoint} from "./add-custom-changepoint";

export interface IChangepointDetectionProps {
  changepointsName: string,
  manualChangepointsName: string,
  potentialChangepointsName: string,
  shownMeasures: number[],
}
export const filterChangepoints = (changepoints, filter) => {
  return changepoints.slice(0, ( changepoints.length - (changepoints.length * filter / 100)))
}

export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const { dataset, from, to,
    changepointDetectionEnabled, manualChangepoints,
    customChangepointsEnabled,
    manualChangepointsEnabled, detectedChangepointFilter,
  } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const {changepointsName, manualChangepointsName, potentialChangepointsName,
  shownMeasures} = props;

  useEffect(()=>{
    dispatch(getManualChangepoints(dataset.id));
  }, []);

  const handleManualChangepointsChange = () => {
    const action = !manualChangepointsEnabled;
    dispatch(toggleManualChangepoints(action));
    dispatch(updateSelectedMeasures(shownMeasures));
  }

  const handleCustomChangepointsChange = () => {
    dispatch(toggleCustomChangepoints(!customChangepointsEnabled));
  }

  const handleChangepointDetection = () => {
    const action = !changepointDetectionEnabled;
    dispatch(toggleChangepointDetection(action));
    dispatch(updateSelectedMeasures(shownMeasures));
    if(action)
      dispatch(applyChangepointDetection({id: dataset.id, from, to}));
    else{
      dispatch(toggleSoilingDetection(false));
    }
  }

  const filterChangepoints = (e) => {
    dispatch(setDetectedChangepointFilter(e.target.value));
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
        <Box sx={{pt: 1}}> <Typography variant="body1">{manualChangepointsName}</Typography></Box>
        <Tooltip describeChild title={manualChangepoints ? "Show " + manualChangepointsName : "No Data Found"}>
          <Switch
            checked={manualChangepointsEnabled}
            onChange={() => handleManualChangepointsChange()}
            disabled={manualChangepoints === null}
            inputProps={{'aria-label': 'controlled'}}
          />
        </Tooltip>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{pt: 1}}><Typography variant="body1">{potentialChangepointsName}</Typography></Box>
        <Switch
          checked={changepointDetectionEnabled}
          onChange={() => handleChangepointDetection()}
          inputProps={{'aria-label': 'controlled'}}
        />

      </Box>
      <AddCustomChangepoint name="Add New" check={customChangepointsEnabled}
                            handleFunction={handleCustomChangepointsChange}/>
      <Box>
        <Typography variant="body1" gutterBottom sx={{fontWeight:600}}>
          Filter (%)
        </Typography>
        <Slider
          size="small"
          disabled={!changepointDetectionEnabled}
          onChange= {(e) => filterChangepoints(e)}
          defaultValue={detectedChangepointFilter}
          getAriaValueText = {(val) => ("Top" + val.toString() + "%")}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
      </Box>
    </Box>
  );

}

export default ChangepointDetection;
