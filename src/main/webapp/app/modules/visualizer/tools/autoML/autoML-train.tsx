import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'app/modules/store/storeConfig';

const SelectColumnComp = props => (
    <Select size="small">
      {props.selectedMeasures.map(measure => (
        <MenuItem value={measure}>{measure}</MenuItem>
      ))}
    </Select>
  );

const AutoMLTrain = () => {
    const {selectedMeasures} = useAppSelector(state => state.visualizer);
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
          {/* <Grid sx={{ display: 'flex', gap: 1, justifyContent: 'space-evenly', alignItems: 'center', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={15}>
              Target Column:
            </Typography>
            <SelectColumnComp selectedMeasures={selectedMeasures} />
          </Grid> */}
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
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AutoMLTrain;
