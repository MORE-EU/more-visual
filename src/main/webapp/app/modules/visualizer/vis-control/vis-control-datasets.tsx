import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { getDataset, updateDatasetChoice } from 'app/modules/store/visualizerSlice';
import React, { useState } from 'react';
import VisUploadDataset from './vis-control-dataset-upload';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Link } from 'react-router-dom';
import VisControlDatasetUpload from './vis-control-dataset-upload';

const VisControlDatasets = () => {
  const { folder, dataset, compare, resampleFreq, datasetChoice, farmMeta } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  const handleDataset = idx => {
    if (datasetChoice !== idx) {
      dispatch(updateDatasetChoice(idx));
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
          <Typography variant="h6" gutterBottom>
            {dataset.farmName}
          </Typography>
          <List disablePadding dense>
            {farmMeta.data.map((file, idx) => (
              <ListItemButton
                key={idx}
                selected={datasetChoice === idx}
                component={Link}
                to={`/visualize/${folder}/${file.id}`}
                onClick={() => {
                  handleDataset(idx), dispatch(getDataset({ folder, id: file.id }));
                }}
                divider
              >
                <ListItemText primary={`${file.name}`} sx={{ pl: 4 }} />
                {compare.includes(file.id) && (
                  <Tooltip title="Currently comparing this file">
                    <ListItemIcon>
                      <CompareArrowsIcon />
                    </ListItemIcon>
                  </Tooltip>
                )}
              </ListItemButton>
            ))}
            <ListItemButton key={'new-dataset-list-button-sd'} component="label">
              <input hidden type="file" accept=".csv" onChange={handleUploadChange} />
              <ListItemText primary={`new dataset`} sx={{ pl: 4 }} />
              <ControlPointIcon />
            </ListItemButton>
          </List>
        </>
      )}
    </Grid>
  );
};

export default VisControlDatasets;