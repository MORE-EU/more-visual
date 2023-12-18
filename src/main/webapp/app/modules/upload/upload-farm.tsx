import './upload-farm.scss';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UploadFarmFiles from './upload-farm-files';
import UploadFarmInfoTable from './upload-farm-info-table';
import UploadFarmCreate from './upload-farm-create';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setCsvSample, setFiles } from '../store/uploadFarmSlice';
import { setMetaData } from '../store/uploadFarmSlice';
import { setLoadingFarmUpload, uploadFarm } from '../store/fileManagementSlice';
import Grid from '@mui/material/Grid';
import grey from '@mui/material/colors/grey';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

const steps = ['Upload farm files', 'Fill out farm info', 'Finish Farm Creation'];
const formDataInitialState = { name: null, type: 0, latitude: '', longitude: '' };

const Upload = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({ 0: false, 1: false, 2: false });
  const [formData, setFormData] = useState(formDataInitialState);
  const [nextError, setNextError] = useState(false);
  const { csvSample, files, metaData } = useAppSelector(state => state.uploadFarm);
  const { loadingFarmUpload, uploadFarmState } = useAppSelector(state => state.fileManagement);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    uploadFarmState === 100 && history.push('/');
  }, [uploadFarmState]);

  const handleNext = () => {
    if (activeStep === 0) {
      setCompleted(prev => ({ ...prev, [activeStep]: true }));
      setActiveStep(prev => prev + 1);
    } else if (activeStep === 1) {
      if (!formValidation()) {
        dispatch(setMetaData(createCorrectForm()));
        setActiveStep(prev => prev + 1);
        setCompleted(prev => ({ ...prev, [activeStep]: true }));
      } else {
        setNextError(true);
      }
    }
  };

  const formValidation = () => {
    const objectProperties = Object.values(formData).reduce((acc, cur) => {
      if (cur === null) {
        return [...acc, cur];
      } else if (typeof cur === 'object') {
        return [...acc, ...Object.values(cur)];
      } else {
        return [...acc, cur];
      }
    }, []);
    return objectProperties.some(p => p === null || p.length === 0);
  };

  const createCorrectForm = () => {
    const cForm = [];
    for (let [key, val] of Object.entries(formData)) {
      if (key !== 'name' && key !== 'type' && key !== 'latitude' && key !== 'longitude') {
        cForm.push(formData[key]);
      }
    }
    return { name: formData.name, type: formData.type, latitude: formData.latitude, longitude: formData.longitude, data: cForm };
  };

  const handleSubmit = () => {
    dispatch(setLoadingFarmUpload(true));
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('files', files[i]);
    }
    data.append('meta', JSON.stringify(metaData));
    dispatch(uploadFarm(data));
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setCompleted(prev => ({ ...prev, [activeStep]: false, [activeStep - 1]: false }));
      setFormData(formDataInitialState);
      dispatch(setFiles([]));
      dispatch(setCsvSample({}));
    }
    if (activeStep === 2) {
      setCompleted(prev => ({ ...prev, [activeStep]: false, [activeStep - 1]: false }));
    }
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Grid container sx={{bgcolor: grey[50], height: "100vh"}} className="upload-page">
        <Grid item xs={12} sx={{ backgroundColor: grey[800], color: grey[300], height: '10%', display: 'flex', alignItems: 'center', flex: "0 1 auto" }}>
          <Grid sx={{ m: 'auto' }}>
            <Typography
              component={Link}
              to="/"
              variant="overline"
              fontSize={20}
              sx={{ width: 'fit-content', textDecoration: 'none', color: grey[300] }}
            >
              Farm Creation Page
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ height: '80%', overflow: "hidden" }}>
          {loadingFarmUpload && (
            <Grid sx={{ width: '100%', height: "1%" }}>
              <LinearProgress variant="determinate" value={uploadFarmState} />
            </Grid>
          )}
          <Grid
            sx={{
              height: '100%',
              p: 5,
            }}
          >
            <Grid className="stepper-grid" sx={{height: "5%"}}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
            <Grid className="step-details-grid" sx={{ p: 2, height: "94%" }}>
              {activeStep === 0 ? (
                <UploadFarmFiles />
              ) : activeStep === 1 ? (
                <UploadFarmInfoTable formData={formData} setFormData={setFormData} nextError={nextError} />
              ) : (
                <UploadFarmCreate />
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid className="stepper-buttons-grid" xs={12} sx={{ height: '10%', display: 'flex', pt: 2, justifyContent: 'space-between' }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            {activeStep === 0 || activeStep === 1 ? (
              <Button onClick={handleNext} disabled={Object.keys(csvSample).length === 0} sx={{ mr: 1 }}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} sx={{ mr: 1 }}>
                Finish
              </Button>
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default Upload;
