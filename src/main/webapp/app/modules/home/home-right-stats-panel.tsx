import React, { useEffect } from 'react';
import { Grid, FormControl, MenuItem, Paper, Select, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import Heatmap from 'highcharts/modules/heatmap.js';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setStatCateg, setStatSelect } from '../store/homeSlice';
import { grey } from '@mui/material/colors';
Heatmap(Highcharts);

export const HomeRightStatsPanel = () => {
  const { filSamples, selected, statSelect, statCateg } = useAppSelector(state => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let stCat = [];
    if (filSamples.length !== 0) {
      for (const [key, value] of Object.entries(filSamples[0])) {
        !isNaN(Number(value)) && stCat.push(key);
      }
    }
    stCat = stCat.filter(st => st === 'noOfTurbines' || st === 'power');
    dispatch(setStatCateg(stCat));
  }, [filSamples]);

  const handleChange = event => {
    dispatch(setStatSelect(event.target.value));
  };

  const handleStatsPanel = val => {
    let sd, mean, newVals;
    let sd2 = 0;
    const filtSample = [];
    newVals = filSamples.map(sample => {
      if (selected.length !== 0) {
        Object.keys(sample).map(fil => {
          if (JSON.stringify(selected).includes(JSON.stringify([fil, sample[fil]]))) {
            filtSample.push(parseInt(sample[`${statSelect}`], 10));
          }
        });
      } else {
        return parseInt(sample[`${statSelect}`], 10);
      }
    });
    if (selected.length !== 0) {
      newVals = filtSample;
    }
    if (val === 'min') {
      newVals.length !== 0 ? (newVals = Math.min(...newVals)) : (newVals = 'N/A');
    } else if (val === 'max') {
      newVals.length !== 0 ? (newVals = Math.max(...newVals)) : (newVals = 'N/A');
    } else if (val === 'mean') {
      newVals = Math.floor((newVals.reduce((prevVal, nextVal) => prevVal + nextVal, 0) / newVals.length) * 100) / 100;
    } else if (val === 'SD') {
      sd = newVals;
      mean = Math.floor(newVals.reduce((prevVal, nextVal) => prevVal + nextVal, 0) / newVals.length);
      newVals = sd.map(value => {
        return Math.pow(value - mean, 2);
      });
      newVals.forEach(va => (sd2 = sd2 + parseInt(va, 10)));
      sd2 = Math.floor(Math.sqrt((sd2 / newVals.length) * 100) / 100);
      newVals = sd2;
    } else if (val === 'VAR') {
      sd = filSamples.map(sample => {
        return parseInt(sample[`${statSelect}`], 10);
      });
      mean = Math.floor(newVals.reduce((prevVal, nextVal) => prevVal + nextVal, 0) / newVals.length);
      newVals = sd.map(value => {
        return Math.pow(Number(value) - Number(mean), 2);
      });
      newVals.forEach(va => (sd2 = sd2 + parseInt(va, 10)));
      sd2 = Math.floor((sd2 / newVals.length - 1) * 100) / 100;
      newVals = sd2;
    } else if (val === '') {
      newVals = 'N/A';
    }
    return newVals;
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 335,
          right: 10,
          width: '400px',
          height: 'auto',
          zIndex: 401,
          textAlign: 'center',
          backgroundColor: grey[300],
        }}
      >
        <Grid sx={{ textAlign: 'center', alignItems: 'center', display: 'flex' }}>
          <Typography textAlign="center" variant="subtitle1" color={grey[700]} sx={{ fontSize: 16, flex: 1 }}>
            Statistics for Field:
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, flex: 1 }}>
            <Select value={statSelect} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label'  }} sx={{color: grey[700]}}>
              {statCateg.map(categ => {
                return (
                  <MenuItem key={categ} value={categ}>
                    {categ}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid sx={{ display: 'flex', width: '100%' }}>
          <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
            <br />
            {handleStatsPanel('min')} <br />
            min <br />
          </Typography>
          <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
            <br />
            {handleStatsPanel('max')}
            <br />
            max <br />
          </Typography>
          <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
            <br />
            {handleStatsPanel('mean')} <br />
            mean <br />
          </Typography>
          <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
            <br />
            {handleStatsPanel('SD')} <br />
            SD <br />
          </Typography>
          <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
            <br />
            {handleStatsPanel('VAR')} <br />
            VAR <br />
          </Typography>
        </Grid>
      </Paper>
    </>
  );
};
