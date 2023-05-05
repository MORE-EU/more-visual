import Grid from '@mui/material/Grid';
import React, { Dispatch, SetStateAction, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useAppSelector } from 'app/modules/store/storeConfig';
import { IForecastingForm } from 'app/shared/model/forecasting.model';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Menu from '@mui/material/Menu';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import ForecastingAlgModal from './forecasting-alg-selection-modal';


interface IForecastingTrain {
  forecastingForm: IForecastingForm;
  setForecastingForm: Dispatch<SetStateAction<IForecastingForm>>;
}

const ForecastingTrain = (props: IForecastingTrain) => {
  const [open, setOpen] = useState(false);

  const handleClick = event => {
    setOpen(!open);
  };

  return (
    <>
    <ForecastingAlgModal open={open} setOpen={setOpen} />
      <Grid
        className={'Future-predictive-window'}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 4,
          textAlign: 'center',
        }}
      >
        <Grid sx={{ width: '90%', borderBottom: '1px solid rgba(0,0,0,0.3)', m: 'auto' }}>
          <Typography variant="subtitle1" fontSize={20}>
            {`Algorithm Selection & Configuration`}
          </Typography>
        </Grid>
        <Grid sx={{width: "60%", m: "auto"}}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Algorithm</TableCell>
            <TableCell align="center">Fine tune</TableCell>
            <TableCell align="center">Parameters</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {["XGBoost","LGBM","Linear Regression"].map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Checkbox />
              {row}
              </TableCell>
              <TableCell align="center">
              <Checkbox />
              </TableCell>
              <TableCell align="center"><Button variant="outlined" onClick={handleClick}>Configure</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
      </Grid>
    </>
  );
};

export default ForecastingTrain;
