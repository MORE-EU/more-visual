import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Divider,
  FormControl,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import WindPowerIcon from '@mui/icons-material/WindPower';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import EditIcon from '@mui/icons-material/Edit';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { HomeFilters } from './home-filters';
import { LatLng } from 'leaflet';
import CloseIcon from '@mui/icons-material/Close';
import { grey } from '@mui/material/colors';
import { useAppSelector, useAppDispatch } from '../store/storeConfig';
import { setFly, setOpenHomeModal, setSelected, setSelectedDir } from '../store/homeSlice';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import { setLoadingButton, uploadFile } from '../store/fileManagementSlice';
import { styled } from '@mui/material/styles';

const CircularProgressWithLabel = props => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" color={props.value === 100 ? 'success' : 'primary'} {...props} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.value < 100 ? (
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      ) : (
        <DoneIcon />
      )}
    </Box>
  </Box>
);

`
  color: ${grey[700]};
  text-transform: none;
  border-radius: 20px;
  border: 1px solid rgb(0, 0, 0, 0.2);
  :hover {
    border: 2px solid rgb(95, 158, 160, 1);
    background-color: rgb(95, 158, 160, 0.2);
  }
`;

const menuButtonStyle = {
  color: grey[700],
  textTransform: 'none',
  borderRadius: 20,
  border: '1px solid rgb(0, 0, 0, 0.2)',
  ':hover': {
    border: '2px solid rgb(95, 158, 160, 1)',
    bgColor: 'rgb(95, 158, 160, 0.2)',
  },
  mr: '3px',
};

export const HomeLeftMenu = () => {
  const { directories } = useAppSelector(state => state.visualizer);
  const { selectedDir, selected, items } = useAppSelector(state => state.home);
  const { uploadState, loadingButton } = useAppSelector(state => state.fileManagement);
  const dispatch = useAppDispatch();

  const handleUploadChange = e => {
    dispatch(setLoadingButton(true));
    const files = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      files.append('files', e.target.files[i]);
    }
    files.append('farmName', selectedDir);
    const data = { farmName: selectedDir, fileData: files };
    dispatch(uploadFile(data));
  };

  const haldeListButtonCLick = (dir, idx) => e => {
    dispatch(setSelectedDir(dir));
    dispatch(setFly(new LatLng(items[idx].fly[0], items[idx].fly[1])));
  };

  const handleEditButton = () => {
    dispatch(setOpenHomeModal(true));
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          top: 10,
          left: 10,
          width: 300,
          height: 'auto',
          zIndex: 401,
          p: 1,
          backgroundColor: grey[300],
          borderRadius: 2,
        }}
      >
        <Grid
          sx={{
            pb: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            borderBottom: '3px solid',
            borderBottomColor: grey[700],
          }}
        >
          {/* <Typography variant="subtitle1" fontSize={20} fontWeight={450} sx={{ padding: 1 }}>
            Farm
          </Typography>
          <FormControl sx={{ width: 100, flex: 1, mr: 1 }} size="small">
            <Select
              value={selectedDir}
              onChange={e => {
                dispatch(setSelectedDir(e.target.value));
              }}
              sx={{ height: '2rem', bgcolor: grey[400] }}
            >
              {directories.map(dir => (
                <MenuItem key={`${dir}-key`} value={dir}>
                  {dir}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem key={'upload-new-farm'} component={Link} to={'/upload'}>
                Create new farm
              </MenuItem>
            </Select>
          </FormControl> */}
          <Button variant="outlined" sx={menuButtonStyle} component={Link} to={'/dashboard/2'}>
            <DashboardRoundedIcon fontSize="medium" sx={{ color: grey[800], mr: 1 }} />
            Dashboard
          </Button>
          <Button sx={menuButtonStyle} variant="outlined" onClick={handleEditButton}>
            <EditIcon fontSize="medium" sx={{ color: grey[800], mr: 1 }} />
            Edit
          </Button>
          {/* <IconButton size="medium" component={Link} to={'/dashboard/2'}>
            <DashboardRoundedIcon fontSize="medium" sx={{ color: grey[800] }} />
          </IconButton> */}
          {/* {!loadingButton ? (
            <Button size="medium" component="label" sx={menuButtonStyle}>
              <input hidden multiple type="file" accept=".csv" onChange={handleUploadChange} />
              <FileUploadRoundedIcon fontSize="medium" sx={{ color: grey[800] }} />
              Add
            </Button>
          ) : (
            <CircularProgressWithLabel value={uploadState} />
          )} */}
        </Grid>
        <Grid>
          <List sx={{ width: '100%', overflow: 'hiden', height: 280 }} dense>
            <SimpleBar key="simpleBar-dataset" style={{ height: '280px' }}>
              {/* {items.map((item, idx) => {
                return (
                  <>
                    <ListItemButton
                      key={`${item}-${idx}`}
                      onClick={() => {
                        dispatch(setFly(new LatLng(item.fly[0], item.fly[1])));
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar variant="rounded" sx={{ width: 30, height: 30, bgcolor: grey[800] }}>
                          <WindPowerIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name} sx={{ mr: 2, textAlign: 'center' }} />
                    </ListItemButton>
                    <Divider light />
                  </>
                );
              })} */}
              {directories.map((dir, idx) => (
                <>
                  <ListItemButton key={`${dir}-${idx}`} onClick={haldeListButtonCLick(dir, idx)} selected={dir === selectedDir}>
                    <ListItemAvatar>
                      <Avatar variant="rounded" sx={{ width: 30, height: 30, bgcolor: grey[800] }}>
                        <WindPowerIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={dir} sx={{ mr: 2, textAlign: 'center' }} />
                  </ListItemButton>
                  <Divider light />
                </>
              ))}
            </SimpleBar>
          </List>
        </Grid>
        <Grid sx={{ paddingTop: 1, borderTop: '3px solid', borderTopColor: grey[700] }}>
          {selected.length !== 0 && (
            <List disablePadding dense>
              {selected.map(sel => (
                <ListItem dense disablePadding key={sel}>
                  <ListItemIcon
                    onClick={() => {
                      dispatch(setSelected(selected.filter(fil => fil !== sel)));
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
          <HomeFilters />
        </Grid>
      </Paper>
    </>
  );
};
