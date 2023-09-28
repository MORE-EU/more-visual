import {IPatterns} from "app/shared/model/patterns.model";
import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {IPattern} from "app/shared/model/pattern.model";
import axios from "axios";
import {IPatternGroup} from "app/shared/model/pattern-group.model";

const initialState = {
  patterns: null as IPatternGroup[],

}

export const applySearchPatterns = createAsyncThunk(
  'applySearchPatterns',
  async (data: { folder: string; id: string[]; searchPatterns: IPattern[]}) => {
    const { searchPatterns , folder, id} = data;
    // Fetch data (replace this with your actual API call)
    // For now, let's mock some search results
    const response = Promise.all(
      searchPatterns.map(pattern => {
        return axios.post(`api/tools/pattern`, pattern).then(res => res.data);
      })
    ).then(res => res.map(r => r.data));
    // return response;
    console.log(response);
    return searchPatterns.map((s) => {
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
);

const patternExtraction = createSlice({
  name: 'VisualizerState',
  initialState,
  reducers: {
    updatePatterns(state, action) {
      state.patterns = action.payload;
    },
    removePattern(state, action){
      state.patterns = state.patterns.filter(item => item.id !== action.payload.id)
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
