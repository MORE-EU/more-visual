import {IPatterns} from "app/shared/model/patterns.model";
import {createSlice, isAnyOf} from "@reduxjs/toolkit";
import {applySearchPatterns} from "app/modules/store/visualizerSlice";

const initialState = {
  patterns: null as IPatterns,

}
const patternExtraction = createSlice({
  name: 'VisualizerState',
  initialState,
  reducers: {
    updatePatterns(state, action) {
      state.patterns = action.payload;
    },
    removePattern(state, action){
      state.patterns.patternGroups = state.patterns.patternGroups.filter(item => item.id !== action.payload.id)
    }
  },
  extraReducers: function (builder) {
    builder.addMatcher(isAnyOf(applySearchPatterns.fulfilled), (state, action) => {
      state.patterns = action.payload === null ? null : action.payload;
    });
  }
});


export const {
  updatePatterns,
  removePattern,
} = patternExtraction.actions;

export default patternExtraction.reducer;
