import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import ForecastingTrainStepper from './forecasting-landing/forecasting-train-stepper';
import ForecastingModelSelection from './forecasting-landing/forecasting-model-selection';



const Forecasting = () => {
  const [newTrain, setNewTrain] = useState(false);
  return (
    <Grid sx={{ width: '100%', height: '100%' }}>
      {!newTrain && <ForecastingModelSelection setNewTrain={setNewTrain} />}
      {newTrain && <ForecastingTrainStepper/>}
    </Grid>
  );
};

export default Forecasting;
