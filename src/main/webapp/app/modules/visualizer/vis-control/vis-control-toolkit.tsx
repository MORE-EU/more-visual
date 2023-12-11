import React from 'react';

import PatternIcon from '@mui/icons-material/Pattern'; // patterns
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; // changepoint
import TimelineIcon from '@mui/icons-material/Timeline'; // segmentation
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { setOpenToolkit, updateActiveTool } from 'app/modules/store/visualizerSlice';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import {YawMisalignment} from "app/modules/visualizer/tools/yaw-misalignment/yaw-misalignment";
import ListItem from '@mui/material/ListItem';
import { Skeleton } from '@mui/material';

const VisToolkit = () => {

  const {farmMeta, dataset, data} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleToolClick = key => e => {
    dispatch(setOpenToolkit(true));
    dispatch(updateActiveTool(key));
  }
  return (
        <Grid sx={{height: "100%", width: "100%"}}>
          <Typography variant="h6" gutterBottom>
          Tools
          </Typography>
          {farmMeta && dataset ? <List>
            <ListItemButton key={0} onClick={handleToolClick("Pattern Extraction")} disabled={dataset.id !== "eugene" || data === null}>
              <ListItemIcon>
                <PatternIcon/>
              </ListItemIcon>
              <ListItemText primary={"Pattern Extraction"}/>
            </ListItemButton>
            <ListItemButton key={1} onClick={handleToolClick("Soiling Detection")} disabled={farmMeta.resType !== 0 || data === null}>
              <ListItemIcon>
                <ManageSearchIcon/>
              </ListItemIcon>
              <ListItemText primary={"Soiling Detection"}/>
            </ListItemButton>
            <ListItemButton key={2} onClick={handleToolClick("Yaw Misalignment Detection")} disabled={dataset.id !== "BEZ2" || data === null}>
                <ListItemIcon>
                  <ManageSearchIcon/>
                </ListItemIcon>
                <ListItemText primary={"Yaw Misalignment Detection"}/>
            </ListItemButton>
            <ListItemButton key={3} onClick={handleToolClick("Forecasting")} disabled={dataset.id !== "bbz1big" || data === null}>
              <ListItemIcon>
                <TimelineIcon/>
              </ListItemIcon>
              <ListItemText primary={"Forecasting"}/>
            </ListItemButton>
            <ListItemButton key={4} onClick={handleToolClick("Filtering")} disabled={data === null}>
              <ListItemIcon>
                <FilterAltIcon/>
              </ListItemIcon>
              <ListItemText primary={"Filtering"}/>
            </ListItemButton>
          </List> : <Skeleton variant='rounded' height="90%" width="100%" />}
        </Grid>
  );
}

export default VisToolkit;
