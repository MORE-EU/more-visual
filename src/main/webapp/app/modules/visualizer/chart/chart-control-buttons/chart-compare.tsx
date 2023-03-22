import React from 'react';
import { Box, IconButton, ListItemText, MenuItem, Popover, Tooltip, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { setComparePopover, updateCompare } from 'app/modules/store/visualizerSlice';
import AddchartIcon from '@mui/icons-material/Addchart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const ChartCompare = () => {
  const dispatch = useAppDispatch();

  const { farmMeta, dataset, comparePopover, compare } = useAppSelector(state => state.visualizer);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
    dispatch(setComparePopover(true));
  };

  const handleOnClick = id => e => {
    dispatch(updateCompare(id));
  };

  const handleClose = () => {
    dispatch(setComparePopover(false));
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
      <Popover
        id="long-menu"
        anchorEl={anchorEl}
        open={comparePopover}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            maxHeight: 200,
            width: '10%',
            margin: '1em',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'left',
            alignItems: 'top',
            pl: 1,
            pr: 1,
            pt: 1,
          }}
        >
          <AddchartIcon sx={{ pr: 1 }} />
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, fontSize: '1em' }}>
            Compare
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'left',
            p: 1,
          }}
        >
          {farmMeta.data.map(
            (file, idx) =>
              file.id !== dataset.id && (
                <MenuItem key={`${file.id}-${idx}`} selected={compare.includes(file.id)} onClick={handleOnClick(file.id)}>
                  <ListItemText>{file.name}</ListItemText>
                  {compare.includes(file.id) ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
                </MenuItem>
              )
          )}
        </Box>
      </Popover>
    </>
  );
};
