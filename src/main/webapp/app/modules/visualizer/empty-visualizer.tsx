import React from "react";
import { useEffect } from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Divider, Grid } from '@mui/material';


import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";

import Header from "./header/header";
import VisConnector from "./vis-connector/vis-connector";
// import { getDbTableNames } from "../store/visualizerSlice";

const mdTheme = createTheme();


const EmptyVisualizer = () => {
    const dispatch = useAppDispatch();
    const { connected } = useAppSelector(state => state.visualizer);

    // useEffect(() => {
    //     if(connected)
            // dispatch(getDbTableNames());
            //does it need to redirect or change visualizer?
    // },[connected]);

    return (
        <div>
            <ThemeProvider theme={mdTheme}>
                <Grid sx={{ height: '100%', width: '100%' }}>
                    <Header />
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
                                <VisConnector />
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
                                {/* {dbTableNames && <h1>{dbTableNames}</h1>} */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}

export default EmptyVisualizer;
