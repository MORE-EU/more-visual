import {Box} from '@mui/material';
import React from 'react';
import Chart from './chart';
import {ChartControl} from './chart-control';

export const ChartContainer = () => {
  
  return (
    <Box sx={{display: 'flex', flexDirection: "column"}}>
      <ChartControl />
      <Chart />
    </Box>
  );
}
