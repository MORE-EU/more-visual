import React from "react";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import grey from '@mui/material/colors/grey';
import LoginIcon from '@mui/icons-material/Login';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import DBFormInput from "./db-form-input";

import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";
import { getDbMetadata, setCheckConnectionResponse } from '../../store/visualizerSlice';
import { connector } from '../../store/visualizerSlice';

interface IDBForm  {
    dbSystem: string;
    host: string;
    port: string;
    username: string;
    password: string;
    database: string;
}

const defaultForm: IDBForm = {
    dbSystem: '',
    host: '',
    port: '',
    username: '',
    password: '',
    database: '',
}

const VisConnectorDBConfig = ({closeHandler, dbSystem, setStep}) => {
    const { checkConnectionResponse, checkConnectionLoading, checkConnectionError } = useAppSelector(state => state.visualizer);
    const dispatch = useAppDispatch();
    const [dbForm, setDbForm] = useState<IDBForm>(defaultForm);
    const { host, port, username, password, database } = dbForm;
    const [openSnack, setOpenSnack] = React.useState(false);

    useEffect(() => {
        setDbForm((prevDbForm) => {
            return {...prevDbForm, dbSystem: dbSystem};
        })        
    },[]);

    useEffect(() => {
        if (checkConnectionResponse) {
            if (checkConnectionError) {
                setOpenSnack(true);
            } else{
                setStep(3);
                dispatch(getDbMetadata(dbForm.database));
            }
        }
    }, [checkConnectionResponse]);

    

    const handleTextFields = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.currentTarget;
        setDbForm(prevDbForm => (
            {...prevDbForm, [name]: value}
        ));
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(connector(dbForm));
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setCheckConnectionResponse(null));
        setOpenSnack(false);
    };
    
    return (
        <>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1, }}>
                <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        <>{checkConnectionResponse}</>
                    </Alert>
                </Snackbar>
                <Typography variant="subtitle1" fontSize={20} sx={{borderBottom: `2px solid ${grey[400]}`,}}>
                    DB Configuration
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1, }}>
                        <DBFormInput label='host' type='text' value={host} handleChange={handleTextFields} />
                        <DBFormInput label='port' type='text' value={port} handleChange={handleTextFields} />
                        <DBFormInput label='username' type='text' value={username} handleChange={handleTextFields} />
                        <DBFormInput label='password' type='password' value={password} handleChange={handleTextFields} />
                        <DBFormInput label='database' type="database" value={database} handleChange={handleTextFields} />
                        {checkConnectionLoading ? <CircularProgress /> : <Button variant="contained" startIcon={<LoginIcon />} type="submit" >Connect </Button>}
                    </Box>
                </form> 
                { !checkConnectionLoading && (<Button variant="text" startIcon={<CloseIcon />} onClick={closeHandler}>Close</Button>) }
            </Box>
        </>
    )
}

export default VisConnectorDBConfig;