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
import React, { useState, useEffect } from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Link, useHistory } from 'react-router-dom';
import VisControlDatasetUpload from './vis-control-dataset-upload';

const VisControlDatasets = () => {
  const { folder, dataset, compare, resampleFreq, datasetChoice, farmMeta, connected } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    if(farmMeta.type !== 'csv' && !connected) {
      dispatch(resetFetchData());
      history.push('/visualize');
    }
  },[connected]);

  const handleDataset = (idx, file) => {
    if (datasetChoice !== idx) {
      dispatch(updateDatasetChoice(idx));
      if (farmMeta.data[idx].isConfiged || farmMeta.type === "csv") {
        dispatch(getDataset({ folder, id: file.id }));
        history.push(`/visualize/${folder}/${file.id}`);
      }
      else {
        dispatch(setDatasetIsConfiged(false));
        dispatch(resetDataset());
        history.push('/visualize');
      }
    }
  };

  const handleUploadChange = e => {
    setUploadModalOpen(prev => !prev);
    setUploadFile(e.target.files);
  };

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
            {farmMeta.data.map((file, idx) => (
              <ListItemButton
                key={idx}
                selected={datasetChoice === idx}
                onClick={() => {
                  handleDataset(idx, file);
                }}
                divider
              >
                <ListItemText primary={`${file.id}`} />
                {compare.includes(file.id) && (
                  <Tooltip title="Currently comparing this file">
                    <ListItemIcon>
                      <CompareArrowsIcon />
                    </ListItemIcon>
                  </Tooltip>
                )}
              </ListItemButton>
            ))}
            { farmMeta.type === "csv" ? (
              <ListItemButton key={'new-dataset-list-button-sd'} component="label">
                <input hidden type="file" accept=".csv" onChange={handleUploadChange} />
                <ListItemText  primary={`new dataset`} sx={ {display: { xs: 'none', md: 'block' }}} />
                <ControlPointIcon />
              </ListItemButton>
            ) :  (
                <ListItemButton key={'new-dataset-list-button-sd'} component="label" onClick={() => { 
                  dispatch(setConnented(false));
                }}>
                  <ListItemText primary={`close connection`} sx={ {display: { xs: 'none', md: 'block' }}} />
                  <LogoutIcon />
              </ListItemButton>
            )}
          </List>
        </>
      )}
    </Grid>
  );
};

export default VisControlDatasets;
