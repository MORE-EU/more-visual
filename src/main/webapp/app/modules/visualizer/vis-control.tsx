import React, {Dispatch, SetStateAction} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Switch, Slider, Stack, Typography, Button, ListItemIcon} from "@mui/material";
import {
  updateFilters,
  filterData,
  updateFrom,
  updateResampleFreq,
  updateSelectedMeasures,
  updateTo,
  updateChangeChart,
} from "app/modules/visualizer/visualizer.reducer";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {IQueryResults} from "app/shared/model/query-results.model";

export interface IVisControlProps {
  dataset: IDataset,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  selectedMeasures: number[],
  from: Date,
  to: Date,
  filters: any,
  queryResults: IQueryResults,
  resampleFreq: string,
  folder: any[],
  datasetChoice: any[],
  updateFrom: typeof updateFrom,
  updateTo: typeof updateTo,
  updateResampleFreq: typeof updateResampleFreq,
  updateFilters: typeof updateFilters,
  filterData: typeof filterData,
  updateChangeChart: typeof updateChangeChart,
  editDatasetChoice: Dispatch<SetStateAction<any>>,
}


export const VisControl = (props: IVisControlProps) => {
  const {dataset, selectedMeasures, from, to, queryResults, filters, folder} = props;


  const handleToggle = (col) => () => {
    const currentIndex = selectedMeasures.indexOf(col);
    const newChecked = [...selectedMeasures];

    if (currentIndex === -1) {
      newChecked.push(col);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.updateSelectedMeasures(newChecked);
  };

  const handleDataset = (idx) => {
    if(!props.datasetChoice.includes(idx)){
      props.editDatasetChoice(old => [...old, idx])
    }else{
      props.editDatasetChoice(old => old.filter(item => item !== idx))
    }
  }


  return <Grid container spacing={3}>
    {props.from && <Grid item xs={12} mt={2}><LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          renderInput={(p) => <TextField {...p} />}
          label="From"
          value={from}
          onChange={props.updateFrom}
        />
        <DateTimePicker
          renderInput={(p) => <TextField {...p} />}
          label="To"
          value={to}
          onChange={props.updateTo}
        /></Stack>
    </LocalizationProvider>
    </Grid>}
    <Grid item xs={12}>
      <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
        <InputLabel>Sample Frequency</InputLabel>
        <Select
          value={props.resampleFreq}
          label="Sample Frequency"
          onChange={(e) => props.updateResampleFreq(e.target.value)}
        >
          {/*          <MenuItem value="none">
            <em>None</em>
          </MenuItem>*/}
          <MenuItem value="second">Second</MenuItem>
          <MenuItem value="minute">Minute</MenuItem>
          <MenuItem value="hour">Hour</MenuItem>
        </Select>
        
      </FormControl>
    </Grid>
    {/* <Grid item container >
      <Grid item xs={8} >
        Normalize Data
      </Grid>
      <Grid item xs={4} >
         <Switch />  
      </Grid>
    </Grid>
     */}
     <Grid item xs={11}>
      {folder !== [] &&
      <>
      <Typography variant="h6" gutterBottom>
          Available Files
        </Typography><List disablePadding dense={true}>
            {folder.map((file, idx) => {
              return (
                <ListItem
                  key={file}
                  secondaryAction={<Checkbox
                    edge="end"
                    checked={props.datasetChoice.includes(file)}
                    onChange={() => handleDataset(file)} />}
                  disablePadding
                >
                  <ListItemText primary={`${file}`} sx={{ pl: 4 }} />
                </ListItem>
              );
            })}
          </List>
          </>
      }
     </Grid>
    <Grid item xs={11}>
      <List>
        <ListItem
            key="ok"
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={props.updateChangeChart}
              />
            }
            disablePadding
          > 
          <ListItemText primary={`Change chart view`} />
          </ListItem>
      </List>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Measures
      </Typography>
      <List dense sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 200, overflowY: "scroll"}}>
        {dataset.measures.map((col) => {
          const labelId = `checkbox-list-secondary-label-${col}`;
          return (
            <ListItem
              key={col}
              secondaryAction={
                <Checkbox
                  edge="end"
                  checked={selectedMeasures.includes(col)}
                  onChange={handleToggle(col)}
                  inputProps={{'aria-labelledby': labelId}}
                />
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText id={labelId} primary={`${dataset.header[col]}`}/>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List></Grid>
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
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
              onChangeCommitted={props.filterData}
              valueLabelDisplay="auto"
            />
            <Stack direction="row" spacing={2}>
            <TextField id="outlined-basic" label="Min-Value" variant="outlined" size="small" value={filters[col] ? filters[col][0] : stats.min} onChange={(e) => {
                props.updateFilters(col, [e.target.value, filters[col] ? filters[col][1] : stats.max]);
                props.filterData();
              }}/>
            <TextField id="outlined-basic" label="Max-Value" variant="outlined" size="small" value={filters[col] ? filters[col][1] : stats.max} onChange={(e) => {
              props.updateFilters(col, [filters[col] ? filters[col][0] : stats.min, e.target.value]);  
              props.filterData();
            }}/>
            </Stack>
            </Box>
        })}
      </List>
    </Grid>
  </Grid>;
};


export default VisControl;
