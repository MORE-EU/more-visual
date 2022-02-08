import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Button, FormControl, InputLabel, ListItemIcon, ListItemText, MenuItem, Radio, Select} from "@mui/material";
import ToolStyles from "app/shared/layout/ToolStyle";
import Scores from "app/modules/visualizer/tools/scores";
import DimensionSelector from "app/shared/layout/DimensionSelector";


export interface IChangepointModelProps {
  dataset: IDataset,
  changePointDates: any,
}


export const DeviationModel = (props: IChangepointModelProps) => {
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
    if (selected.length === 0) return "Choose Columns to be Included";
    else
      return feats.join(", ");
  }

  return (
    <Box>
      <Box>
        <Box>
          <p>
            <b>Training Parameters</b>
          </p>
          <Box>
            <DimensionSelector
              dimensions={features}
              setDimensions={setFeatures}
              header={dataset.header} measures={dataset.measures}
              disabled={isTrained}
              label="Features"/>
          </Box>
          <Box sx={{pt: 2}}>
            <FormControl fullWidth>
              <InputLabel id="train">Predictor</InputLabel>
              <Select
                labelId="select-train"
                value={trainColumn}
                label="Choose Columns to be Included"
                disabled={isTrained}
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
        </Box>

        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', pt: 2}}>
          <Button
            disabled={(features.length === 0 || trainColumn === -1) || isTrained}
            sx={{flexBasis: "50%", mr: 1}}
            onClick={e => runModel(e)} variant="contained">Train</Button>
          <Button
            disabled={!isTrained}
            sx={{flexBasis: "50%", ml: 1}}
            onClick={e => setIsTrained(false)}
            variant="contained">Clear</Button>
        </Box>
      </Box>
      {isTrained &&
        <Scores
          scores={scores}
          changePointDates={changePointDates}/>
      }
    </Box>
  );
}

export default DeviationModel;
