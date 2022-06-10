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
  applyCpDetection,
  enableCpDetection,
  filterData,
  getChangePointDates,
  getDataset,
  getPatterns,
  getWdFiles,
  updateActiveTool,
  updateChangeChart,
  updateCompare,
  updateCompareQueryResults,
  updateCustomChangePoints,
  updateDatasetChoice,
  updateFilters,
  updateFrom,
  updateGraphZoom,
  updatePatternNav,
  updatePatterns,
  updateQueryResults,
  updateResampleFreq,
  updateSelectedMeasures,
  updateTo,
  updateChartRef,
} from "app/modules/visualizer/visualizer.reducer";
import {ChartContainer} from './chart/chart-container';
import VisControl from "app/modules/visualizer/vis-control";
import Toolkit from "app/modules/visualizer/tools/toolkit";
import HomeIcon from '@mui/icons-material/Home';
import {Breadcrumbs, Divider, Link, Typography} from "@mui/material";

const mdTheme = createTheme();

export interface IVisualizerProps extends StateProps, DispatchProps, RouteComponentProps<{ folder: string, id: string }> {
}


export const Visualizer = (props: IVisualizerProps) => {
  const {
    dataset, changeChart, datasetChoice, wdFiles,
    loading, queryResults, data, selectedMeasures,
    resampleFreq, patterns, graphZoom, customChangePoints,
    detectedChangePoints, activeTool, compare, filters, compareData,
    queryResultsLoading, from, to, cpDetectionEnabled, chartRef,
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

  useEffect(() => {
    wdFiles.length !== 0 && props.updateDatasetChoice(wdFiles.indexOf(props.match.params.id + ".csv"));
  }, [wdFiles])

  return !loading && dataset !== null && <div>
    <ThemeProvider theme={mdTheme}>
      <Toolbar>
        <Box sx={{
          alignItems: 'center', display: 'flex',
          flexDirection: 'row'
        }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              sx={{display: 'flex', alignItems: 'center'}}
              color="inherit"
              href="/"
            >
              <HomeIcon sx={{mr: 0.5}} fontSize="inherit"/>
              Home
            </Link>
            <Link
              underline="hover"
              sx={{display: 'flex', alignItems: 'center'}}
              color="inherit"
            >

              {dataset.farmName}
            </Link>
            <Typography
              sx={{display: 'flex', alignItems: 'center'}}
              color="text.primary"
            >

              {dataset.formalName}
            </Typography>
          </Breadcrumbs>
        </Box>
      </Toolbar>
      <Divider/>
      <CssBaseline/>
      <Box
        component="main"
        sx={{
          backgroundColor: "white",
          display: 'flex',
          flexDirection: 'row',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{flexBasis: "20%"}}>
          <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <VisControl dataset={dataset} selectedMeasures={props.selectedMeasures} queryResults={queryResults}
                        updateSelectedMeasures={props.updateSelectedMeasures} from={props.from} to={props.to}
                        resampleFreq={props.resampleFreq} updateFrom={props.updateFrom} updateTo={props.updateTo}
                        updateResampleFreq={props.updateResampleFreq} updateQueryResults={props.updateQueryResults}
                        updateChangeChart={props.updateChangeChart} wdFiles={wdFiles}
                        updateDatasetChoice={props.updateDatasetChoice} datasetChoice={datasetChoice}
                        getDataset={props.getDataset} folder={props.match.params.folder} compare={compare}/>
          </Paper>
        </Box>
        <Box
          sx={{maxWidth: open ? "70%" : "80%", pl: 2, flexGrow: 1}}>
          <Paper sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',

          }}>
            <ChartContainer dataset={dataset} data={data} selectedMeasures={selectedMeasures} filters={filters}
                            updateQueryResults={props.updateQueryResults} from={from} to={to}
                            resampleFreq={resampleFreq} updateResampleFreq ={props.updateResampleFreq} patterns={patterns} changeChart={changeChart}
                            folder={props.match.params.folder} updateChangeChart={props.updateChangeChart}
                            graphZoom={graphZoom} updateGraphZoom={props.updateGraphZoom} wdFiles={wdFiles}
                            customChangePoints={customChangePoints} cpDetectionEnabled={cpDetectionEnabled}
                            detectedChangePoints = {detectedChangePoints} updateCustomChangePoints={props.updateCustomChangePoints}
                            setOpen={setOpen} updateActiveTool={props.updateActiveTool} compare={compare}
                            updateCompare={props.updateCompare} chartRef={chartRef} updateChartRef={props.updateChartRef}
                            compareData={compareData} updateCompareQueryResults={props.updateCompareQueryResults}
                            updateFrom={props.updateFrom} updateTo={props.updateTo} queryResults={queryResults}
                            loading={loading} queryResultsLoading={queryResultsLoading}/>
          </Paper>
        </Box>
        <Toolkit
          open={open} from={from} to={to}
          setOpen={setOpen} dataset={dataset}
          data={data} selectedMeasures={selectedMeasures}
          resampleFreq={resampleFreq} patterns={patterns}
          filters={filters} filterData={props.filterData}
          updateFilters={props.updateFilters} queryResults={queryResults}
          updateSelectedMeasures={props.updateSelectedMeasures}
          updatePatterns={props.updatePatterns} getPatterns={props.getPatterns}
          customChangePoints={customChangePoints} activeTool={activeTool} updateActiveTool={props.updateActiveTool}
          applyCpDetection={props.applyCpDetection} enableCpDetection={props.enableCpDetection}
          cpDetectionEnabled={cpDetectionEnabled}
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
  customChangePoints: visualizer.customChangePoints,
  detectedChangePoints: visualizer.detectedChangePoints,
  graphZoom: visualizer.graphZoom,
  activeTool: visualizer.activeTool,
  compare: visualizer.compare,
  compareData: visualizer.compareData,
  queryResultsLoading: visualizer.queryResultsLoading,
  cpDetectionEnabled: visualizer.cpDetectionEnabled,
  chartRef: visualizer.chartRef,
});

const mapDispatchToProps = {
  getDataset, updateQueryResults,
  updateSelectedMeasures, updateFrom, updateTo,
  updateResampleFreq, updateFilters, filterData,
  updatePatterns, getPatterns, updateChangeChart, updateDatasetChoice,
  getWdFiles, updatePatternNav, updateCustomChangePoints, getChangePointDates,
  updateGraphZoom, updateActiveTool, updateCompare, updateCompareQueryResults,
  applyCpDetection, enableCpDetection, updateChartRef
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
