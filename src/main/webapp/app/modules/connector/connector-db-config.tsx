import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { checkConnection } from '../store/visualizerSlice';

interface ModelarForm {
  url: string;
  port: string;
}

const ModelarDefault = {
  url: '',
  port: '',
};

const ConnectorDBConfig = () => {
  const { checkConnectionResponse, checkConnectionLoading, checkConnectionError } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [dbConfig, setDbConfig] = useState<ModelarForm>(ModelarDefault);

  const handleTextFields = key => e => {
    setDbConfig(state => ({ ...state, [key]: e.target.value }));
  };

  const handleCheckConnection = e => {
    dispatch(checkConnection(dbConfig));
  };

  return (
    <>
      {console.log(checkConnectionResponse)}
      <Box
        sx={{
          height: '70%',
          width: '100%',
          rowGap: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            height: 'max-content',
            width: '30%',
            borderBottom: `2px solid ${grey[400]}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="subtitle1" fontSize={20}>
            Configuration
          </Typography>
          {checkConnectionLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Tooltip title="Connect" placement="right">
              <IconButton onClick={handleCheckConnection}>
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ height: 'max-content', display: 'flex', flexDirection: 'column', rowGap: 2, width: '20%' }}>
          {Object.keys(dbConfig).map(key => (
            <Box key={`config-key-${key}`} sx={{ display: 'flex', alignItems: 'center', columnGap: 2, width: '100%' }}>
              <Box sx={{ width: '30%', textAlign: 'center' }}>
                <Typography variant="subtitle1">{`${key}:`}</Typography>
              </Box>
              <Box sx={{ width: '70%' }}>
                <TextField id="outlined-required" label="" size="small" onChange={handleTextFields(key)} fullWidth />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ConnectorDBConfig;
