import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/storeConfig';
import { resetChartValues } from '../../store/visualizerSlice';
import VisMeasures from 'app/modules/visualizer/vis-control/vis-control-measures';
import VisToolkit from './vis-control-toolkit';
import VisControlDatasets from './vis-control-datasets';
import Grid from '@mui/material/Grid';

export const VisControl = () => {
  const { dataset, farmMeta, datasetChoice } = useAppSelector( state => state.visualizer);
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(resetChartValues());
  }, [location]);

  return (
    <Grid sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 3 }}>
      <Grid sx={{ height: '30%', width: '100%' }}>
        <VisControlDatasets />
      </Grid>
      <Grid sx={{ height: '40%', width: '100%' }}>
        { dataset && farmMeta.data[datasetChoice].isConfiged && <VisToolkit /> }
      </Grid>
      <Grid sx={{ height: '30%', width: '100%' }}>
      { dataset && farmMeta.data[datasetChoice].isConfiged && <VisMeasures /> }
      </Grid>
    </Grid>
  );
};

export default VisControl;
