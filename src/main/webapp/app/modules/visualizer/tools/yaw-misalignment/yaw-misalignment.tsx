import React, {useEffect, useState} from "react";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {
  applyYawMisalignmentDetection,
  toggleYawMisalignmentDetection, updateDetectedChangepoints, updateFilter, updateQueryResults, updateSecondaryData
} from "app/modules/store/visualizerSlice";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import {grey} from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import {IDataPoint} from "app/shared/model/data-point.model";
import Button from "@mui/material/Button";
import {Popover} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TuneIcon from "@mui/icons-material/Tune";



export const YawMisalignment = () => {
  const { dataset, from, to, yawMisalignmentEnabled, secondaryData} = useAppSelector(state => state.visualizer);

  const [anchorEl, setAnchorEl] = useState(null);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(90);

  const handleSliderChange = (event, newValue) => {
    setMin(newValue[0]);
    setMax(newValue[1]);
    const filteredData = filterData();
    dispatch(updateDetectedChangepoints(mergeConsecutiveRanges(filteredData)));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleEnableYaw = () => {
    const action = !yawMisalignmentEnabled;
    dispatch(toggleYawMisalignmentDetection(action));
    if(action)
      dispatch(applyYawMisalignmentDetection({id: dataset.id, from, to}));
    else{
      dispatch(updateSecondaryData([]));
      dispatch(updateDetectedChangepoints([]));
    }
  }

  function mergeConsecutiveRanges(inputArray) {
    const mergedArray = [];
    if(inputArray.length === 0) return mergedArray;
    let currentRange = inputArray[0].range;

    for (let i = 1; i < inputArray.length; i++) {
      const nextRange = inputArray[i].range;

      if (nextRange.from - currentRange.to <= 100000000) {
        // Merge the ranges
        currentRange.to = nextRange.to;
      } else {
        // Push the current merged range and start a new one
        mergedArray.push({ range: { ...currentRange } });
        currentRange = nextRange;
      }
    }

    // Push the last merged range
    mergedArray.push({ range: { ...currentRange } });

    return mergedArray;
  }

  const filterData = () => {
    const filteredArray = secondaryData.filter((obj : IDataPoint) => (obj.values[0] >= min && obj.values[0] <= max));
    const transformedArray = filteredArray.map((obj, idx) => ({
      id: idx,
      range: {
        from: obj.timestamp,
        to: obj.timestamp,
      }
    }));
    return  transformedArray;
  }
  useEffect(() => {
    if(secondaryData == null) return;
    const filteredData = filterData();
    dispatch(updateDetectedChangepoints(mergeConsecutiveRanges(filteredData)));
  }, [secondaryData]);



  return (
    <Box sx={{height: "fit-content",
      width: "80%",
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      m: "auto", pt: 5}}>

        {/*<Box sx={{ width: '30%', display: 'flex', columnGap: 1 }}>*/}
        {/*  <TextField*/}
        {/*    id="outlined-basic"*/}
        {/*    label="Min-Value"*/}
        {/*    variant="outlined"*/}
        {/*    type="number"*/}
        {/*    size="small"*/}
        {/*    value={min}*/}
        {/*    onChange={choice => handleTextFieldMin(choice)}*/}
        {/*  />*/}
        {/*  <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 900, display: 'block', alignSelf: 'end' }}>*/}
        {/*    -*/}
        {/*  </Typography>*/}
        {/*  <TextField*/}
        {/*    id="outlined-basic"*/}
        {/*    label="Max-Value"*/}
        {/*    variant="outlined"*/}
        {/*    type="number"*/}
        {/*    size="small"*/}
        {/*    value={max}*/}
        {/*    onChange={choice => handleTextFieldMax(choice)}*/}
        {/*  />*/}
        {/*</Box>*/}
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          {/*<Box sx={{fontSize: '1.3em', pt: 1}}>Detect</Box>*/}
          <Switch
            disabled={dataset.id !== 'BEZ2'}
            checked={yawMisalignmentEnabled}
            onChange={() => handleEnableYaw()}
            inputProps={{'aria-label': 'controlled'}}
          />
      </Box>
      <IconButton
        color="primary"
        onClick={handleClick}
        size="large"
      >
        <TuneIcon/>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',

        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            width: '8em',
            height: '4em',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Add your settings UI here */}
          <h5>Yaw Angle Range</h5>
          <Slider
            value={[min, max]}
            min={0}
            max={90}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': { backgroundColor: grey[700] },
              '& .MuiSlider-track': { backgroundColor: grey[500], borderColor: grey[500] },
              '& .MuiSlider-rail': { backgroundColor: grey[500] },
            }}
          />
        </Box>
      </Popover>
     </Box>
  );
}
