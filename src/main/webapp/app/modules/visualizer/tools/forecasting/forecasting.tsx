import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { IForecastingForm, IForecastingDefault } from 'app/shared/model/forecasting.model';
import { useAppSelector } from 'app/modules/store/storeConfig';
import ForecastingDataPrep from './forecasting-data-preparation/forecasting-dataPrep';
import ForecastingFeatureExtr from './forecasting-feature-extraction/forecasting-feature-extraction';
import ForecastingTrain from './forecasting-train-results/forecasting-train';
import ForecastingResults from './forecasting-results/forecasting-results';

const steps = ['Data Selection', 'Feature Selection', 'Algorithm Selection'];

const Forecasting = () => {
  const { selectedMeasures, dataset } = useAppSelector(state => state.visualizer);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [forecastingForm, setForecastingForm] = useState<IForecastingForm>(IForecastingDefault);

  useEffect(() => {
    const columnFeat = forecastingForm.features.columnFeatures.map(num => num.columnName);
    const selMeasures = selectedMeasures.map(mez => dataset.header[mez]);
    setForecastingForm(state => ({
      ...state,
      targetColumn: selectedMeasures.map(mez => dataset.header[mez]),
      features: {
        ...state.features,
        columnFeatures: selMeasures.reduce((acc, curval) => {
          if (columnFeat.includes(curval)) {
            return [
              ...acc,
              forecastingForm.features.columnFeatures[forecastingForm.features.columnFeatures.findIndex(cf => cf.columnName === curval)],
            ];
          } else {
            return [...acc, { columnName: curval, features: [] }];
          }
        }, []),
      },
    }));
  }, [selectedMeasures]);

  const isStepOptional = step => {
    return step === 1;
  };

  const isStepSkipped = step => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid sx={{ width: '100%', height: '100%' }}>
      {console.log(forecastingForm)}
      <Grid sx={{ width: '100%', height: '15%' }}>
        <Stepper activeStep={activeStep} sx={{ pl: 3, pr: 3, pt: 2 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid sx={{ width: '100%', height: '70%', overflowY: 'auto' }}>
        {activeStep === 0 ? (
          <ForecastingDataPrep forecastingForm={forecastingForm} setForecastingForm={setForecastingForm} />
        ) : activeStep === 1 ? (
          <ForecastingFeatureExtr forecastingForm={forecastingForm} setForecastingForm={setForecastingForm} />
        ) : activeStep === 2 ? (
          <ForecastingTrain forecastingForm={forecastingForm} setForecastingForm={setForecastingForm} />
        ) : (
          <ForecastingResults />
        )}
      </Grid>
      {activeStep === 3 ? (
        <Grid sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>Reset</Button>
        </Grid>
      ) : (
        <Grid sx={{ display: 'flex', flexDirection: 'row', height: '15%', pr: 3, pl: 3 }}>
          <Button size="small" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, fontSize: 12, height: '90%' }}>
            Back
          </Button>
          <Grid sx={{ flex: '1 1 auto' }} />
          {/* {isStepOptional(activeStep) && (
            <Button size='small' color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )} */}
          <Button size="small" sx={{ fontSize: 12, height: '90%' }} onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Train' : 'Next'}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default Forecasting;
