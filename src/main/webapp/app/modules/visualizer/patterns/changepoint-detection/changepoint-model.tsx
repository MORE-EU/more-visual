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
import ToolStyles from "app/shared/layout/ToolStyle";

export interface IChangepointModelProps {
  dataset: IDataset,
}


export const ChangepointModel = (props: IChangepointModelProps) => {
  const {dataset} = props;
  const [features, setFeatures] = React.useState([]);
  const [trainColumn, setTrainColumn] = React.useState(0);
  const [isTrained, setIsTrained] = React.useState(false);

  const header = dataset.header;

  const classes = ToolStyles();

  const runModel = (e) => {
    setIsTrained(true);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Changepoint Detection Model
        </Typography>
      </Grid>
      <div className = {classes.infoBox}>
        <p>
          Training Parameters
        </p>
        <div>
        <div>
          <FormControl className={classes.formControlMulti}>
            <InputLabel id="features">Features</InputLabel>
            <Select
              labelId="select-featurs"
              multiple
              value={features}
              label="Choose Columns to be Included"
              onChange={e => setFeatures(e.target.value as string[])}
              renderValue={(selected) => selected.length === 0 ? "Choose Columns to be Included" : selected.join(", ")}
            >
              {header.map((option) => (
                <MenuItem key={option} value={option}>
                  <ListItemIcon>
                    <Checkbox checked={features.includes(option)}/>
                  </ListItemIcon>
                  <ListItemText primary={option}/>
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
              {header.map((option, index) => (
                <MenuItem key={index} value={index}>
                  <ListItemIcon>
                    <Radio checked={index === trainColumn}/>
                  </ListItemIcon>
                  <ListItemText primary={option}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div style={{float:"right", padding:5}}>
          <Button onClick={e => runModel(e)} variant="contained">Train</Button>
        </div>
        </div>
      </div>
      {isTrained && <div></div>}
      {isTrained && <Grid container item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Make Predictions
          </Typography>
        </Grid>
      </Grid>}
    </Grid>
  );
}

export default ChangepointModel;
