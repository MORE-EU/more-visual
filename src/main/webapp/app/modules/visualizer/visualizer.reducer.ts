import axios from 'axios';
import { FAILURE, REQUEST, SUCCESS } from 'app/shared/reducers/action-type.util';
import { IDataset } from 'app/shared/model/dataset.model';
import { IChangePointDate } from 'app/shared/model/changepoint-date.model';
import { defaultValue as defaultQuery, IQuery } from 'app/shared/model/query.model';
import { IQueryResults } from 'app/shared/model/query-results.model';
import { IDataPoint } from 'app/shared/model/data-point.model';
import { ITimeRange } from 'app/shared/model/time-range.model';

export const ACTION_TYPES = {
  FETCH_DATASET: 'visualizer/FETCH_DATASET',
  FETCH_SAMPLEFILE: 'visualizer/FETCH_SAMPLEFILE',
  FETCH_DIRECTORIES: 'visualizer/FETCH_DIRECTORIES',
  FETCH_WDFILES: 'visualizer/FETCH_WDFILES',
  FETCH_QUERY_RESULTS: 'visualizer/FETCH_QUERY_RESULTS',
  FETCH_QUERY_COMPARE_RESULTS: 'visualizer/FETCH_QUERY_COMPARE_RESULTS',
  UPDATE_SELECTED_MEASURES: 'visualizer/UPDATE_SELECTED_MEASURES',
  UPDATE_FROM: 'visualizer/UPDATE_FROM',
  UPDATE_TO: 'visualizer/UPDATE_TO',
  UPDATE_RESAMPLE_FREQ: 'visualizer/UPDATE_RESAMPLE_FREQ',
  UPDATE_FILTERS: 'visualizer/UPDATE_FILTERS',
  FILTER_DATA: 'visualizer/FILTER_DATA',
  UPDATE_PATTERN_LENGTH: 'visualizer/UPDATE_PATTERN_LENGTH',
  UPDATE_TOP_PATTERNS: 'visualizer/UPDATE_TOP_PATTERNS',
  UPDATE_PATTERNS: 'visualizer/UPDATE_PATTERNS',
  UPDATE_COMPUTED_PATTERN_LENGTH: 'visualizer/UPDATE_COMPUTED_PATTERN_LENGTH',
  UPDATE_SELECTED_PATTERN: 'visualizer/UPDATE_SELECTED_PATTERN',
  GET_PATTERNS: 'visualizer/GET_PATTERNS',
  UPDATE_CHANGECHART: 'visualizer/UPDATE_CHANGECHART',
  UPDATE_DATASETCHOICE: 'visualizer/UPDATE_DATASETCHOICE',
  UPDATE_PATTERNNAV: 'visualizer/UPDATE_PATTERNNAV',
  GET_CHANGEPOINT_DATES: 'visualizer/GET_CHANGEPOINT_DATES',
  UPDATE_CUSTOM_CHANGEPOINTS: 'visualizer/UPDATE_CUSTOM_CHANGEPOINTS',
  UPDATE_GRAPHZOOM: 'visualizer/UPDATE_GRAPHZOOM',
  UPDATE_ACTIVETOOL: 'visualizer/UPDATE_ACTIVETOOL',
  UPDATE_COMPARE: 'visualizer/UPDATE_COMPARE',
  CHANGEPOINT_DETECTION: 'visualizer/CHANGEPOINT_DETECTION',
  ENABLE_CP_DETECTION: 'visualizer/ENABLE_CP_DETECTION',
};

const initialState = {
  loading: true,
  errorMessage: null,
  dataset: null,
  queryResults: null as IQueryResults,
  data: null as IDataPoint[],
  compareData: null,
  queryResultsLoading: true,
  selectedMeasures: [],
  resampleFreq: 'minute',
  from: null as Date,
  to: null as Date,
  filters: {},
  patterns: null,
  changeChart: false,
  datasetChoice: 0,
  wdFiles: [],
  patternNav: '0',
  folder: '',
  sampleFile: [],
  customChangePoints: [] as IChangePointDate[],
  graphZoom: null,
  activeTool: -1,
  compare: '',
  directories: [],
  cpDetectionEnabled: false,
};

export type VisualizerState = Readonly<typeof initialState>;

const initPatterns = (data, length, frequency) => {
  let pattern1 = { start: new Date(data[500][0]), end: new Date(data[500 + length][0]) };
  let pattern2 = { start: new Date(data[4000][0]), end: new Date(data[4000 + length][0]) };
  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  let patternGroup = { patterns: [], color: '#' + randomColor };
  patternGroup.patterns.push(pattern1);
  patternGroup.patterns.push(pattern2);
  const patternGroups = [];
  patternGroups.push(patternGroup);

  pattern1 = { start: new Date(data[2000][0]), end: new Date(data[2000 + length][0]) };
  pattern2 = { start: new Date(data[3000][0]), end: new Date(data[3000 + length][0]) };

  randomColor = Math.floor(Math.random() * 16777215).toString(16);

  patternGroup = { patterns: [], color: '#' + randomColor };
  patternGroup.patterns.push(pattern1);
  patternGroup.patterns.push(pattern2);

  patternGroups.push(patternGroup);
  const knee = [1, 1, 1, 1, 7, 8, 9];
  const corrected = { knee: null, annotationVector: null };
  return { frequency, length, patternGroups, knee, corrected };
};

