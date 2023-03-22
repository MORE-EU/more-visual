import React, { useState } from 'react';
import { Box, Button, Checkbox, Divider, Slider, Stack, Typography } from '@mui/material';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { resetFilters, updateFilters, updateQueryResults } from 'app/modules/store/visualizerSlice';

export const Filter = () => {
  const { queryResults, filter, folder, dataset, from, to, resampleFreq, selectedMeasures } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const filterReset = () => {
    dispatch(resetFilters());
    dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures }));
  };

  const handleFilterSlider = (newRange, col) => {
    const newFilter = new Map(filter);
    newFilter.set(col, newRange);
    dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures, filter: newFilter }));
  };

  const countDecimals = value => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split('.')[1].length || 0;
  };

  const handleTextFields = (e, col, stats, type) => {
    if (!isNaN(parseFloat(e.target.value))) {
      if (countDecimals(parseFloat(e.target.value)) <= 2) {
        const newFilter = new Map(filter);
        if (type === 'min') {
          newFilter.set(col, [parseFloat(e.target.value), filter.has(col) ? filter.get(col)[1] : parseFloat(stats.max).toFixed(2)]);
          dispatch(
            updateFilters({
              measureCol: col,
              range: [parseFloat(e.target.value), filter.has(col) ? filter.get(col)[1] : parseFloat(stats.max).toFixed(2)],
            })
          ),
            dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures, filter: newFilter }));
        } else {
          newFilter.set(col, [filter.has(col) ? filter.get(col)[0] : parseFloat(stats.min).toFixed(2), parseFloat(e.target.value)]);
          dispatch(
            updateFilters({
              measureCol: col,
              range: [filter.has(col) ? filter.get(col)[0] : parseFloat(stats.min).toFixed(2), parseFloat(e.target.value)],
            })
          ),
            dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures, filter: newFilter }));
        }
      }
    }
  };

  return (
    <Box sx={{ pl: 2, pr: 2 }}>
      <Box>
        <Button variant="contained" onClick={filterReset}>
          Reset Filters
        </Button>
      </Box>
      <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {queryResults &&
          selectedMeasures.map((col, idx) => {
            const stats = queryResults.measureStats[col];
            return (
              <Box key={col} sx={{ width: '80%', mt: idx > 0 ? 1 : 0 }}>
                <Typography gutterBottom variant="overline" sx={{ textAlign: 'center', fontWeight: 900, display: 'block' }}>
                  {dataset.header[col]}
                </Typography>
                <Slider
                  value={!filter.has(col) ? [stats.min, stats.max] : [parseFloat(filter.get(col)[0]), parseFloat(filter.get(col)[1])]}
                  min={stats.min}
                  max={stats.max}
                  onChange={(e, newRange) => {
                    dispatch(updateFilters({ measureCol: col, range: newRange }));
                  }}
                  onChangeCommitted={(e, newRange) => handleFilterSlider(newRange, col)}
                  valueLabelDisplay="auto"
                />
                <Stack direction="row" spacing={2}>
                  <TextField
                    id="outlined-basic"
                    label="Min-Value"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={filter.has(col) ? filter.get(col)[0] : parseFloat(parseFloat(stats.min).toFixed(2))}
                    onChange={e => handleTextFields(e, col, stats, 'min')}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Max-Value"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={filter.has(col) ? filter.get(col)[1] : parseFloat(parseFloat(stats.max).toFixed(2))}
                    onChange={e => {
                      handleTextFields(e, col, stats, 'max');
                    }}
                  />
                </Stack>
                <Divider sx={{ mt: 2 }} />
              </Box>
            );
          })}
      </List>
    </Box>
  );
};

export default Filter;
