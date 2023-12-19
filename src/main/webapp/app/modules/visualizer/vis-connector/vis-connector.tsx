import React, { useEffect } from "react"
import { useState } from "react";

import Button from "@mui/material/Button";
import StorageIcon from '@mui/icons-material/Storage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import { Typography, Grid } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';

import VisConnectorDBConfig from "./vis-connector-db-config";
import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";
import { connector, getDbMetadata, deleteConnection, getAllConnections } from "app/modules/store/visualizerSlice";
import { IConnection } from "app/shared/model/connection.model";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const mdTheme = createTheme();

const VisConnector = () => {
    const [ step, setStep ] = useState(false);
    const { connections, connected } = useAppSelector(state => state.visualizer);
    const [connectionInfo, setConnectionInfo] = useState<IConnection>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllConnections());
    },[]);

    useEffect(() => {
        if(connected && connectionInfo)
            dispatch(getDbMetadata({database: connectionInfo.type, farmName: connectionInfo.database}));
    },[connected])

    const closeHandler = () => {
        setStep(false);
    }

    return (
        <>
        {!step && (
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                {connections.length !== 0 && (
                    <Typography variant="subtitle1" fontSize={20} sx={{ borderBottom: `2px solid ${grey[400]}`}}>
                        Available Data Sources
                    </Typography>
                )}
                {connections.map(connection => 
                    ( <Grid container key={connection.name} sx={{display: 'flex', flexDirection: 'row', [mdTheme.breakpoints.down('lg')]: {flexDirection: 'column'}}}>
                        <Grid item xs={6}>
                            <Button variant="text" component="label"  sx={{borderRadius: 2}} onClick={() => {
                                setConnectionInfo(connection);
                                dispatch(connector(connection));                
                            }}>{connection.name}</Button>
                        </Grid>
                        <Grid item>
                            <Button startIcon={<DeleteIcon />} onClick={() => {
                                dispatch(deleteConnection(connection.name));
                            }} ></Button>
                        </Grid>
                    </Grid>
                    )
                )}
                <Typography variant="subtitle1" fontSize={20} sx={{ borderBottom: `2px solid ${grey[400]}`}}>
                    New Data Source
                </Typography>
                <Button variant="contained" component="label"  sx={{borderRadius: 2,}} startIcon={<StorageIcon />} onClick={() => {setStep(true);}}>
                    Database
                </Button>
                <Button disabled component="label" variant="contained"  sx={{borderRadius: 2,}} startIcon={<UploadFileIcon/>}>
                    Filesystem
                    <VisuallyHiddenInput type="file" />
                </Button>
            </Box>
        )}
        { step && (
            <VisConnectorDBConfig closeHandler={closeHandler} />
        )}
        </>
    );
}

export default VisConnector;