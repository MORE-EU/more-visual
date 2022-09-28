
import List from "@mui/material/List";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import {updateSelectedMeasures} from "app/modules/store/visualizerSlice";
import {Chip, TextField} from "@mui/material";
import {Autocomplete} from "@mui/lab";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
export const VisMeasures = () => {


  const {dataset, selectedMeasures, measureColors} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleDelete = (col) => () => {
    if(selectedMeasures.length === 1) return;
    let newSelectedMeasures = [...selectedMeasures];
    newSelectedMeasures.splice(newSelectedMeasures.indexOf(col), 1);
    dispatch(updateSelectedMeasures(newSelectedMeasures));
  };

  const handleAddMeasure = (event, value) => {
    const id = dataset.header.indexOf(value);
    if (id !== -1) {
      let newSelectedMeasures = [...selectedMeasures];
      newSelectedMeasures.push(id);
      dispatch(updateSelectedMeasures(newSelectedMeasures));
    }
  }

  let indexes = [...selectedMeasures, dataset.timeCol];
  let shownMeasures = [...dataset.header];
  shownMeasures = shownMeasures.filter(function(value, index) {
    return indexes.indexOf(index) == -1;
  })

  return (
    <>
      <Autocomplete
        filterSelectedOptions
        id="combo-box-demo"
        options={shownMeasures}
        value={null}
        blurOnSelect={true}
        sx={{ width: 300 }}
        onChange={handleAddMeasure}
        renderInput={(params) =>
          <TextField {...params} label="Add Measure" />}
      />
      <List dense sx={{width: '100%',
        maxWidth: 360,
        mb: 3,
        }}>
        {
          selectedMeasures.map((col) => {
          const labelId = `checkbox-list-secondary-label-${col}`;
          return (
              <Chip label = {dataset.header[col]}
                    key = {labelId}
                    sx={{ bgcolor: measureColors[col], color: 'white' , m: 0.5}}
                    variant="outlined"

                    deleteIcon={<HighlightOffIcon style={{color:'white'}}/>}
                    onDelete={handleDelete(col)} />
          );
        })}
      </List>

    </>
  );
}

export default VisMeasures;
