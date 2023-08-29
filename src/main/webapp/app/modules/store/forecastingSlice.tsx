import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { IForecastingForm } from 'app/shared/model/forecasting.model';
import { IForecastingData, IForecastingDataDefault, IForecastingResults } from 'app/shared/model/forecastingData.model';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  forecastingLoading: false,
  forecastingData: IForecastingDataDefault as IForecastingData,
  forecastingError: null,
  forecastingInitialSeries: null,
  savedModels: null,
};

const resultsMaker = (state, payload: IForecastingResults) => {
  return { ...state, [payload.target]: payload.metrics };
};

const requestTargetsData = (response, getState, dispatch) => {
  Object.keys(response.data).forEach(key => {
    if (response.data[key] === 'done') {
      dispatch(getTarget(key));
    }
  });
};

export const startTraining = createAsyncThunk('startTraining', async (config: IForecastingForm, { getState, dispatch }) => {
  const state: any = getState();
  const id = uuidv4();
  localStorage.setItem('id', id);
  dispatch(setForecastingData({ ...state.forecasting.forecastingData, id: id }));
  const response = await axios
    .post(`api/forecasting/train`, {
      id,
      config: JSON.stringify(config),
    })
    .then(res => res);
  dispatch(getProgress());
  return response.data;
});

export const getProgress = createAsyncThunk('getProgress', async (_, { getState, dispatch }) => {
  const id = localStorage.getItem('id');
  const response = await axios
    .post(`api/forecasting/progress`, {
      id,
    })
    .then(res => res);
  requestTargetsData(response.data, getState, dispatch);
  return response.data;
});

export const getTarget = createAsyncThunk('getTarget', async (name: string) => {
  const target = { name, id: localStorage.getItem('id') };
  const response = await axios.post(`api/forecasting/target`, target).then(res => res.data as IForecastingResults);
  return response;
});

export const saveModel = createAsyncThunk('saveModel', async (modelInfo: { model_type; model_name; target }) => {
  const response = await axios.post(`api/forecasting/save`, modelInfo).then(res => res.data);
  return response;
});

export const getSavedModels = createAsyncThunk('getSavedModels', async () => {
  const response = await axios.get(`api/forecasting/models`).then(res => res.data);
  return response;
});

export const deleteModelByName = createAsyncThunk('deleteModelByName', async (modelName: String) => {
  const response = await axios.delete(`api/forecasting/models/${modelName}`).then(res => res.data);
  return response;
});

export const getInitialSeries = createAsyncThunk(
  'getInitialSeries',
  async (data: { from; to; folder; id; measure }, { getState, dispatch }) => {
    const { from, to, folder, id, measure } = data;
    const state: any = getState();
    const query = {
      range: { from, to },
      frequency: 'MINUTE',
      measures: [state.visualizer.dataset.header.indexOf(measure)],
      filter: null,
    };
    const response = await axios.post(`api/datasets/${folder}/${id}/query`, query).then(res => res);
    return response.data;
  }
);

const forecasting = createSlice({
  name: 'forecastingState',
  initialState,
  reducers: {
    setForecastingData(state, action) {
      state.forecastingData = action.payload;
    },
    setForecastingInitialSeries(state, action) {
      state.forecastingInitialSeries = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(startTraining.fulfilled, (state, action) => {
      state.forecastingLoading = false;
    });
    builder.addCase(getInitialSeries.fulfilled, (state, action) => {
      state.forecastingLoading = false;
      state.forecastingInitialSeries = action.payload.data;
    });
    builder.addCase(getProgress.fulfilled, (state, action) => {
      state.forecastingLoading = false;
      state.forecastingData = { ...state.forecastingData, status: action.payload.data };
    });
    builder.addCase(getTarget.fulfilled, (state, action) => {
      state.forecastingLoading = false;
      state.forecastingData.results = resultsMaker(state.forecastingData.results, action.payload);
    });
    builder.addMatcher(isAnyOf(saveModel.fulfilled, getSavedModels.fulfilled, deleteModelByName.fulfilled), (state, action) => {
      state.forecastingLoading = false;
      state.savedModels = action.payload;
    });
    builder.addMatcher(
      isAnyOf(
        deleteModelByName.pending,
        startTraining.pending,
        getProgress.pending,
        getTarget.pending,
        getInitialSeries.pending,
        saveModel.pending
      ),
      state => {
        state.forecastingLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        deleteModelByName.rejected,
        startTraining.rejected,
        getProgress.rejected,
        getTarget.rejected,
        getInitialSeries.rejected,
        saveModel.rejected
      ),
      (state, action) => {
        state.forecastingError = action.payload;
        state.forecastingLoading = false;
      }
    );
  },
});

export const { setForecastingData, setForecastingInitialSeries } = forecasting.actions;
export default forecasting.reducer;
