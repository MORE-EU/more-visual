import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IconButton from "@mui/material/IconButton";
const CustomMeasureButton = ({ onClick }) => {


  return (
    <IconButton
      color="primary"
      onClick={onClick}
      size="large"
    >
      <AddCircleOutlineIcon/>
    </IconButton>
  );
};

export default CustomMeasureButton;
