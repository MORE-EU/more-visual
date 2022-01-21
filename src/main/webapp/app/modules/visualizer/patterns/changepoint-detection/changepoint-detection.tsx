import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {
  Button,
  Checkbox, FormControl,
  Grid,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem, Radio,
  Select,
  Typography
} from "@mui/material";
import ModalStyles from "app/shared/layout/ModalStyle";
import ChangepointPicker from "app/modules/visualizer/patterns/changepoint-detection/changepoint-picker";
import ChangepointModel from "app/modules/visualizer/patterns/changepoint-detection/changepoint-model";


export interface IChangepointDetectionProps {
  dataset: IDataset,
  data: any,
  from: Date,
  to: Date,
}


export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const {dataset, to, from} = props;
  const [features, setFeatures] = React.useState([]);
  const [trainColumn, setTrainColumn] = React.useState(0);
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <Grid container >
      <ChangepointPicker from = {from} to = {to}
                         selectedDates = {selectedDates} setSelectedDates = {setSelectedDates}/>
      <ChangepointModel dataset={dataset}/>
    </Grid>
  );
}

export default ChangepointDetection;

