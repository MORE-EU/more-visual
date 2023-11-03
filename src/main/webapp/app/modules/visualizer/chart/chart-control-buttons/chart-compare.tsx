import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { setComparePopover, updateCompare } from 'app/modules/store/visualizerSlice';
import AddchartIcon from '@mui/icons-material/Addchart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

export const ChartCompare = () => {
  const dispatch = useAppDispatch();

  const { farmMeta, dataset, comparePopover, compare, datasets } = useAppSelector(state => state.visualizer);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
    dispatch(setComparePopover(true));
  };

  const handleOnClick = (datasetId, measureId) => e => {
    let comp = {}
    if(Object.keys(compare).includes(datasetId)){
      if(compare[datasetId].includes(measureId)){
        if(compare[datasetId].length === 1){
          delete comp[datasetId];
          console.log(typeof comp)
        }else{
          comp = {...compare, [datasetId]: compare[datasetId].filter(entry => entry !== measureId)}
        }
      }else{
        comp = {...compare, [datasetId]: [...compare[datasetId], measureId]}
      }
    }else{
        comp = {...compare, [datasetId]: [measureId]}
    }
    dispatch(updateCompare(comp));
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
          disabled={datasets.loading}
        >
          {datasets.loading ? <CircularProgress size={20} /> : <AddchartIcon />}
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
            width: 'fit-content',
            margin: '1em',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'top',
            px: 1,
            pt: 1,
          }}
        >
          <AddchartIcon sx={{ pr: 1 }} />
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, fontSize: '1em', alignSelf: "end" }}>
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
          {datasets.data.length !== 0 &&
            datasets.data.map(
              (dat, idx) =>
                dat.id !== dataset.id && (
                  <Box key={`compare-${dat.id}-header`}>
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 600, fontSize: '1em' }}>
                      {dat.id}
                    </Typography>
                    {dat.header.map(hed => (
                      <MenuItem
                        key={`${dat.id}-${hed}`}
                        selected={Object.keys(compare).length !== 0 ? compare[dat.id].includes(dat.header.indexOf(hed)) : false}
                        onClick={handleOnClick(dat.id, dat.header.indexOf(hed))}
                      >
                        <ListItemText>{hed}</ListItemText>
                        {Object.keys(compare).length !== 0 ? (
                          compare[dat.id].includes(dat.header.indexOf(hed)) ? (
                            <CheckCircleOutlineIcon />
                          ) : (
                            <RadioButtonUncheckedIcon />
                          )
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                      </MenuItem>
                    ))}
                  </Box>
                )
            )}
          {/* {farmMeta.data.map(
            (file, idx) =>
              file.id !== dataset.id && (
                <MenuItem key={`${file.id}-${idx}`} selected={compare.includes(file.id)} onClick={handleOnClick(file.id)}>
                  <ListItemText>{file.id}</ListItemText>
                  {compare.includes(file.id) ? <CheckCircleOutlineIcon /> : <RadioButtonUncheckedIcon />}
                </MenuItem>
              )
          )} */}
        </Box>
      </Popover>
    </>
  );
};
