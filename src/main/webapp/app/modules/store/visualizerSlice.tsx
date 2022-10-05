import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { IChangepointDate } from 'app/shared/model/changepoint-date.model';
import { IDataPoint } from 'app/shared/model/data-point.model';
import { IQueryResults } from 'app/shared/model/query-results.model';
import { defaultValue as defaultQuery, IQuery } from 'app/shared/model/query.model';
import { ITimeRange } from 'app/shared/model/time-range.model';
import axios from 'axios';

const seedrandom = require('seedrandom');
const lvl = 64;
seedrandom('acab', { global: true });

const generateColor = () => {
  //return ("#" + (Math.floor(seedrandom()*lvl)<<16 | Math.floor(Math.random()*lvl)<<8 | Math.floor(Math.random()*lvl)).toString(16));
  var lum = -0.25;
  var hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  var rgb = "#",
    c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}

const initPatterns = (data, length, frequency) => {
  let pattern1 = { start: new Date(data[500].timestamp), end: new Date(data[500 + length].timestamp) };
  let pattern2 = { start: new Date(data[4000].timestamp), end: new Date(data[4000 + length].timestamp) };
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  let patternGroup = { patterns: [], color: '#' + randomColor };
  patternGroup.patterns.push(pattern1);
  patternGroup.patterns.push(pattern2);
  const patternGroups = [];
  patternGroups.push(patternGroup);

  pattern1 = { start: new Date(data[2000].timestamp), end: new Date(data[2000 + length].timestamp) };
  pattern2 = { start: new Date(data[3000].timestamp), end: new Date(data[3000 + length].timestamp) };

  randomColor = Math.floor(Math.random() * 16777215).toString(16);

  patternGroup = { patterns: [], color: '#' + randomColor };
  patternGroup.patterns.push(pattern1);
  patternGroup.patterns.push(pattern2);

  patternGroups.push(patternGroup);
  const knee = [1, 1, 1, 1, 7, 8, 9];
  const corrected = { knee: null, annotationVector: null };
  return { frequency, length, patternGroups, knee, corrected };
};

const initialState = {
  loading: true,
  errorMessage: null,
  dataset: null,
  queryResults: null as IQueryResults,
  data: null as any,
  compareData: null,
  queryResultsLoading: true,
  selectedMeasures: [],
  measureColors: [],
  from: null as number,
  to: null as number,
  wdFiles: [] as any[],
  sampleFile: [],
  directories: [],
  liveData: false,
  resampleFreq: 'minute',
  filter: new Map(),
  patterns: null,
  changeChart: true,
  datasetChoice: 0,
  patternNav: '0',
  folder: '',
  graphZoom: null,
  activeTool: -1,
  compare: [],
  chartRef: null,
  showDatePick: false,
  showChangepointFunction: false,
  showCompare: false,
  singleDateValue: {start: null, end: null},
  dateValues: [],
  fixedWidth: 0,
  expand: false,
  openToolkit: false,
  forecastData: null as IDataPoint[],
  secondaryData: null as IDataPoint[],
  manualChangepoints: [] as IChangepointDate[],
  detectedChangepoints: [] as IChangepointDate[],
  soilingWeeks: 1,
  changepointDetectionEnabled: false,
  manualChangepointsEnabled: false,
  customChangepointsEnabled: false,
  forecasting: false,
  soilingEnabled: false,
  anchorEl: null,
};

export const getDataset = createAsyncThunk('getDataset', async (data: { folder: string; id: string }) => {
  const { folder, id } = data;
  const response = await axios.get(`api/datasets/${folder}/${id}`).then(res => res);
  return response;
});

export const getWdFiles = createAsyncThunk('getWdFiles', async (folder: string) => {
  const response = await axios.get(`api/datasets/${folder}`).then(res => res);
  return response;
});

export const getDirectories = createAsyncThunk('getDirectories', async () => {
  const response = await axios.get(`api/datasets/directories`).then(res => res);
  return response;
});

export const getSampleFile = createAsyncThunk('getSampleFile', async (id: string) => {
  const response = await axios.get(`api/datasets/${id}/sample`).then(res => res);
  return response;
});

export const updateQueryResults = createAsyncThunk(
  'updateQueryResults',
  async (data: { folder: string; id: string[];
    from: number; to: number; resampleFreq: string; selectedMeasures: any[]; filter?: Map<number, number[]>}) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures, filter } = data;
    let query;
    from !== null && to !== null
    ? (query = {
      range: { from, to } as ITimeRange,
      frequency: resampleFreq.toUpperCase(),
      measures: selectedMeasures,
      filter: filter ? Object.fromEntries(filter) : null,
    } as IQuery)
    : (query = defaultQuery);
    const response = await axios.post(`api/datasets/${folder}/${id}/query`, query).then(res => res);
    return response.data;
  }
);

