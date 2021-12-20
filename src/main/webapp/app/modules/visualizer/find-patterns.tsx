import React, {useEffect} from 'react';
import Highcharts from 'highcharts/highstock'
import {IDataset} from "app/shared/model/dataset.model";
import {updateQueryResults, updatePatternLength,
  updatePatterns, updateTopPatterns, updateSelectedPattern} from './visualizer.reducer';
import { Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { IPatternGroup } from 'app/shared/model/pattern-group.model';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import Chart from './chart';

Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

export interface IFindPatternsProps {
  data: any,
  selectedMeasures: number[],
  updatePatterns: typeof updatePatterns,
}



export const FindPatterns = (props: IFindPatternsProps) => {
  const {data, selectedMeasures} = props;
  const [patternLength, setPatternLength] = React.useState(10);
  const [topPatterns, setTopPatterns] = React.useState(1);
  const  findPatterns = (e) => {
    let pattern1 = {start: new Date(data[500][0]), end: new Date(data[500 + patternLength][0])};
    let pattern2 = {start: new Date(data[4000][0]), end: new Date(data[4000 + patternLength][0])};

    let patternGroup =  {patterns: []};
    patternGroup.patterns.push(pattern1);
    patternGroup.patterns.push(pattern2);
    const patterns = [];
    patterns.push(patternGroup);

    pattern1 = {start: new Date(data[2000][0]), end: new Date(data[2000 + patternLength][0])};
    pattern2 = {start: new Date(data[3000][0]), end: new Date(data[3000 + patternLength][0])};

    patternGroup =  {patterns: []};
    patternGroup.patterns.push(pattern1);
    patternGroup.patterns.push(pattern2);
    patterns.push(patternGroup);
    props.updatePatterns(patterns);
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
    <Grid container  >

      <Grid spacing={4} item container xs={12} >
        <Grid item xs={6}>
        <TextField
          fullWidth
          value = {patternLength}
          onChange={changePatternLength}
          label={"Pattern Length"}
          type="number"
        />
        </Grid>
        <Grid item xs={3}  >
        <FormControl  fullWidth>
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
      <Grid item xs = {3}>
        <Button onClick={e => findPatterns(e)} variant="contained">Find Patterns</Button>
      </Grid>
      </Grid>

    </Grid>
)};


export default FindPatterns;
