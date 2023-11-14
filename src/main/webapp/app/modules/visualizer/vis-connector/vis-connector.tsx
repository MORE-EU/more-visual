import React, { useEffect } from "react"
import { useState } from "react";

import Button from "@mui/material/Button";
import StorageIcon from '@mui/icons-material/Storage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import { Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from '@mui/icons-material/Close';

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
    const [ step, setStep ] = useState(0);
    const [dbSystem, setDbSystem] = useState('');

    const closeHandler = () => {
        setDbSystem('');
        setStep(0);
    }

    return (
        <>
        {step === 0 && (
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Typography variant="subtitle1" fontSize={20} sx={{borderBottom: `2px solid ${grey[400]}`,}}>
                    Connect to Data Source
                </Typography>
                <Button variant="contained" startIcon={<StorageIcon />} onClick={() => {setStep(1);}}>Database</Button>
                    <Button component="label" variant="contained" startIcon={<UploadFileIcon/>}>
                        Filesystem
                        <VisuallyHiddenInput type="file" />
                    </Button>
            </Box>
        )}
        { step === 1 && (
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Typography variant="subtitle1" fontSize={20} sx={{borderBottom: `2px solid ${grey[400]}`,}}>
                    Select DB System
                </Typography>
                    <Select size="small" value={dbSystem} onChange={(e) => setDbSystem(e.target.value)}>
                        <MenuItem value='postgres'>postgres</MenuItem>
                    </Select>
                    <Button variant="contained" type='submit' onClick={() => { if(dbSystem) setStep(2); }}>Continue</Button>
                <Button variant="text" startIcon={<CloseIcon />} onClick={closeHandler}>Close</Button>
            </Box>
        )}
        { step === 2 && (
            <VisConnectorDBConfig closeHandler={closeHandler} dbSystem={dbSystem} />
        )}
        </>
    );
}

export default VisConnector;