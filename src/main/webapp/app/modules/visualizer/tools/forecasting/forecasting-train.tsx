import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React, { Dispatch, SetStateAction } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'app/modules/store/storeConfig';
import { IForecastingForm } from 'app/shared/model/forecasting.model';

interface IForecastingTrain {
  forecastingForm: IForecastingForm;
  setForecastingForm: Dispatch<SetStateAction<IForecastingForm>>;
}

const ForecastingTrain = (props: IForecastingTrain) => {
    const {selectedMeasures} = useAppSelector(state => state.visualizer);
    const {forecastingForm, setForecastingForm} = props;

  const handlePredictions = value => {
    setForecastingForm(state => ({...state, predictions: parseInt(value.target.value, 10)}))
  }

  return (
    <>
      <Grid
        className={'Future-predictive-window'}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          textAlign: 'center',
        }}
      >
        <Grid sx={{ width: '30%', textAlign: 'center', m: 'auto' }}>
          <Typography variant="subtitle1" fontSize={20}>
            Future Predictive Window
          </Typography>
          <Grid sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', m: 'auto' }}>
            <Grid sx={{ width: '60%' }}>
              <Typography variant="subtitle1" fontSize={15}>
                How many predictions:
              </Typography>
            </Grid>
            <Grid sx={{ width: '20%' }}>
              <TextField
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                onChange={handlePredictions}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ForecastingTrain;
