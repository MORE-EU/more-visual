import List from '@mui/material/List';
import React, {useState} from 'react';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import {updateCustomSelectedMeasures, updateSelectedMeasures} from 'app/modules/store/visualizerSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import CustomMeasureButton from "app/modules/visualizer/vis-control/measures/custom-measure-button";
import CustomMeasureModal from "app/modules/visualizer/vis-control/measures/custom-measure-modal";
import VisMeasuresList from "app/modules/visualizer/vis-control/measures/vis-measures-list";
import Box from "@mui/material/Box";

export const VisMeasures = () => {
  const { dataset, selectedMeasures, customSelectedMeasures, measureColors } = useAppSelector(state => state.visualizer);
  const [isCustomMeasureDialogOpen, setCustomMeasureDialogOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleDelete = col => () => {
    if ((selectedMeasures.length + customSelectedMeasures.length) === 1) return;
    let newSelectedMeasures = [...selectedMeasures];
    newSelectedMeasures.splice(newSelectedMeasures.indexOf(col), 1);
    dispatch(updateSelectedMeasures(newSelectedMeasures));
  };

  const handleCustomMeasureDelete = customMeasure => () => {
    if ((selectedMeasures.length + customSelectedMeasures.length) === 1) return;
    let newCustomSelectedMeasures = [...customSelectedMeasures];
    newCustomSelectedMeasures = newCustomSelectedMeasures.filter(obj => obj.measure1 !== customMeasure.measure1
    || obj.measure2 !== customMeasure.measure2);
    dispatch(updateCustomSelectedMeasures(newCustomSelectedMeasures));
  };

  const handleAddMeasure = (event, value) => {
    const id = dataset.header.indexOf(value);
    if (id !== -1) {
      let newSelectedMeasures = [...selectedMeasures];
      newSelectedMeasures.push(id);
      dispatch(updateSelectedMeasures(newSelectedMeasures));
    }
  };

  let indexes = [...selectedMeasures, dataset.header.indexOf(dataset.timeCol)];
  const shownMeasures = dataset.header.filter(function (value, index) {
    return indexes.indexOf(index) == -1;
  });


  const handleCustomMeasureClick = () => {
    // Open the custom measure dialog
    setCustomMeasureDialogOpen(true);
  };

  const handleCustomMeasureModalClose = () => {
    // Close the custom measure dialog
    setCustomMeasureDialogOpen(false);
  };
  return (
    <Grid sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Measures
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'left',
          alignItems: 'center',
          p:0,
        }}
      >
        <Tooltip title={(selectedMeasures.length + customSelectedMeasures.length === 6) ? 'You can only view up to 6 measures at a time' : ''}>
          <VisMeasuresList width={"80%"}
                           value = {null}
                           onChange={handleAddMeasure}
                           options={shownMeasures}
                           disabled={selectedMeasures.length === 6}/>
        </Tooltip>
        <CustomMeasureButton onClick={handleCustomMeasureClick} />
        <CustomMeasureModal open={isCustomMeasureDialogOpen} onClose={handleCustomMeasureModalClose} />
      </Box>
      <List dense
            sx={{ width: '100%', maxWidth: 360, mb: 3 }}>
        {selectedMeasures.map(col => {
            const labelId = `checkbox-list-secondary-label-${col}`;
            return (
              <Chip
                label={dataset.header[col]}
                key={labelId}
                sx={{bgcolor: measureColors[col], color: 'white', m: 0.5}}
                variant="outlined"
                deleteIcon={
                  <Tooltip title={(customSelectedMeasures.length + selectedMeasures.length === 1) ? 'Cannot remove last measure' : ''}>
                    <HighlightOffIcon style={{color: 'white'}}/>
                  </Tooltip>
                }
                onDelete={handleDelete(col)}
              />
            );
          }
        ).concat(customSelectedMeasures.map(customMeasure => {
          const labelId = `custom-checkbox-list-secondary-label-${customMeasure.measure1 - customMeasure.measure2}`;
          return (
            <Chip
              label={dataset.header[customMeasure.measure1] + "/" + dataset.header[customMeasure.measure2]}
              key={labelId}
              sx={{bgcolor: measureColors[customMeasure.measure1], color: 'white', m: 0.5}}
              variant="outlined"
              deleteIcon={
                <Tooltip title={(customSelectedMeasures.length + selectedMeasures.length === 1) ? 'Cannot remove last measure' : ''}>
                  <HighlightOffIcon style={{color: 'white'}}/>
                </Tooltip>
              }
              onDelete={handleCustomMeasureDelete(customMeasure)}
            />
          );
        }))
        }
      </List>
    </Grid>
  );
};

export default VisMeasures;
