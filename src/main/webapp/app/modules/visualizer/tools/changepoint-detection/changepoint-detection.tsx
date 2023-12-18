import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  getManualChangepoints,
  updateSelectedMeasures,
  toggleChangepointDetection,
  applyChangepointDetection,
  toggleManualChangepoints,
  toggleSoilingDetection,
  setDetectedChangepointFilter,
  toggleCustomChangepoints,
  applyDeviationDetection,
} from "app/modules/store/visualizerSlice";
import {AddCustomChangepoint} from "./add-custom-changepoint";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";



export interface IChangepointDetectionProps {
  changepointsName: string,
  manualChangepointsName: string,
  potentialChangepointsName: string,
  shownMeasures: number[],
}
export const filterChangepoints = (changepoints, filter) => {
  return changepoints.slice(0, ( changepoints.length - (changepoints.length * filter / 100)))
}

const ValueLabelComponent = (props) => {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={`Top ${value}%`} >
      {children}
    </Tooltip>
  );
}

export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const { dataset, from, to, soilingType, soilingWeeks,
    manualChangepoints,
    changepointDetectionEnabled,
    customChangepointsEnabled,
    manualChangepointsEnabled, detectedChangepointFilter,
  } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [sliderValue, setSliderValue] = useState(0);

  const {changepointsName, manualChangepointsName, potentialChangepointsName,
  shownMeasures} = props;

  useEffect(()=>{
    setSliderValue(90);
    dispatch(getManualChangepoints(dataset.id));

    return () => {
      dispatch(toggleSoilingDetection(false));
      dispatch(toggleChangepointDetection(false));
      dispatch(toggleManualChangepoints(false))
      dispatch(setDetectedChangepointFilter(null));
    }
  }, []);

  const handleSliderValueChange = (e, val) => {
    setSliderValue(val)
  }

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
    dispatch(toggleSoilingDetection(true));
    if(action) {
      dispatch(setDetectedChangepointFilter(sliderValue));
      dispatch(applyChangepointDetection({id: dataset.id, from, to})).then(res => {
        dispatch(applyDeviationDetection({id: dataset.id,
          from, to,
          weeks : soilingWeeks,
          type : soilingType,
          changepoints : filterChangepoints(res.payload, detectedChangepointFilter)
        }));
      });
    }
    else{
      dispatch(toggleSoilingDetection(false));
    }
  }

  const handleChangepointsChange = (e, val) => {
    dispatch(setDetectedChangepointFilter(val));
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
        <Box sx={{px: 3}}>
        <Slider
          size="small"
          disabled={!changepointDetectionEnabled}
          onChangeCommitted= {handleChangepointsChange}
          onChange={handleSliderValueChange}
          value={sliderValue}
          components={{ValueLabel: ValueLabelComponent}}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        </Box>
      </Box>
    </Box>
  );

}

export default ChangepointDetection;
