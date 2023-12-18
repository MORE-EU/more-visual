import React, { useEffect, useState } from 'react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import {
  applyYawMisalignmentDetection,
  toggleYawMisalignmentDetection,
  updateDetectedChangepoints,
  updateFilter,
  updateQueryResults,
  updateSecondaryData,
} from 'app/modules/store/visualizerSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import { grey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { IDataPoint } from 'app/shared/model/data-point.model';
import Button from '@mui/material/Button';
import { Popover } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import TuneIcon from '@mui/icons-material/Tune';

export const YawMisalignment = () => {
  const { dataset, from, to, yawMisalignmentEnabled, secondaryData } = useAppSelector(state => state.visualizer);

  const [anchorEl, setAnchorEl] = useState(null);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(90);

  const handleSliderChange = (event, newValue) => {
    setMin(newValue[0]);
    setMax(newValue[1]);
  };

  const handleSliderCommit = (e, newVals) => {
    const filteredData = filterData(newVals);
    dispatch(updateDetectedChangepoints(mergeConsecutiveRanges(filteredData)));
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTextFields = (choice) => (e) => {
    const val = e.target.value
    let newVals;
    if(choice === "min"){
      newVals = [val, max]
        setMin(val);
    }else{
      newVals = [min, val]
        setMax(val);
    }
    const filteredData = filterData(newVals);
    dispatch(updateDetectedChangepoints(mergeConsecutiveRanges(filteredData)));
  }

  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleEnableYaw = () => {
    const action = !yawMisalignmentEnabled;
    dispatch(toggleYawMisalignmentDetection(action));
    if (action) dispatch(applyYawMisalignmentDetection({ id: dataset.id, from, to }));
    else {
      dispatch(updateSecondaryData(null));
      dispatch(updateDetectedChangepoints([]));
    }
  };

  function mergeConsecutiveRanges(inputArray) {
    const mergedArray = [];
    if (inputArray.length === 0) return mergedArray;
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

  const filterData = (newVals: number[]) => {
    const filteredArray = secondaryData.filter(
      (obj: IDataPoint) => obj.values[0] >= (newVals !== null ? newVals[0] : min) && obj.values[0] <= (newVals !== null ? newVals[1] : max)
    );
    const transformedArray = filteredArray.map((obj, idx) => ({
      id: idx,
      range: {
        from: obj.timestamp,
        to: obj.timestamp,
      },
    }));
    return transformedArray;
  };
  useEffect(() => {
    if (secondaryData == null) return;
    const filteredData = filterData(null);
    dispatch(updateDetectedChangepoints(mergeConsecutiveRanges(filteredData)));
  }, [secondaryData]);

  return (
    <Box
      sx={{
        height: 'fit-content',
        width: '60%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        m: 'auto',
        pt: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          columnGap: 5,
          alignItems: 'center',
          mx: 'auto',
        }}
      >
        {/*<Box sx={{fontSize: '1.3em', pt: 1}}>Detect</Box>*/}
        <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'block', width: 'fit-content', color: grey[800] }}>
          Enable Tool
        </Typography>
        <Switch
          disabled={dataset.id !== 'BEZ2'}
          checked={yawMisalignmentEnabled}
          onChange={() => handleEnableYaw()}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
      {/* <Box sx={{display: "flex", width: "100%"}}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'block', width: '20%', color: grey[800] }}>
            Yaw range filter
          </Typography>
      <Slider
            value={[min, max]}
            min={0}
            max={90}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderCommit}
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': { backgroundColor: grey[700] },
              '& .MuiSlider-track': { backgroundColor: grey[500], borderColor: grey[500] },
              '& .MuiSlider-rail': { backgroundColor: grey[500] },
            }}
        />
      </Box> */}
      <Box
        sx={{
          width: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: 'flex',
          // border: `2px solid ${grey[700]}`,
          // borderRadius: 3,
          p: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          // backgroundColor: grey[100],
        }}
      >
        <Box
          sx={{
            border: `2px solid ${grey[600]}`,
            alignItems: 'end',
            display: 'flex',
            width: '30%',
            textAlign: 'center',
            borderTopRightRadius: 18,
            borderBottomRightRadius: 18,
            p: 1,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 900, display: 'block', width: '100%' }}>
            Yaw Filter Range
          </Typography>
        </Box>
        <Box sx={{ width: '30%', display: 'flex' }}>
          <Slider
            value={[min, max]}
            min={0}
            max={90}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderCommit}
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': { backgroundColor: grey[700] },
              '& .MuiSlider-track': { backgroundColor: grey[500], borderColor: grey[500] },
              '& .MuiSlider-rail': { backgroundColor: grey[500] },
            }}
          />
        </Box>
        <Box sx={{ width: '30%', display: 'flex', columnGap: 1 }}>
          <TextField
            id="outlined-basic"
            label="Min-Value"
            variant="outlined"
            type="number"
            size="small"
            value={min}
            onChange={handleTextFields('min')}
          />
          <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 900, display: 'block', alignSelf: 'end' }}>
            -
          </Typography>
          <TextField
            id="outlined-basic"
            label="Max-Value"
            variant="outlined"
            type="number"
            size="small"
            value={max}
            onChange={handleTextFields('max')}
          />
        </Box>
      </Box>
      {/* <IconButton
        disabled={!yawMisalignmentEnabled}
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
            width: '16em',
            height: 'fit-content',
            px: '16px',
            py: "8px",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h5>Yaw Angle Range</h5>
          <Slider
            value={[min, max]}
            min={0}
            max={90}
            onChange={handleSliderChange}
            onChangeCommitted={handleSliderCommit}
            valueLabelDisplay="auto"
            sx={{
              '& .MuiSlider-thumb': { backgroundColor: grey[700] },
              '& .MuiSlider-track': { backgroundColor: grey[500], borderColor: grey[500] },
              '& .MuiSlider-rail': { backgroundColor: grey[500] },
            }}
          />
        </Box>
      </Popover> */}
    </Box>
  );
};
