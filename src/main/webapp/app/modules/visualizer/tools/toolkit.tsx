import * as React from 'react';
import {
  AppBarProps,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon, ListItemText, Theme, CSSObject, AppBar, CssBaseline
} from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PatternIcon from '@mui/icons-material/Pattern'; // patterns
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'; // deviation
import ManageSearchIcon from '@mui/icons-material/ManageSearch'; // changepoint
import TimelineIcon from '@mui/icons-material/Timeline'; // segmentation
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ActiveTool from "app/modules/visualizer/tools/active-tool";
import {Dispatch, SetStateAction} from "react"; // filter

const drawerWidth = 300;


const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export interface IToolkitProps {
  open?: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
}

const Toolkit = (props: IToolkitProps) => {
  const {open} = props;
  const [activeTool, setActiveTool] = React.useState(-1);

  const handleDrawer = () => {
    props.setOpen(!open);
  };

  const handleToolClick = (key) => {
    props.setOpen(true);
    setActiveTool(key);
  }
  return (
    <Box>
      <CssBaseline />
      <Drawer variant="permanent" open={open} anchor="right">
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {activeTool === -1 &&
          <List>
            <ListItem button key={0} onClick={() => handleToolClick(0)}>
              <ListItemIcon>
                <PatternIcon/>
              </ListItemIcon>
              <ListItemText primary={"Pattern Extraction"} />
            </ListItem>
          <ListItem button key={1}  onClick={() => handleToolClick(1)}>
            <ListItemIcon>
              <CompareArrowsIcon/>
            </ListItemIcon>
            <ListItemText primary={"Deviation Detection"} />
          </ListItem>
          <ListItem button key={2}  onClick={() => handleToolClick(2)}>
            <ListItemIcon>
              <ManageSearchIcon/>
            </ListItemIcon>
            <ListItemText primary={"Changepoint Detection"} />
          </ListItem>
          <ListItem button key={3} onClick={() => handleToolClick(3)}>
            <ListItemIcon>
              <TimelineIcon/>
            </ListItemIcon>
            <ListItemText primary={"Semantic Segmentation"} />
          </ListItem>
          <ListItem button key={4}  onClick={() => handleToolClick(4)}>
            <ListItemIcon>
              <FilterAltIcon/>
            </ListItemIcon>
            <ListItemText primary={"Filtering"} />
          </ListItem>
        </List>
        }
        <ActiveTool
          activeTool = {activeTool}
          setActiveTool={setActiveTool}/>
      </Drawer>
    </Box>
  );
}

export default Toolkit;
