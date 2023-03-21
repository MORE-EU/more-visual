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

const ChartML = () => {
  const { queryResults, selectedMeasures } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  return (
    <>
      <Grid container sx={{ height: '100%', width: '100%' }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid item sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 5 }}>
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
                <SelectColumnComp selectedMeasures={selectedMeasures} />
              </Grid>
              <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', width: '50%', m: 'auto' }}>
                <Typography variant="subtitle1" fontSize={15}>
                  Clean - Prepare Data
                </Typography>
                <Checkbox defaultChecked />
              </Grid>
            </Grid>
            <Grid className={'Slider-values'} sx={{ width: '100%', textAlign: 'center' }}>
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
              {/* <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '50%', m: 'auto' }}>
                <Grid sx={{ width: '30%' }}>
                  <Typography variant="subtitle1" fontSize={15}>
                    Validation Size:
                  </Typography>
                </Grid>
                <Grid sx={{ width: '70%' }}>
                  <Slider size="small" defaultValue={0} min={0} max={1} step={0.01} valueLabelDisplay="auto" />
                </Grid>
              </Grid> */}
            </Grid>
            <Grid
              className={'Features-values'}
              sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 2, textAlign: "center" }}
            >
              <Grid className={'Features-values-choices'} sx={{ display: 'flex', flexDirection: 'row', width: "40%", m: "auto", border: '1px solid rgba(0,0,0,0.3)', borderRadius: 6 }}>
                <Grid
                  sx={{
                    width: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid rgba(0,0,0,0.3)',
                  }}
                >
                  <Typography variant="subtitle1" fontSize={20}>
                    Features
                  </Typography>
                </Grid>
                <Grid sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontSize={15}>
                      Temporal
                    </Typography>
                    <HelpIcon color="primary" />
                    <Checkbox defaultChecked />
                  </Grid>
                  <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontSize={15}>
                      Past Metrics
                    </Typography>
                    <HelpIcon color="primary" />
                    <Checkbox defaultChecked />
                  </Grid>
                  <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Typography variant="subtitle1" fontSize={15}>
                      Derivatives
                    </Typography>
                    <HelpIcon color="primary" />
                    <Checkbox defaultChecked />
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={'Features-values-choice-1'} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '100%' }}>
                <Grid sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontSize={20}>
                    Temporal
                  </Typography>
                </Grid>
                <Grid sx={{ textAlign: 'center' }}>
                  <Grid
                    sx={{
                      display: 'flex',
                      flexFlow: 'row wrap',
                      columnGap: 2,
                      textAlign: 'center',
                      width: '30%',
                      m: 'auto',
                      justifyContent: 'space-evenly',
                    }}
                  >
                    {['Minute', 'Month', 'is Working hour', 'Hour', 'Weekday', 'Is Weekend', 'day', 'Week of year'].map(text => (
                      <Grid key={`${text}-Temporal-choice`} sx={{ display: 'flex', columnGap: 1, alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontSize={15}>
                          {text}
                        </Typography>
                        <Checkbox defaultChecked />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={'Features-values-choice-2'} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '100%' }}>
                <Grid sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontSize={20}>
                    Past Metrics
                  </Typography>
                </Grid>
                <Grid sx={{ textAlign: 'center', width: '30%', display: 'flex', flexFlow: 'row wrap', m: 'auto', gap: 2, justifyContent: "space-evenly" }}>
                  {['Previous Hour', 'Previous Day', 'Previous Week', 'Previous Month'].map(text => (
                    <Grid key={`${text}-Past-Metrics-categories`} sx={{ display: 'flex', flexDirection: 'column', width: '40%', border: '1px solid rgba(0,0,0,0.3)', borderRadius: 6}}>
                      <Typography variant="subtitle1" fontSize={20}>
                        {text}
                      </Typography>
                      {['Actual Load', 'Average Load', 'Min Load', 'Max Load'].map(loadText => (
                        <Grid key={`${loadText}-Past-Metrics-category-choice`} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <Checkbox defaultChecked />
                          <Typography variant="subtitle1" fontSize={15}>
                            {loadText}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid className={'Features-values-choice-3'} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '100%' }}>
                <Grid sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" fontSize={20}>
                    Derivatives
                  </Typography>
                </Grid>
                <Grid sx={{ textAlign: 'center', width: '30%', display: 'flex', flexFlow: 'row wrap', m: 'auto' }}>
                  {['Slope', 'Curvature'].map(text => (
                    <Grid key={`${text}-Derivative-choice`} sx={{ display: 'flex', flexDirection: 'row', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
                      <Checkbox defaultChecked />
                      <Typography variant="subtitle1" fontSize={20}>
                        {text}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid
              className={'Categorical-Encoding-values'}
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
                  Categorical Encoding Values
                </Typography>
                <Grid sx={{ display: 'flex', flexFlow: 'row wrap', textAlign: 'center' }}>
                  {['Minute', 'Day', 'Weekday', 'Hour', 'Month'].map(categoryText => (
                    <Grid key={`${categoryText}-Categorical-value`} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                      <Checkbox defaultChecked />
                      <Typography variant="subtitle1" fontSize={15}>
                        {categoryText}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
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
                <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', m: 'auto' }}>
                  <Typography variant="subtitle1" fontSize={15}>
                    Target Column:
                  </Typography>
                  <SelectColumnComp selectedMeasures={selectedMeasures} />
                </Grid>
                <Grid sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', m: 'auto' }}>
                    <Grid sx={{width: "60%"}}>
                  <Typography variant="subtitle1" fontSize={15}>
                    How many predictions:
                  </Typography>
                  </Grid>
                  <Grid sx={{width: "20%"}}>
                  <TextField
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default ChartML;
