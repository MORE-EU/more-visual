import React from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Typography,} from "@mui/material";
import DeviationModel from "app/modules/visualizer/tools/deviation-detection/deviation-model";

export interface IDeviationDetectionProps {
  dataset: IDataset,
  data: any,
  changePointDates: any,
}


export const DeviationDetection = (props: IDeviationDetectionProps) => {
  const {dataset, changePointDates} = props;
  return (
    <Box sx={{pl: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Deviation Detection
        </Typography>
      </Box>
      {(changePointDates.length === 0)
        &&
        <Box sx={{whiteSpace: "normal"}}>
          <b>No Intervals selected</b><br></br>Select Intervals to get started.
        </Box>
      }
      {(changePointDates.length === 0)
        &&
        <Box sx={{whiteSpace: "normal"}}>
          <DeviationModel dataset={dataset}
                          changePointDates={[{"start": "2018-01-01 00:00:00", "end": "2018-01-01 10:00:00"},
                            {"start": "2018-02-01 00:00:00", "end": "2018-02-01 10:00:00"}]}
          />
        </Box>
      }

    </Box>
  );
}

export default DeviationDetection;

