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
import { IAutoMLForm } from 'app/shared/model/autoML.model';
import { setAutoMLEndDate, setAutoMLStartDate } from 'app/modules/store/visualizerSlice';

const DataSplitSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 2,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

interface IAutoMLDataPrep {
  autoMLForm: IAutoMLForm;
  setAutoMLForm: Dispatch<SetStateAction<IAutoMLForm>>;
}

const AutoMLDataPrep = (props: IAutoMLDataPrep) => {
  const dispatch = useAppDispatch();
  const { dataset } = useAppSelector(state => state.visualizer);
  const { autoMLForm, setAutoMLForm } = props;

  useEffect(() => {
    setAutoMLForm(state => ({ ...state, TargetColumn: dataset.header[0] }));
  }, []);

  const handleDates = e => value => {
    e === 'start' && (setAutoMLForm(state => ({ ...state, startDate: new Date(value).getTime() })), dispatch(setAutoMLStartDate(new Date(value).getTime())));
    e === 'end' && (setAutoMLForm(state => ({ ...state, endDate: new Date(value).getTime() })), dispatch(setAutoMLEndDate(new Date(value).getTime())));
  };

  const handleTargetColumn = e => {
    setAutoMLForm(state => ({ ...state, TargetColumn: e.target.value }));
  };

  const handleCleanData = e => {
    setAutoMLForm(state => ({ ...state, cleanData: !autoMLForm.cleanData }));
  };

  const handleDataSplit = e => {
    setAutoMLForm(state => ({ ...state, dataSplit: [e.target.value[0], e.target.value[1] - e.target.value[0], 100 - e.target.value[1]] }));
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
          <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={15}>
              Start Date:
            </Typography>
            <DateTimePicker
              label={autoMLForm.startDate ? null : "pick a date"}
              minDateTime={dataset.timeRange.from}
              maxDateTime={autoMLForm.endDate ? autoMLForm.endDate : dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={autoMLForm.startDate}
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
              label={autoMLForm.endDate ? null : "pick a date"}
              minDateTime={autoMLForm.startDate ? autoMLForm.startDate : dataset.timeRange.from}
              maxDateTime={dataset.timeRange.to}
              renderInput={props => <TextField size="small" {...props} />}
              value={autoMLForm.endDate}
              onChange={e => {}}
              onAccept={handleDates('end')}
              inputFormat="dd/MM/yyyy hh:mm a"
            />
          </Grid>
          <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={15}>
              Target Column:
            </Typography>
            {autoMLForm.TargetColumn && (
              <Select size="small" value={autoMLForm.TargetColumn} onChange={handleTargetColumn}>
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
            <Checkbox value={autoMLForm.cleanData} onChange={handleCleanData} />
          </Grid>
          <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '50%', m: 'auto' }}>
            <Grid sx={{ width: '30%' }}>
              <Typography variant="subtitle1" fontSize={15}>
                Data Split:
              </Typography>
            </Grid>
            <Grid sx={{ width: '70%' }}>
              <DataSplitSlider
                value={[autoMLForm.dataSplit[0], autoMLForm.dataSplit[0] + autoMLForm.dataSplit[1]]}
                disableSwap
                onChange={handleDataSplit}
              />
            </Grid>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </>
  );
};

export default AutoMLDataPrep;
