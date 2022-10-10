import React from 'react';
import { IconButton, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { setCompare, updateCompare } from 'app/modules/store/visualizerSlice';
import AddchartIcon from '@mui/icons-material/Addchart';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
  const { wdFiles, dataset, showCompare, compare } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    dispatch(setCompare(true));
  };

  const handleOnClick = e => {
    dispatch(updateCompare(e.target.innerText.replace('.csv', '')));
  };

  const handleClose = () => {
    dispatch(setCompare(false));
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
          onClick={handleClick}
          sx={{ ml: 5 }}
        >
          <AddchartIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={showCompare}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: '20ch',
          },
        }}
      >
        {wdFiles.map(
          (file, idx) =>
            file.replace('.csv', '') !== dataset.id && (
              <MenuItem key={`${file}-${idx}`} selected={compare.includes(file.replace('.csv', ''))} onClick={handleOnClick}>
                <ListItemText>{file}</ListItemText>
                {compare.includes(file.replace('.csv', '')) ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
              </MenuItem>
            )
        )}
      </Menu>
    </>
  );
};
