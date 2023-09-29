import {IPatterns} from "app/shared/model/patterns.model";
import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {IPattern} from "app/shared/model/pattern.model";
import axios from "axios";
import {IPatternGroup} from "app/shared/model/pattern-group.model";

const initialState = {
  patterns: null as IPatternGroup[],

}

function getRandomInt(min, max, seed) {
  const range = max - min + 1;
  const hashedSeed = seed * 0x1fffffff + 0x3fffffff;
  const randomValue = (hashedSeed % range) + min;
  return randomValue;
}


function fetchPatternGroups(searchPatterns) {
  const patternGroups = [];
  const seedMap = new Map();

  searchPatterns.forEach((s) => {
    const seed = s.range.from + s.range.to; // Use a unique seed based on the range values

    // Generate semi-random values for 'from' and 'to' within the specified range
    const from = getRandomInt(s.range.from - 1000000000, s.range.from + 1000000000, seed);
    const to = getRandomInt(s.range.to - 1000000000, s.range.to + 1000000000, seed);

    // Check if we've generated similar patterns with the same seed before
    if (seedMap.has(seed)) {
      const similarPattern = seedMap.get(seed);
      patternGroups.push({
        id: s.id,
        color: 1,
        searchPattern: s,
        similarPatterns: [similarPattern, { range: { from, to } }],
      });
    } else {
      const similarPattern = { range: { from, to } };
      seedMap.set(seed, similarPattern);
      patternGroups.push({
        id: s.id,
        color: 1,
        searchPattern: s,
        similarPatterns: [similarPattern],
      });
    }
  });

  return patternGroups;
}





export const applySearchPatterns = createAsyncThunk(
  'applySearchPatterns',
  async (data: { datasetId: string, searchPatterns: IPattern[]}) => {
    const { searchPatterns, datasetId} = data;
    // Fetch data (replace this with your actual API call)
    // For now, let's mock some search results
    const response = Promise.all(
      searchPatterns.map(p => {
        const pattern = {
          id: p.id,
          datasetId: datasetId,
          measure: p.measure,
          range: p.range,
        }
        return axios.post(`api/tools/pattern`, pattern).then(res => res.data);
      })
    ).then(res => res.map(r => r.data));
    // return response;
    console.log(response);
    return fetchPatternGroups(searchPatterns);
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
