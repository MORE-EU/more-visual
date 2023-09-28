import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { IAlerts } from 'app/shared/model/alert.model';
import { IChangepointDate } from 'app/shared/model/changepoint-date.model';
import { IDataPoint } from 'app/shared/model/data-point.model';
import { IFarmMeta } from 'app/shared/model/farmMeta.model';
import { IQueryResults } from 'app/shared/model/query-results.model';
import { defaultValue as defaultQuery, IQuery } from 'app/shared/model/query.model';
import { ITimeRange } from 'app/shared/model/time-range.model';
import axios from 'axios';
import moment, { Moment } from 'moment';
import {IPatterns} from "app/shared/model/patterns.model";
import {IPatternGroup} from "app/shared/model/pattern-group.model";
import {IPattern} from "app/shared/model/pattern.model";

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
  var rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }
  return rgb;
};

const calculateFreqFromDiff = (timeRange: any) => {
  const diff = moment.duration(moment(timeRange.to).diff(moment(timeRange.from))).humanize();
  if (diff.includes('month') || diff.includes('day')) {
    return 'hour';
  } else if (diff.includes('hour')) {
    return 'minute';
  } else if (diff.includes('minute') || diff.includes('second')) {
    return 'second';
  }
  return 'hour';
};


const forecastingInitialState = {
  forecastingStartDate: null,
  forecastingEndDate: null,
  forecastingDataSplit: [60, 20, 20],
};

const initialState = {
  loading: true,
  errorMessage: null,
  dataset: null,
  chartType: 'line',
  queryResults: null as IQueryResults,
  data: null as any,
  compareData: null,
  liveDataImplLoading: false,
  queryResultsLoading: true,
  selectedMeasures: [],
  measureColors: [],
  from: null as number,
  to: null as number,
  farmMeta: null as IFarmMeta,
  sampleFile: [],
  directories: [],
  resampleFreq: '',
  filter: {},
  patterns: null,
  changeChart: true,
  datasetChoice: 0,
  patternNav: '0',
  folder: '',
  graphZoom: null,
  activeTool: null as null | string,
  compare: [],
  chartRef: null,
  showDatePick: false,
  showChangepointFunction: false,
  comparePopover: false,
  singleDateValue: { start: null, end: null },
  dateValues: [],
  fixedWidth: 0,
  expand: false,
  openToolkit: false,
  forecastData: null as IDataPoint[],
  secondaryData: null as IDataPoint[],
  customChangepoints: [] as IChangepointDate[],
  manualChangepoints: [] as IChangepointDate[],
  detectedChangepoints: [] as IChangepointDate[],
  soilingWeeks: 1,
  soilingType: 'soilingRatio',
  changepointDetectionEnabled: false,
  manualChangepointsEnabled: false,
  customChangepointsEnabled: false,
  detectedChangepointFilter: 90,
  forecasting: false,
  soilingEnabled: false,
  yawMisalignmentEnabled: false,
  anchorEl: null,
  alerts: [] as IAlerts[],
  alertsLoading: false,
  alertingPreview: false,
  alertResults: {},
  alertingPlotMode: false,
  ...forecastingInitialState,
};

export const getDataset = createAsyncThunk('getDataset', async (data: { folder: string; id: string }) => {
  const { folder, id } = data;
  const response = await axios.get(`api/datasets/${folder}/${id}`).then(res => res);
  return response;
});

