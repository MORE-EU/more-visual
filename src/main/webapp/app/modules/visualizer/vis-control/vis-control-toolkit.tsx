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
import { YawMisalignment } from 'app/modules/visualizer/tools/yaw-misalignment/yaw-misalignment';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import SimpleBar from 'simplebar-react';
import Divider from '@mui/material/Divider';
import grey from '@mui/material/colors/grey';
import Tooltip from '@mui/material/Tooltip';

const VisToolkit = () => {
  const { farmMeta, dataset, data } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleToolClick = key => e => {
    dispatch(setOpenToolkit(true));
    dispatch(updateActiveTool(key));
  };
  return (
    <Grid sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ height: '10%' }}>
        <Typography variant="h6" gutterBottom>
          Tools
        </Typography>
      </Box>
      {farmMeta && dataset ? (
        <SimpleBar key="SimpleBarTools" style={{ maxHeight: '90%', border: `1px solid ${grey[300]}`, borderRadius: 10 }}>
          <Box sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
            <List disablePadding>
              {/* <ListItemButton key={0} onClick={handleToolClick("Pattern Extraction")} disabled={dataset.id !== "eugene" || data === null}>
              <ListItemIcon>
                <PatternIcon/>
              </ListItemIcon>
              <ListItemText primary={"Pattern Extraction"}/>
            </ListItemButton>
            <Divider /> */}
              <Tooltip
                placement="right"
                title={
                  farmMeta.resType === 0
                    ? dataset.id === 'eugene' || dataset.id === 'cocoa'
                      ? ''
                      : 'This tool is unavailable for this dataset'
                    : 'This tool is available for solar farms only'
                }
              >
                <ListItemButton key={1} onClick={handleToolClick('Soiling Detection')} disabled={farmMeta.resType !== 0 || data === null}>
                  <ListItemIcon>
                    <ManageSearchIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Soiling Detection'} />
                </ListItemButton>
              </Tooltip>
              <Divider />
              <ListItemButton
                key={2}
                onClick={handleToolClick('Yaw Misalignment Detection')}
                disabled={dataset.id !== 'BEZ2' || data === null}
              >
                <ListItemIcon>
                  <ManageSearchIcon />
                </ListItemIcon>
                <ListItemText primary={'Yaw Misalignment Detection'} />
              </ListItemButton>
              <Divider />
              <ListItemButton key={3} onClick={handleToolClick('Forecasting')} disabled={dataset.id !== 'bbz1big' || data === null}>
                <ListItemIcon>
                  <TimelineIcon />
                </ListItemIcon>
                <ListItemText primary={'Forecasting'} />
              </ListItemButton>
              <Divider />
              <ListItemButton key={4} onClick={handleToolClick('Filtering')} disabled={data === null}>
                <ListItemIcon>
                  <FilterAltIcon />
                </ListItemIcon>
                <ListItemText primary={'Filtering'} />
              </ListItemButton>
            </List>
          </Box>
        </SimpleBar>
      ) : (
        <Skeleton variant="rounded" height="90%" width="100%" />
      )}
    </Grid>
  );
};

export default VisToolkit;
