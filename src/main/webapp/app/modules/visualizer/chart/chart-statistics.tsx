import React, {useRef} from 'react';
import {Box, Button, Grid, IconButton, TextField, Tooltip, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import {MeasureSelection} from "app/shared/layout/MeasureSelection";


export const ChartStatistics = () => {

  const {} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  return (
      <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'left',
            p: 1}}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'left',
            p: 1}}
        >
          <Typography variant="body1" gutterBottom sx={{fontWeight: 600}}>
            Statistics For
          </Typography>
          <MeasureSelection label={"Field"}/>
        </Box>
      {/**/}
      </Box>

  );
};

export default ChartStatistics;