export const getFarmMeta = createAsyncThunk('getFarmMeta', async (folder: string) => {
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

export const getAlerts = createAsyncThunk('getAlerts', async (datasetId: String) => {
  const response = await axios.get(`api/alerts/${datasetId}`).then(res => res);
  return response;
});

export const saveAlert = createAsyncThunk('saveAlert', async (alertInfo: IAlerts) => {
  const response = await axios.post(`api/alerts/add`, alertInfo).then(res => res);
  return response;
});

export const editAlert = createAsyncThunk('editAlert', async (alertInfo: IAlerts) => {
  const response = await axios.post(`api/alerts/edit`, alertInfo).then(res => res);
  return response;
});

export const deleteAlert = createAsyncThunk('deleteAlert', async (alertName: String) => {
  const response = await axios.post(`api/alerts/remove/${alertName}`).then(res => res);
  return response;
});

export const updateQueryResults = createAsyncThunk(
  'updateQueryResults',
  async (data: {
    folder: string;
    id: string[];
    from: number;
    to: number;
    resampleFreq: string;
    selectedMeasures: any[];
    filter?: {};
  }) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures, filter } = data;
    let query;
    from !== null && to !== null
      ? (query = {
          range: { from, to } as ITimeRange,
          frequency: resampleFreq.toUpperCase(),
          measures: selectedMeasures,
          filter: filter ? filter : null,
        } as IQuery)
      : (query = { range: null, frequency: resampleFreq.toUpperCase() });
    const response = await axios.post(`api/datasets/${folder}/${id}/query`, query).then(res => res);
    return response.data;
  }
);

export const liveDataImplementation = createAsyncThunk(
  'liveDataImplementation',
  async (data: {
    folder: string;
    id: string[];
    from: number;
    to: number;
    resampleFreq: string;
    selectedMeasures: any[];
    filter?: {};
  }) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures, filter } = data;
    let query;
    from !== null && to !== null
      ? (query = {
          range: { from, to } as ITimeRange,
          frequency: resampleFreq.toUpperCase(),
          measures: selectedMeasures,
          filter: filter ? filter : null,
        } as IQuery)
      : (query = { range: null, frequency: resampleFreq.toUpperCase() });
    const response = await axios.post(`api/datasets/${folder}/${id}/query`, query).then(res => res);
    return response.data;
  }
);

