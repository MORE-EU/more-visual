import { Grid } from '@mui/material';
import { IDataset } from 'app/shared/model/dataset.model';
import { IPatterns } from 'app/shared/model/patterns.model';
import React, { useEffect } from 'react';
import { updateChangeChart, updateGraphZoom, updateQueryResults } from '../visualizer.reducer';
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
  updateChangeChart: typeof updateChangeChart;
  updateGraphZoom: typeof updateGraphZoom;
}

export const ChartContainer = (props: IChartContainerProps) => {
  const { dataset, data, selectedMeasures, from, to, wdFiles, changeChart, folder, graphZoom } = props;

  return (
    <Grid container flexDirection="column">
      <Grid item sx={{mb: 1}}>
      <ChartControl updateChangeChart={props.updateChangeChart} changeChart={changeChart} 
        updateGraphZoom={props.updateGraphZoom} from={from} to={to} wdFiles={wdFiles}/>
      </Grid>
      <Grid item>
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
      </Grid>
    </Grid>
  );
};
