import {Box} from '@mui/material';
import {IDataset} from 'app/shared/model/dataset.model';
import {IPatterns} from 'app/shared/model/patterns.model';
import {IChangePointDate} from 'app/shared/model/changepoint-date.model';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {updateActiveTool, updateChangeChart, updateChangePointDates, updateGraphZoom, updateQueryResults, updateCompare, updateCompareQueryResults} from '../visualizer.reducer';
import Chart from './chart';
import {ChartControl} from './chart-control';
import { IDataPoint } from 'app/shared/model/data-point.model';


export interface IChartContainerProps {
  dataset: IDataset;
  wdFiles: any[];
  data: IDataPoint[];
  compareData: any[];
  selectedMeasures: number[];
  from: Date;
  to: Date;
  filters: any,
  resampleFreq: string;
  patterns: IPatterns;
  changeChart: boolean;
  folder: string;
  graphZoom: number;
  changePointDates: IChangePointDate[];
  compare: string;
  updateCompare: typeof updateCompare;
  updateQueryResults: typeof updateQueryResults;
  updateChangePointDates: typeof updateChangePointDates;
  updateChangeChart: typeof updateChangeChart;
  updateGraphZoom: typeof updateGraphZoom;
  updateActiveTool: typeof updateActiveTool;
  updateCompareQueryResults: typeof updateCompareQueryResults;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ChartContainer = (props: IChartContainerProps) => {
  const {dataset, data, selectedMeasures, from, to, filters,
    wdFiles, changeChart, folder, graphZoom, changePointDates,
    compare, compareData} = props;

  const [showDatePick, setShowDatePick] = useState(false);
  const [showChangePointFunction, setShowChangePointFunction] = useState(false);
  const [showCompare, setCompare] = useState(false);

  return (
    <Box sx={{display:'flex',flexDirection:"column"}} >
        <ChartControl updateChangeChart={props.updateChangeChart} changeChart={changeChart} selectedMeasures={selectedMeasures}
                      updateGraphZoom={props.updateGraphZoom} from={from} to={to} wdFiles={wdFiles} data={data}
                      changePointDates={changePointDates} updateChangePointDates={props.updateChangePointDates} setOpen={props.setOpen}
                      updateActiveTool={props.updateActiveTool} compare={compare} updateCompare={props.updateCompare} setShowDatePick={setShowDatePick}
                      setCompare={setCompare} showDatePick={showDatePick} showCompare={showCompare} showChangePointFunction={showChangePointFunction}
                      setShowChangePointFunction={setShowChangePointFunction} updateCompareQueryResults={props.updateCompareQueryResults} folder={folder}/>
        <Chart
          dataset={dataset}
          data={data}
          compareData={compareData}
          selectedMeasures={selectedMeasures}
          updateQueryResults={props.updateQueryResults}
          from={from}
          to={to}
          filters={filters}
          resampleFreq={props.resampleFreq}
          patterns={props.patterns}
          changeChart={changeChart}
          folder={folder}
          graphZoom={graphZoom}
          compare={compare}
          changePointDates={changePointDates}
          updateChangePointDates={props.updateChangePointDates}
          updateActiveTool={props.updateActiveTool}
          setCompare={setCompare}
          setShowDatePick={setShowDatePick}
          setShowChangePointFunction={setShowChangePointFunction}
        />
    </Box>
  );
}
