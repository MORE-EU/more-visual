import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Box, Button, Divider, Switch, Tooltip, Typography,} from "@mui/material";
import {cpDetection} from "app/modules/visualizer/visualizer.reducer";

export interface IChangepointDetectionProps {
  dataset: IDataset,
  data: any,
  changePointDates: any,
  from: Date,
  to: Date,
  cpDetection: typeof cpDetection,
}


export const ChangepointDetection = (props: IChangepointDetectionProps) => {
  const {dataset, changePointDates, from, to} = props;

  const applyCpDetection = (id) => {
    props.cpDetection(id,  from, to, changePointDates);
  }

  return (
    <Box sx={{pl: 2, pr: 2}}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Changepoint Detection
        </Typography>
        <Typography gutterBottom sx ={{fontWeight: 'bold'}}>
          Select Dates
        </Typography>
        <Divider orientation="horizontal" flexItem>
        </Divider>
      </Box>
      {dataset.washes
        &&
        <Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Predefined dates</Box>
            <Tooltip describeChild title={dataset.washes ? "Use Existing Data" : "No Data Found"}>
              <Switch
                // checked={}
                // onChange={}
                disabled={!dataset.washes}
                inputProps={{'aria-label': 'controlled'}}
              />
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            <Box sx={{pt: 1}}>Intervals on Chart</Box>
            <Tooltip describeChild
                     title={changePointDates.length == 0 ? "Use Intervals on Chart" : "Select Intervals on the Chart"}>
              <Switch
                // checked={}
                // onChange={}
                disabled={changePointDates.length === 0}
                inputProps={{'aria-label': 'controlled'}}
              />
            </Tooltip>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            justifyContent: 'flex-end',
            }}>
            <Button
              onClick = {e => applyCpDetection(dataset.id)}
            >APPLY</Button>
          </Box>
        </Box>

      }
    </Box>
  );
}

export default ChangepointDetection;