// Reducer

export default (state: VisualizerState = initialState, action): VisualizerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_WDFILES):
    case REQUEST(ACTION_TYPES.FETCH_DIRECTORIES):
    case REQUEST(ACTION_TYPES.FETCH_DATASET):
    case REQUEST(ACTION_TYPES.FETCH_SAMPLEFILE):
      return {
        ...state,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_WDFILES):
    case FAILURE(ACTION_TYPES.FETCH_DIRECTORIES):
    case FAILURE(ACTION_TYPES.FETCH_DATASET):
    case FAILURE(ACTION_TYPES.FETCH_SAMPLEFILE):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_WDFILES):
      return {
        ...state,
        loading: false,
        wdFiles: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SAMPLEFILE):
      return {
        ...state,
        loading: false,
        sampleFile: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DIRECTORIES):
      return {
        ...state,
        loading: false,
        directories: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DATASET):
      return {
        ...state,
        loading: false,
        dataset: action.payload.data,
        selectedMeasures: [action.payload.data.measures[0]],
      };
    case REQUEST(ACTION_TYPES.FETCH_QUERY_RESULTS):
    case REQUEST(ACTION_TYPES.FETCH_QUERY_COMPARE_RESULTS):
      return {
        ...state,
        queryResultsLoading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_QUERY_RESULTS):
    case FAILURE(ACTION_TYPES.FETCH_QUERY_COMPARE_RESULTS):
      return {
        ...state,
        queryResultsLoading: false,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUERY_RESULTS):
      return state.from === null && state.to === null
        ? {
            ...state,
            queryResultsLoading: false,
            queryResults: action.payload.data,
            data: action.payload.data.data,
            from: new Date(action.payload.data.timeRange[0]),
            to: new Date(action.payload.data.timeRange[1]),
          }
        : {
            ...state,
            queryResultsLoading: false,
            queryResults: action.payload.data,
            data: action.payload.data.data,
          };
    case SUCCESS(ACTION_TYPES.FETCH_QUERY_COMPARE_RESULTS):
      return {
        ...state,
        queryResultsLoading: false,
        compareData: action.payload.data.data,
      };
    case SUCCESS(ACTION_TYPES.CHANGEPOINT_DETECTION):
      return {
        ...state,
      };
    case ACTION_TYPES.UPDATE_SELECTED_MEASURES:
      return {
        ...state,
        selectedMeasures: action.payload,
      };
    case ACTION_TYPES.UPDATE_FROM:
      return {
        ...state,
        from: action.payload,
      };
    case ACTION_TYPES.UPDATE_TO:
      return {
        ...state,
        to: action.payload,
      };
    case ACTION_TYPES.ENABLE_CP_DETECTION:
      return {
        ...state,
        cpDetectionEnabled: action.payload,
      };
    case ACTION_TYPES.UPDATE_PATTERNS:
      return {
        ...state,
        patterns: action.payload,
      };
    case ACTION_TYPES.UPDATE_RESAMPLE_FREQ:
      return {
        ...state,
        resampleFreq: action.payload,
      };
    case ACTION_TYPES.UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, [action.payload.measureCol]: action.payload.range },
      };
    case ACTION_TYPES.FILTER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ACTION_TYPES.UPDATE_CHANGECHART:
      return {
        ...state,
        changeChart: action.payload,
      };
    case ACTION_TYPES.UPDATE_DATASETCHOICE:
      return {
        ...state,
        datasetChoice: action.payload,
      };
    case ACTION_TYPES.UPDATE_PATTERNNAV:
      return {
        ...state,
        patternNav: action.payload,
      };
    case ACTION_TYPES.GET_PATTERNS:
      return {
        ...state,
        patterns: initPatterns(action.payload.data, action.payload.length, action.payload.frequency),
      };
    case ACTION_TYPES.UPDATE_CUSTOM_CHANGEPOINTS:
      return {
        ...state,
        customChangePoints: action.payload,
      };
    case ACTION_TYPES.UPDATE_GRAPHZOOM:
      return {
        ...state,
        graphZoom: action.payload,
      };
    case ACTION_TYPES.UPDATE_ACTIVETOOL:
      return {
        ...state,
        activeTool: action.payload,
      };
    case ACTION_TYPES.UPDATE_COMPARE:
      return {
        ...state,
        compare: action.payload,
      };
    default:
      return state;
  }
};

// Actions

