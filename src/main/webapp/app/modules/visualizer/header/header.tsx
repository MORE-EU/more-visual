import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

const Header = props => {
  const { farmMeta, datasetChoice } = props;

  const params: any = useParams();

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
      {console.log(params)}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/">
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          <HomeIcon sx={{ mr: 0.5 }} fontSize='medium' />
          Home
          </Typography>
        </Link>
        {farmMeta ?<Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href={`/visualize`}>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {farmMeta.name}
          </Typography>
        </Link>:
        <Skeleton variant='text' width={50}/>}
        {farmMeta ? <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {farmMeta.data[datasetChoice].name}
        </Typography> : <Skeleton variant='text' width={50}/>}
      </Breadcrumbs>
      {/* <Chip label={getSelectedConnection()}
            color="primary" sx={{ width: '6rem' }}
      /> */}
    </Grid>
  );
};

export default Header;
