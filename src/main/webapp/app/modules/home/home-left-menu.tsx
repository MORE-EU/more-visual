import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import { HomeFilters } from './home-filters';
import { LatLng } from 'leaflet';

export interface IHomeLeftMenu {
  setFly?: Dispatch<SetStateAction<LatLng>>;
  items: any[];
  allFilters: any[];
  selected: any[];
  setSelected?: Dispatch<SetStateAction<any[]>>;
}

export const HomeLeftMenu = (props: IHomeLeftMenu) => {
  const { items, allFilters, selected } = props;

  return (
    <>
      <Paper elevation={3} sx={{ position: 'fixed', top: 10, left: 10, width: 'auto', height: 'auto', zIndex: 999 }}>
        <Grid>
          <Typography variant="h6" sx={{ backgroundColor: '#78909c', fontSize: 16, fontWeight: 400, paddingLeft: 1, textAlign: 'center' }}>
            Available Farms
          </Typography>
          <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '300px' }} dense={true}>
            {items.map((item, idx) => {
              return (
                <>
                  <ListItem key={idx}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 30, height: 30 }}>
                        <FactoryIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name} sx={{ mr: 2 }} />
                    <Tooltip title="Open Dashboard" placement="right">
                      <Button sx={{ mr: 1, width: 'auto' }} size="small" color="secondary">
                        <DashboardIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Show on Map" placement="right">
                      <Button
                        size="small"
                        color="info"
                        sx={{ width: 'auto' }}
                        onClick={() => {
                          props.setFly(new LatLng(item.fly[0], item.fly[1]));
                        }}
                      >
                        <MapIcon />
                      </Button>
                    </Tooltip>
                  </ListItem>
                  <Divider light />
                </>
              );
            })}
          </List>
        </Grid>
        <Grid>
          <HomeFilters allFilters={allFilters} setSelected={props.setSelected} selected={selected} />
        </Grid>
      </Paper>
    </>
  );
};
