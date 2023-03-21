import React from 'react';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useAppDispatch } from 'app/modules/store/storeConfig';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { setAutoMLToggle } from 'app/modules/store/visualizerSlice';

const AutoMLButton = () => {
  const dispatch = useAppDispatch();

  const handleOnClick = e => {
    dispatch(setAutoMLToggle());
  }

  return (
    <>
    <Tooltip title="AutoML" placement="bottom">
    <IconButton aria-label="upload picture" component="label" onClick={handleOnClick}>
      <AnalyticsIcon />
    </IconButton>
    </Tooltip>
    </>
  );
};

export default AutoMLButton;
