import * as React from 'react';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useHistory, useParams } from 'react-router-dom';
import { ChartContainer } from './chart/chart-container';
import VisControl from 'app/modules/visualizer/vis-control/vis-control';
import { Divider, Grid  } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { getAlerts, getDataset, getFarmMeta, setFolder, updateDatasetChoice } from '../store/visualizerSlice';
import Header from './header/header';

const mdTheme = createTheme();

export const Visualizer = () => {
  const { farmMeta, dataset, datasetChoice, selectedConnection, connected } = useAppSelector(state => state.visualizer);
  const { loadingButton } = useAppSelector(state => state.fileManagement);
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.folder !== undefined) {
      if (!connected) {
        dispatch(getFarmMeta(params.folder));
      }
    }
  }, []);

  useEffect(() => {
      if (params.id !== undefined) {
        if (!connected || (farmMeta && (farmMeta.type === "csv" || farmMeta.type === "influx"))) {
          dispatch(setFolder(params.folder));
          dispatch(getDataset({ folder: params.folder, id: params.id }));
          farmMeta && dispatch(updateDatasetChoice(farmMeta.data.findIndex(dat => dat.id === params.id)));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ;
        }
    }
  }, [params.id]);

  useEffect(() => {
    dataset && dispatch(getAlerts(dataset.id));
  }, [dataset]);

  useEffect(() => {
      params.id === undefined && farmMeta && history.push(`${params.folder}/${farmMeta.data[0].id}`);
  }, [farmMeta]);

  useEffect(() => {
    !loadingButton && farmMeta && dispatch(getFarmMeta(params.folder));
  }, [loadingButton]);

  return (
      <div>
        <ThemeProvider theme={mdTheme}>
          <Grid sx={{ height: '100%', width: '100%' }}>
            <Header farmMeta={farmMeta} datasetChoice={datasetChoice} selectedConnection={selectedConnection} />
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
                <Paper elevation={1} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'auto' }}>
                  {farmMeta && <VisControl />}
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
                  {farmMeta && dataset && <ChartContainer /> }
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
  );
};

export default Visualizer;
