import { IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { blue, grey, red } from '@mui/material/colors';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { IForecastingForm, ILGBMIntervals, IXGBoostIntervals } from 'app/shared/model/forecasting.model';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

interface IForecastingAlgModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  forecastingForm: IForecastingForm;
  setForecastingForm: Dispatch<SetStateAction<IForecastingForm>>;
  selectedAlgo: string;
  fineTuneSelection: string[];
}

const ForecastingAlgModal = (props: IForecastingAlgModal) => {
  const { open, setOpen, forecastingForm, setForecastingForm, selectedAlgo, fineTuneSelection } = props;
  const [algoParameters, setAlgoParameters] = useState(null);
  useEffect(() => {
    if (selectedAlgo === 'XGBoost') {
      setAlgoParameters(IXGBoostIntervals);
    } else if (selectedAlgo === 'LGBM') {
      setAlgoParameters(ILGBMIntervals);
    } else if (selectedAlgo === 'LinearRegression') {
    }
    // setAlgoParameters()
  }, [selectedAlgo]);

  const prettyPrintJSON = obj => {
    return JSON.stringify(
      obj,
      function (key, value) {
        if (Array.isArray(value)) {
          return (
            '[' +
            value
              .map(function (item) {
                return JSON.stringify(item);
              })
              .join(', ') +
            ']'
          );
        }
        return value;
      },
      2
    );
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" hideBackdrop>
        <Grid sx={style}>
          <Grid sx={{ height: '6%', width: '100%', backgroundColor: grey[300], display: 'flex', alignItems: 'center' }}>
            <Grid sx={{ flex: 1, pl: 1 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: grey[600] }}>
                Configuration
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={handleClose} sx={{ borderRadius: 0, '&:hover': { color: red[400] } }}>
                <ClearIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid sx={{ p: 2, display: 'flex', flexDirection: 'row', height: '94%' }}>
            <Grid
              sx={{
                width: '50%',
                height: '100%',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column',
                rowGap: 1,
                borderRight: '1px solid rgba(0,0,0,0.4)',
              }}
            >
              {Object.keys(forecastingForm.algorithms).includes(selectedAlgo) &&
                Object.keys(forecastingForm.algorithms[selectedAlgo]).map(par => (
                  <Grid key={`algoParameter-${par}`}>
                    <Grid>
                      <Typography id="modal-modal-description" sx={{ mt: 2, fontWeight: 500 }}>
                        {par}
                      </Typography>
                    </Grid>
                    <Grid sx={{ width: 'inherit', display: 'flex', columnGap: 1 }}>
                      {fineTuneSelection.includes(selectedAlgo) ? (
                        <>
                          <TextField
                            id="outlined-number"
                            label="Min"
                            type="number"
                            defaultValue={forecastingForm.algorithms[selectedAlgo][par][0]}
                            sx={{ width: '20%' }}
                          />
                          <TextField
                            id="outlined-number"
                            label="Max"
                            type="number"
                            defaultValue={forecastingForm.algorithms[selectedAlgo][par][1]}
                            sx={{ width: '20%' }}
                          />
                          <TextField
                            id="outlined-number"
                            label="Step"
                            type="number"
                            defaultValue={forecastingForm.algorithms[selectedAlgo][par][2]}
                            sx={{ width: '20%' }}
                          />
                        </>
                      ) : (
                        <TextField
                          id="outlined-number"
                          label="value"
                          type="number"
                          defaultValue={forecastingForm.algorithms[selectedAlgo][par]}
                          sx={{ width: '20%' }}
                        />
                      )}
                    </Grid>
                  </Grid>
                ))}
            </Grid>
            <Grid
              sx={{
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                overflowY: 'auto',
                rowGap: 5,
              }}
            >
              <Typography id="modal-modal-description" sx={{ mt: 2, color: grey[600], fontWeight: 800, fontSize: 24 }}>
                {`${selectedAlgo} parameters`}
              </Typography>
              <pre style={{ marginTop: 2, color: blue[500], fontWeight: 600, fontSize: 20, lineHeight: 1.4 }}>
                {forecastingForm.algorithms[selectedAlgo] && prettyPrintJSON(forecastingForm.algorithms[selectedAlgo])}
              </pre>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default ForecastingAlgModal;
