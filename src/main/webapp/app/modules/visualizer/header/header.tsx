import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import grey from '@mui/material/colors/grey';
import { useParams } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import ConnectionModal from './connection-modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuClick = e => {
    if(e.target.innerText === menuChoice) return;
    setAnchorEl(null);
    setKeepChoice(e.target.innerText);
    if (e.target.innerText !== 'CSV') {
      setConModal(true);
    }else{
      setMenuChoice("CSV")
    }
  };

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
          <HomeIcon sx={{ mr: 0.5 }} fontSize='medium' />
          Home
        </Link>
        <Link underline="hover" sx={{ display: 'flex', alignItems: 'center' }} color="inherit" href={`/dashboard/${params.folder}`}>
          {farmMeta.name}
        </Link>
        <Typography sx={{ display: 'flex', alignItems: 'center' }} color="text.primary">
          {farmMeta.data[datasetChoice].name}
        </Typography>
      </Breadcrumbs>
      <Chip label={menuChoice} color="primary" sx={{ width: '6rem' }} onClick={handleClick} />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onMenuClick} selected={menuChoice === 'CSV'}>
          CSV
        </MenuItem>
        <MenuItem onClick={onMenuClick} selected={menuChoice === 'PostgreSQL'}>
          PostgreSQL
        </MenuItem>
        <MenuItem onClick={onMenuClick} selected={menuChoice === 'InfluxDB'}>
          InfluxDB
        </MenuItem>
        <MenuItem onClick={onMenuClick} selected={menuChoice === 'ModelarDB'}>
          ModelarDB
        </MenuItem>
      </Menu>
      <ConnectionModal conModal={conModal} setConModal={setConModal} menuChoice={menuChoice} setMenuChoice={setMenuChoice} keepChoice={keepChoice} />
    </Grid>
  );
};

export default Header;
