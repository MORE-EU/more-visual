import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import { green, orange } from '@mui/material/colors';
import ModalWithChart from './forecasting-results-modal';
import Tooltip from '@mui/material/Tooltip';

function createData(measureName, progress, estimatedTime, actions) {
  return {
    measureName,
    progress,
    estimatedTime,
    actions,
    history: [
      {
        modelName: 'XGBoost',
        accuracy: 0.8,
        precision: 0.2,
        recall: 0.5,
      },
      {
        modelName: 'LinearRegression',
        accuracy: 0.6,
        precision: 0.4,
        recall: 0.3,
      },
    ],
  };
}

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const rows = [
  createData('wind_speed', 2, 'completed', 0),
  createData('active_power', 1, 'processing', 0),
  createData('pitch_angle', 0, 'pending', 1),
];

const Row = props => {
  const { row, setResultsModal } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} disabled={row.estimatedTime !== 'completed'}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.measureName}
        </TableCell>
        <TableCell align="center">
          {/* <LinearProgressWithLabel value={row.progress} /> */}
          {row.progress === 0 ? (
            <MoreHorizIcon sx={{ color: orange[400] }} />
          ) : row.progress === 1 ? (
            <CircularProgress size={20} />
          ) : (
            <CheckIcon sx={{ color: green[400] }} />
          )}
        </TableCell>
        <TableCell align="center">{row.estimatedTime}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Evaluation Metrics
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Model</TableCell>
                    <TableCell align="center">Accuracy</TableCell>
                    <TableCell align="center">Precision</TableCell>
                    <TableCell align="center">Recall</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.modelName}>
                      <TableCell component="th" scope="row">
                        {historyRow.modelName}
                      </TableCell>
                      <TableCell align="center">{historyRow.accuracy}</TableCell>
                      <TableCell align="center">{historyRow.precision}</TableCell>
                      <TableCell align="center">{historyRow.recall}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          disabled={row.progress !== 100}
                          onClick={() => {
                            console.log(row.action);
                          }}
                        >
                          <SaveIcon />
                        </IconButton>
                        <Tooltip title="View results">
                          <IconButton
                            onClick={() => {
                              setResultsModal(true);
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ForecastingResults = () => {
  const [resultsModal, setResultsModal] = useState(false);
  return (
    <>
      <ModalWithChart resultsModal={resultsModal} setResultsModal={setResultsModal} />
      <Grid
        className={'Future-predictive-window'}
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          textAlign: 'center',
        }}
      >
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.3)',
            columnGap: 2,
            width: '70%',
            m: 'auto',
          }}
        >
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Measure Name</TableCell>
                  <TableCell align="center">Progress</TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <Row key={row.measureName} row={row} setResultsModal={setResultsModal} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default ForecastingResults;
