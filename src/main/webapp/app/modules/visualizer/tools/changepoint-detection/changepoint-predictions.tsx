import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {
  Button,
  Checkbox, FormControl,
  Grid,
  Box,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem, Radio,
  Select,
  Typography
} from "@mui/material";
import ToolStyles from "app/shared/layout/ToolStyle";
import Scores from "app/modules/visualizer/tools/changepoint-detection/scores";
import {DateObject} from "react-multi-date-picker";

export interface IChangepointModelProps {
  dataset: IDataset,
  changePointDates: DateObject[],
}


export const ChangepointModel = (props: IChangepointModelProps) => {
  const {dataset, changePointDates} = props;
  const [features, setFeatures] = React.useState([]);
  const [trainColumn, setTrainColumn] = React.useState(-1);
  const [isTrained, setIsTrained] = React.useState(false);
  const [scores, setScores] = useState({});

  const measures = dataset.measures;
  const header = dataset.header;


  return (
    <Grid container>
      <Grid item container xs={8}>
        <Scores scores = {scores} changePointDates = {changePointDates} />
      </Grid>
    </Grid>
  );
}

export default ChangepointModel;
