import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { getDataset, toggleYawMisalignmentDetection, updateActiveTool, updateDatasetChoice, updateDetectedChangepoints, updateSecondaryData } from 'app/modules/store/visualizerSlice';
import React, { useState } from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Link } from 'react-router-dom';
import VisControlDatasetUpload from './vis-control-dataset-upload';
import SimpleBar from "simplebar-react";
import grey from '@mui/material/colors/grey';
import { Skeleton } from '@mui/material';

const VisControlDatasets = () => {
  const { folder, dataset, compare, resampleFreq, datasetChoice, farmMeta } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  const handleDataset = (idx, fileId) => {
    if (datasetChoice !== idx) {
      dispatch(updateDatasetChoice(idx));
    }
    dispatch(getDataset({ folder, id: fileId }))
    dispatch(updateActiveTool(null));
    dispatch(updateSecondaryData(null));

    //Yaw missalignment case
    dispatch(toggleYawMisalignmentDetection(false));
    dispatch(updateDetectedChangepoints([]));
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
            {farmMeta ? farmMeta.name : <Skeleton />}
          </Typography>
          {farmMeta ? <List disablePadding dense sx={{maxHeight: "84%", border: `1px solid ${grey[300]}`, borderRadius: 2, overflowY: "auto"}}>
          <SimpleBar key="SimpleBarDatasets" style={{height: "100%"}}>
            {farmMeta.data.map((file, idx) => (
              <ListItemButton
                key={idx}
                selected={datasetChoice === idx}
                component={Link}
                to={`/visualize/${folder}/${file.id}`}
                onClick={() => {
                  handleDataset(idx, file.id);
                }}
                divider
              >
                <ListItemText primary={`${file.id}`} sx={{ pl: 4 }} />
                {Object.hasOwn(compare, file.id) && (
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
            </SimpleBar>
          </List> : <Skeleton variant="rectangular" height="84%" width="100%" />}
        </>
      )}
    </Grid>
  );
};

export default VisControlDatasets;
