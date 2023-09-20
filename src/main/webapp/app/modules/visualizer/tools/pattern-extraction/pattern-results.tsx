import React from 'react';
import VisCorrection from "app/modules/visualizer/tools/pattern-extraction/vis-correction";
import Box from '@mui/material/Box';

export const PatternResults = (props) => {
  return (
    <Box>
      {/* <Typography>Found {patterns.patternGroups.length} Patterns</Typography> */}
      {props.dimensions.length > 1 && <VisCorrection />}
    </Box>
  );
}

export default PatternResults;
