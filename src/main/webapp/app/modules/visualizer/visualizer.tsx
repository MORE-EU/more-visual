import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useHistory, useParams } from 'react-router-dom';
import { ChartContainer } from './chart/chart-container';
import VisControl from 'app/modules/visualizer/vis-control/vis-control';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { getAlerts, getDataset, getDatasets, getFarmMeta, resetFarmMeta, setFolder, updateDatasetChoice } from '../store/visualizerSlice';
import Header from './header/header';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Slide, { SlideProps } from '@mui/material/Slide';

const mdTheme = createTheme();
type TransitionProps = Omit<SlideProps, 'direction'>;

export const Visualizer = () => {
  const { farmMeta, dataset, datasetChoice, alerts, errorMessage } = useAppSelector(state => state.visualizer);
  const { loadingButton } = useAppSelector(state => state.fileManagement);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const history = useHistory();

  const handleSnackClose = () => {
    setOpenSnackbar(false);
  }

  function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

  useEffect(() => {
    dispatch(getFarmMeta(params.folder));
    dispatch(getDatasets(params.folder));
    return () => {
      dispatch(resetFarmMeta());
    };
  }, []);

  useEffect(() => {
    if (params.id !== undefined) {
      dispatch(setFolder(params.folder));
      dispatch(getDataset({ folder: params.folder, id: params.id }));
      farmMeta !== null && dispatch(updateDatasetChoice(farmMeta.data.findIndex(dat => dat.id === params.id)));
    }
  }, [params.id]);

  useEffect(() => {
    errorMessage !== null && setOpenSnackbar(true)
  }, [errorMessage])

  useEffect(() => {
    dataset && dispatch(getAlerts(dataset.id));
  }, [dataset]);

  useEffect(() => {
    params.id === undefined && farmMeta && history.replace(`${params.folder}/${farmMeta.data[0].id}`);
  }, [farmMeta]);

  useEffect(() => {
    !loadingButton && farmMeta && dispatch(getFarmMeta(params.folder));
  }, [loadingButton]);

  return (
    <div>
      {console.log(dataset)}
      <ThemeProvider theme={mdTheme}>
        <Grid sx={{ height: '100%', width: '100%' }}>
          {errorMessage &&
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackClose} 
          TransitionComponent={TransitionLeft}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert onClose={handleSnackClose} severity="error" sx={{ width: '100%' }} variant="filled">
              {errorMessage + " try another dataset"}
            </Alert>
          </Snackbar>}
          <Header farmMeta={farmMeta} datasetChoice={datasetChoice} />
          <Divider />
          <Grid
            sx={{
              backgroundColor: theme => theme.palette.background.paper,
              display: 'flex',
              flexDirection: 'row',
              overflow: 'auto',
              height: 'calc(100% - 65px)',
            }}
          >
            <Grid sx={{ width: '20%', height: 'calc(100% - 30px)', p: 1 }}>
              <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <VisControl />
              </Paper>
            </Grid>
            <Grid sx={{ width: '80%', p: 1, flexGrow: 1, height: 'calc(100% - 30px)' }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <ChartContainer />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default Visualizer;
