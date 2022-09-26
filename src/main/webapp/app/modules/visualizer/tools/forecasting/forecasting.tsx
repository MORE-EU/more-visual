import React from 'react';
import {Box, Divider, Switch, Tooltip, Typography,} from "@mui/material";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {applyForecasting, toggleForecasting} from "app/modules/store/visualizerSlice";



export const Forecasting = () => {
  const { dataset, forecastData, forecasting} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleForecasting = () => {
    const action = !forecasting;
    dispatch(toggleForecasting(action));
    if(action)
      dispatch(applyForecasting(dataset.id));
  }

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Forecasting
        </Typography>
        <Divider/>
      </Box>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Box sx={{pt: 1}}>Enable</Box>
        <Switch
          checked={forecasting}
          onChange={() => handleForecasting()}
          inputProps={{'aria-label': 'controlled'}}
        />
      </Box>
    </Box>
  );
}

export default Forecasting;

