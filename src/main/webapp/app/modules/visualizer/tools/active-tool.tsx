import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PatternExtraction from "app/modules/visualizer/tools/pattern-extraction/pattern-extraction";
import {IDataset} from "app/shared/model/dataset.model";
import {IPatterns} from "app/shared/model/patterns.model";
import {
  applyChangepointDetection,
  enableChangepointDetection,
  enableForecasting,
  filterData,
  getPatterns,
  updateActiveTool,
  updateFilters,
  updatePatterns,
  updateSelectedMeasures,
  enableManualChangepoints,
  enableSoilingDetection,
  applyForecasting,
  applyDeviationDetection, getManualChangePoints,
} from '../visualizer.reducer';
import ChangepointDetection, {SoilingDetection} from "app/modules/visualizer/tools/soiling-detection/soiling-detection";
import Forecasting from "app/modules/visualizer/tools/forecasting/forecasting";
import {IQueryResults} from "app/shared/model/query-results.model";
import Filter from "app/modules/visualizer/tools/filter/filter";
import {IChangePointDate} from "app/shared/model/changepoint-date.model";

export interface IActiveToolProps {
  activeTool: number,
  dataset: IDataset,
  data: any,
  from: number,
  to: number,
  selectedMeasures: number[],
  resampleFreq: string,
  patterns: IPatterns,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  updatePatterns: typeof updatePatterns,
  getPatterns: typeof getPatterns,
  updateActiveTool: typeof updateActiveTool,
  customChangePoints: any,
  filters: any,
  queryResults: IQueryResults,
  updateFilters: typeof updateFilters,
  filterData: typeof filterData,
  applyChangepointDetection: typeof applyChangepointDetection,
  changepointDetectionEnabled: boolean,
  enableChangepointDetection: typeof enableChangepointDetection,
  enableManualChangepoints: typeof enableManualChangepoints,
  manualChangepointsEnabled:boolean,
  enableForecasting:typeof enableForecasting,
  applyForecasting: typeof applyForecasting,
  forecasting:boolean,
  forecastData: any,
  enableSoilingDetection: typeof enableSoilingDetection,
  applyDeviationDetection: typeof applyDeviationDetection,
  getManualChangePoints: typeof getManualChangePoints,
  manualChangePoints: IChangePointDate[],
  detectedChangePoints: IChangePointDate[],
}

const ActiveTool = (props: IActiveToolProps) => {
  const {
    activeTool, dataset, data, from, to, selectedMeasures, patterns,
    resampleFreq, customChangePoints, filters, queryResults,
    changepointDetectionEnabled, manualChangepointsEnabled, forecasting,
    forecastData, manualChangePoints, detectedChangePoints,
  } = props;

  const goBack = () => {
    props.updateActiveTool(-1);
  }
  return (
    <Box>
      {activeTool !== -1 &&
        <Box>
          <IconButton onClick={() => goBack()}>
            <ArrowBackIosIcon/>
          </IconButton>
          {activeTool === 0 &&
            <PatternExtraction
              dataset={dataset} data={data} selectedMeasures={selectedMeasures}
              resampleFreq={resampleFreq} patterns={patterns}
              updateSelectedMeasures={props.updateSelectedMeasures} updatePatterns={props.updatePatterns}
              getPatterns={props.getPatterns}
            />}
          {activeTool === 1 &&
            <Forecasting
              dataset={dataset}
              forecasting={forecasting}
              enableForecasting={props.enableForecasting}
              applyForecasting={props.applyForecasting}
              forecastData={forecastData}
            />
          }
          {activeTool === 2 &&
            <SoilingDetection
              dataset={dataset}
              from={from}
              to={to}
              applyChangepointDetection={props.applyChangepointDetection}
              customChangePoints={customChangePoints}
              data={data}
              enableChangepointDetection={props.enableChangepointDetection}
              changepointDetectionEnabled={changepointDetectionEnabled}
              enableManualChangepoints={props.enableManualChangepoints}
              manualChangepointsEnabled={manualChangepointsEnabled}
              updateSelectedMeasures={props.updateSelectedMeasures}
              enableSoilingDetection={props.enableSoilingDetection}
              applyDeviationDetection={props.applyDeviationDetection}
              getManualChangePoints={props.getManualChangePoints}
              manualChangePoints = {manualChangePoints}
              detectedChangePoints={detectedChangePoints}
             />
          }
          {activeTool === 4 &&
            <Filter
              dataset={dataset}
              filters={filters} filterData={props.filterData}
              updateFilters={props.updateFilters} queryResults={queryResults}
            />
          }
        </Box>
      }
    </Box>
  );
}


export default ActiveTool;
