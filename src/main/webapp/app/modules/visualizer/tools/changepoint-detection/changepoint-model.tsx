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
  const classes = ToolStyles();

  const runModel = (e) => {
    setIsTrained(true);
  }

  const renderFeatures = (selected) => {
    const feats = selected.map(s => header[s]);
    if(selected.length === 0) return "Choose Columns to be Included";
    else
      return feats.join(", ");
  }

  return (
    <Grid container>
      <Grid item container xs={8}>
        <Box className = {classes.infoBox}>
          <p style={{padding:"10px 0 0 10px"}}>
            <b>Training Parameters</b>
          </p>
          <Box>
              <FormControl className={classes.formControlMulti}>
                <InputLabel id="features">Features</InputLabel>
                <Select
                  labelId="select-features"
                  multiple
                  value={features}
                  label="Choose Columns to be Included"
                  onChange={e => setFeatures(e.target.value as number[])}
                  renderValue={(selected) => renderFeatures(selected)}>
                  {measures.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={features.includes(option)}/>
                      </ListItemIcon>
                      <ListItemText primary={header[option]}/>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControlMulti}>
                <InputLabel id="train">Predictor</InputLabel>
                <Select
                  labelId="select-train"
                  value={trainColumn}
                  label="Choose Columns to be Included"
                  onChange={e => setTrainColumn(e.target.value as number)}
                  renderValue={(selected) => header[selected]}
                >
                  {measures.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Radio checked={option === trainColumn}/>
                      </ListItemIcon>
                      <ListItemText primary={header[option]}/>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box style={{float: "right", padding: 5}}>
              <Button
                onClick={e => runModel(e)} variant="contained">Train</Button>
            </Box>

        </Box>
      </Grid>
      {isTrained &&
        <Scores scores = {scores} changePointDates = {changePointDates} />
      }
    </Grid>
  );
}

export default ChangepointModel;
