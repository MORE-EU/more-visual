import React from 'react';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import Filter from '../tools/filter/filter';
import Forecasting from '../tools/forecasting/forecasting';
import PatternExtraction from '../tools/pattern-extraction/pattern-extraction';
import SoilingDetection from '../tools/soiling-detection/soiling-detection';
import { YawMisalignment } from '../tools/yaw-misalignment/yaw-misalignment';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { resetForecastingState, updateActiveTool } from 'app/modules/store/visualizerSlice';

const ChartToolsWindow = () => {
  const { activeTool } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleClose = e => {
    dispatch(updateActiveTool(null))
    dispatch(resetForecastingState());
  };

  return (
    <Grid sx={{ height: '60%', pt: 2 }}>
      <Paper elevation={1} sx={{ border: '1px solid rgba(0,0,0, 0.1)', height: '100%' }}>
        <Grid sx={{ height: 'fit-content', textAlign: 'left', display: "flex", bgcolor: grey[300] }}>
          <Typography variant="subtitle1" fontSize={25} fontWeight={500} sx={{ color: grey[600], pl: 1, pr: 1 }}>
            {activeTool}
          </Typography>
          <Box sx={{flex: 1}}/>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid sx={{ height: '90%' }}>
          {activeTool === 'Pattern Extraction' && <PatternExtraction />}
          {activeTool === 'Soiling Detection' && <SoilingDetection />}
          {activeTool === 'Yaw Misalignment' && <YawMisalignment />}
          {activeTool === 'Forecasting' && <Forecasting />}
          {activeTool === 'Filtering' && <Filter />}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default ChartToolsWindow;
