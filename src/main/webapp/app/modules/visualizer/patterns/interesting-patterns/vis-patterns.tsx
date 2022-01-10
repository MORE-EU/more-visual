import React, {useEffect} from 'react';
import Highcharts from 'highcharts/highstock'
import {IDataset} from "app/shared/model/dataset.model";
import {
  updateQueryResults,
  updateComputedPatternLength,
  updateSelectedPattern,
  updatePatterns, getPatterns,
} from '../../visualizer.reducer';
import { Button, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { IPatternGroup } from 'app/shared/model/pattern-group.model';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import Chart from '../../chart';
import VisCorrection from "app/modules/visualizer/vis-correction";
import {IPatterns} from "app/shared/model/patterns.model";

Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

export interface IVisPatternsProps {
  dataset: IDataset,
  data: any,
  selectedMeasures: number[],
  patternLength: number,
  resampleFreq: string,
  selectedPattern: number,
  computedPatternLength: number,
  updateComputedPatternLength: typeof updateComputedPatternLength,
  updateSelectedPattern: typeof  updateSelectedPattern,
  updatePatterns: typeof updatePatterns,
  getPatterns: typeof  getPatterns,
  patterns: IPatterns,
  changeChart: boolean,
  folder: string,
}



export const VisPatterns = (props: IVisPatternsProps) => {
  const {dataset, data, selectedMeasures,
    computedPatternLength, patterns, resampleFreq,
    selectedPattern, changeChart, folder} = props;


  const changeComputedPatternLength = (e) => {
    const val = parseInt(e.target.value, 10);
    // TODO: Change to real data
    props.updateComputedPatternLength(isNaN(val) ? 0 : val);
    props.getPatterns(data, val, resampleFreq);
    props.updateSelectedPattern(1);
  }

  const clearPatterns = (e) => {
    // TODO: Change to real data
    props.updateComputedPatternLength(null);
    props.updatePatterns(null);
  }

  const changeSelectedPattern = (e) => {
    // TODO: Change to real data
    const val = parseInt(e.target.value, 10);
    props.updateSelectedPattern(isNaN(val) ? 0 : val);

  }
  return (
    <Grid item container xs={12} spacing = {4}>
      <Grid item xs = {6}>
        <FormControl  fullWidth>
          <InputLabel id="computed-pattern-length-label">Pattern Length</InputLabel>
          <Select
            labelId="computed-pattern-length-select-label;"
            id="computed-pattern-length-select"
            value={computedPatternLength}
            label="Pattern Length"
            onChange={changeComputedPatternLength}
          >
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={90}>90</MenuItem>
            <MenuItem value={180}>180</MenuItem>
            <MenuItem value={240}>240</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {patterns !== null &&
        <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel id="patterns-label">View Pattern</InputLabel>
          <Select
            labelId="pattern-select-label"
            id="pattern-select"
            value={selectedPattern}
            label="View Pattern"
            onChange={changeSelectedPattern}
          >
            {patterns.patternGroups.map((mGroup, i)=> {
              return <MenuItem
                key={i}
                value={i + 1} >{i + 1}</MenuItem>
            })}
          </Select>
        </FormControl>
      </Grid>}
      {(patterns && selectedPattern  && computedPatternLength)
        &&
      <Grid item xs = {3}>
        <Button onClick={e => clearPatterns(e)} variant="contained">Clear Patterns</Button>
      </Grid>
      }
      {(patterns && selectedPattern && computedPatternLength)
        &&
        <Grid item xs={12}>
            <Chart dataset={dataset} data={data}
                   from={patterns.patternGroups[selectedPattern - 1].patterns[0].start}
                   to={patterns.patternGroups[selectedPattern - 1].patterns[0].end} patterns={null}
                   resampleFreq={resampleFreq} selectedMeasures={selectedMeasures}
                   updateQueryResults={updateQueryResults} changeChart={changeChart}
                   folder = {folder}/>
            {selectedMeasures.length > 1 &&
            <VisCorrection patterns={patterns} dataset={dataset} />}
        </Grid>
      }
    </Grid>
  )};


export default VisPatterns;
