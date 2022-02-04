import React from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Typography} from "@mui/material";
import {IPatterns} from "app/shared/model/patterns.model";
import {getPatterns, updatePatterns, updateSelectedMeasures} from '../../visualizer.reducer';
import VisPatterns from "app/modules/visualizer/tools/pattern-extraction/vis-patterns";


export interface IPatternExtractionProps {
  dataset: IDataset,
  data: any,
  selectedMeasures: number[],
  resampleFreq: string,
  patterns: IPatterns,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  updatePatterns: typeof updatePatterns,
  getPatterns: typeof getPatterns,
}


export const PatternExtraction = (props: IPatternExtractionProps) => {
  const {dataset, data, selectedMeasures, patterns} = props;

  return (
    <Box sx={{pl: 2}}>
      <Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Pattern Extraction
          </Typography>

        </Box>
      </Box>
      {<VisPatterns dataset={dataset} data={data}
                    resampleFreq={props.resampleFreq} selectedMeasures={selectedMeasures}
                    patterns={patterns} updateSelectedMeasures={props.updateSelectedMeasures}
                    updatePatterns={props.updatePatterns} getPatterns={props.getPatterns}/>}

    </Box>);

};


export default PatternExtraction;
