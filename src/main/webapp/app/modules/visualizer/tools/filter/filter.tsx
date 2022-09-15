import React from "react";
import {Box, Button, Checkbox, Divider, Slider, Stack, Typography} from "@mui/material";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateFilters, updateQueryResults } from "app/modules/store/visualizerSlice";

export const Filter = () => {

  const { queryResults, filter, folder, dataset, from, to, resampleFreq, selectedMeasures } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box>
        <Typography gutterBottom>
          Remove filtered points
        </Typography>
        <Button variant="contained" onClick={() => 
          {dispatch(updateQueryResults({folder, id: dataset.id, from, to, resampleFreq, selectedMeasures, filter}))}} >
          Apply Filters
          </Button>
      </Box>
      <List dense sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        {queryResults && dataset.measures.map((col, idx) => {
          const stats = queryResults.measureStats[col];
          return <Box key={col} sx={{width: '80%', mt: idx > 0 ? 1 : 0}}>
            <Typography gutterBottom variant="overline" sx={{textAlign: "center", fontWeight: 900, display: "block"}}>
              {dataset.header[col]}
            </Typography>
            <Slider
              value={!filter.filterMes.includes(col) ? [stats.min, stats.max] : filter.filValues[filter.filterMes.indexOf(col)]}
              min={stats.min} max={stats.max}
              // onChange={(e, newRange) => {
              //   dispatch(updateFilters({measureCol: col, range: newRange}));
              // }}
              onChangeCommitted={(e, newRange) => dispatch(updateFilters({measureCol: col, range: newRange}))}
              valueLabelDisplay="auto"
            />
            <Stack direction="row" spacing={2}>
              <TextField id="outlined-basic" label="Min-Value" variant="outlined" size="small"
                         value={filter.filterMes.includes(col) ? parseFloat(filter.filValues[filter.filterMes.indexOf(col)][0]).toFixed(2) : parseFloat(stats.min).toFixed(2)} onChange={(e) => {
                dispatch(updateFilters({measureCol: col, range: [e.target.value, filter.filterMes.includes(col) ? filter.filValues[filter.filterMes.indexOf(col)][1] : stats.max]}));
              }}/>
              <TextField id="outlined-basic" label="Max-Value" variant="outlined" size="small"
                         value={filter.filterMes.includes(col) ? parseFloat(filter.filValues[filter.filterMes.indexOf(col)][1]).toFixed(2) : parseFloat(stats.max).toFixed(2)} onChange={(e) => {
                dispatch(updateFilters({measureCol: col, range: [filter.filterMes.includes(col) ? filter.filValues[filter.filterMes.indexOf(col)][0] : stats.min, e.target.value]}));
              }}/>
            </Stack>
            <Divider sx={{mt: 2}}/>
          </Box>
        })}
      </List>
    </Box>

  );
}

export default Filter;
