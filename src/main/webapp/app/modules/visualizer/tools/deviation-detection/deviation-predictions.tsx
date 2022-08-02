import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Grid} from "@mui/material";
import {DateObject} from "react-multi-date-picker";
import Scores from "app/modules/visualizer/tools/scores";


export const DeviationModel = () => {
  return (
    <Grid container>
      <Grid item container xs={8}>
        <Scores />
      </Grid>
    </Grid>
  );
}

export default DeviationModel;
