import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import styled from '@mui/system/styled';

const SelectColumnComp = props => (
    <Select size="small">
      {props.selectedMeasures.map(measure => (
        <MenuItem value={measure}>{measure}</MenuItem>
      ))}
    </Select>
  );
  
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

  const AutoMLDataPrep = () => {
    const {dataset} = useAppSelector(state => state.visualizer);
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
                  label={null}
                  //   minDateTime={queryResults ? queryResults.timeRange[0] : null}
                  //   maxDateTime={queryResults ? queryResults.timeRange[1] : null}
                  renderInput={props => <TextField size="small" {...props} />}
                  value={null}
                  onChange={e => console.log(e)}
                  inputFormat="dd/mm/yyyy hh:mm"
                />
              </Grid>
              <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
                <Typography variant="subtitle1" fontSize={15}>
                  End Date:
                </Typography>
                <DateTimePicker
                  label={null}
                  //   minDateTime={queryResults ? queryResults.timeRange[0] : null}
                  //   maxDateTime={queryResults ? queryResults.timeRange[1] : null}
                  renderInput={props => <TextField size="small" {...props} />}
                  value={null}
                  onChange={e => console.log(e)}
                  inputFormat="dd/mm/yyyy hh:mm"
                />
              </Grid>
              <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
                <Typography variant="subtitle1" fontSize={15}>
                  Target Column:
                </Typography>
                <SelectColumnComp selectedMeasures={dataset.header} />
              </Grid>
              <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
                <Typography variant="subtitle1" fontSize={15}>
                  Clean - Prepare Data
                </Typography>
                <Checkbox defaultChecked />
              </Grid>
              <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '50%', m: 'auto' }}>
                <Grid sx={{ width: '30%' }}>
                  <Typography variant="subtitle1" fontSize={15}>
                    Data Split:
                  </Typography>
                </Grid>
                <Grid sx={{ width: '70%' }}>
                  <DataSplitSlider defaultValue={[80, 90]} disableSwap/>
                </Grid>
              </Grid>
            </Grid>
            </LocalizationProvider>
        </>
    )
  }

  export default AutoMLDataPrep;