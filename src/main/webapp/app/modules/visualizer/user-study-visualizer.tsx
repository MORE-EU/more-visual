import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useHistory, useParams } from 'react-router-dom';
import { ChartContainer } from './chart/chart-container';
import VisControl from 'app/modules/visualizer/vis-control/vis-control';
import { getAlerts, getConnection, getDataset, getDatasets, setDatasetIsConfiged, updateDataset, updateDatasetChoice, getSchemaMetadata, connector, updateAccuracy } from '../store/visualizerSlice';
import CircularProgress  from '@mui/material/CircularProgress';
import Header from './header/header';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Slide, { SlideProps } from '@mui/material/Slide';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
const mdTheme = createTheme();
type TransitionProps = Omit<SlideProps, 'direction'>;

export const UserStudyVisualizer = () => {
  const { schemaMeta, dataset, datasetChoice, uploadDatasetError, errorMessage, connections, connected} = useAppSelector(state => state.visualizer);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useAppDispatch();
  const params: any = useParams();
  const history = useHistory();

  useEffect(() => {
    dispatch(getConnection("pulsar-influx"));
    dispatch(updateAccuracy(0.95));
  }, []);

  useEffect(() => {
    connections.length > 0 && dispatch(connector(connections.find(connection => connection.name === "pulsar-influx")))
  },[connections]);

  useEffect(() => {
    connected && dispatch(getSchemaMetadata({schema: connections.find(connection => connection.name === "pulsar-influx").database}));
  }, [connected]);


  const handleSnackClose = () => {
    setOpenSnackbar(false);
  }

  function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left" />;
  }

  useEffect(() => {
    if (params.id !== undefined) {
      dispatch(getDataset({ schema: params.schema, id: params.id }));
      schemaMeta !== null && dispatch(updateDatasetChoice(schemaMeta.data.findIndex(dat => dat.id === params.id)));
    }
  }, [params.id]);

  useEffect(() => {
    errorMessage !== null && setOpenSnackbar(true)
  }, [errorMessage])

  useEffect(() => {
    dataset && dispatch(getAlerts(dataset.id));
    dataset && dispatch(getDatasets());
  }, [dataset]);

  useEffect(() => {
    params.id === undefined && schemaMeta && history.replace(`/user-study/visualize/${schemaMeta.name}/${schemaMeta.data[0].id}`);
    params.id !== undefined && schemaMeta && dispatch(updateDatasetChoice(schemaMeta.data.findIndex(dat => dat.id === params.id)));
  }, [schemaMeta]);

  useEffect(() => {
    if (uploadDatasetError)
      if (schemaMeta && !schemaMeta.isTimeSeries && schemaMeta.type !== "csv") {
        dispatch(setDatasetIsConfiged(false));
        dispatch(updateDataset({dataset: schemaMeta.data[datasetChoice]}));
        history.replace(`/configure/${params.schema}`);
      }
  }, [uploadDatasetError]);

  return (
    <div>
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
          <Header schemaMeta={schemaMeta} datasetChoice={datasetChoice} />
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
              {schemaMeta && <VisControl/>}
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
                {schemaMeta && dataset ? 
                <ChartContainer/> : (errorMessage == null && 
                <CircularProgress sx={{margin: 'auto'}}/>)}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
};

export default UserStudyVisualizer;
