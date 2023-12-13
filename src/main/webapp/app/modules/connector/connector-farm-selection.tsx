import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { getDirectories, setSelectedConnection } from '../store/visualizerSlice';
import Button from '@mui/material/Button';
import grey from '@mui/material/colors/grey';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const ConnectorFarmSelection = (props) => {
    const {selectedItem} = props;
  const { directories } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    directories.length === 0 && dispatch(getDirectories());
  }, []);

  const handleSelectedConnection = () => {
    dispatch(setSelectedConnection(selectedItem))
  }

  return (
    <>
      <Box sx={{ height: '70%', width: '100%', rowGap: 2, display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: "center" }}>
        <Box sx={{ height: 'max-content', width: '30%', borderBottom: `2px solid ${grey[400]}` }}>
          <Typography variant="subtitle1" fontSize={20}>
            Available Farms
          </Typography>
        </Box>
        <Box sx={{ height: 'max-content', display: 'flex', flexDirection: 'column', rowGap: 2, width: '20%' }}>
          {directories.map(d => (
            <Button key={`${d}-button-option`} variant="outlined" fullWidth component={Link} to={`/visualize/${d}`} onClick={handleSelectedConnection}>
              {d}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ConnectorFarmSelection;
