import React from 'react';
import Chart from './chart';
import { ChartControl } from './chart-control';
import { useAppSelector } from 'app/modules/store/storeConfig';
import ChartML from './chart-autoML/chart-autoML';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Paper from '@mui/material/Paper';

export const ChartContainer = () => {
  const { autoMLtoggle } = useAppSelector(state => state.visualizer);

  return (
    <Grid sx={{ display: 'flex', flexDirection: 'column', height: "100%" }}>
      <Grid sx={{height: "50px", width: "100%"}}>
      <ChartControl />
      </Grid>
      <Grid sx={{height: "calc(100% - 50px)", width: "100%"}}>
      <Chart />
      {autoMLtoggle && (
        <Grid sx={{ height: '60%', pt: 2 }}>
          <Paper elevation={1} sx={{border: "1px solid rgba(0,0,0, 0.1)", height: "100%"}}>
          <Grid sx={{height: "8%", textAlign: "left"}}>
            <Typography variant="subtitle1" fontSize={25} fontWeight={500} sx={{color: grey[600], bgcolor: grey[300], pl: 1, pr: 1}}>
              AutoML Module
              </Typography>
            </Grid>
          <Grid sx={{height: '92%'}}>
          <ChartML />
            </Grid>
            </Paper>
        </Grid>
      )}
      </Grid>
    </Grid>
  );
};
