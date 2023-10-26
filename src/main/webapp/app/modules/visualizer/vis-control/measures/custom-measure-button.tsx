import React from 'react';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from "@mui/material/IconButton";
const CustomMeasureButton = ({ onClick }) => {


  return (
    <IconButton
      color="primary"
      onClick={onClick}
      size="large"
    >
      <TuneIcon/>
    </IconButton>
  );
};

export default CustomMeasureButton;
