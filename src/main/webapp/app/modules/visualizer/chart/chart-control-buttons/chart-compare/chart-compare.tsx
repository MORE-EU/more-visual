import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useAppDispatch } from 'app/modules/store/storeConfig';
import { setComparePopover } from 'app/modules/store/visualizerSlice';
import AddchartIcon from '@mui/icons-material/Addchart';
import {ChartComparePopover} from "app/modules/visualizer/chart/chart-control-buttons/chart-compare/chart-compare-popover";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
} as const;

export const ChartCompare = () => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
    dispatch(setComparePopover(true));
  };

  return (
    <>
      <Tooltip title="Compare Charts">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          <AddchartIcon />
        </IconButton>
      </Tooltip>
      <ChartComparePopover
        anchorEl = {anchorEl}
      />
    </>
  );
};
