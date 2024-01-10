import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import React from 'react';
import ConnectorFarmSelection from './connector-farm-selection';

const Connector = () => {

  return (
    <>
      <Box sx={{ height: '100%', width: '100%' }}>
        <Box sx={{ height: '10%', width: '100%', backgroundColor: grey[800], display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="overline" fontSize={20} sx={{ width: 'fit-content', textDecoration: 'none', color: grey[300], m: 'auto' }}>
            Available Farms
          </Typography>
        </Box>
        <Box sx={{ height: '90%', width: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ConnectorFarmSelection/>
        </Box>
      </Box>
    </>
  );
};

export default Connector;
