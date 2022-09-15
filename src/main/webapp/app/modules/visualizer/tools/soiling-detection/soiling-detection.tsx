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
import ChangepointDetection from "../changepoint-detection/changepoint-detection";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import HelpIcon from "@mui/icons-material/Help";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  enableSoilingDetection,
  applyDeviationDetection,
} from "app/modules/store/visualizerSlice";


export const SoilingDetection = () => {
  const {folder, dataset, from, to, resampleFreq,
    detectedChangePoints} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [weeks, setWeeks] = useState(1);
  const [soilingIsEnabled, setSoilingIsEnabled] = useState(false);

  const handleWeeksChange = (e) => {
    setWeeks(e.target.value);
  }

  const handleEnableSoiling = () => {
    const action = !soilingIsEnabled;
    setSoilingIsEnabled(action);
    dispatch(enableSoilingDetection(action));
    if(action)
      dispatch(applyDeviationDetection({folder, id: dataset.id, from, to, resampleFreq, changepoints : detectedChangePoints}));
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
      <ChangepointDetection
        changepointsName={"Washing Events"} manualChangepointsName={"Manual Washes"} potentialChangepointsName={"Rains"}
        shownMeasures={[dataset.header.indexOf("power"), dataset.header.indexOf("precipitation")]} />
      <Box>
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
    </Box>
  );
}

export default SoilingDetection;

