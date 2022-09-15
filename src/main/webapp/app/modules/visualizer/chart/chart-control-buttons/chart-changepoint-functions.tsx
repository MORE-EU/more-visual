import React from 'react';
import {Box, Button, Grid, Modal, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { setOpen, setShowChangePointFunction, updateActiveTool } from 'app/modules/store/visualizerSlice';

export const ChartChangePointFunctions = () => {

  const { showChangePointFunction } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setShowChangePointFunction(false));
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  } as const;

  return (
    <>
      <Modal open={showChangePointFunction} onClose={handleClose} aria-labelledby="modal-title"
             aria-describedby="modal-description">
        <Box sx={style}>
          <Grid item sx={{textAlign: 'center'}}>
            <Typography variant="h6" component="h2">
              Use a Function
            </Typography>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                dispatch(setShowChangePointFunction(false)), dispatch(setOpen(true)), dispatch(updateActiveTool(2));
              }}
            >
              <Typography variant="overline" component="h2">
                Changepoint detection
              </Typography>
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
