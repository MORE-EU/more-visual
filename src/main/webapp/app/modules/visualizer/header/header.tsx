import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import { useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const Header = props => {
  const { farmMeta, datasetChoice } = props;
  const [conModal, setConModal] = useState(false);
  const [menuChoice, setMenuChoice] = useState('CSV');
  const [keepChoice, setKeepChoice] = useState("CSV");
  const [anchorEl, setAnchorEl] = useState(null);

  const params: any = useParams();
  const menuOpen = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const onMenuClick = e => {
  //   if(e.target.innerText === menuChoice) return;
  //   setAnchorEl(null);
  //   setKeepChoice(e.target.innerText);
  //   if (e.target.innerText !== 'CSV') {
  //     setConModal(true);
  //   }else{
  //     setMenuChoice("CSV")
  //   }
  // };

  const getSelectedConnection = () => {
    const type = farmMeta.type;
    switch (type){
      case "modelar":
        return "ModelarDB";
      case "csv":
        return "CSV"
      default:
        return "";
    }
  }

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
        {/* <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href="/"> */}
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          <HomeIcon sx={{ mr: 0.5 }} fontSize='medium' />
          Home
          </Typography>
        {/* </Link> */}
        {/* <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href={`/visualize`}> */}
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {farmMeta.name}
          </Typography>
        {/* </Link> */}
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {farmMeta.data[datasetChoice].name}
        </Typography>
      </Breadcrumbs>
      {/* <Chip label={getSelectedConnection()}
            color="primary" sx={{ width: '6rem' }}
      /> */}
    </Grid>
  );
};

export default Header;
