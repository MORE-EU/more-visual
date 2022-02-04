import React from 'react';
import {Box, Typography} from "@mui/material";
import VisCorrection from "app/modules/visualizer/tools/pattern-extraction/vis-correction";
import {IPatterns} from "app/shared/model/patterns.model";
import {IDataset} from "app/shared/model/dataset.model";
import {updateSelectedMeasures} from "app/modules/visualizer/visualizer.reducer";



export interface IPatternsResultsProps {
  patterns: IPatterns,
  dataset: IDataset,
  dimensions: number[],
  updateSelectedMeasures: typeof updateSelectedMeasures,
}

export const PatternResults = (props: IPatternsResultsProps) => {
  const {patterns, dimensions, dataset} = props;
  return (
      <Box>
        <Typography>Found {patterns.patternGroups.length} Patterns</Typography>
        {dimensions.length > 1 &&
          <VisCorrection patterns={patterns} dataset={dataset}
                         updateSelectedMeasures={props.updateSelectedMeasures} />}
      </Box>
  );
}

export default PatternResults;
