import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PatternExtraction from "app/modules/visualizer/tools/pattern-extraction/pattern-extraction";
import ChangepointDetection from "app/modules/visualizer/tools/changepoint-detection/changepoint-detection";
import DeviationDetection from "app/modules/visualizer/tools/deviation-detection/deviation-detection";
import Filter from "app/modules/visualizer/tools/filter/filter";
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateActiveTool } from 'app/modules/store/visualizerSlice';

const ActiveTool = () => {

  const {activeTool} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const goBack = () => {
    dispatch(updateActiveTool(-1));
  }
  return (
    <Box>
      {activeTool !== -1 &&
        <Box>
          <IconButton onClick={() => goBack()}>
            <ArrowBackIosIcon/>
          </IconButton>
          {activeTool === 0 && <PatternExtraction />}
          {activeTool === 1 && <DeviationDetection />}
          {activeTool === 2 && <ChangepointDetection />}
          {activeTool === 4 && <Filter />}
        </Box>
      }
    </Box>
  );
}


export default ActiveTool;