export const liveDataImplementation = createAsyncThunk(
  'liveDataImplementation',
  async (data: { folder: string; id: string[];
    from: number; to: number; resampleFreq: string; selectedMeasures: any[]; filter?: Map<number, number[]>}) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures, filter } = data;
    let query;
    from !== null && to !== null
    ? (query = {
      range: { from, to } as ITimeRange,
      frequency: resampleFreq.toUpperCase(),
      measures: selectedMeasures,
      filter: filter ? Object.fromEntries(filter) : null,
    } as IQuery)
    : (query = defaultQuery);
    const response = await axios.post(`api/datasets/${folder}/${id}/query`, query).then(res => res);
    return response.data;
  }
);

export const updateCompareQueryResults = createAsyncThunk(
  'updateCompareQueryResults',
  async (data: { folder: string; id: string[]; from: number; to: number; resampleFreq: string; selectedMeasures: any[]; filter: {}; }) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures, filter } = data;
    let query;
    from !== null && to !== null
      ? (query = {
          range: { from, to } as ITimeRange,
          frequency: resampleFreq.toUpperCase(),
          measures: selectedMeasures,
          filter
        } as IQuery)
      : (query = defaultQuery);
    const response = Promise.all(
      id.map(name => {
        return axios.post(`api/datasets/${folder}/${name}/query`, query).then(res => res.data);
      })
    ).then(res => res.map(r => r.data));
    return response;
  }
);

export const applyChangepointDetection = createAsyncThunk(
  'applyChangepointDetection',
  async (data: { id: string; from: number; to: number;}) => {
    const { id, from, to} = data;
    const response = await axios
      .post(`api/tools/cp_detection/${id}`, {
        range: { from, to } as ITimeRange,
      })
      .then(res => res);
    return response.data;
  }
);

export const applyForecasting = createAsyncThunk(
  'applyForecasting',
  async(id: string) => {
    const requestUrl = `api/tools/forecasting/${id}`;
    const response = await axios.post(requestUrl);
    return response.data;
  });

export const applyDeviationDetection = createAsyncThunk(
  'applyDeviationDetection',
  async (data: {folder: string, resampleFreq: string; id: string,
      from : number, to : number, weeks : number, changepoints : IChangepointDate[]}) => {
    const requestUrl = `api/tools/soiling/${data.folder}/${data.id}`;
    const range = {from: data.from, to: data.to} as unknown as ITimeRange;
    const changepoints = data.changepoints;
    const frequency = data.resampleFreq;
    const weeks = data.weeks;
    const response = await axios.post(requestUrl, {
      range,
      frequency,
      changepoints,
      weeks,
    });
    return response.data;
  });

export const getManualChangepoints = createAsyncThunk(
  'getManualChangepoints',
  async (id: string) => {
    const requestUrl = `api/tools/cp_detection/washes/${id}`;
    const response = await axios.get(requestUrl);
    return response.data;
  });

