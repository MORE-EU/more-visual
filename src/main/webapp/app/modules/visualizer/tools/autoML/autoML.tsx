import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AutoMLDataPrep from './autoML-dataPrep';
import Grid from '@mui/material/Grid';
import AutoMLFeatureExtr from './autoML-featureExtr';
import AutoMLTrain from './autoML-train';

const steps = ['Data Preparation', 'Feature Generation', 'Train'];

const FinishStep = props => (
  <>
    <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
  </>
);

export default function AutoML() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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
      <Grid sx={{ width: '100%', height: '15%' }}>
        <Stepper activeStep={activeStep} sx={{pl: 3, pr: 3, pt: 2}}>
          {steps.map((label, index) => {
            return index === 1 ? (
              <Step key={label}>
                <StepLabel optional={<Typography variant="caption">Optional</Typography>}>{label}</StepLabel>
              </Step>
            ) : (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
      <Grid sx={{ width: '100%', height: '75%', overflowY: 'auto' }}>
        {activeStep === 0 ? (
          <AutoMLDataPrep />
        ) : activeStep === 1 ? (
          <AutoMLFeatureExtr />
        ) : activeStep === 2 ? (
          <AutoMLTrain />
        ) : (
          <FinishStep handleReset={handleReset} />
        )}
      </Grid>
      {activeStep === 3 ? (
        <Grid sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>Reset</Button>
        </Grid>
      ) : (
        <Grid sx={{ display: 'flex', flexDirection: 'row', height: "10%", pr: 3, pl: 3 }}>
          <Button size='small' color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Grid sx={{ flex: '1 1 auto' }} />
          {isStepOptional(activeStep) && (
            <Button size='small' color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          <Button size='small' onClick={handleNext}>{activeStep === steps.length - 1 ? 'Train' : 'Next'}</Button>
        </Grid>
      )}
    </Grid>
  );
}
