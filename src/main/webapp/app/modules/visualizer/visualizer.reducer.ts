import axios from 'axios';
import {FAILURE, REQUEST, SUCCESS} from 'app/shared/reducers/action-type.util';
import {IDataset} from 'app/shared/model/dataset.model';
import {IQuery} from 'app/shared/model/query.model';
import _ from 'lodash';

export const ACTION_TYPES = {
  FETCH_DATASET: 'visualizer/FETCH_DATASET',
  FETCH_QUERY_RESULTS: 'visualizer/FETCH_QUERY_RESULTS',
  UPDATE_SELECTED_MEASURES: 'visualizer/UPDATE_SELECTED_MEASURES',
  UPDATE_FROM: 'visualizer/UPDATE_FROM',
  UPDATE_TO: 'visualizer/UPDATE_TO',
  UPDATE_RESAMPLE_FREQ: 'visualizer/UPDATE_RESAMPLE_FREQ',
  UPDATE_FILTERS: 'visualizer/UPDATE_FILTERS',
  FILTER_DATA: 'visualizer/FILTER_DATA',
};

const initialState = {
  loading: true,
  errorMessage: null,
  dataset: null,
  queryResults: null,
  data: null,
  queryResultsLoading: true,
  selectedMeasures: [],
  resampleFreq: 'second',
  from: null as Date,
  to: null as Date,
  filters: {},
};

export type VisualizerState = Readonly<typeof initialState>;

// Reducer

export default (state: VisualizerState = initialState, action): VisualizerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DATASET):
      return {
        ...initialState,
        errorMessage: null,
        loading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_DATASET):
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_DATASET):
      return {
        ...state,
        loading: false,
        dataset: action.payload.data,
        selectedMeasures: [action.payload.data.measures[0]],
      };
    case REQUEST(ACTION_TYPES.FETCH_QUERY_RESULTS):
      return {
        ...state,
        queryResultsLoading: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_QUERY_RESULTS):
      return {
        ...state,
        queryResultsLoading: false,
      };
    case SUCCESS(ACTION_TYPES.FETCH_QUERY_RESULTS):
      return {
        ...state,
        queryResultsLoading: false,
        queryResults: action.payload.data,
        data: action.payload.data.data,
        from: _.min(action.payload.data.data.map(row => new Date(row[state.dataset.timeCol]))),
        to: _.max(action.payload.data.data.map(row => new Date(row[state.dataset.timeCol])))
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
    case ACTION_TYPES.UPDATE_RESAMPLE_FREQ:
      return {
        ...state,
        resampleFreq: action.payload,
      };
    case ACTION_TYPES.UPDATE_FILTERS:
      return {
        ...state,
        filters: {...state.filters, [action.payload.measureCol]: action.payload.range},
      };
      case ACTION_TYPES.FILTER_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

// Actions
export const getDataset = id => {
  const requestUrl = `api/datasets/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DATASET,
    payload: axios.get<IDataset>(requestUrl),
  };
};

export const updateQueryResults = id => (dispatch, getState) => {
  const query = {} as IQuery;
  dispatch({
    type: ACTION_TYPES.FETCH_QUERY_RESULTS,
    payload: axios.post(`api/datasets/${id}/query`, query),
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
  payload: {measureCol, range},
});


export const filterData = () => (dispatch, getState) => {
  const {queryResults, filters} = getState().visualizer;
  dispatch({
    type: ACTION_TYPES.FILTER_DATA,
    payload: queryResults.data.filter(row => {
      const filteredCols = Object.keys(filters);
      for (let i = 0; i < filteredCols.length; i++) {
        const col = filteredCols[i], filter = filters[col];
        const value = parseFloat(row[col]);
        if (value < filter[0] || value > filter[1]) {
          return false;
        }
      }
      return true;
    }),
  });
};

