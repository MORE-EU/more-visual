import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import {styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PatternIcon from '@mui/icons-material/Pattern'; // patterns
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; // deviation
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

// const drawerWidth = "15%";


// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(9)} + 1px)`,
//   },
// });

// const DrawerHeader = styled('div')(({theme}) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
//   ({theme, open}) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

const VisToolkit = () => {

  const {dataset, openToolkit, activeTool} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  // const handleDrawer = () => {
  //   dispatch(setOpenToolkit(!openToolkit));
  //   dispatch(updateActiveTool(null));
  // };

  const handleToolClick = key => e => {
    dispatch(setOpenToolkit(true));
    dispatch(updateActiveTool(key));
  }
  return (
    // <Box>
    //   <CssBaseline/>
    //   <Drawer variant="permanent" open={openToolkit} anchor="right">
    //     <DrawerHeader>
    //       {openToolkit && <Typography variant="subtitle1" fontSize={20} fontWeight={600}>
    //       Tools
    //       </Typography>}
    //       <IconButton onClick={handleDrawer}>
    //         {openToolkit ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
    //       </IconButton>
    //     </DrawerHeader>
    //     {activeTool === -1 &&
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
            {dataset.resType === 0 && <><ListItemButton key={1} onClick={handleToolClick("Soiling Detection")}>
              <ListItemIcon>
                <ManageSearchIcon/>
              </ListItemIcon>
              <ListItemText primary={"Soiling Detection"}/>
            </ListItemButton></>}
            {dataset.resType === 1 && <><ListItemButton key={2} onClick={handleToolClick("Yaw Misalignment")}>
              <ListItemIcon>
                <ManageSearchIcon/>
              </ListItemIcon>
              <ListItemText primary={"Yaw Misalignment"}/>
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
            <ListItemButton key={5} onClick={handleToolClick("AutoML")}>
              <ListItemIcon>
                <AnalyticsIcon/>
              </ListItemIcon>
              <ListItemText primary={"AutoML"}/>
            </ListItemButton>
          </List>     
        </Grid>
    //     }
    //     <ActiveTool />
    //   </Drawer>
    // </Box>
  );
}

export default VisToolkit;
