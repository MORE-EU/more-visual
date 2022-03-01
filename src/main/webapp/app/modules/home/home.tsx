import './home.scss';

import React, { useEffect, useState } from 'react';
import { FarmMap } from './map/farm-map';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { getWdFiles } from 'app/modules/visualizer/visualizer.reducer';
import { RouteComponentProps } from 'react-router-dom';
import {
  Avatar,
  Button,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import { LatLng } from 'leaflet';

export interface IHomeProps extends StateProps, DispatchProps, RouteComponentProps<{ folder: string; id: string }> {}


export const Home = (props: IHomeProps) => {
  const { wdFiles } = props;

  const [fly, setFly] = useState(new LatLng(51.505, -0.09));

  useEffect(() => {
    props.getWdFiles('bbz');
  }, []);

  const items = [
    { name: 'Farm 1', fly: [51.505, -0.09] },
    { name: 'Farm 2', fly: [50.485552, 30.668372] },
    { name: 'Farm 3', fly: [38.051156, 23.812977] },
  ];

  return (
    <div>
      <Paper sx={{ position: 'fixed', top: 10, left: 10, width: 'auto', height: 'auto', zIndex: 999 }}>
        <List
          sx={{ width: '100%' }}
          dense={true}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Available Farms
            </ListSubheader>
          }
        >
          {items.map(item => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ width: 30, height: 30 }}>
                    <FactoryIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} sx={{ mr: 2 }} />
                <Tooltip title="Open Dashboard" placement="right">
                <Button sx={{ mr: 1, width: "auto" }} size="small" color="secondary" >
                  <DashboardIcon />
                </Button>
                </Tooltip>
                <Tooltip title="Show on Map" placement="right">
                <Button size="small" color="info" sx={{width: "auto"}} onClick={() => {
                  setFly(new LatLng(item.fly[0], item.fly[1]));
                }}>
                  <MapIcon />
                </Button>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Paper>
      <FarmMap fly={fly} />
    </div>
  );
};

const mapStateToProps = ({ visualizer }: IRootState) => ({
  wdFiles: visualizer.wdFiles,
});

const mapDispatchToProps = {
  getWdFiles,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
