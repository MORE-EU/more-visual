import {Box} from '@mui/material';
import {IDataset} from 'app/shared/model/dataset.model';
import {IPatterns} from 'app/shared/model/patterns.model';
import {IChangePointDate} from 'app/shared/model/changepoint-date.model';
import React from 'react';
import {updateChangeChart, updateChangePointDates, updateGraphZoom, updateQueryResults} from '../visualizer.reducer';
import Chart from './chart';
import {ChartControl} from './chart-control';


export interface IChartContainerProps {
  dataset: IDataset;
  wdFiles: any[];
  data: any;
  updateQueryResults: typeof updateQueryResults;
  selectedMeasures: number[];
  from: Date;
  to: Date;
  resampleFreq: string;
  patterns: IPatterns;
  changeChart: boolean;
  folder: string;
  graphZoom: number;
  changePointDates: IChangePointDate[];
  updateChangePointDates: typeof updateChangePointDates;

  updateChangeChart: typeof updateChangeChart;
  updateGraphZoom: typeof updateGraphZoom;
}

export const ChartContainer = (props: IChartContainerProps) => {
  const {dataset, data, selectedMeasures, from, to, wdFiles, changeChart, folder, graphZoom, changePointDates} = props;

  return (
    <Box sx={{display:'flex',flexDirection:"column"}} >
        <ChartControl updateChangeChart={props.updateChangeChart} changeChart={changeChart}
                      updateGraphZoom={props.updateGraphZoom} from={from} to={to} wdFiles={wdFiles} data={data}
                      changePointDates={changePointDates} updateChangePointDates={props.updateChangePointDates}/>
        <Chart
          dataset={dataset}
          data={data}
          selectedMeasures={selectedMeasures}
          updateQueryResults={props.updateQueryResults}
          from={from}
          to={to}
          resampleFreq={props.resampleFreq}
          patterns={props.patterns}
          changeChart={changeChart}
          folder={folder}
          graphZoom={graphZoom}
        />
    </Box>
  );
};
