import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React, { useState, useEffect } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import Skeleton from '@mui/material/Skeleton';
import { useAppSelector } from 'app/modules/store/storeConfig';

const Header = props => {
  const { schemaMeta, datasetChoice, isUserStudy} = useAppSelector(state => state.visualizer);

  return (
    <Grid
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '64px',
        pr: 2,
        pl: 2,
        bgcolor: grey[200],
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          <HomeIcon sx={{ mr: 0.5, mb: 0.5 }} fontSize='medium' />
          Home
          </Typography>
        </Link>
        {schemaMeta ?<Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href={`${isUserStudy ? "user-study" : ""}/visualize/${schemaMeta.name}`}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {schemaMeta.name}
          </Typography>
        </Link>:
        <Skeleton variant='text' width={50}/>}
        {schemaMeta ? <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {schemaMeta.data[datasetChoice].id}
        </Typography> : <Skeleton variant='text' width={50}/>}
      </Breadcrumbs>
    </Grid>
  );
};

export default Header;
