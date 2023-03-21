import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import {setChartType} from "app/modules/store/homeSlice";


export const ChartType = () => {
  const { chartType } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  return (
    <>
      <ToggleButtonGroup value={chartType} exclusive onChange={(e, newVal) => dispatch(setChartType(newVal))} aria-label="text alignment">
        <ToggleButton value="line" aria-label="left aligned">
          <ShowChartIcon />
        </ToggleButton>
        <ToggleButton value="boxplot" aria-label="centered">
          <CandlestickChartIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
