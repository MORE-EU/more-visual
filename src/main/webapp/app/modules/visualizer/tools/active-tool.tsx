import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PatternExtraction from "app/modules/visualizer/tools/pattern-extraction/pattern-extraction";
import Filter from "app/modules/visualizer/tools/filter/filter";
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateActiveTool } from 'app/modules/store/visualizerSlice';
import SoilingDetection from "app/modules/visualizer/tools/soiling-detection/soiling-detection";
import Forecasting from "app/modules/visualizer/tools/forecasting/forecasting";
import {YawMisalignment} from "app/modules/visualizer/tools/yaw-misalignment/yaw-misalignment";

const ActiveTool = () => {

  const {activeTool} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const goBack = () => {
    dispatch(updateActiveTool(null));
  }
  return (
    <Box>
      {activeTool !== -1 &&
        <Box>
          {activeTool === 0 && <PatternExtraction />}
          {activeTool === 1 && <SoilingDetection />}
          {activeTool === 2 && <YawMisalignment />}
          {activeTool === 3 && <Forecasting />}
          {activeTool === 4 && <Filter />}
        </Box>
      }
    </Box>
  );
}


export default ActiveTool;
