import {Box, Checkbox, Grid, Slider, Stack, Typography} from "@mui/material";
import List from "@mui/material/List";
import TextField from "@mui/material/TextField";
import React from "react";
import {IDataset} from "app/shared/model/dataset.model";
import {IQueryResults} from "app/shared/model/query-results.model";
import { filterData,
  updateFilters } from '../../visualizer.reducer';

export interface IFilterProps {
  dataset: IDataset,
  filters: any,
  queryResults: IQueryResults,
  updateFilters: typeof updateFilters,
  filterData: typeof filterData,
}

export const Filter = (props: IFilterProps) => {

  const {dataset, queryResults, filters} = props;
  const [removePoints, setRemovePoints] =  React.useState(false);

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box>
        <Typography  gutterBottom>
          Remove filtered points
        </Typography>
      <Checkbox
        checked={removePoints}
        onChange={() => setRemovePoints(!removePoints)}
      />
      </Box>
      <List dense sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        {queryResults && dataset.measures.map((col) => {
          const stats = queryResults.measureStats[col];
          return <Box key={col} sx={{width: '80%'}}>
            <Typography gutterBottom>
              {dataset.header[col]}
            </Typography>
            <Slider
              value={filters[col] || [stats.min, stats.max]}
              min={stats.min} max={stats.max}
              onChange={(e, newRange) => {
                props.updateFilters(col, newRange);
              }}
              onChangeCommitted={() => props.filterData(removePoints)}
              valueLabelDisplay="auto"
            />
            <Stack direction="row" spacing={2}>
              <TextField id="outlined-basic" label="Min-Value" variant="outlined" size="small"
                         value={filters[col] ? filters[col][0] : stats.min} onChange={(e) => {
                props.updateFilters(col, [e.target.value, filters[col] ? filters[col][1] : stats.max]);
                props.filterData(removePoints);
              }}/>
              <TextField id="outlined-basic" label="Max-Value" variant="outlined" size="small"
                         value={filters[col] ? filters[col][1] : stats.max} onChange={(e) => {
                props.updateFilters(col, [filters[col] ? filters[col][0] : stats.min, e.target.value]);
                props.filterData(removePoints);
              }}/>
            </Stack>
          </Box>
        })}
      </List>
    </Box>

  );
}

export default Filter;
