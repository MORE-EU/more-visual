import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PatternExtraction from "app/modules/visualizer/tools/pattern-extraction/pattern-extraction";
import {IDataset} from "app/shared/model/dataset.model";
import {IPatterns} from "app/shared/model/patterns.model";
import {
  applyCpDetection,
  enableCpDetection,
  filterData,
  getPatterns,
  updateActiveTool,
  updateFilters,
  updatePatterns,
  updateSelectedMeasures
} from '../visualizer.reducer';
import ChangepointDetection from "app/modules/visualizer/tools/changepoint-detection/changepoint-detection";
import DeviationDetection from "app/modules/visualizer/tools/deviation-detection/deviation-detection";
import {IQueryResults} from "app/shared/model/query-results.model";
import Filter from "app/modules/visualizer/tools/filter/filter";

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
  applyCpDetection: typeof applyCpDetection,
  cpDetectionEnabled: boolean,
  enableCpDetection: typeof enableCpDetection,
}

const ActiveTool = (props: IActiveToolProps) => {
  const {
    activeTool, dataset, data, from, to, selectedMeasures, patterns,
    resampleFreq, customChangePoints,
    filters, queryResults, cpDetectionEnabled,
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
            <DeviationDetection
              dataset={dataset}
              customChangePoints={customChangePoints} data={data}
            />
          }
          {activeTool === 2 &&
            <ChangepointDetection
              dataset={dataset}
              from={from}
              to={to}
              applyCpDetection={props.applyCpDetection}
              customChangePoints={customChangePoints}
              data={data}
              enableCpDetection={props.enableCpDetection}
              cpDetectionEnabled={cpDetectionEnabled}
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
