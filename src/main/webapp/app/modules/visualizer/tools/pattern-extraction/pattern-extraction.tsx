import React from 'react';
import VisPatterns from "app/modules/visualizer/tools/pattern-extraction/vis-patterns";
import Box from '@mui/material/Box';
import {useAppSelector} from "app/modules/store/storeConfig";

export const PatternExtraction = () => {
  const { dataset, folder, from, to, selectedMeasures,
    filter, customSelectedMeasures } = useAppSelector(state => state.visualizer);


  return (
    <Box sx={{height: "100%", width: "80%", m: "auto", pt: 5}}>
      {<VisPatterns />}
    </Box>);

};


export default PatternExtraction;
