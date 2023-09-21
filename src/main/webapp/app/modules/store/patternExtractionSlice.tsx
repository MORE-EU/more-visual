import {IPatterns} from "app/shared/model/patterns.model";
import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {IPattern} from "app/shared/model/pattern.model";
import {IPatternGroup} from "app/shared/model/pattern-group.model";

const initialState = {
  patterns: null as IPatterns,

}

export const applySearchPatterns = createAsyncThunk(
  'applySearchPatterns',
  async (data: { searchPatterns: IPattern[]}) => {
    const { searchPatterns } = data;
    // Fetch data (replace this with your actual API call)
    // For now, let's mock some search results
    return  { patternGroups: searchPatterns.map((s) => {
        return {
          id: s.id,
          color: 1,
          searchPattern: s,
          similarPatterns: [
            {
              range: {
                from: s.range.from + 1000000000,
                to: s.range.to + 1000000000,
              },
            },
            {
              range: {
                from: s.range.from - 1000000000,
                to: s.range.to - 1000000000,
              },
            },
          ],
        } as IPatternGroup;
      })
    }
  }
);

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
