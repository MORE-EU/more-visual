import {Checkbox, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Select} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";
import ModalStyles from "app/shared/layout/ModalStyle";


export interface IDimensionSelectorProps {
  dimensions: number[], // preselected dimensions
  setDimensions: Dispatch<SetStateAction<number[]>>,
  header: string[],
  measures: number[],
  disabled: boolean,
}

export const DimensionSelector = (props: IDimensionSelectorProps) => {
  const {dimensions, measures, header, disabled} = props;
  const classes = ModalStyles();

  const changeColumns = (e) => {
    const val = e.target.value;
    if (val[val.length - 1] === "all") {
      props.setDimensions(dimensions.length === measures.length ? [] : measures);
      return;
    }
    props.setDimensions(val);
  }
  return (
    <FormControl className={classes.formControlMulti}>
      {/*<InputLabel id="mutiple-select-label">Choose Dimensions to be Included</InputLabel>*/}
      <Select
        labelId="mutiple-select-label"
        multiple
        disabled = {disabled}
        value={dimensions}
        label="Choose Columns to be Included"
        onChange={changeColumns}
        renderValue={(selected) => selected.length === 0 ? "Choose Columns to be Included" : (selected.map(s => header[s])).join(", ")}
      >
        {measures.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={dimensions.includes(option)}/>
            </ListItemIcon>
            <ListItemText primary={header[option]}/>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default DimensionSelector;
