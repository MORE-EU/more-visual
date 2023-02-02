import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Papa from 'papaparse';
import Fab from '@mui/material/Fab';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import Box from '@mui/material/Box';
import green from '@mui/material/colors/green';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { setCsvSample, setFiles } from '../store/uploadFarmSlice';
import { grey } from '@mui/material/colors';

const UploadFarmFiles = () => {
  const [fileNames, setFileNames] = useState([]);
  const [loadingFab, setLoadingFab] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const dispatch = useAppDispatch();
  const {files} = useAppSelector(state => state.uploadFarm);
  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
    boxShadow: 'none',
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFiles(e.target.files));
    const selFiles = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selFiles.push(e.target.files[i].name);
    }
    setFileNames(selFiles);
  };

  const fabHandleClick = () => {
    setLoadingFab(true);
    Papa.parse(files[0], {
      header: true,
      skipEmptyLines: true,
      preview: 20,
      dynamicTyping: true,
      complete: function (results) {
        dispatch(setCsvSample(results));
        setSuccess(true);
        setLoadingFab(false);
      },
    });
  };

  return (
    <Grid sx={{ textAlign: 'center', justifyContent: "center" }}>
      <Grid>
        <Typography variant="subtitle1" fontSize={20}>
          Select the files that represent the wind/solar farm
        </Typography>
      </Grid>
      <Grid sx={{display: "inline-flex", textAlign: "center", alignItems: "center"}}>
        <input
          className="file-input"
          style={{ marginRight: 10, font: '20px/35px', width: 200, color: grey[700], fontSize: "15px", paddingLeft: 10, border: "1px solid rgb(0,0,0,0.2)", fontWeight: 700}}
          type="file"
          id="files-upload"
          multiple
          accept={'.csv'}
          onChange={handleSelectFiles}
        />
        <Box sx={{ m: 1, position: 'relative' }}>
          <Fab aria-label="save" color="primary" sx={buttonSx} disabled={fileNames.length === 0} onClick={fabHandleClick}>
            {success ? <CheckIcon /> : <SaveIcon />}
          </Fab>
          {loadingFab && (
            <CircularProgress
              size={68}
              sx={{
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UploadFarmFiles;
