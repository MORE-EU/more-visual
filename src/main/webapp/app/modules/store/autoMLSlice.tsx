import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

const autoML = createSlice({
  name: 'autoMLState',
  initialState,
  reducers: {
    // setUploadState(state, action){
    //   state.uploadState = action.payload
    // }
  },
  extraReducers(builder) {
    // builder.addCase(uploadDataset.fulfilled, (state, action) => {
    //     state.saveDatasetAnswer = action.payload;
    //     state.uploadLoading = false;
    // });
    // builder.addMatcher(isAnyOf(uploadFile.pending, uploadFarm.pending, uploadDataset.pending), (state) => {
    //     state.uploadLoading = true;
    // });
    // builder.addMatcher(isAnyOf(uploadFile.rejected, uploadFarm.rejected, uploadDataset.rejected), (state) => {
    //     state.uploadLoading = false;
    //     state.answer = "Error occured";
    // });
  },
});

export const {} = autoML.actions;
export default autoML.reducer;