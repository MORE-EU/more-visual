import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import {FormControl, Grid, InputLabel, ListItemIcon, MenuItem, Select, Tooltip, Typography} from "@mui/material";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {Link, useLocation} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { getDataset, resetChartValues, updateDatasetChoice, updateResampleFreq, updateSelectedMeasures } from '../store/visualizerSlice';

export const VisControl = () => {

  const { folder, dataset, selectedMeasures, compare, datasetChoice, resampleFreq, wdFiles } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetChartValues());
  }, [location])


  const handleToggle = (col) => () => {
    const currentIndex = selectedMeasures.indexOf(col);
    const newChecked = [...selectedMeasures];
    if (currentIndex === -1) {
      newChecked.push(col);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    dispatch(updateSelectedMeasures(newChecked));
  };

  const handleDataset = (idx) => {
    if (datasetChoice !== idx) {
      dispatch(updateDatasetChoice(idx));
    }
  }

  // @ts-ignore
  return <Grid container spacing={3}>
    <Grid item xs={12}>
      <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
        <InputLabel>Sample Frequency</InputLabel>
        <Select
          value={resampleFreq}
          label="Sample Frequency"
          onChange={(e) => dispatch(updateResampleFreq(e.target.value))}
        >
          <MenuItem value="second">Second</MenuItem>
          <MenuItem value="minute">Minute</MenuItem>
          <MenuItem value="hour">Hour</MenuItem>
        </Select>

      </FormControl>
    </Grid>
    <Grid item xs={11}>
        <>
          <Typography variant="h6" gutterBottom>
            {dataset.farmName}
          </Typography><Lnpist disablePadding dense={true}>
          {wdFiles.map((file, idx) => {
            return (
              <ListItemButton
                key={idx}
                selected={datasetChoice === idx}
                component={Link}
                to={`/visualize/${folder}/${file.substring(0, file.indexOf("."))}`}
                onClick={() => {
                  handleDataset(idx), dispatch(getDataset({folder, id: file.substring(0, file.indexOf("."))}))
                }}
                divider
              >
                <ListItemText primary={`${file}`} sx={{pl: 4}}/>
                {compare.includes(file.replace(".csv", "")) &&
                  <Tooltip title="Currently comparing this file">
                    <ListItemIcon>
                      <CompareArrowsIcon/>
                    </ListItemIcon>
                  </Tooltip>}
              </ListItemButton>
            );
          })}
        </Lnpist>
        </>
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
