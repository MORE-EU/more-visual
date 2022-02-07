import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Button, Typography,} from "@mui/material";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ChangepointPicker from "app/modules/visualizer/tools/changepoint-detection/changepoint-picker";
import ChangepointModel from "app/modules/visualizer/tools/changepoint-detection/changepoint-model";
import {getChangePointDates, updateChangePointDates} from "app/modules/visualizer/visualizer.reducer";
import {DateObject} from "react-multi-date-picker";


export interface IChangepointDetectionProps {
  dataset: IDataset,
  data: any,
  changePointDates: any,
}


export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const {dataset,  changePointDates} = props;
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
    if (activeStep === 0) {
      return changePointDates.length === 0
    } else if (activeStep === 1) {
      return true;
    }
    return false;
  }

  console.log(changePointDates);
  return (
    <Box sx={{pl:2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Changepoint Detection
        </Typography>
      </Box>
      {(changePointDates.length === 0)
        &&
        <Box sx={{whiteSpace:"normal"}}>
          <b>No Intervals selected</b><br></br>Select Intervals to get started.
        </Box>
      }
      {/*{(changePointDates.length === 0)*/}
      {/*  &&*/}
      {/*  <Box sx={{whiteSpace:"normal"}}>*/}
      {/*   <ChangepointModel dataset={dataset}*/}
      {/*                     changePointDates={["2018-01-01"]}*/}
      {/*   />*/}
      {/*  </Box>*/}
      {/*}*/}

    </Box>
  );
}

export default ChangepointDetection;

