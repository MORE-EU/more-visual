import React from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Divider, Switch, Tooltip, Typography,} from "@mui/material";
import {applyForecasting, enableForecasting} from "app/modules/visualizer/visualizer.reducer";

export interface IForecastingProps {
  dataset: IDataset,
  forecastData: any,
  forecasting: boolean,
  enableForecasting: typeof enableForecasting,
  applyForecasting: typeof applyForecasting,
}

export const Forecasting = (props: IForecastingProps) => {
  const {dataset, forecastData, forecasting} = props;

  const handleForecasting = () => {
    const action = !forecasting;
    props.enableForecasting(action);
    if(action)
      props.applyForecasting(dataset.id);
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

