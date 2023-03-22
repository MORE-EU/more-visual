import * as React from 'react';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { useHistory, useParams } from 'react-router-dom';
import { ChartContainer } from './chart/chart-container';
import VisControl from 'app/modules/visualizer/vis-control/vis-control';
import Toolkit from 'app/modules/visualizer/vis-control/vis-control-toolkit';
import HomeIcon from '@mui/icons-material/Home';
import { Breadcrumbs, Divider, Grid, Link, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { getAlerts, getDataset, getFarmMeta, setFolder, updateDatasetChoice } from '../store/visualizerSlice';
import { grey } from '@mui/material/colors';

const mdTheme = createTheme();

export const Visualizer = () => {
  const { farmMeta, dataset, openToolkit, datasetChoice } = useAppSelector(state => state.visualizer);
  const { loadingButton } = useAppSelector(state => state.fileManagement);
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getFarmMeta(params.folder));
  }, []);

  useEffect(() => {
    dispatch(setFolder(params.folder));
    dispatch(getDataset({ folder: params.folder, id: params.id }));
  }, [params.id !== undefined]);

  useEffect(() => {
    dataset && dispatch(getAlerts(dataset.id));
  }, [dataset]);

  useEffect(() => {
    params.id === undefined && farmMeta && history.push(`${params.folder}/${farmMeta.data[0].id}`);
    farmMeta && dispatch(updateDatasetChoice(farmMeta.data.findIndex(dat => dat.id === params.id)));
  }, [farmMeta]);

  useEffect(() => {
    !loadingButton && farmMeta && dispatch(getFarmMeta(params.folder));
  }, [loadingButton]);

  return (
    dataset !== null &&
    farmMeta && (
      <div>
        <ThemeProvider theme={mdTheme}>
          <Grid sx={{ height: '100%', width: '100%' }}>
            <Grid
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                height: '64px',
                pr: 2,
                pl: 2,
                bgcolor: grey[200]
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                </Link>
                <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href={`/dashboard/${params.folder}`}>
                  {farmMeta.name}
                </Link>
                <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
                  {farmMeta.data[datasetChoice].name}
                </Typography>
              </Breadcrumbs>
            </Grid>
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
                    height: "100%",
                  }}
                >
                  <ChartContainer />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    )
  );
};

export default Visualizer;
