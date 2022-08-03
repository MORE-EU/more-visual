import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { IChangePointDate } from 'app/shared/model/changepoint-date.model';
import { IDataPoint } from 'app/shared/model/data-point.model';
import { IQueryResults } from 'app/shared/model/query-results.model';
import { defaultValue as defaultQuery, IQuery } from 'app/shared/model/query.model';
import { ITimeRange } from 'app/shared/model/time-range.model';
import axios from 'axios';

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

export const filData = (removePoints, queryResults, filters) => {
  const clone = items => items.map(item => (Array.isArray(item) ? clone(item) : item));
  const d = clone(queryResults.data);
  if (removePoints) {
    d.map(row => {
      const filteredCols = Object.keys(filters);
      for (let i = 0; i < filteredCols.length; i++) {
        const col = filteredCols[i],
          filter = filters[col];
        const value = parseFloat(row[col]);
        if (value < filter[0] || value > filter[1]) {
          for (let j = 1; j < row.length; j++) {
            row[j] = null;
          }
          break;
        }
      }
      return row;
    });
  } else {
    queryResults.data.filter(row => {
      const filteredCols = Object.keys(filters);
      for (let i = 0; i < filteredCols.length; i++) {
        const col = filteredCols[i],
          filter = filters[col];
        const value = parseFloat(row[col]);
        if (value < filter[0] || value > filter[1]) {
          return false;
        }
      }
      return true;
    });
  }
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
  from: null as number,
  to: null as number,
  wdFiles: [],
  sampleFile: [],
  directories: [],
  liveData: false,
  resampleFreq: 'minute',
  filters: {},
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
  showChangePointFunction: false,
  showCompare: false,
  singleDateValue: {start: null, end: null},
  dateValues: [],
  fixedWidth: 0,
  expand: false,
  open: false,
  secondaryData: null as IDataPoint[],
  forecastData: null as IDataPoint[],
  manualChangePoints: null as IChangePointDate[],
  customChangePoints: null as IChangePointDate[],
  detectedChangePoints: null as IChangePointDate[],
  changepointDetectionEnabled: false,
  manualChangepointsEnabled: false,
  forecasting: false,
  soilingEnabled: false,
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
  async (data: { folder: string; id: string[]; from: number; to: number; resampleFreq: string; selectedMeasures: any[] }) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures } = data;
    let query;
    from !== null && to !== null
      ? (query = {
          range: { from, to } as ITimeRange,
          frequency: resampleFreq.toUpperCase(),
          measures: selectedMeasures,
        } as IQuery)
      : (query = defaultQuery);
    const response = await axios.post(`api/datasets/${folder}/${id}/query`, query).then(res => res);
    return response.data;
  }
);

export const updateCompareQueryResults = createAsyncThunk(
  'updateCompareQueryResults',
  async (data: { folder: string; id: string[]; from: number; to: number; resampleFreq: string; selectedMeasures: any[] }) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures } = data;
    let query;
    from !== null && to !== null
      ? (query = {
          range: { from, to } as ITimeRange,
          frequency: resampleFreq.toUpperCase(),
          measures: selectedMeasures,
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
  async (data: { id: string; from: number; to: number; changepoints: IChangePointDate[] }) => {
    const { id, from, to, changepoints} = data;
    const response = await axios
      .post(`api/tools/cp_detection/${id}`, {
        range: { from, to } as ITimeRange,
        changepoints,
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
  async (data: {id: string, from : number, to : number, changepoints : IChangePointDate[]}) => {
    const requestUrl = `api/tools/soiling/${data.id}`;
    const range = {from: data.from, to: data.to} as unknown as ITimeRange;
    const changepoints = data.changepoints;
    const response = await axios.post(requestUrl, {
      range,
      changepoints,
    });
    return response.data;
  });

export const getManualChangePoints = createAsyncThunk(
  'getManualChangePoints',
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
      state.filters = { ...state.filters, [action.payload.measureCol]: action.payload.range };
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
    updatePatternNav(state, action) {
      state.patternNav = action.payload;
    },
    updateChartRef(state, action) {
      state.chartRef = action.payload;
    },
    updateCustomChangePoints(state, action) {
      state.customChangePoints = action.payload;
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
    getPatterns(state, action: {payload: {data: IDataPoint[], val: number, resampleFreq: string}, type: string}) {
      state.patterns = initPatterns(action.payload.data, action.payload.val, action.payload.resampleFreq);
    },
    setShowDatePick(state, action) {
      state.showDatePick = action.payload;
    },
    setShowChangePointFunction(state, action) {
      state.showChangePointFunction = action.payload;
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
    setOpen(state, action) {
      state.open = action.payload;
    },
    filterData(state, action) {
      state.data = filData(action.payload, state.queryResults, state.filters);
    },
    setFolder(state, action) {
      state.folder = action.payload;
    },
    enableChangepointDetection(state, action) {
      state.changepointDetectionEnabled = action.payload;
    },
    enableSoilingDetection(state, action){
      state.soilingEnabled = action.payload;
      state.secondaryData = null;
    },
    enableForecasting(state, action){
      state.forecasting = action.payload;
    },
    enableManualChangepoints(state, action){
      state.manualChangepointsEnabled = action.payload;
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
      state.selectedMeasures = [action.payload.data.measures[0]];
    });
    builder.addCase(getWdFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.wdFiles = action.payload.data;
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
    builder.addMatcher(isAnyOf(getDataset.pending, getWdFiles.pending, getDirectories.pending, getSampleFile.pending), state => {
      state.errorMessage = null;
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(updateQueryResults.pending, updateCompareQueryResults.pending), state => {
      state.queryResultsLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getDataset.rejected, getWdFiles.rejected, getDirectories.pending, getSampleFile.rejected),
      (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(updateQueryResults.rejected, updateCompareQueryResults.rejected), (state, action) => {
      state.queryResultsLoading = false;
    });
    builder.addMatcher(isAnyOf(applyChangepointDetection.fulfilled), (state, action) => {
      state.detectedChangePoints = action.payload;
    });
    builder.addMatcher(isAnyOf(getManualChangePoints.fulfilled), (state, action) => {
      state.manualChangePoints = action.payload;
    });
    builder.addMatcher(isAnyOf(applyDeviationDetection.fulfilled), (state, action) => {
      state.secondaryData = action.payload;
    });
  },
});

export const {
  resetFetchData,updateSelectedMeasures,updateFrom,updateTo,updateResampleFreq,updateFilters,
  updatePatterns,updateChangeChart,updateDatasetChoice,updatePatternNav,updateChartRef,updateCustomChangePoints,
  updateActiveTool,updateCompare,updateLiveData,updateData,getPatterns, enableForecasting, enableSoilingDetection,
  enableManualChangepoints, enableChangepointDetection, resetChartValues,
  setShowDatePick,setShowChangePointFunction,setCompare,setSingleDateValue,setDateValues,setFixedWidth,
  setExpand,setOpen,filterData, setFolder,
} = visualizer.actions;
export default visualizer.reducer;
