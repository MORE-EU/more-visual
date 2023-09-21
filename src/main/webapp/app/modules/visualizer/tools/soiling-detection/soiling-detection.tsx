import React, {useEffect} from 'react';
import ChangepointDetection from "../changepoint-detection/changepoint-detection";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HelpIcon from "@mui/icons-material/Help";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  toggleSoilingDetection,
  applyDeviationDetection,
  updateSecondaryData, updateSoilingWeeks,
} from "app/modules/store/visualizerSlice";
import {filterChangepoints} from "../changepoint-detection/changepoint-detection";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';

export const SoilingDetection = () => {
  const {dataset, from, to,
    soilingEnabled, soilingWeeks, detectedChangepointFilter,
    detectedChangepoints, changepointDetectionEnabled} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();


  useEffect(() => {
    if(soilingEnabled)
      dispatch(applyDeviationDetection({id: dataset.id,
        from, to,
        weeks : soilingWeeks,
        changepoints : filterChangepoints(detectedChangepoints, detectedChangepointFilter)}));
    }, [detectedChangepointFilter]);

  useEffect(()=>{
    if (detectedChangepoints === null) dispatch(updateSecondaryData(null));
  },[detectedChangepoints]);

  const handleWeeksChange = (e) => {
    const newSoilingWeeks = e.target.value;
    dispatch(updateSoilingWeeks(newSoilingWeeks))
    if(soilingEnabled)
      dispatch(applyDeviationDetection({id: dataset.id,
        from, to,
        weeks : newSoilingWeeks,
        changepoints : filterChangepoints(detectedChangepoints, detectedChangepointFilter)}));
  }

  const handleEnableSoiling = () => {
    const action = !soilingEnabled;
    dispatch(toggleSoilingDetection(action));
    if(action)
      dispatch(applyDeviationDetection({id: dataset.id,
        from, to,
        weeks : soilingWeeks,
        changepoints : filterChangepoints(detectedChangepoints, detectedChangepointFilter)}));
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '90%', fontSize:'2em'}}>
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
          <Tooltip title='Weeks after wash in which panel is considered clean' >
            <HelpIcon/>
          </Tooltip>
        </Box>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <Box sx={{pt: 1}}><Typography variant="body1">Enable</Typography></Box>
          <Switch
            checked={soilingEnabled}
            disabled={!changepointDetectionEnabled}
            onChange={() => handleEnableSoiling()}
            inputProps={{'aria-label': 'controlled'}}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default SoilingDetection;

