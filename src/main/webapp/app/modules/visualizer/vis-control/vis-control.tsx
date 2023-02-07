import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Button, FormControl, Grid, Input, InputLabel, ListItemIcon, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/storeConfig';
import { getDataset, resetChartValues, updateDatasetChoice, updateResampleFreq } from '../../store/visualizerSlice';
import VisMeasures from 'app/modules/visualizer/vis-control/vis-measures';
import VisUploadDataset from './vis-upload-dataset';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


export const VisControl = () => {
  const { folder, dataset, compare, resampleFreq, datasetChoice, wdFiles } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  useEffect(() => {
    dispatch(resetChartValues());
  }, [location]);

  const handleDataset = idx => {
    if (datasetChoice !== idx) {
      dispatch(updateDatasetChoice(idx));
    }
  };

  const handleUploadChange = e => {
    setUploadModalOpen(prev => !prev);
    setUploadFile(e.target.files);
  };

  const handleEditMeasures = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEditMeasures = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // @ts-ignore
  return (
    <Grid container spacing={3}>
      <Grid item xs={11}>
        {uploadFile && (
          <VisUploadDataset
            uploadModalOpen={uploadModalOpen}
            setUploadModalOpen={setUploadModalOpen}
            uploadFile={uploadFile}
            setUploadFile={setUploadFile}
          />
        )}
        {wdFiles.length !== 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              {dataset.farmName}
            </Typography>
            <List disablePadding dense={true}>
              {wdFiles.map((file, idx) => (
                <ListItemButton
                  key={idx}
                  selected={datasetChoice === idx}
                  component={Link}
                  to={`/visualize/${folder}/${file}`}
                  onClick={() => {
                    handleDataset(idx), dispatch(getDataset({ folder, id: file }));
                  }}
                  divider
                >
                  <ListItemText primary={`${file}`} sx={{ pl: 4 }} />
                  {compare.includes(file.replace('.csv', '')) && (
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
      <Grid item xs={12}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
          <InputLabel>Sample Frequency</InputLabel>
          <Select value={resampleFreq} label="Sample Frequency" onChange={e => dispatch(updateResampleFreq(e.target.value))}>
            <MenuItem value="second">Second</MenuItem>
            <MenuItem value="minute">Minute</MenuItem>
            <MenuItem value="hour">Hour</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item container xs={12}>
        <Typography variant="h6" gutterBottom>
          Measures
        </Typography>
        <Grid item container pb={2} xs={12}>
          <VisMeasures />
        </Grid>
      </Grid>

      {/*<Grid item container xs={12}>*/}
      {/*  <ChartStatistics />*/}
      {/*</Grid>*/}
    </Grid>
  );
};

export default VisControl;