export const updateCompareQueryResults = createAsyncThunk(
  'updateCompareQueryResults',
  async (data: { folder: string; id: string[]; from: number; to: number; resampleFreq: string; selectedMeasures: any[]; filter: {} }) => {
    const { folder, id, from, to, resampleFreq, selectedMeasures, filter } = data;
    let query;
    from !== null && to !== null
      ? (query = {
          range: { from, to } as ITimeRange,
          frequency: resampleFreq.toUpperCase(),
          measures: selectedMeasures,
          filter,
        } as IQuery)
      : (query = { range: null, frequency: resampleFreq.toUpperCase() });
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
  async (data: { id: string; from: number; to: number }) => {
    const { id, from, to } = data;
    const response = await axios
      .post(`api/tools/changepoint_detection`, {
        id,
        range: { from, to } as ITimeRange,
      })
      .then(res => res);
    return response.data;
  }
);

export const applyForecasting = createAsyncThunk('applyForecasting', async (id: string) => {
  const requestUrl = `api/tools/forecasting/${id}`;
  const response = await axios.post(requestUrl);
  return response.data;
});

export const applyDeviationDetection = createAsyncThunk(
  'applyDeviationDetection',
  async (data: { id: string; from: number; to: number; weeks: number; type: string; changepoints: IChangepointDate[] }) => {
    const requestUrl = `api/tools/soiling`;
    const id = data.id;
    const type = data.type;
    const range = ({ from: data.from, to: data.to } as unknown) as ITimeRange;
    const changepoints = data.changepoints;
    const weeks = data.weeks;
    const response = await axios.post(requestUrl, {
      id,
      range,
      type,
      changepoints,
      weeks,
    });
    return response.data;
  }
);

export const applyYawMisalignmentDetection = createAsyncThunk(
  'applyYawMisalignmentDetection',
  async (data: { id: string; from: number; to: number }) => {
    const requestUrl = `api/tools/yaw_misalignment`;
    const id = data.id;
    const range = ({ from: data.from, to: data.to } as unknown) as ITimeRange;
    const response = await axios.post(requestUrl, {
      id,
      range,
    });
    return response.data;
  }
);

export const getManualChangepoints = createAsyncThunk('getManualChangepoints', async (id: string) => {
  const requestUrl = `api/tools/changepoint_detection/washes/${id}`;
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
    updateFilter(state, action) {
      state.filter = action.payload;
    },
    resetFilters(state) {
      state.filter = {};
    },
    updateChangeChart(state, action) {
      state.changeChart = action.payload;
    },
    updateDatasetChoice(state, action) {
      state.datasetChoice = action.payload;
    },
    updateDatasetMeasures(state, action) {
      state.dataset.measures = action.payload;
    },
    updateChartRef(state, action) {
      state.chartRef = action.payload;
    },
    updateManualChangepoints(state, action) {
      state.manualChangepoints = action.payload;
    },
    updateCustomChangepoints(state, action) {
      state.customChangepoints = action.payload;
    },
    updateActiveTool(state, action) {
      state.activeTool = action.payload;
    },
    updateCompare(state, action) {
      state.compare = !state.compare.includes(action.payload)
        ? [...state.compare, action.payload]
        : state.compare.filter(comp => comp !== action.payload);
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
      state.soilingWeeks = action.payload;
    },
    updateSoilingType(state, action) {
      state.soilingType = action.payload;
    },
    updateAlertResults(state, action) {
      state.alertResults = { ...action.payload };
    },
    setShowDatePick(state, action) {
      state.showDatePick = action.payload;
    },
    setShowChangepointFunction(state, action) {
      state.showChangepointFunction = action.payload;
    },
    setComparePopover(state, action) {
      state.comparePopover = action.payload;
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
    setAlertingPreview(state, action) {
      state.alertingPreview = action.payload;
    },
    setAlertingPlotMode(state, action) {
      state.alertingPlotMode = action.payload;
    },
    setOpenToolkit(state, action) {
      state.openToolkit = action.payload;
    },
    setFolder(state, action) {
      state.folder = action.payload;
    },
    setChartType(state, action) {
      state.chartType = action.payload;
    },
    setDetectedChangepointFilter(state, action) {
      state.detectedChangepointFilter = action.payload;
    },
    setAutoMLStartDate(state, action) {
      state.forecastingStartDate = action.payload;
    },
    setAutoMLEndDate(state, action) {
      state.forecastingEndDate = action.payload;
    },
    setForecastingDataSplit(state, action) {
      state.forecastingDataSplit = action.payload;
    },
    toggleChangepointDetection(state, action) {
      state.changepointDetectionEnabled = action.payload;
    },
    toggleSoilingDetection(state, action) {
      state.soilingEnabled = action.payload;
      state.secondaryData = state.soilingEnabled ? state.secondaryData : null;
    },
    toggleYawMisalignmentDetection(state, action) {
      state.yawMisalignmentEnabled = action.payload;
    },
    toggleForecasting(state, action) {
      state.forecasting = action.payload;
    },
    toggleManualChangepoints(state, action) {
      state.manualChangepointsEnabled = action.payload;
    },
    toggleCustomChangepoints(state, action) {
      state.customChangepointsEnabled = action.payload;
    },
    resetForecastingState(state) {
      // remove plotlines from chart when you disable forecasting
      state.chartRef.xAxis[0].removePlotLine('start');
      state.chartRef.xAxis[0].removePlotLine('end');
      return { ...state, ...forecastingInitialState };
    },
    resetChartValues(state) {
      state.queryResultsLoading = initialState.queryResultsLoading;
      state.queryResults = initialState.queryResults;
      state.data = initialState.data;
      state.from = initialState.from;
      state.to = initialState.to;
      state.compareData = initialState.compareData;
      state.compare = initialState.compare;
      state.chartRef = initialState.chartRef;
    },
  },
  extraReducers: function (builder) {
    builder.addCase(getDataset.fulfilled, (state, action) => {
      state.loading = false;
      state.dataset = action.payload.data;
      state.measureColors = [...state.dataset.header.map(() => generateColor())];
      state.resampleFreq = calculateFreqFromDiff(action.payload.data.timeRange);
      state.selectedMeasures = [action.payload.data.measures[0]];
    });
    builder.addCase(getFarmMeta.fulfilled, (state, action) => {
      state.loading = false;
      state.farmMeta = action.payload.data;
    });
    builder.addCase(getDirectories.fulfilled, (state, action) => {
      state.loading = false;
      state.directories = action.payload.data;
    });
    builder.addCase(getSampleFile.fulfilled, (state, action) => {
      state.loading = false;
      state.sampleFile = action.payload.data;
    });
    builder.addCase(getAlerts.fulfilled, (state, action) => {
      state.alertsLoading = false;
      state.alerts = action.payload.data;
    });
    builder.addCase(editAlert.fulfilled, (state, action) => {
      state.alertsLoading = false;
      state.alerts = action.payload.data;
    });
    builder.addCase(saveAlert.fulfilled, (state, action) => {
      state.alertsLoading = false;
      state.alerts = action.payload.data;
    });
    builder.addCase(deleteAlert.fulfilled, (state, action) => {
      state.alertsLoading = false;
      state.alerts = action.payload.data;
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
    });
    builder.addCase(liveDataImplementation.fulfilled, (state, action) => {
      state.liveDataImplLoading = false;
      state.queryResultsLoading = false;
      state.data = action.payload.data.length !== 0 ? [...state.data, ...action.payload.data.slice(0)] : state.data;
    });
    builder.addMatcher(isAnyOf(getDataset.pending, getFarmMeta.pending, getDirectories.pending, getSampleFile.pending), state => {
      state.errorMessage = null;
      state.loading = true;
    });
    builder.addMatcher(isAnyOf(updateQueryResults.pending, updateCompareQueryResults.pending), state => {
      state.queryResultsLoading = true;
    });
    builder.addMatcher(isAnyOf(liveDataImplementation.pending), state => {
      state.liveDataImplLoading = true;
      state.queryResultsLoading = true;
    });
    builder.addMatcher(isAnyOf(saveAlert.pending, deleteAlert.pending, getAlerts.pending, editAlert.pending), state => {
      state.alertsLoading = true;
    });
    builder.addMatcher(
      isAnyOf(getDataset.rejected, getFarmMeta.rejected, getDirectories.pending, getSampleFile.rejected),
      (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      }
    );
    builder.addMatcher(isAnyOf(updateQueryResults.rejected, updateCompareQueryResults.rejected), (state, action) => {
      state.queryResultsLoading = false;
    });
    builder.addMatcher(isAnyOf(liveDataImplementation.rejected), (state, action) => {
      state.liveDataImplLoading = false;
      state.queryResultsLoading = false;
    });
    builder.addMatcher(isAnyOf(saveAlert.rejected, deleteAlert.rejected, getAlerts.rejected, editAlert.rejected), (state, action) => {
      state.alertsLoading = false;
    });
    builder.addMatcher(isAnyOf(applyChangepointDetection.fulfilled), (state, action) => {
      state.detectedChangepoints = action.payload.length === 0 ? null : action.payload;
    });

    builder.addMatcher(isAnyOf(getManualChangepoints.fulfilled), (state, action) => {
      state.manualChangepoints = action.payload.length === 0 ? null : action.payload;
    });
    builder.addMatcher(isAnyOf(applyDeviationDetection.fulfilled, applyYawMisalignmentDetection.fulfilled), (state, action) => {
      state.secondaryData = action.payload.length === 0 ? null : action.payload;
    });
  },
});

export const {
  resetChartValues,resetFetchData,updateSelectedMeasures,updateFrom,updateTo,updateResampleFreq,updateFilter,
  updateChangeChart,updateDatasetChoice,updateDatasetMeasures,updateCustomChangepoints,updateChartRef,
  updateManualChangepoints,updateSecondaryData,updateActiveTool,updateCompare,updateAnchorEl,updateData,updateSoilingWeeks,
  updateSoilingType,toggleSoilingDetection,toggleChangepointDetection,setForecastingDataSplit,toggleYawMisalignmentDetection,
  toggleManualChangepoints,toggleCustomChangepoints,setAutoMLStartDate,setAutoMLEndDate,setShowDatePick,setShowChangepointFunction,
  setComparePopover,setSingleDateValue,setDateValues,setFixedWidth,setAlertingPlotMode,resetForecastingState,setDetectedChangepointFilter,
  setExpand,setOpenToolkit,setFolder,resetFilters,setChartType,setAlertingPreview,updateAlertResults,
} = visualizer.actions;
export default visualizer.reducer;
