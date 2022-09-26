import React from 'react';
import Highcharts from 'highcharts/highstock';
import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import { updatePatterns } from 'app/modules/store/visualizerSlice';

Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

export const FindPatterns = () => {
  const [patternLength, setPatternLength] = React.useState(10);
  const [topPatterns, setTopPatterns] = React.useState(1);

  const {data} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const findPatterns = (e) => {
    let pattern1 = {start: new Date(data[500][0]), end: new Date(data[500 + patternLength][0])};
    let pattern2 = {start: new Date(data[4000][0]), end: new Date(data[4000 + patternLength][0])};

    let patternGroup = {patterns: []};
    patternGroup.patterns.push(pattern1);
    patternGroup.patterns.push(pattern2);
    const patterns = [];
    patterns.push(patternGroup);

    pattern1 = {start: new Date(data[2000][0]), end: new Date(data[2000 + patternLength][0])};
    pattern2 = {start: new Date(data[3000][0]), end: new Date(data[3000 + patternLength][0])};

    patternGroup = {patterns: []};
    patternGroup.patterns.push(pattern1);
    patternGroup.patterns.push(pattern2);
    patterns.push(patternGroup);
    dispatch(updatePatterns(patterns));
  }

  const changePatternLength = (e) => {
    const val = parseInt(e.target.value, 10);
    setPatternLength(val);
  }

  const changeTopPatterns = (e) => {
    const val = parseInt(e.target.value, 10);
    setTopPatterns(val);
  }

  return (
    <Grid container>

      <Grid spacing={4} item container xs={12}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            value={patternLength}
            onChange={changePatternLength}
            label={"Pattern Length"}
            type="number"
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <InputLabel id="no-of-patterns-label">No. of Top Patterns</InputLabel>
            <Select
              labelId="no-of-patterns-select-label;"
              id="no-of-patterns-select"
              value={topPatterns}
              label="No. of Top Patterns"
              onChange={changeTopPatterns}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={e => findPatterns(e)} variant="contained">Find Patterns</Button>
        </Grid>
      </Grid>

    </Grid>
  )
};


export default FindPatterns;
