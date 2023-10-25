import React from "react"
import { useState } from "react";

import Button from "@mui/material/Button";
import StorageIcon from '@mui/icons-material/Storage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';

import VisConnectorDBConfig from "./vis-connector-db-config";

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

const VisConnector = () => {
    const [step, setStep] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);

    const closeHandler = () => {
        setStep(0);
        setSelectedItem(null);
    }


    return (
        <>
        {step === 0 && (
            <Button variant="contained" onClick={() => setStep(1)} >Connect to Datasource</Button>
        )}
        {step === 1 && (
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Button variant="contained" startIcon={<StorageIcon />} onClick={() => {
                    setSelectedItem('db');
                    setStep(2);
                }}>Database</Button>
                    <Button component="label" variant="contained" startIcon={<UploadFileIcon/>}>
                        Filesystem
                        <VisuallyHiddenInput type="file" />
                    </Button>
                <Button variant="text" startIcon={<CloseIcon />} onClick={closeHandler} >Close</Button>
            </Box>
        )}
        {selectedItem === 'db' && (
            <VisConnectorDBConfig closeHandler={closeHandler}/>
        )}
        </>
    );
}

export default VisConnector;