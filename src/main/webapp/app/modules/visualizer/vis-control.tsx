import React from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {FormControl, Grid, InputLabel, ListItemIcon, MenuItem, Select, Tooltip, Typography} from "@mui/material";
import {
  getDataset,
  updateChangeChart,
  updateDatasetChoice,
  updateFrom,
  updateQueryResults,
  updateResampleFreq,
  updateSelectedMeasures,
  updateTo,
} from "app/modules/visualizer/visualizer.reducer";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {IQueryResults} from "app/shared/model/query-results.model";
import {Link} from "react-router-dom";

export interface IVisControlProps {
  dataset: IDataset,
  selectedMeasures: number[],
  from: Date,
  to: Date,
  queryResults: IQueryResults,
  resampleFreq: string,
  wdFiles: any[],
  folder: string,
  datasetChoice: number,
  compare: string,
  updateDatasetChoice: typeof updateDatasetChoice,
  updateFrom: typeof updateFrom,
  updateTo: typeof updateTo,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  updateResampleFreq: typeof updateResampleFreq,
  updateChangeChart: typeof updateChangeChart,
  getDataset: typeof getDataset,
  updateQueryResults: typeof updateQueryResults,
}


export const VisControl = (props: IVisControlProps) => {
  const {dataset, selectedMeasures, from, to, wdFiles, folder, compare, queryResults} = props;


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
    if (props.datasetChoice !== idx) {
      props.updateDatasetChoice(idx);
    }
  }

  return <Grid container spacing={3}>
    {/* {from && <Grid item xs={12} mt={2}><LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          renderInput={(p) => <TextField {...p} />}
          label="From"
          value={from}
          onChange={props.updateFrom}
          onClose={() => {props.updateQueryResults(folder, dataset.id, from.getTime(), to.getTime(), selectedMeasures)}}
        />
        <DateTimePicker
          renderInput={(p) => <TextField {...p} />}
          label="To"
          value={to}
          onChange={props.updateTo}
          onClose={() => {props.updateQueryResults(folder, dataset.id, from.getTime(), to.getTime(), selectedMeasures)}}
        /></Stack>
    </LocalizationProvider>
    </Grid>} */}
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
      {wdFiles !== [] &&
        <>
          <Typography variant="h6" gutterBottom>
            Available Files
          </Typography><List disablePadding dense={true}>
          {wdFiles.map((file, idx) => {
            return (
              <ListItemButton
                key={idx}
                selected={props.datasetChoice === idx}
                component={Link}
                to={`/visualize/${folder}/${file.substring(0, file.indexOf("."))}`}
                onClick={() => {
                  handleDataset(idx), props.getDataset(folder, file.substring(0, file.indexOf(".")))
                }}
                divider
              >
                <ListItemText primary={`${file}`} sx={{pl: 4}}/>
                {compare === file &&
                  <Tooltip title="Currently comparing this file">
                    <ListItemIcon>
                      <CompareArrowsIcon/>
                    </ListItemIcon>
                  </Tooltip>}
              </ListItemButton>
            );
          })}
        </List>
        </>
      }
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
  </Grid>;
};


export default VisControl;
