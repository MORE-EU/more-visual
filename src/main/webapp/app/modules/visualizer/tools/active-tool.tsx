import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Dispatch, SetStateAction} from "react";
import PatternExtraction from "app/modules/visualizer/tools/pattern-extraction/pattern-extraction";
import {IDataset} from "app/shared/model/dataset.model";
import {IPatterns} from "app/shared/model/patterns.model";
import {  updateSelectedMeasures, updateQueryResults, updatePatternLength, updateComputedPatternLength, updatePatterns, updateSelectedPattern, getPatterns } from '../visualizer.reducer';

export interface IActiveToolProps {
  activeTool: number,
  setActiveTool:  Dispatch<SetStateAction<number>>,
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

const ActiveTool = (props: IActiveToolProps) => {
  const {activeTool, dataset, data, selectedMeasures, patternLength, patterns,
    topPatterns, computedPatternLength, selectedPattern, resampleFreq, folder} = props;

  const goBack = () => {
    props.setActiveTool(-1);
  }
  return (
    <Box>
      {activeTool !== -1 &&
        <Box>
          <IconButton onClick = {() => goBack()}>
            <ArrowBackIosIcon/>
          </IconButton>
          {activeTool === 0 &&
            <PatternExtraction
              dataset={dataset} data={data} selectedMeasures={selectedMeasures} patternLength={patternLength}
              computedPatternLength={computedPatternLength} resampleFreq={resampleFreq} patterns={patterns} topPatterns={topPatterns}
              selectedPattern={selectedPattern} updateQueryResults={props.updateQueryResults} updatePatternLength={props.updatePatternLength}
              updateComputedPatternLength={props.updateComputedPatternLength}  updateSelectedMeasures={props.updateSelectedMeasures}
              updatePatterns={props.updatePatterns} updateSelectedPattern={props.updateSelectedPattern} getPatterns={props.getPatterns}
              changeChart={props.changeChart} folder={folder}/>}
        </Box>
      }
    </Box>
  );
}


export default ActiveTool;
