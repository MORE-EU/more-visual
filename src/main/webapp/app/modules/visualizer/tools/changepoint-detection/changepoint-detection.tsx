import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {
  Box, Button,
  Grid, Typography,
} from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ChangepointPicker from "app/modules/visualizer/tools/changepoint-detection/changepoint-picker";
import ChangepointModel from "app/modules/visualizer/tools/changepoint-detection/changepoint-model";
import {updateChangePointDates, getChangePointDates} from "app/modules/visualizer/visualizer.reducer";
import {DateObject} from "react-multi-date-picker";


export interface IChangepointDetectionProps {
  dataset: IDataset,
  data: any,
  from: Date,
  to: Date,
  changePointDates: DateObject[],
  updateChangePointDates: typeof updateChangePointDates,
  getChangePointDates: typeof getChangePointDates,
}


export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const {dataset, to, from, changePointDates} = props;
  const [features, setFeatures] = React.useState([]);
  const [trainColumn, setTrainColumn] = React.useState(0);
  const [selectedDates, setSelectedDates] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = ['Choose Dates', 'Train Model', 'Make Predictions'];

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const checkFinished = () => {
    if(activeStep === 0) {
      return changePointDates.length === 0
    }
    else if (activeStep === 1) {
      return true;
    }
    return false;
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx = {{padding: "20px 0 20px 0"}}>
        <Step key={0}>
          <StepLabel>Choose Dates</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>Train Model</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel>Make Predictions</StepLabel>
        </Step>
      </Stepper>

      {activeStep === steps.length && (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      )}
      <React.Fragment>
          {activeStep === 0 && <ChangepointPicker dataset={dataset} from = {from} to = {to}
                                                  changePointDates={changePointDates} updateChangePointDates={props.updateChangePointDates}
                                                  getChangePointDates={props.getChangePointDates}/>}
          {activeStep === 1 && <ChangepointModel dataset={dataset} changePointDates={changePointDates}/>}
          <Box sx={{ display: 'block', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 , float: "left"}}
            >
              Back
            </Button>
            <Button
              sx={{float: "right"}}
              onClick={handleNext}
              disabled = {checkFinished()}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
      </React.Fragment>
    </Box>
  );
}

export default ChangepointDetection;

