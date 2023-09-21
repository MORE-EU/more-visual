import React from 'react';
import {Box, Typography} from "@mui/material";
import VisPatterns from "app/modules/visualizer/tools/pattern-extraction/vis-patterns";

export const PatternExtraction = () => {

  return (
    <Box sx={{height: "100%", width: "80%", m: "auto", pt: 5}}>
      {<VisPatterns />}
    </Box>);

};


export default PatternExtraction;
