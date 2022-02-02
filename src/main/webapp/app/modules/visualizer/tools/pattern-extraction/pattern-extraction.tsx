import React from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {IPatterns} from "app/shared/model/patterns.model";
import {updateQueryResults, updatePatternLength,
  updatePatterns, updateSelectedMeasures, updateSelectedPattern,
  updateComputedPatternLength, getPatterns} from '../../visualizer.reducer';
import FindPatterns from "app/modules/visualizer/tools/pattern-extraction/find-patterns";
import Chart from "app/modules/visualizer/chart/chart";
import VisPatterns from "app/modules/visualizer/tools/pattern-extraction/vis-patterns";


export interface IPatternExtractionProps {
  dataset: IDataset,
  data: any,
  selectedMeasures: number[],
  patternLength: number,
  computedPatternLength: number,
  resampleFreq: string,
  patterns: IPatterns,
  topPatterns: number,
  selectedPattern: number,
  updateQueryResults: typeof updateQueryResults,
  updatePatternLength: typeof updatePatternLength,
  updateComputedPatternLength: typeof updateComputedPatternLength,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  updatePatterns: typeof updatePatterns,
  updateSelectedPattern: typeof updateSelectedPattern,
  getPatterns: typeof getPatterns,
  changeChart: boolean,
  folder: string,
}


export const PatternExtraction = (props: IPatternExtractionProps) => {
  const {dataset, data, selectedMeasures,
    patternLength, patterns, computedPatternLength,
    changeChart, folder} = props;

  return (
  <Grid container spacing={3}>
    <Grid item container xs={12}>
      <Grid item xs = {4}>
      <Typography variant="h6" gutterBottom>
        Discovered Patterns
      </Typography>
      </Grid>
    </Grid>
    {<VisPatterns dataset={dataset} data={data} selectedMeasures={selectedMeasures}
                                     patternLength={patternLength}  resampleFreq={props.resampleFreq}
                                     patterns={patterns} computedPatternLength = {computedPatternLength}
                                     updateComputedPatternLength = {props.updateComputedPatternLength}
                                     updateSelectedMeasures = {props.updateSelectedMeasures}
                                     selectedPattern ={props.selectedPattern}  updateSelectedPattern={props.updateSelectedPattern}
                                     updatePatterns={props.updatePatterns} getPatterns={props.getPatterns} changeChart={changeChart}
                  folder={folder}/>}
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Find New Patterns
      </Typography>
      <FindPatterns data={data} selectedMeasures={selectedMeasures} updatePatterns={props.updatePatterns}
                   />
    </Grid>


  </Grid>);

};


export default PatternExtraction;
