import * as React from 'react';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import {Redirect, RouteComponentProps} from 'react-router-dom';
import {IRootState} from "app/shared/reducers";
import {
  filterData,
  getChangePointDates,
  getDataset,
  getPatterns,
  getWdFiles,
  updateChangeChart,
  updateChangePointDates,
  updateDatasetChoice,
  updateFilters,
  updateFrom,
  updatePatternNav,
  updatePatterns,
  updateQueryResults,
  updateResampleFreq,
  updateSelectedMeasures,
  updateTo,
  updateGraphZoom,
} from "app/modules/visualizer/visualizer.reducer";
import {ChartContainer} from './chart/chart-container';
import VisControl from "app/modules/visualizer/vis-control";
import Toolkit from "app/modules/visualizer/tools/toolkit";
import {Divider} from "@mui/material";

const mdTheme = createTheme();

export interface IVisualizerProps extends StateProps, DispatchProps, RouteComponentProps<{ folder: string, id: string }> {
}


export const Visualizer = (props: IVisualizerProps) => {
  const {
    dataset, changeChart, datasetChoice, wdFiles,
    loading, queryResults, data, selectedMeasures,
    resampleFreq, patterns, graphZoom,
  } = props;
  const [open, setOpen] = React.useState(false);

  if (props.match.params.id === undefined) {
    useEffect(() => {
      props.getWdFiles(props.match.params.folder);
    }, [props.match.params.folder]);
    return wdFiles.length !== 0 &&
      <div>
        <Redirect to={`${props.match.params.folder}/${wdFiles[0].substring(0, wdFiles[0].indexOf("."))}`}/>
      </div>;
  }

  useEffect(() => {
    wdFiles.length === 0 && props.getWdFiles(props.match.params.folder);
    props.getDataset(props.match.params.folder, props.match.params.id);
  }, [props.match.params.id !== undefined]);

  return !loading && dataset !== null && <div>
    <ThemeProvider theme={mdTheme}>
      <Toolbar/>
      <Divider/>
      <CssBaseline/>
      <Box
        component="main"
        sx={{
          backgroundColor: "white",
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{flexBasis: "20%"}}>
          <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <VisControl dataset={dataset} selectedMeasures={props.selectedMeasures} queryResults={queryResults}
                        updateSelectedMeasures={props.updateSelectedMeasures} from={props.from} to={props.to}
                        resampleFreq={props.resampleFreq} updateFrom={props.updateFrom} updateTo={props.updateTo}
                        updateResampleFreq={props.updateResampleFreq} updateFilters={props.updateFilters}
                        filterData={props.filterData} filters={props.filters}
                        updateChangeChart={props.updateChangeChart} wdFiles={wdFiles}
                        updateDatasetChoice={props.updateDatasetChoice} datasetChoice={datasetChoice}
                        getDataset={props.getDataset} folder={props.match.params.folder}/>
          </Paper>
        </Box>
        <Box
          sx={{flexBasis: "80%", pl: 2, flexGrow: 1}}>
          <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',

            }}>
              <ChartContainer dataset={dataset} data={data} selectedMeasures={selectedMeasures}
                    updateQueryResults={props.updateQueryResults} from={props.from} to={props.to}
                    resampleFreq={props.resampleFreq} patterns = {props.patterns} changeChart = {changeChart}
                    folder={props.match.params.folder} updateChangeChart = {props.updateChangeChart}
                    graphZoom={graphZoom} updateGraphZoom={props.updateGraphZoom} wdFiles={wdFiles}/>
            </Paper>
          </Box >
          <Toolkit
          open={open}
          setOpen={setOpen} dataset={dataset}
           data={data} selectedMeasures={selectedMeasures}
            resampleFreq={resampleFreq} patterns={patterns} 
            updateSelectedMeasures={props.updateSelectedMeasures} 
            updatePatterns={props.updatePatterns} getPatterns={props.getPatterns}         
               />
      </Box>
    </ThemeProvider>
  </div>;
};

const mapStateToProps = ({visualizer}: IRootState) => ({
  loading: visualizer.loading,
  dataset: visualizer.dataset,
  queryResults: visualizer.queryResults,
  data: visualizer.data,
  selectedMeasures: visualizer.selectedMeasures,
  from: visualizer.from,
  to: visualizer.to,
  resampleFreq: visualizer.resampleFreq,
  filters: visualizer.filters,
  patterns: visualizer.patterns,
  changeChart: visualizer.changeChart,
  datasetChoice: visualizer.datasetChoice,
  wdFiles: visualizer.wdFiles,
  patternNav: visualizer.patternNav,
  folder: visualizer.folder,
  changePointDates: visualizer.changePointDates,
  graphZoom: visualizer.graphZoom,
});

const mapDispatchToProps = {
  getDataset, updateQueryResults,
  updateSelectedMeasures, updateFrom, updateTo,
  updateResampleFreq, updateFilters, filterData,
  updatePatterns, getPatterns, updateChangeChart, updateDatasetChoice,
  getWdFiles, updatePatternNav, updateChangePointDates, getChangePointDates,
  updateGraphZoom,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
