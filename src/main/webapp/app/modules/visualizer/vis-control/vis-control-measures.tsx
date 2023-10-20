import List from '@mui/material/List';
import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateSelectedMeasures } from 'app/modules/store/visualizerSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
export const VisMeasures = () => {
  const { dataset, selectedMeasures, measureColors } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleDelete = col => () => {
    if (selectedMeasures.length === 1) return;
    let newSelectedMeasures = [...selectedMeasures];
    newSelectedMeasures.splice(newSelectedMeasures.indexOf(col), 1);
    dispatch(updateSelectedMeasures(newSelectedMeasures));
  };

  const handleAddMeasure = (event, value) => {
    const id = dataset.header.indexOf(value);
    if (id !== -1) {
      let newSelectedMeasures = [...selectedMeasures];
      newSelectedMeasures.push(id);
      dispatch(updateSelectedMeasures(newSelectedMeasures));
    }
  };

  let indexes = [...selectedMeasures, dataset.timeCol];
  let shownMeasures = [...dataset.header];
  shownMeasures = shownMeasures.filter(element => element !== dataset.timeCol);
  shownMeasures = shownMeasures.filter(function (value, index) {
    return indexes.indexOf(index) == -1;
  });

  return (
    <Grid sx={{ height: '100%', width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Measures
      </Typography>
      <Tooltip title={selectedMeasures.length === 6 ? 'You can only view up to 6 measures at a time' : ''}>
        <Autocomplete
          filterSelectedOptions
          id="combo-box-demo"
          options={shownMeasures}
          value={null}
          disabled={selectedMeasures.length === 6}
          blurOnSelect={true}
          sx={{ width: '100%' }}
          onChange={handleAddMeasure}
          renderInput={params => <TextField {...params} label={'Add Measure'} />}
        />
      </Tooltip>
      <List dense sx={{ width: '100%', maxWidth: 360, mb: 3 }}>
        {selectedMeasures.map(col => {
          const labelId = `checkbox-list-secondary-label-${col}`;
          return (
            <Chip
              label={dataset.header[col]}
              key={labelId}
              sx={{ bgcolor: measureColors[col], color: 'white', m: 0.5 }}
              variant="outlined"
              deleteIcon={
                <Tooltip title={selectedMeasures.length === 1 ? 'Cannot remove last measure' : ''}>
                  <HighlightOffIcon style={{ color: 'white' }} />
                </Tooltip>
              }
              onDelete={handleDelete(col)}
            />
          );
        })}
      </List>
    </Grid>
  );
};

export default VisMeasures;