// Then, handle actions in your reducers:
const visualizer = createSlice({
  name: 'VisualizerState',
  initialState,
  reducers: {
    resetFetchData(state) {
      state = initialState;
    },
    updateSelectedMeasures(state, action) {
      state.selectedMeasures = action.payload;
    },
    updateFrom(state, action) {
      state.from = action.payload;
    },
    updateTo(state, action) {
      state.to = action.payload;
    },
    updateResampleFreq(state, action) {
      state.resampleFreq = action.payload;
    },
    updateFilters(state, action: {payload: {measureCol: any, range: any}, type: string}) {
      state.filter = state.filter.set(action.payload.measureCol, action.payload.range);
    },
    resetFilters(state) {
      state.filter = new Map();
    },
    updatePatterns(state, action) {
      state.patterns = action.payload;
    },
    updateChangeChart(state, action) {
      state.changeChart = action.payload;
    },
    updateDatasetChoice(state, action) {
      state.datasetChoice = action.payload;
    },
    updateDatasetMeasures(state, action) {
      state.dataset.measures = action.payload
    },
    updatePatternNav(state, action) {
      state.patternNav = action.payload;
    },
    updateChartRef(state, action) {
      state.chartRef = action.payload;
    },
    updateManualChangepoints(state, action) {
      state.manualChangepoints = action.payload;
    },
    updateActiveTool(state, action) {
      state.activeTool = action.payload;
    },
    updateCompare(state, action) {
      state.compare = !state.compare.includes(action.payload)
        ? [...state.compare, action.payload]
        : state.compare.filter(comp => comp !== action.payload);
    },
    updateLiveData(state) {
      state.liveData = !state.liveData;
    },
    updateData(state, action) {
      state.data = [...state.data, action.payload];
    },
    updateSecondaryData(state, action) {
      state.secondaryData = action.payload;
    },
    updateAnchorEl(state, action) {
      state.anchorEl = action.payload;
    },
    updateSoilingWeeks(state, action) {
      state.soilingWeeks = action.payload
    },
    getPatterns(state, action: {payload: {data: IDataPoint[], val: number, resampleFreq: string}, type: string}) {
      state.patterns = initPatterns(action.payload.data, action.payload.val, action.payload.resampleFreq);
    },
    setShowDatePick(state, action) {
      state.showDatePick = action.payload;
    },
    setShowChangepointFunction(state, action) {
      state.showChangepointFunction = action.payload;
    },
    setCompare(state, action) {
      state.showCompare = action.payload;
    },
    setSingleDateValue(state, action) {
      state.singleDateValue = action.payload;
    },
    setDateValues(state, action) {
      state.dateValues = action.payload;
    },
    setFixedWidth(state, action) {
      state.fixedWidth = action.payload;
    },
    setExpand(state, action) {
      state.expand = action.payload;
    },
    setOpenToolkit(state, action) {
      state.openToolkit = action.payload;
    },
    setFolder(state, action) {
      state.folder = action.payload;
    },
    toggleChangepointDetection(state, action) {
      state.changepointDetectionEnabled = action.payload;
    },
    toggleSoilingDetection(state, action){
      state.soilingEnabled = action.payload;
      state.secondaryData = state.soilingEnabled ? state.secondaryData : null;
    },
    toggleForecasting(state, action){
      state.forecasting = action.payload;
    },
    toggleManualChangepoints(state, action){
      state.manualChangepointsEnabled = action.payload;
    },
    toggleCustomChangepoints(state, action){
      state.customChangepointsEnabled = action.payload;
    },
    resetChartValues(state) {
      state.queryResultsLoading = initialState.queryResultsLoading;
      state.queryResults = initialState.queryResults;
      state.data = initialState.data;
      state.from = initialState.from;
      state.to = initialState.to;
      state.resampleFreq = initialState.resampleFreq;
      state.compareData = initialState.compareData;
      state.compare = initialState.compare;
      state.chartRef = initialState.chartRef;
    },
  },
  extraReducers(builder) {
    builder.addCase(getDataset.fulfilled, (state, action) => {
      state.loading = false;
      state.dataset = action.payload.data;
      state.measureColors = [...state.dataset.header.map(() => generateColor())]
      state.selectedMeasures = [...action.payload.data.measures];
    });
    builder.addCase(getWdFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.wdFiles = action.payload.data.data.map(file => file.id);
    });
    builder.addCase(getDirectories.fulfilled, (state, action) => {
      state.loading = false;
      state.directories = action.payload.data;
    });
    builder.addCase(getSampleFile.fulfilled, (state, action) => {
      state.loading = false;
      state.sampleFile = action.payload.data;
    });
    builder.addCase(updateQueryResults.fulfilled, (state, action) => {
      state.queryResultsLoading = false;
      state.queryResults = action.payload;
      state.data = action.payload.data;
      state.from = action.payload.data[0].timestamp;
      state.to = action.payload.data[action.payload.data.length - 1].timestamp;
    });
    builder.addCase(updateCompareQueryResults.fulfilled, (state, action) => {
      state.queryResultsLoading = false;
      state.compareData = action.payload;
    })
    builder.addCase(liveDataImplementation.fulfilled, (state, action) => {
      state.queryResultsLoading = false;
      state.data = action.payload.data.length !== 0 ? [...state.data, ...action.payload.data] : state.data;
    })
    builder.addMatcher(isAnyOf(getDataset.pending, getWdFiles.pending, getDirectories.pending, getSampleFile.pending), state => {
      state.errorMessage = null;
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(updateQueryResults.pending, updateCompareQueryResults.pending, liveDataImplementation.pending), state => {
      state.queryResultsLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getDataset.rejected, getWdFiles.rejected, getDirectories.pending, getSampleFile.rejected),
      (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(updateQueryResults.rejected, updateCompareQueryResults.rejected, liveDataImplementation.rejected), (state, action) => {
      state.queryResultsLoading = false;
    });
    builder.addMatcher(isAnyOf(applyChangepointDetection.fulfilled), (state, action) => {
      state.detectedChangepoints = action.payload.length === 0 ? null : action.payload;
    });
    builder.addMatcher(isAnyOf(getManualChangepoints.fulfilled), (state, action) => {
      state.manualChangepoints = action.payload.length === 0 ? null : action.payload;
    });
    builder.addMatcher(isAnyOf(applyDeviationDetection.fulfilled), (state, action) => {
      state.secondaryData = action.payload.length === 0 ? null : action.payload;
    });
  },
});

export const {
  resetChartValues, resetFetchData,updateSelectedMeasures,updateFrom,updateTo,updateResampleFreq, updateFilters,
  updatePatterns, updateChangeChart,updateDatasetChoice, updateDatasetMeasures, updatePatternNav,updateChartRef,
  updateManualChangepoints, updateSecondaryData, updateActiveTool, updateCompare, updateLiveData, updateAnchorEl,
  updateData, updateSoilingWeeks, toggleForecasting, toggleSoilingDetection, toggleManualChangepoints, toggleChangepointDetection,
  toggleCustomChangepoints, setShowDatePick,setShowChangepointFunction,setCompare,setSingleDateValue,setDateValues,setFixedWidth,
  setExpand, setOpenToolkit, setFolder, resetFilters, getPatterns,
} = visualizer.actions;
export default visualizer.reducer;
