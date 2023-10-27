import React from "react"
import { useState } from "react";

import Button from "@mui/material/Button";
import StorageIcon from '@mui/icons-material/Storage';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Box from "@mui/material/Box";
import { styled } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import { Typography } from "@mui/material";

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
    const [selectedItem, setSelectedItem] = useState(null);

    const closeHandler = () => {
        setSelectedItem(null);
    }


    return (
        <>
        {!selectedItem && (
            <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', rowGap: 1 }}>
                <Typography variant="subtitle1" fontSize={20} sx={{borderBottom: `2px solid ${grey[400]}`,}}>
                    Connect to Datasource
                </Typography>
                <Button variant="contained" startIcon={<StorageIcon />} onClick={() => {setSelectedItem('db');}}>Database</Button>
                    <Button component="label" variant="contained" startIcon={<UploadFileIcon/>}>
                        Filesystem
                        <VisuallyHiddenInput type="file" />
                    </Button>
            </Box>
        )}
        {selectedItem === 'db' && (
            <VisConnectorDBConfig closeHandler={closeHandler}/>
        )}
        </>
    );
}

export default VisConnector;