import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { startTrainingIbm } from 'app/modules/store/forecastingSlice';
import { IForecastingFormIbm, IForecastingIbmDefault } from 'app/shared/model/forecasting-ibm.model';
import ForecastingDataPrepIbm from '../forecasting-data-preparation/forecasting-dataPrep-ibm';
import grey from '@mui/material/colors/grey';
import ForecastingResultsIbm from '../forecasting-results/forecasting-results-ibm';

const steps = ['Data Selection'];

const ForecastingTrainStepperIbm = props => {
  const { setNewTrain } = props;
  const { selectedMeasures, dataset } = useAppSelector(state => state.visualizer);
  const [activeStep, setActiveStep] = useState(0);
  const [forecastingFormIbm, setForecastingFormIbm] = useState<IForecastingFormIbm>(IForecastingIbmDefault);
  const dispatch = useAppDispatch();

  const handleTrain = e => {
    dispatch(startTrainingIbm(forecastingFormIbm));
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  useEffect(() => {
    setForecastingFormIbm(state => ({
      ...state,
      targetColumn: selectedMeasures.map(mez => dataset.header[mez])
    }));
  }, [selectedMeasures]);

  const handleNextButton = () => {
    if (activeStep === 0) {
      if (forecastingFormIbm.startDate !== null && forecastingFormIbm.endDate !== null) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setNewTrain(false);
    setActiveStep(0);
  };

  return (
    <>
      <Grid sx={{ width: '100%', height: '85%', overflowY: 'auto', display: 'flex' }}>
        {activeStep === 0 ? (
          <ForecastingDataPrepIbm forecastingFormIbm={forecastingFormIbm} setForecastingFormIbm={setForecastingFormIbm} />
        ) :(
          <ForecastingResultsIbm />
        )}
      </Grid>
      {activeStep === 1 ? (
        <Grid sx={{ display: 'flex', flexDirection: 'row', height: '15%', pr: 3, pl: 3 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button size="small" color="inherit" sx={{ fontSize: 12, height: 'max-content', "&:hover": {bgcolor: "primary.main", color: grey[50]} }} onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      ) : (
        <Grid sx={{ display: 'flex', flexDirection: 'row', height: '15%', pr: 3, pl: 3, alignItems: "center" }}>
          <Grid sx={{ flex: '1 1 auto' }} />
          <Button
            size="small"
            variant="outlined"
            sx={{ fontSize: 12, height: 'max-content', "&:hover": {bgcolor: "primary.main", color: grey[50]} }}
            onClick={activeStep === steps.length - 1 ? handleTrain : handleNext}
            disabled={handleNextButton()}
          >
            Train
          </Button>
        </Grid>
      )}
    </>
  );
};

export default ForecastingTrainStepperIbm;
