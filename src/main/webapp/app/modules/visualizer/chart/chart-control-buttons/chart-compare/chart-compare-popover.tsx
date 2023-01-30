import React from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Popover,
  FormControl,
  Typography, FormControlLabel, MenuItem, ListItemText
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {setComparePopover, updateCompare} from "app/modules/store/visualizerSlice";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import AddchartIcon from "@mui/icons-material/Addchart";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

export interface  IChartCompareMenuProps {
  anchorEl: any,
}

export const ChartComparePopover = (props: IChartCompareMenuProps) => {
  const dispatch = useAppDispatch();

  const { wdFiles, from, to, dataset, comparePopover, compare} = useAppSelector(state => state.visualizer);

  const {anchorEl} = props;

  const [view, setView] = React.useState('chart');

  const handleViewSelection = (e) => {
    setView(e.target.value);
  };


  const handleOnClick = e => {
    dispatch(updateCompare(e.target.innerText.replace('.csv', '')));
  };

  const handleClose = () => {
    dispatch(setComparePopover(false));
  };


  return (
    <Popover
      id="long-menu"
      anchorEl={anchorEl}
      open={comparePopover}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        style: {
          maxHeight: 200,
          width: '10%',
          margin: '1em',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',
          alignItems: 'left',
          p: 1,
        }}
      >
        <AddchartIcon sx={{pr: 1}}/>
        <Typography variant="body1" gutterBottom sx={{fontWeight: 600, fontSize: "1.2em"}}>
          Compare
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          alignItems: 'left',
          p: 1,
        }}>
      {/*<Typography variant="body1" gutterBottom sx={{fontWeight: 600}}>*/}
      {/*  Datasets*/}
      {/*</Typography>*/}
        {wdFiles.map(
          (file, idx) =>
            file.replace('.csv', '') !== dataset.id && (
              <MenuItem key={`${file}-${idx}`} selected={compare.includes(file.replace('.csv', ''))} onClick={handleOnClick}>
                <ListItemText>{file}</ListItemText>
                {compare.includes(file.replace('.csv', '')) ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
              </MenuItem>
            )
        )}
      </Box>
    </Popover>
    );
}

export default  ChartComparePopover;
