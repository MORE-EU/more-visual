import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import styled from '@mui/system/styled';
import { IForecastingForm } from 'app/shared/model/forecasting.model';
import { setAutoMLEndDate, setAutoMLStartDate, setForecastingDataSplit } from 'app/modules/store/visualizerSlice';
import { grey } from '@mui/material/colors';


interface IForecastingDataPrep {
  forecastingForm: IForecastingForm;
  setForecastingForm: Dispatch<SetStateAction<IForecastingForm>>;
}

const ForecastingDataPrep = (props: IForecastingDataPrep) => {
  const dispatch = useAppDispatch();
  const { dataset } = useAppSelector(state => state.visualizer);
  const { forecastingForm, setForecastingForm } = props;

  const handleDates = e => value => {
    e === 'start' &&
      (setForecastingForm(state => ({ ...state, startDate: new Date(value).getTime() })),
      dispatch(setAutoMLStartDate(new Date(value).getTime())));
    e === 'end' &&
      (setForecastingForm(state => ({ ...state, endDate: new Date(value).getTime() })),
      dispatch(setAutoMLEndDate(new Date(value).getTime())));
  };

  const handleTargetColumn = e => {
    setForecastingForm(state => ({ ...state, TargetColumn: e.target.value }));
  };

  const handleCleanData = e => {
    setForecastingForm(state => ({ ...state, cleanData: !forecastingForm.cleanData }));
  };

  const handleDataSplit = e => {
    if(e.target.value[0] >= 60){
    setForecastingForm(state => ({
      ...state,
      dataSplit: [e.target.value[0], e.target.value[1] - e.target.value[0], 100 - e.target.value[1]],
    }));
  }
  };

  const handleTimeInterval = (e) => {
    setForecastingForm(state => ({...state, time_interval: e.target.value}));
  }

  const handleDataSplitCommit = (e, value) => {
    dispatch(setForecastingDataSplit(forecastingForm.dataSplit));
  };

  const sliderSx = { 
    '& .MuiSlider-thumb': {
      height: 20,
      width: 20,
      backgroundColor: '#fff',
      border: `1px solid ${grey[700]}`,
      '&:hover': {
        boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      }
    },
    '& .MuiSlider-track': {
      height: 3,
      background: "#ff0000",
      borderColor: "white"
    },
    "& .MuiSlider-mark": {
      background: "none"
    },
    '& .MuiSlider-rail': {
      background: `linear-gradient(to right, #00FF00 0% ${forecastingForm.dataSplit[0]}%, #ff0000 ${forecastingForm.dataSplit[0]}% ${forecastingForm.dataSplit[1]}%, #00FFFF ${forecastingForm.dataSplit[1]}% 100%)`,
      opacity: 1,
      height: 3,
    },
  };

  return (
    <>
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
          {/* <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={15}>
              Start Date:
            </Typography>
            <DateTimePicker
              label={forecastingForm.startDate ? null : 'pick a date'}
              minDateTime={dataset.timeRange.from}
              maxDateTime={forecastingForm.endDate ? forecastingForm.endDate : dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={forecastingForm.startDate}
              onChange={e => {}}
              onAccept={handleDates('start')}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </Grid>
          <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={15}>
              End Date:
            </Typography>
            <DateTimePicker
              label={forecastingForm.endDate ? null : 'pick a date'}
              minDateTime={forecastingForm.startDate ? forecastingForm.startDate : dataset.timeRange.from}
              maxDateTime={dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={forecastingForm.endDate}
              onChange={e => {}}
              onAccept={handleDates('end')}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </Grid> */}
          <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '70%', m: 'auto' }}>
          <Typography variant="subtitle1" fontSize={18}>
              Data Range Selection:
            </Typography>
            <DateTimePicker
              label={forecastingForm.startDate ? null : 'Start Date'}
              minDateTime={dataset.timeRange.from}
              maxDateTime={forecastingForm.endDate ? forecastingForm.endDate : dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={forecastingForm.startDate}
              onChange={e => {}}
              onAccept={handleDates('start')}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
            <Typography variant="subtitle1" fontSize={20} fontWeight={800}>
              -
            </Typography>
            <DateTimePicker
              label={forecastingForm.endDate ? null : 'End Date'}
              minDateTime={forecastingForm.startDate ? forecastingForm.startDate : dataset.timeRange.from}
              maxDateTime={dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={forecastingForm.endDate}
              onChange={e => {}}
              onAccept={handleDates('end')}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </Grid>
          {/* <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={15}>
              Target Column:
            </Typography>
            {forecastingForm.TargetColumn && (
              <Select size="small" value={forecastingForm.TargetColumn} onChange={handleTargetColumn}>
                {dataset.header.map(measure => (
                  <MenuItem key={`${measure}-item`} value={measure}>
                    {measure}
                  </MenuItem>
                ))}
              </Select>
            )}
          </Grid>
          <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={15}>
              Clean - Prepare Data
            </Typography>
            <Checkbox value={forecastingForm.cleanData} onChange={handleCleanData} />
          </Grid> */}
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
            value={forecastingForm.time_interval}
            label=""
            onChange={handleTimeInterval}
            >
            <MenuItem value={"15m"}>15m</MenuItem>
            <MenuItem value={"30m"}>30m</MenuItem>
            <MenuItem value={"1h"}>1h</MenuItem>
            <MenuItem value={"6h"}>6h</MenuItem>
          </Select>
            </Grid>
          </Grid>
          <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '70%', m: 'auto' }}>
            <Grid sx={{ width: '30%', alignSelf: "flex-start" }}>
              <Typography variant="subtitle1" fontSize={18}>
                Data Split:
              </Typography>
            </Grid>
            <Grid sx={{ width: '70%' }}>
              <Slider
                value={[forecastingForm.dataSplit[0], forecastingForm.dataSplit[0] + forecastingForm.dataSplit[1]]}
                disableSwap
                onChange={handleDataSplit}
                onChangeCommitted={handleDataSplitCommit}
                valueLabelDisplay={'auto'}
                marks={[
                  { label: `train ${forecastingForm.dataSplit[0]}%`, value: forecastingForm.dataSplit[0] / 2 },
                  {
                    label: forecastingForm.dataSplit[1] > 0 ? `validation  ${forecastingForm.dataSplit[1]}%` : null,
                    value: forecastingForm.dataSplit[0] + forecastingForm.dataSplit[1] / 2,
                  },
                  {
                    label: forecastingForm.dataSplit[2] > 0 ? `test ${forecastingForm.dataSplit[2]}%` : null,
                    value: forecastingForm.dataSplit[0] + forecastingForm.dataSplit[1] + forecastingForm.dataSplit[2] / 2,
                  }
                ]}
                sx={sliderSx}
              />
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};

export default ForecastingDataPrep;
