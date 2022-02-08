import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Grid} from "@mui/material";
import {DateObject} from "react-multi-date-picker";
import Scores from "app/modules/visualizer/tools/scores";

export interface IDeviationModelProps {
  dataset: IDataset,
  changePointDates: DateObject[],
}


export const DeviationModel = (props: IDeviationModelProps) => {
  const {dataset, changePointDates} = props;

  const [scores, setScores] = useState({});


  return (
    <Grid container>
      <Grid item container xs={8}>
        <Scores scores={scores} changePointDates={changePointDates}/>
      </Grid>
    </Grid>
  );
}

export default DeviationModel;
