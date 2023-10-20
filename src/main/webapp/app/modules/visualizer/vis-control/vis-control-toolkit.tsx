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

const VisToolkit = () => {

  const {farmMeta, openToolkit, activeTool} = useAppSelector(state => state.visualizer);
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
          <List>
            <ListItemButton key={0} onClick={handleToolClick("Pattern Extraction")}>
              <ListItemIcon>
                <PatternIcon/>
              </ListItemIcon>
              <ListItemText primary={"Pattern Extraction"}/>
            </ListItemButton>
            {farmMeta.resType === 0 && <><ListItemButton key={1} onClick={handleToolClick("Soiling Detection")}>
              <ListItemIcon>
                <ManageSearchIcon/>
              </ListItemIcon>
              <ListItemText primary={"Soiling Detection"}/>
            </ListItemButton></>}
            {farmMeta.resType === 1 && <>
              <ListItemButton key={2}>
                <ListItemIcon>
                  <ManageSearchIcon/>
                </ListItemIcon>
                <ListItemText primary={"Yaw Misalignment Detection"}/>
                <YawMisalignment />
            </ListItemButton></>}
            <ListItemButton key={3} onClick={handleToolClick("Forecasting")}>
              <ListItemIcon>
                <TimelineIcon/>
              </ListItemIcon>
              <ListItemText primary={"Forecasting"}/>
            </ListItemButton>
            <ListItemButton key={4} onClick={handleToolClick("Filtering")}>
              <ListItemIcon>
                <FilterAltIcon/>
              </ListItemIcon>
              <ListItemText primary={"Filtering"}/>
            </ListItemButton>
          </List>
        </Grid>
  );
}

export default VisToolkit;
