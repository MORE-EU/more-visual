import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FormControl, Paper, Select, Typography, MenuItem, Box } from '@mui/material';
import { LatLng } from 'leaflet';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export interface IHomeRightPanel {
  filSamples: any[];
  counter: number;
}

export const HomeRightPanel = (props: IHomeRightPanel) => {
  const { filSamples, counter } = props;

  const [statSelect, setStatSelect] = useState('');
  const [statCateg, setStatCateg] = useState([]);

  useEffect(() => {
    const stCat = [];
    if (filSamples.length !== 0) {
      for (const [key, value] of Object.entries(filSamples[0])) {
        !isNaN(Number(value)) && stCat.push(key);
      }
    }
    setStatCateg(stCat.filter(st => st !== 'capturedExceptions' && st !== 'hubHeight'));
  }, [filSamples]);

  const handleChange = event => {
    setStatSelect(event.target.value);
  };

  const options = {
    title: {
      text: '',
    },
    series: [
      {
        data: [counter],
      },
    ],
    stockTools: {
      gui: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      height: 200,
      type: 'bar',
    },
  };

  const handleStats = val => {
    let newVals;
    newVals = filSamples.map(sample => {
      return parseInt(sample[`${statSelect}`], 10);
    });
    if (val === 'min') {
      newVals.length !== 0 ? (newVals = Math.min(...newVals)) : (newVals = 'N/A');
    } else if (val === 'max') {
      newVals.length !== 0 ? (newVals = Math.max(...newVals)) : (newVals = 'N/A');
    } else if (val === 'mean') {
      newVals = filSamples.map(sample => {
        return parseInt(sample[`${statSelect}`], 10);
      });
      newVals = Math.floor(newVals.reduce((prevVal, nextVal) => prevVal + nextVal, 0) / newVals.length);
    } else if (val === '') {
      newVals = 'N/A';
    }
    return newVals;
  };

  return (
    <>
      <Paper elevation={3} sx={{ position: 'fixed', bottom: 250, right: 10, width: '400px', height: 'auto', zIndex: 999 }}>
        <Typography variant="h6" sx={{ backgroundColor: '#e0e0e0', fontSize: 14, fontWeight: 400, paddingLeft: 1 }}>
          Statistics Panel
        </Typography>
        <Paper sx={{ textAlign: 'center' }}>
          <Box sx={{ textAlign: 'center', alignItems: 'center', display: 'flex' }}>
            <Typography textAlign="center" variant="h6" sx={{ fontSize: 16, flex: 1 }}>
              Statistics for Field:
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, flex: 1 }}>
              <Select value={statSelect} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                {statCateg.map(categ => {
                  return (
                    <MenuItem key={categ} value={categ}>
                      {categ}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('min')} <br />
              min <br />
            </Typography>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('max')}
              <br />
              max <br />
            </Typography>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('mean')} <br />
              mean <br />
            </Typography>
          </Box>
        </Paper>
      </Paper>
      <div>
        <Paper elevation={3} sx={{ position: 'fixed', bottom: 10, right: 10, width: '400px', height: 'auto', zIndex: 999 }}>
          <Typography sx={{ backgroundColor: '#e0e0e0', fontSize: 14, fontWeight: 400, paddingLeft: 1 }}>Number of Items on map</Typography>
          <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />
        </Paper>
      </div>
    </>
  );
};
