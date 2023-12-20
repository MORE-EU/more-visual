import * as React from 'react';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';
import VisControl from 'app/modules/visualizer/vis-control/vis-control';
import { Divider, Grid, Snackbar, Alert  } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setDatasetIsConfiged, disconnector, setErrorMessage, getDataset, setFolder } from '../store/visualizerSlice';
import Header from './header/header';
import VisConnector from './vis-connector/vis-connector';
import VisControlDatasetConfig from './vis-control/vis-control-dataset-config';

const mdTheme = createTheme();

export const EmptyVisualizer = () => {
    const [isBusy, setIsBusy] = useState(true);
    const [openSnack, setOpenSnack] = useState(false);
    const { farmMeta, dataset, datasetChoice, selectedConnection, connected, datasetIsConfiged, errorMessage } = useAppSelector(state => state.visualizer);
    const dispatch = useAppDispatch();
    const history = useHistory();

    useEffect(() => {
        if (farmMeta) {
            setIsBusy(true);
        }
        else {
            setIsBusy(false);
            dispatch(setDatasetIsConfiged(false));
            dispatch(disconnector());
        }
        if (farmMeta && farmMeta.type === "influx") {
            history.push(`${location.pathname}/${farmMeta.name}/${farmMeta.data[0].id}`);
        }
        if (farmMeta && datasetIsConfiged) {
            dispatch(setFolder(farmMeta.name));
            dispatch(getDataset({folder: farmMeta.name, id: farmMeta.data[datasetChoice].id}));
        }
    }, [farmMeta]);

    useEffect(() => {
        if (farmMeta && dataset)
            history.push(`${location.pathname}/${farmMeta.name}/${farmMeta.data[datasetChoice].id}`);
    }, [dataset]);

    useEffect(() => {
        if(errorMessage) {
            setOpenSnack(true);
            if (farmMeta && !farmMeta.data[datasetChoice].isConfiged ) dispatch(setDatasetIsConfiged(false));
        }
    }, [errorMessage]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway')
            return;
        if (!farmMeta && connected) dispatch(disconnector());
        dispatch(setErrorMessage(null));
        setOpenSnack(false);
    };

    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        <>{errorMessage}</>
                    </Alert>
                </Snackbar>
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
                                {isBusy ?  farmMeta ? <VisControl /> : <CircularProgress /> : <VisConnector />}
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
                                {farmMeta && (datasetIsConfiged? <CircularProgress sx={{margin: 'auto'}}/> : <VisControlDatasetConfig /> )}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
};

export default EmptyVisualizer;
