import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import WindPowerIcon from '@mui/icons-material/WindPower';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MapIcon from '@mui/icons-material/Map';
import { HomeFilters } from './home-filters';
import { LatLng } from 'leaflet';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';
import { bgcolor } from '@mui/system';

export interface IHomeLeftMenu {
  setFly?: Dispatch<SetStateAction<LatLng>>;
  items: any[];
  allFilters: any[];
  selected: any[];
  selectedDir: string;
  directories: any[];
  setSelected?: Dispatch<SetStateAction<any[]>>;
  setSelectedDir?: Dispatch<SetStateAction<string>>;
}

export const HomeLeftMenu = (props: IHomeLeftMenu) => {
  const { items, allFilters, selected, directories, selectedDir } = props;

  return (
    <>
      <Paper elevation={3} sx={{ position: 'fixed', top: 10, left: 10, width: 'auto', height: 'auto', zIndex: 999 }}>
        <Grid sx={{ paddingBottom: 1 }}>
          <Typography variant="h6" sx={{ padding: 1 }}>
            Dataset
          </Typography>
          <FormControl sx={{pl: 3, pr: 3, width: "80%" }}>
            <Select
              value={selectedDir}
              onChange={e => {
                props.setSelectedDir(e.target.value);
              }}
              sx={{ height: '2rem', bgcolor: "#e0e0e0" }}
            >
              {directories.map(dir => (
                <MenuItem key={`${dir}-key`} value={dir}>{dir}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <List sx={{ width: '100%', overflowY: 'scroll', maxHeight: '300px' }} dense={true}>
            {items.map((item, idx) => {
              return (
                <>
                  <ListItem key={`${item}-${idx}`}>
                    <ListItemAvatar>
                      <Avatar variant="rounded" sx={{ width: 30, height: 30, bgcolor: grey[800] }}>
                        <WindPowerIcon />
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
        <Grid sx={{ paddingTop: 1 }}>
          <Typography variant="h6" sx={{ padding: 1 }}>
            Filtering
          </Typography>
          {selected.length !== 0 && (
            <List disablePadding dense>
              {selected.map(sel => (
                <ListItem dense disablePadding key={sel}>
                  <ListItemIcon
                    onClick={() => {
                      props.setSelected(selected.filter(fil => fil !== sel));
                    }}
                  >
                    <ListItemButton>
                      <CloseIcon />
                    </ListItemButton>
                  </ListItemIcon>
                  <ListItemText primary={`${sel[0]} / ${sel[1]}`} />
                </ListItem>
              ))}
            </List>
          )}
          <HomeFilters allFilters={allFilters} setSelected={props.setSelected} selected={selected} />
        </Grid>
      </Paper>
    </>
  );
};
