import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadFile = createAsyncThunk('uploadFile', async (data: {farmName: String, fileData: FormData}, { getState, dispatch }) => {
  const {farmName, fileData} = data;
  const response = await axios
    .post(`api/files/upload/${farmName}`, fileData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        dispatch(setUploadState(progress));
      },
      onDownloadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(setUploadState(percentage))
        if (percentage === 100 || percentage === Infinity) {
            dispatch(setUploadState(100));
            setTimeout(() => {
            dispatch(setUploadState(0));
            dispatch(setLoadingButton(false));
          }, 1000);
        }
      },
    })
    .then(res => res);
  return response;
});

export const uploadFarm = createAsyncThunk('uploadFarm', async (data: FormData, { getState, dispatch }) => {
  console.log(data);
  const response = await axios
    .post(`api/files/upload/farm`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        dispatch(setUploadFarmState(progress));
      },
      onDownloadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        dispatch(setUploadFarmState(percentage))
        if (percentage === 100 || percentage === Infinity) {
            dispatch(setUploadFarmState(100));
            setTimeout(() => {
            dispatch(setUploadFarmState(0));
            dispatch(setLoadingFarmUpload(false));
          }, 1000);
        }
      },
    })
    .then(res => res);
  return response;
});

const initialState = {
    answer: null,
    uploadState: 0,
    uploadFarmState: 0,
    loadingButton: false,
    uploadLoading: false,
    saveFarmAnswer: null,
    loadingFarmUpload: false
};

const fileManagement = createSlice({
  name: 'fileManagementState',
  initialState,
  reducers: {
    setUploadState(state, action){
      state.uploadState = action.payload
    },
    setUploadFarmState(state, action){
      state.uploadFarmState = action.payload
    },
    setLoadingFarmUpload(state, action){
      state.loadingFarmUpload = action.payload
    },
    setLoadingButton(state, action){
      state.loadingButton = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(uploadFile.fulfilled, (state, action) => {
        state.answer = action.payload.data;
        state.uploadLoading = false;
    });
    builder.addCase(uploadFarm.fulfilled, (state, action) => {
        state.saveFarmAnswer = action.payload.data;
        state.uploadLoading = false;
    });
    builder.addMatcher(isAnyOf(uploadFile.pending, uploadFarm.pending), (state) => {
        state.uploadLoading = true;
    });
    builder.addMatcher(isAnyOf(uploadFile.rejected, uploadFarm.rejected), (state) => {
        state.uploadLoading = false;
        state.answer = "Error occured";
    });
  },
});

export const {setUploadState, setLoadingButton, setLoadingFarmUpload, setUploadFarmState} = fileManagement.actions;
export default fileManagement.reducer;
