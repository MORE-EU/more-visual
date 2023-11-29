import React, {useEffect, useRef} from 'react';
import ChangepointDetection from "../changepoint-detection/changepoint-detection";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HelpIcon from "@mui/icons-material/Help";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  toggleSoilingDetection,
  applyDeviationDetection,
  updateSecondaryData, updateSoilingWeeks, updateSoilingType,
} from "app/modules/store/visualizerSlice";
import {filterChangepoints} from "../changepoint-detection/changepoint-detection";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";

export const SoilingDetection = () => {
  const {dataset, from, to, soilingType,
    soilingEnabled, soilingWeeks, detectedChangepointFilter,
    detectedChangepoints, changepointDetectionEnabled} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();


  useEffect(() => {
      dispatch(applyDeviationDetection({id: dataset.id,
        from, to,
        weeks : soilingWeeks,
        type: soilingType,
        changepoints : filterChangepoints(detectedChangepoints, detectedChangepointFilter)}));
    }, [detectedChangepointFilter]);


  useEffect(()=>{
    if (detectedChangepoints === null) dispatch(updateSecondaryData(null));
  },[detectedChangepoints]);

  const handleWeeksChange = (e) => {
    const newSoilingWeeks = e.target.value;
    dispatch(updateSoilingWeeks(newSoilingWeeks))
    dispatch(applyDeviationDetection({id: dataset.id,
        from, to,
        weeks : newSoilingWeeks,
        type : soilingType,
        changepoints : filterChangepoints(detectedChangepoints, detectedChangepointFilter)}));
  }

  const handleEnableSoiling = (event) => {
    const currentSoilingType = event.target.value
    dispatch(toggleSoilingDetection(true));
    dispatch(updateSoilingType(currentSoilingType));
    dispatch(applyDeviationDetection({id: dataset.id,
        from, to,
        weeks : soilingWeeks,
        type: currentSoilingType,
        changepoints : filterChangepoints(detectedChangepoints, detectedChangepointFilter)}));
  }

  return (
    <Box sx = {{width:'100%',}}>
      <Box sx={{display: 'flex', margin: 'auto', overflowY: 'scroll', flexDirection: 'column', width:'80%', height: '90%', fontSize:'2em', overflow: 'auto'}}>
        <ChangepointDetection
          changepointsName={"Washing Events"} manualChangepointsName={"Manual Washes"} potentialChangepointsName={"Rains"}
          shownMeasures={[dataset.header.indexOf("power"), dataset.header.indexOf("precipitation")]} />
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
            <Box sx={{ width:"80%", verticalAlign:"middle"}}>
              <FormControl sx={{ m: 1, minWidth: "80%" }}>
                <InputLabel id="select-week-input-label">Weeks</InputLabel>
                <Select
                  labelId="select-weeks"
                  id="select-weeks-id"
                  value={soilingWeeks}
                  onChange={handleWeeksChange}
                  label="Weeks"
                >
                  <MenuItem value={1}>One</MenuItem>
                  <MenuItem value={2}>Two</MenuItem>
                  <MenuItem value={3}>Three</MenuItem>
                  <MenuItem value={4}>Four</MenuItem>
                </Select>
              </FormControl>
                <Tooltip  title='Weeks after wash in which panel is considered clean' >
                  <HelpIcon/>
                </Tooltip>
            </Box>
            <Box sx={{
             width:"20%"}}>
              <FormControl
                disabled={!changepointDetectionEnabled}
              >
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={soilingType}
                  onChange={handleEnableSoiling}
                >
                  <FormControlLabel value="soilingRatio" control={<Radio />} label="Soiling Ratio" />
                  <FormControlLabel value="powerLoss" control={<Radio />} label="Estimated Power Loss" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SoilingDetection;

