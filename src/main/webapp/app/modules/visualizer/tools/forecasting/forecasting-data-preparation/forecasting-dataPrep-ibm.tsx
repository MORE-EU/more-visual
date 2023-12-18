import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { setAutoMLEndDate, setAutoMLStartDate, setForecastingDataSplit } from 'app/modules/store/visualizerSlice';
import { grey } from '@mui/material/colors';
import { IForecastingFormIbm } from 'app/shared/model/forecasting-ibm.model';


interface IForecastingDataPrep {
  forecastingFormIbm: IForecastingFormIbm;
  setForecastingFormIbm: Dispatch<SetStateAction<IForecastingFormIbm>>;
}

const ForecastingDataPrepIbm = (props: IForecastingDataPrep) => {
  const dispatch = useAppDispatch();
  const { dataset } = useAppSelector(state => state.visualizer);
  const { forecastingFormIbm, setForecastingFormIbm } = props;

  const handleDates = e => value => {
    const userTimezoneOffset = value.getTimezoneOffset() * 60000;
    const date = new Date(value).getTime();
    e === 'start' &&
      (setForecastingFormIbm(state => ({ ...state, startDate: date + userTimezoneOffset})),
      dispatch(setAutoMLStartDate(new Date(date + userTimezoneOffset).getTime())));
    e === 'end' &&
      (setForecastingFormIbm(state => ({ ...state, endDate: date + userTimezoneOffset})),
      dispatch(setAutoMLEndDate(new Date(date + userTimezoneOffset).getTime())));
  };

  const handleChange = e => {
    setForecastingFormIbm(state => ({...state, experiment: e.target.value}))
  }

  const handleTimeInterval = (e) => {
    setForecastingFormIbm(state => ({...state, time_interval: e.target.value}));
  }

  const getDateValue = (date) => {
    return date === null ? date : date - new Date(date).getTimezoneOffset() * 60000
  }

  return (
    <>
    {console.log(forecastingFormIbm)}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid
          className={'basic-values'}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            textAlign: 'center',
          }}
        >
          <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '70%', m: 'auto' }}>
          <Typography variant="subtitle1" fontSize={18}>
              Data Range Selection:
            </Typography>
            <DateTimePicker
              label={forecastingFormIbm.startDate ? null : 'Start Date'}
              minDateTime={dataset.timeRange.from}
              maxDateTime={forecastingFormIbm.endDate ? forecastingFormIbm.endDate : dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={getDateValue(forecastingFormIbm.startDate)}
              onChange={e => {}}
              onAccept={handleDates('start')}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
            <Typography variant="subtitle1" fontSize={20} fontWeight={800}>
              -
            </Typography>
            <DateTimePicker
              label={forecastingFormIbm.endDate ? null : 'End Date'}
              minDateTime={forecastingFormIbm.startDate ? forecastingFormIbm.startDate : dataset.timeRange.from}
              maxDateTime={dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={getDateValue(forecastingFormIbm.endDate)}
              onChange={e => {}}
              onAccept={handleDates('end')}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </Grid>
          <Grid sx={{display: 'flex', gap: 1, alignItems: 'center', width: '70%', m: 'auto'}}>
          <Grid sx={{ width: '30%', alignSelf: "flex-start" }}>
              <Typography variant="subtitle1" fontSize={18}>
                Time interval:
              </Typography>
            </Grid>
            <Grid sx={{ width: '70%' }}>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size='small'
            value={forecastingFormIbm.time_interval}
            label=""
            onChange={handleTimeInterval}
            >
            <MenuItem value={"2S"}>2S</MenuItem>
            <MenuItem value={"15T"}>15m</MenuItem>
            <MenuItem value={"30T"}>30m</MenuItem>
            <MenuItem value={"1H"}>1h</MenuItem>
            <MenuItem value={"6H"}>6h</MenuItem>
          </Select>
            </Grid>
          </Grid>
          <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '70%', m: 'auto' }}>
            <Grid sx={{ width: '30%' }}>
              <Typography variant="subtitle1" fontSize={18}>
                Forecasting Case:
              </Typography>
            </Grid>
            <Grid sx={{ width: '70%' }}>
            <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={forecastingFormIbm.experiment}
        label=""
        size='small'
        fullWidth
        onChange={handleChange}
      >
        <MenuItem value={"WIND_POWER_ESTIMATION"}>Wind Power Estimation</MenuItem>
        <MenuItem value={"YAW_MISALIGNMENT"}>Yaw Misalignment</MenuItem>
        <MenuItem value={"SOILING_DETECTION"}>Soiling Detection</MenuItem>
      </Select>
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};

export default ForecastingDataPrepIbm;
