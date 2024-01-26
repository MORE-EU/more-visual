import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { getDataset, updateDatasetChoice, resetFetchData, setDatasetIsConfiged, resetDataset } from 'app/modules/store/visualizerSlice';
import React from 'react';
import {useState} from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Link, useHistory } from 'react-router-dom';
import VisControlDatasetUpload from './vis-control-dataset-upload';

const VisControlDatasets = ({ isSurvey }) => {
  const { schema, dataset, compare, datasetChoice, schemaMeta } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  
  const handleDataset = dataset => {
    const idx = schemaMeta.data.findIndex(file => file.schema === dataset.schema && file.id === dataset.id);
    if (datasetChoice !== idx) {
      dispatch(updateDatasetChoice(idx));
    }
  };

  const handleUploadChange = e => {
    setUploadModalOpen(prev => !prev);
    setUploadFile(e.target.files);
  };

  const handleDBUpoladChange = e => {
    dispatch(updateDatasetChoice(schemaMeta.data.findIndex(file => !file.isConfiged)));
    dispatch(setDatasetIsConfiged(false));
    dispatch(resetDataset());
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
      {schemaMeta && (
        <>
          {dataset && (
            <Typography variant="h6" gutterBottom>
              {dataset.schemaName}
            </Typography>)
          }
          <List disablePadding dense>
            {schemaMeta.data.filter( file => file.isConfiged).map((file, idx) => (
              <ListItemButton
                key={idx}
                selected={datasetChoice === idx}
                component={Link}
                to={!isSurvey ? `/visualize/${schema}/${file.id}` : `/survey/visualize/${schema}/${file.id}`}
                onClick={() => {
                  handleDataset(file), dispatch(getDataset({ schema, id: file.id }));
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
            { schemaMeta.type === "csv" && (
              <ListItemButton key={'new-dataset-list-button-sd'} component="label">
                <input hidden type="file" accept=".csv" onChange={handleUploadChange} />
                <ListItemText  primary={`new dataset`} sx={ {display: { xs: 'none', md: 'block' }}} />
                <ControlPointIcon />
              </ListItemButton>
            )}
            {schemaMeta.type !== "csv" && !schemaMeta.isTimeSeries && (
              <ListItemButton key={'new-db-dataset-list-button-sd'} 
              component={Link}
              to={`/configure/${schema}`}
              onClick={handleDBUpoladChange}>
                <ListItemText  primary={`new dataset`} sx={ {display: { xs: 'none', md: 'block' }}} />
                <ControlPointIcon />
              </ListItemButton>            
            )}
            <ListItemButton key={'close-connection-list-button-sd'}
              component={Link}
              to={`/visualize`}
              onClick={() => {dispatch(resetFetchData());}}
            >
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
