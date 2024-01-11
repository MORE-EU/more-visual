import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { getDataset, updateDatasetChoice, resetFetchData, setDatasetIsConfiged, setConnented, resetDataset } from 'app/modules/store/visualizerSlice';
import React, { useState } from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Link, useHistory } from 'react-router-dom';
import VisControlDatasetUpload from './vis-control-dataset-upload';

const VisControlDatasets = () => {
  const { folder, dataset, compare, datasetChoice, farmMeta } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const history = useHistory();
  
  const handleDataset = dataset => {
    const idx = farmMeta.data.findIndex(file => file.schema === dataset.schema && file.id === dataset.id);
    if (datasetChoice !== idx) {
      dispatch(updateDatasetChoice(idx));
    }
  };

  const handleUploadChange = e => {
    setUploadModalOpen(prev => !prev);
    setUploadFile(e.target.files);
  };

  const handleDBUpoladChange = e => {
    dispatch(updateDatasetChoice(farmMeta.data.findIndex(file => !file.isConfiged)));
    dispatch(setDatasetIsConfiged(false));
    dispatch(resetDataset());
    history.push('/visualize');
  }

  return (
    <Grid sx={{width: "100%", height: "100%"}}>
      {uploadFile && (
        <VisControlDatasetUpload
          uploadModalOpen={uploadModalOpen}
          setUploadModalOpen={setUploadModalOpen}
          uploadFile={uploadFile}
          setUploadFile={setUploadFile}
        />
      )}
      {farmMeta && (
        <>
          {dataset && (
            <Typography variant="h6" gutterBottom>
              {dataset.farmName}
            </Typography>)
          }
          <List disablePadding dense>
            {farmMeta.data.filter( file => file.isConfiged).map((file, idx) => (
              <ListItemButton
                key={idx}
                selected={datasetChoice === idx}
                component={Link}
                to={`/visualize/${folder}/${file.id}`}
                onClick={() => {
                  handleDataset(file), dispatch(getDataset({ folder, id: file.id }));
                }}
                divider
              >
              <ListItemText primary={`${file.id}`} />
                {Object.hasOwn(compare, file.id) && (
                  <Tooltip title="Currently comparing this file">
                    <ListItemIcon>
                      <CompareArrowsIcon />
                    </ListItemIcon>
                  </Tooltip>
                )}
              </ListItemButton>
            ))}
            { farmMeta.type === "csv" && (
              <ListItemButton key={'new-dataset-list-button-sd'} component="label">
                <input hidden type="file" accept=".csv" onChange={handleUploadChange} />
                <ListItemText  primary={`new dataset`} sx={ {display: { xs: 'none', md: 'block' }}} />
                <ControlPointIcon />
              </ListItemButton>
            )}
            {farmMeta.type !== "csv" && !farmMeta.isTimeSeries && (
              <ListItemButton key={'new-db-dataset-list-button-sd'} component="label" onClick={handleDBUpoladChange}>
                <ListItemText  primary={`new dataset`} sx={ {display: { xs: 'none', md: 'block' }}} />
                <ControlPointIcon />
              </ListItemButton>
            
            )}
            <ListItemButton key={'close-connection-list-button-sd'} component="label" onClick={() => { 
              dispatch(setConnented(false));
              dispatch(resetFetchData());
              history.push('/visualize');        
            }}>
                <ListItemText primary={`close connection`} sx={ {display: { xs: 'none', md: 'block' }}} />
                <LogoutIcon />
            </ListItemButton>
          </List>
        </>
      )}
    </Grid>
  );
};

export default VisControlDatasets;
