import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import React, { useState, useEffect } from 'react';
import ConnectorFarmSelection from './connector-farm-selection';
import ConnectorDBConfig from './connector-db-config';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { setCheckConnectionResponse } from '../store/visualizerSlice';

const Connector = () => {
  const { checkConnectionError, checkConnectionResponse } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [selectedItem, setSelectedItem] = useState(null);
  const [openSnack, setOpenSnack] = React.useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  useEffect(() => {
    if (checkConnectionResponse) {
      if (checkConnectionError) {
        dispatch(setCheckConnectionResponse(null));
      } else {
        setOpenSnack(true);
      }
    }
  }, [checkConnectionResponse]);

  const handleButton = method => e => {
    setSelectedItem(method);
    dispatch(setCheckConnectionResponse(null));
  };

  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
          {checkConnectionError ? (
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
              {checkConnectionResponse}
            </Alert>
          ) : (
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {checkConnectionResponse}
            </Alert>
          )}
        </Snackbar>
        <Box sx={{ height: '10%', width: '100%', backgroundColor: grey[800], display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="overline" fontSize={20} sx={{ width: 'fit-content', textDecoration: 'none', color: grey[300], m: 'auto' }}>
            Select Connection
          </Typography>
        </Box>
        <Box sx={{ height: '90%', width: '100%' }}>
          <Box
            sx={{
              height: '30%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'row',
              columnGap: 3,
            }}
          >
            <Button variant={selectedItem === 'CSV' ? 'contained' : 'outlined'} onClick={handleButton('CSV')}>
              CSV
            </Button>
            <Button variant={selectedItem === 'ModelarDB' ? 'contained' : 'outlined'} onClick={handleButton('ModelarDB')}>
              ModelarDB
            </Button>
          </Box>
          {(selectedItem === 'CSV' || (checkConnectionResponse !== null && !checkConnectionError)) && <ConnectorFarmSelection selectedItem={selectedItem}/>}
          {selectedItem === 'ModelarDB' && checkConnectionResponse === null && <ConnectorDBConfig />}
        </Box>
      </Box>
    </>
  );
};

export default Connector;
