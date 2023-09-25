import React, { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { resetFilters, updateFilter, updateQueryResults } from 'app/modules/store/visualizerSlice';
import { grey } from '@mui/material/colors';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';

export const Filter = () => {
  const { queryResults, filter, folder, dataset, from, to, resampleFreq, selectedMeasures, chartRef, queryResultsLoading } = useAppSelector(
    state => state.visualizer
  );
  const dispatch = useAppDispatch();
  const [windowFilters, updateWindowFilters] = useState({});
  const [textError, setTextError] = useState({min: false, max: false});
  const debounceTimer = useRef(null);

  const getFirstFilters = () => {
    return selectedMeasures.reduce((acc, cur) => {
      const stats = queryResults.measureStats[cur];
      return { ...acc, [cur]: [stats.min, stats.max] };
    }, {});
  };

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      updateWindowFilters(getFirstFilters());
    } else {
      updateWindowFilters(filter);
    }
  }, []);

  useEffect(() => {
    queryResultsLoading && chartRef.showLoading();
    !queryResultsLoading && chartRef.hideLoading();
  }, [queryResultsLoading]);

  const filterReset = () => {
    dispatch(resetFilters());
    updateWindowFilters(getFirstFilters());
    dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures }));
  };

  const onSliderChange = measureCol => (e, range) => {
    updateWindowFilters(state => ({ ...state, [measureCol]: range }));
  };

  const handleFilterSlider = colName => (e, newRange) => {
    const newFilter = { ...windowFilters, [colName]: newRange };
    dispatch(updateFilter(newFilter));
    dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures, filter: newFilter }));
  };

  const getParsedValue = val => {
    return parseFloat(parseFloat(val).toFixed(2));
  };

  const handleTextFields = (col, choice) => e => {
    const value = parseFloat(e.target.value);
    const stats = queryResults.measureStats[col];
    if (choice === 'min') {
      if (value > windowFilters[col][1] || value < stats.min) {
        setTextError(state => ({...state, min: true}))
        setTimeout(() => {
          setTextError(state => ({...state, min: false}))
        }, 800);
        return;
      } else {
        updateWindowFilters(state => ({ ...state, [col]: [value, windowFilters[col][1]] }));
        const newFilter = { ...windowFilters, [col]: [value, windowFilters[col][1]] };
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures, filter: newFilter }));
        }, 1000);
      }
    } else {
      if (value < windowFilters[col][0] || value > stats.max) {
        setTextError(state => ({...state, max: true}))
        setTimeout(() => {
          setTextError(state => ({...state, max: false}))
        }, 800);
        return;
      } else {
        updateWindowFilters(state => ({ ...state, [col]: [windowFilters[col][0], value] }));
        const newFilter = { ...windowFilters, [col]: [windowFilters[col][0], value] };
        clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
          dispatch(updateQueryResults({ folder, id: dataset.id, from, to, resampleFreq, selectedMeasures, filter: newFilter }));
        }, 1000);
      }
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 2, pt: 2 }}>
        <Box
          sx={{
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            borderBottom: `2px solid ${grey[600]}`,
            display: 'flex',
            columnGap: 1,
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'block', width: '100%', color: grey[800] }}>
            Available Filters
          </Typography>
          <Tooltip title="Reset Filters" placement="right">
            <IconButton onClick={filterReset}>
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {queryResults &&
          selectedMeasures.map((col, idx) => {
            const stats = queryResults.measureStats[col];
            return (
              <Box
                key={col}
                sx={{
                  width: '80%',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                  // border: `2px solid ${grey[700]}`,
                  // borderRadius: 3,
                  p: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: grey[100],
                }}
              >
                <Box
                  key={`${col}-filter-name`}
                  sx={{
                    border: `2px solid ${grey[600]}`,
                    alignItems: 'end',
                    display: 'flex',
                    width: '20%',
                    textAlign: 'center',
                    borderTopRightRadius: 18,
                    borderBottomRightRadius: 18,
                    p: 1
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, display: 'block', width: '100%' }}>
                    {`${dataset.header[col]}`}
                  </Typography>
                </Box>
                <Box key={`${col}-slider`} sx={{ width: '30%', display: 'flex' }}>
                  <Slider
                    value={!Object.hasOwn(windowFilters, col) ? [stats.min, stats.max] : windowFilters[col]}
                    min={parseFloat(parseFloat(stats.min).toFixed(2))}
                    max={parseFloat(parseFloat(stats.max).toFixed(2))}
                    onChange={onSliderChange(col)}
                    onChangeCommitted={handleFilterSlider(col)}
                    valueLabelDisplay="auto"
                    sx={{
                      '& .MuiSlider-thumb': { backgroundColor: grey[700] },
                      '& .MuiSlider-track': { backgroundColor: grey[500], borderColor: grey[500] },
                      '& .MuiSlider-rail': { backgroundColor: grey[500] },
                    }}
                  />
                </Box>
                <Box sx={{ width: '30%', display: 'flex', columnGap: 1 }}>
                  <TextField
                    id="outlined-basic"
                    label="Min-Value"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={!Object.hasOwn(windowFilters, col) ? getParsedValue(stats.min) : getParsedValue(windowFilters[col][0])}
                    onChange={handleTextFields(col, 'min')}
                    error={textError.min}
                  />
                  <Typography gutterBottom variant="subtitle1" sx={{ fontWeight: 900, display: 'block', alignSelf: 'end' }}>
                    -
                  </Typography>
                  <TextField
                    id="outlined-basic"
                    label="Max-Value"
                    variant="outlined"
                    type="number"
                    size="small"
                    value={!Object.hasOwn(windowFilters, col) ? getParsedValue(stats.max) : getParsedValue(windowFilters[col][1])}
                    onChange={handleTextFields(col, 'max')}
                    error={textError.max}
                  />
                </Box>
              </Box>
            );
          })}
      </Box>
    </>
  );
};

export default Filter;
