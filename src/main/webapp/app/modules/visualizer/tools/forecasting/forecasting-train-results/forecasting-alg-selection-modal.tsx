import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { grey, red } from '@mui/material/colors';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60%",
  height: '60%',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const ForecastingAlgModal = props => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" hideBackdrop>
        <Grid sx={style}>
          <Grid sx={{ height: 'max-content', width: '100%', backgroundColor: grey[300], display: 'flex', alignItems: 'center' }}>
            <Grid sx={{ flex: 1, pl: 1 }}>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ color: grey[600] }}>
                Configuration
              </Typography>
            </Grid>
            <Grid>
              <IconButton onClick={handleClose}>
                <ClearIcon sx={{"&:hover": {color: red[400]}}}/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid sx={{ p: 2, display: 'flex' }}>
            <Grid sx={{ width: '50%' }}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Grid>
            <Grid sx={{ width: '50%' }}>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default ForecastingAlgModal;
