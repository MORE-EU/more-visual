import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Typography,} from "@mui/material";
import ChangepointModel from "app/modules/visualizer/tools/changepoint-detection/changepoint-model";

export interface IChangepointDetectionProps {
  dataset: IDataset,
  data: any,
  changePointDates: any,
}


export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const {dataset, changePointDates} = props;

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Changepoint Detection
        </Typography>
      </Box>
      {(changePointDates.length === 0)
        &&
        <Box sx={{whiteSpace: "normal"}}>
          <b>No Intervals selected</b><br></br>Select Intervals to get started.
        </Box>
      }
      {(changePointDates.length !== 0)
        &&
        <Box sx={{whiteSpace: "normal"}}>
          <ChangepointModel dataset={dataset}
                            changePointDates={changePointDates}
          />
        </Box>
      }

    </Box>
  );
}

export default ChangepointDetection;

