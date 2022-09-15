import React, {Dispatch, SetStateAction} from 'react';
import {Box, Button, Grid, Modal, Typography} from '@mui/material';
import {updateActiveTool} from '../../visualizer.reducer';

export interface IChartDatePickerProps {
  showChangePointFunction: boolean;
  setShowChangePointFunction?: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateActiveTool: typeof updateActiveTool;
}

export const ChartChangePointFunctions = (props: IChartDatePickerProps) => {
  const {showChangePointFunction} = props;

  const handleClose = () => {
    props.setShowChangePointFunction(false);
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
      <Modal open={showChangePointFunction} onClose={handleClose} aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid item sx={{textAlign: 'center'}}>
            <Typography variant="h6" component="h2">
              Use a Function
            </Typography>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                props.setShowChangePointFunction(false), props.setOpen(true), props.updateActiveTool(2);
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
