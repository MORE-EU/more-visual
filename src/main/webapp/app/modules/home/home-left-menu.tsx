import React from 'react';
import WindPowerIcon from '@mui/icons-material/WindPower';
import EditIcon from '@mui/icons-material/Edit';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
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
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';

export const CircularProgressWithLabel = props => (
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
            // justifyContent: 'space-evenly',
            // alignItems: 'center',
            justifyContent: "center",
            borderBottom: '3px solid',
            borderBottomColor: grey[700],
          }}
        >
          {/* <Button variant="outlined" sx={menuButtonStyle} component={Link} to={'/dashboard/2'}>
            <DashboardRoundedIcon fontSize="medium" sx={{ color: grey[800], mr: 1 }} />
            Dashboard
          </Button> */}
          <Button sx={menuButtonStyle} variant="outlined" onClick={handleEditButton}>
            <EditIcon fontSize="medium" sx={{ color: grey[800], mr: 1 }} />
            Edit
          </Button>
        </Grid>
        <Grid>
          <List sx={{ width: '100%', overflow: 'hiden', height: 280 }} dense>
            <SimpleBar key="simpleBar-dataset" style={{ height: '280px' }}>
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
