import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAppSelector } from "app/modules/store/storeConfig";
import VisMeasuresList from "app/modules/visualizer/vis-control/measures/vis-measures-list";
import { Divider } from "@mui/material";
import { updateSelectedMeasures } from "app/modules/store/visualizerSlice";

const CustomMeasureModal = ({ open, onClose }) => {
  const [selectedMeasure1, setSelectedMeasure1] = useState('');
  const [selectedMeasure2, setSelectedMeasure2] = useState('');
  const { dataset } = useAppSelector(state => state.visualizer);

  let indexes = [dataset.header.indexOf(dataset.timeCol)];
  const shownMeasures = dataset.header.filter(function (value, index) {
    return indexes.indexOf(index) === -1;
  });

  const handleSelectedMeasure1 = (event, value) => {
    const id = dataset.header.indexOf(value);
    if (id !== -1) {
      setSelectedMeasure1(value);
    }
  }

  const handleSelectedMeasure2 = (event, value) => {
    const id = dataset.header.indexOf(value);
    if (id !== -1) {
      setSelectedMeasure2(value);
    }
  }

  const handleSave = () => {
    // Handle the selected measures and create your custom measure
    // You may want to pass this data back to your main component
    // or perform the calculation here.
    // Example: const customMeasure = selectedMeasure1 / selectedMeasure2;

    // Close the modal
    onClose();
  };

  return (
    <Dialog open={open}
            maxWidth="sm" fullWidth={true}
            onClose={onClose}>
      <DialogTitle>Create Custom Measure</DialogTitle>
      <DialogContent>
        {/* Dropdowns for selecting measures */}
        <Typography variant="subtitle1" color="textSecondary">
          Select the measures for the ratio:
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <VisMeasuresList
            width={"45%"}
            onChange={handleSelectedMeasure1}
            value={selectedMeasure1}
            options={shownMeasures}
            disabled={false}
          />
          <Typography variant="subtitle1" color="textSecondary">
            ÷
          </Typography>
          <VisMeasuresList
            width={"45%"}
            onChange={handleSelectedMeasure2}
            value={selectedMeasure2}
            options={shownMeasures}
            disabled={false}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomMeasureModal;