export const getDataset = (folder, id) => {
  const requestUrl = `api/datasets/${folder}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DATASET,
    payload: axios.get<IDataset>(requestUrl),
  };
};

export const getWdFiles = folder => {
  return {
    type: ACTION_TYPES.FETCH_WDFILES,
    payload: axios.get(`api/datasets/${folder}`),
  };
};

export const getDirectories = () => {
  return {
    type: ACTION_TYPES.FETCH_DIRECTORIES,
    payload: axios.get(`api/datasets/directories`),
  };
};

export const getSampleFile = id => {
  return {
    type: ACTION_TYPES.FETCH_SAMPLEFILE,
    payload: axios.get(`api/datasets/${id}/sample`),
  };
};

export const updateQueryResults = (folder, id, fromDate, toDate, selMeasures) => (dispatch, getState) => {
  let query;
  fromDate !== null && toDate !== null
    ? (query = {
        range: { from: fromDate, to: toDate } as ITimeRange,
        frequency: 'MINUTE',
        measures: selMeasures,
      } as IQuery)
    : (query = defaultQuery);
  dispatch({
    type: ACTION_TYPES.FETCH_QUERY_RESULTS,
    payload: axios.post(`api/datasets/${folder}/${id}/query`, query),
  });
};

export const updateCompareQueryResults = (folder, id, fromDate, toDate, selMeasures) => (dispatch, getState) => {
  let query;
  fromDate !== null && toDate !== null
    ? (query = {
        range: { from: fromDate, to: toDate } as ITimeRange,
        frequency: 'SECOND',
        measures: selMeasures,
      } as IQuery)
    : (query = defaultQuery);
  dispatch({
    type: ACTION_TYPES.FETCH_QUERY_COMPARE_RESULTS,
    payload: axios.post(`api/datasets/${folder}/${id}/query`, query),
  });
};

export const updateSelectedMeasures = measures => ({
  type: ACTION_TYPES.UPDATE_SELECTED_MEASURES,
  payload: measures,
});

export const updateFrom = from => ({
  type: ACTION_TYPES.UPDATE_FROM,
  payload: from,
});

export const updateTo = to => ({
  type: ACTION_TYPES.UPDATE_TO,
  payload: to,
});

export const updateResampleFreq = freq => ({
  type: ACTION_TYPES.UPDATE_RESAMPLE_FREQ,
  payload: freq,
});

export const updateFilters = (measureCol, range) => ({
  type: ACTION_TYPES.UPDATE_FILTERS,
  payload: { measureCol, range },
});

export const updatePatterns = patterns => ({
  type: ACTION_TYPES.UPDATE_PATTERNS,
  payload: patterns,
});

export const updateChangeChart = (bool: boolean) => ({
  type: ACTION_TYPES.UPDATE_CHANGECHART,
  payload: bool,
});

export const updateDatasetChoice = data => ({
  type: ACTION_TYPES.UPDATE_DATASETCHOICE,
  payload: data,
});

export const updatePatternNav = data => ({
  type: ACTION_TYPES.UPDATE_PATTERNNAV,
  payload: data,
});

export const updateGraphZoom = data => ({
  type: ACTION_TYPES.UPDATE_GRAPHZOOM,
  payload: data,
});

export const updateCustomChangePoints = data => ({
  type: ACTION_TYPES.UPDATE_CUSTOM_CHANGEPOINTS,
  payload: data,
});

export const updateActiveTool = data => ({
  type: ACTION_TYPES.UPDATE_ACTIVETOOL,
  payload: data,
});

export const updateCompare = (data: string) => ({
  type: ACTION_TYPES.UPDATE_COMPARE,
  payload: data,
});

export const filterData = () => (dispatch, getState) => {
  const { queryResults, filters } = getState().visualizer;
  const clone = items => items.map(item => (Array.isArray(item) ? clone(item) : item));
  const d = clone(queryResults.data);
  dispatch({
    type: ACTION_TYPES.FILTER_DATA,
    // payload: queryResults.data.filter(row => {
    //   const filteredCols = Object.keys(filters);
    //   for (let i = 0; i < filteredCols.length; i++) {
    //     const col = filteredCols[i],
    //       filter = filters[col];
    //     const value = parseFloat(row[col]);
    //     if (value < filter[0] || value > filter[1]) {
    //       return false;
    //     }
    //   }
    //   return true;
    // }),
    payload: d.map(row => {
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
    }),
  });
};

export const getPatterns = (data, length, frequency) => dispatch => {
  dispatch({
    type: ACTION_TYPES.GET_PATTERNS,
    payload: { data, length, frequency },
  });
};

export const getChangePointDates = (func, col) => dispatch => {
  dispatch({
    type: ACTION_TYPES.GET_CHANGEPOINT_DATES,
    payload: { func, col },
  });
};

export const enableCpDetection = (bool: boolean) => ({
  type: ACTION_TYPES.ENABLE_CP_DETECTION,
  payload: bool,
});

export const applyCpDetection = (id, from, to, customChangePoints, detectAuto, detectIntervals) => dispatch => {
  const requestUrl = `api/tools/cp_detection/${id}`;
  return {
    type: ACTION_TYPES.CHANGEPOINT_DETECTION,
    payload: axios.post(requestUrl, {
      range: { from, to } as ITimeRange,
      changepoints: detectIntervals ? customChangePoints : null,
    }),
  };
};
