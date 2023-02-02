import React, {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useAppSelector} from "app/modules/store/storeConfig";


export interface IMeasureSeletionProps {
  label: string,

}
export const MeasureSelection = (props: IMeasureSeletionProps) => {
  const {dataset, selectedMeasures} = useAppSelector(state => state.visualizer);

  const {label} = props;
  const [measure, setMeasure] = useState();

  const handleChange = (e) => {
    setMeasure(e.target.value);
  }

  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={measure}
          onChange={handleChange}
          label="Age"
        >
          {selectedMeasures.map((measure, idx) => <MenuItem value={idx}>{dataset.header[measure]}</MenuItem>)}
        </Select>
      </FormControl>
    </Box>
  );
}
