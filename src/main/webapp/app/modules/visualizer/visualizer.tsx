import * as React from 'react';
import {useEffect} from 'react';
import {connect} from 'react-redux';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {RouteComponentProps} from 'react-router-dom';
import {IRootState} from "app/shared/reducers";
import {
  filterData,
  getDataset, updateFilters,
  updateFrom,
  updateQueryResults,
  updateResampleFreq,
  updateSelectedMeasures,
  updateTo,
  updatePatternLength,
  updatePatterns,
  updateTopPatterns,
  updateSelectedPattern,
  updateComputedPatternLength,
  getPatterns,
  updateChangeChart,
} from "app/modules/visualizer/visualizer.reducer";
import Chart from "app/modules/visualizer/chart";
import PatternExtraction from "app/modules/visualizer/patterns/interesting-patterns/pattern-extraction";
import VisPatterns from "app/modules/visualizer/patterns/interesting-patterns/find-patterns";
import VisControl from "app/modules/visualizer/vis-control";
import {Typography} from "@mui/material";
import PatternNav from "app/modules/visualizer/patterns/pattern-nav";

const mdTheme = createTheme();

export interface IVisualizerProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const Visualizer = (props: IVisualizerProps) => {
  const {
    dataset, changeChart,
    loading, queryResults, data, selectedMeasures,
    patternLength, topPatterns, computedPatternLength,
  } = props;

  useEffect(() => {
    props.getDataset(props.match.params.id);
  }, [props.match.params.id]);


  return !loading && <div>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar/>
          <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography component="h2" variant="h4" align="center">
                  {dataset.name}
                </Typography></Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                  <VisControl dataset={dataset} selectedMeasures={props.selectedMeasures} queryResults={queryResults}
                              updateSelectedMeasures={props.updateSelectedMeasures} from={props.from} to={props.to}
                              resampleFreq={props.resampleFreq} updateFrom={props.updateFrom} updateTo={props.updateTo}
                              updateResampleFreq={props.updateResampleFreq} updateFilters={props.updateFilters} filterData={props.filterData} filters={props.filters}
                              updateChangeChart = {props.updateChangeChart} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={8} lg={9}>
                <Paper sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}><Chart dataset={dataset} data={data} selectedMeasures={selectedMeasures}
                          updateQueryResults={props.updateQueryResults} from={props.from} to={props.to}
                          resampleFreq={props.resampleFreq} patterns = {props.patterns} changeChart = {changeChart}/>
                </Paper>
                <Paper sx={{
                  p: 4,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <PatternNav/>
                  <PatternExtraction dataset={dataset} data={data} selectedMeasures={selectedMeasures}
                          updateQueryResults={props.updateQueryResults} patternLength={patternLength} from={props.from} to={props.to}
                          resampleFreq={props.resampleFreq} updatePatternLength = {props.updatePatternLength}
                          updatePatterns={props.updatePatterns} patterns={props.patterns} topPatterns = {props.topPatterns}
                          selectedPattern ={props.selectedPattern}  updateSelectedPattern={props.updateSelectedPattern} computedPatternLength={computedPatternLength} updateComputedPatternLength={props.updateComputedPatternLength}
                          getPatterns = {props.getPatterns} changeChart={changeChart}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider></div>;
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
  patternLength: visualizer.patternLength,
  patterns: visualizer.patterns,
  topPatterns: visualizer.topPatterns,
  selectedPattern: visualizer.selectedPattern,
  computedPatternLength: visualizer.computedPatternLength,
  changeChart: visualizer.changeChart,
});

const mapDispatchToProps = {
  getDataset, updateQueryResults,
  updateSelectedMeasures, updateFrom, updateTo,
  updateResampleFreq, updateFilters, filterData,
  updatePatternLength, updatePatterns, updateTopPatterns,
  updateSelectedPattern, updateComputedPatternLength,
  getPatterns, updateChangeChart
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Visualizer);
