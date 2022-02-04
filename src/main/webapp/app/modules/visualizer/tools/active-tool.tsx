import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PatternExtraction from "app/modules/visualizer/tools/pattern-extraction/pattern-extraction";
import {IDataset} from "app/shared/model/dataset.model";
import {IPatterns} from "app/shared/model/patterns.model";
import {getPatterns, updatePatterns, updateSelectedMeasures} from '../visualizer.reducer';

export interface IActiveToolProps {
  activeTool: number,
  setActiveTool: Dispatch<SetStateAction<number>>,
  dataset: IDataset,
  data: any,
  selectedMeasures: number[],
  resampleFreq: string,
  patterns: IPatterns,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  updatePatterns: typeof updatePatterns,
  getPatterns: typeof getPatterns,
}

const ActiveTool = (props: IActiveToolProps) => {
  const {
    activeTool, dataset, data, selectedMeasures, patterns,
    resampleFreq
  } = props;

  const goBack = () => {
    props.setActiveTool(-1);
  }
  return (
    <Box>
      {activeTool !== -1 &&
        <Box>
          <IconButton onClick={() => goBack()}>
            <ArrowBackIosIcon/>
          </IconButton>
          {activeTool === 0 &&
            <PatternExtraction
              dataset={dataset} data={data} selectedMeasures={selectedMeasures}
              resampleFreq={resampleFreq} patterns={patterns}
              updateSelectedMeasures={props.updateSelectedMeasures} updatePatterns={props.updatePatterns}
              getPatterns={props.getPatterns}
            />}
        </Box>
      }
    </Box>
  );
}


export default ActiveTool;
