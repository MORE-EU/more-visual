import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { IForecastingForm } from "app/shared/model/forecasting.model";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  forecastingLoading: false,
  results: {},
  error: null
};

export const startTraining = createAsyncThunk(
  'startTraining',
  async (config: IForecastingForm) => {
    const response = await axios
      .post(`api/grpc/train`, {
        id: uuidv4(),
        config: JSON.stringify(config),
      })
      .then(res => res);
    return response.data;
  }
);

const forecasting = createSlice({
  name: 'forecastingState',
  initialState,
  reducers: {
    // setUploadState(state, action){
    //   state.uploadState = action.payload
    // }
  },
  extraReducers(builder) {
    builder.addCase(startTraining.fulfilled, (state, action) => {
        state.results = action.payload;
        state.forecastingLoading = false;
    });
    builder.addMatcher(isAnyOf(startTraining.pending), (state) => {
        state.forecastingLoading = true;
    });
    builder.addMatcher(isAnyOf(startTraining.rejected), (state, action) => {
        state.error = action.payload;
        state.forecastingLoading = false;
    });
  },
});

export const {} = forecasting.actions;
export default forecasting.reducer;