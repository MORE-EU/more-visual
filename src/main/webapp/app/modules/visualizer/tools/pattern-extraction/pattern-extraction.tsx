import React from 'react';
import {Box, Typography} from "@mui/material";
import VisPatterns from "app/modules/visualizer/tools/pattern-extraction/vis-patterns";

export const PatternExtraction = () => {

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            Pattern Extraction
          </Typography>

        </Box>
      </Box>
      {<VisPatterns />}

    </Box>);

};


export default PatternExtraction;
