import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import SimpleBar from 'simplebar-react';
import { useAppSelector } from '../store/storeConfig';
import grey from '@mui/material/colors/grey';

const UploadFarmCreate = () => {
    const {metaData} = useAppSelector(state => state.uploadFarm);
  return (
    <>
      <Grid>
        <Grid><Typography variant="subtitle1" fontSize={25} sx={{ color: grey[700], mb: 2, mt: 2 }}>
          Meta Data File
        </Typography></Grid>
        <Grid sx={{bgcolor: grey[100], width: "100%", height: 550, overflow: "hidden"}} >
        <SimpleBar style={{height: "inherit"}}>
        <Grid sx={{m: "auto", width: "fit-content"}}>
        <pre style={{color: grey[600], fontWeight: 400, fontSize: 18}}>{JSON.stringify(metaData, null, 2)}</pre></Grid>
        </SimpleBar>
        </Grid>
      </Grid>
    </>
  );
};

export default UploadFarmCreate;
