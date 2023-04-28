import Grid from '@mui/material/Grid';
import React, { Dispatch, SetStateAction } from 'react';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';

interface IForecastingTrain {
  forecastingForm: IForecastingForm;
  setForecastingForm: Dispatch<SetStateAction<IForecastingForm>>;
}

function createData(measureName, progress, estimatedTime, actions) {
  return {
    measureName,
    progress,
    estimatedTime,
    actions,
    history: [
      {
        modelName: 'LSTM',
        accuracy: 0.8,
        precision: 0.2,
        recall: 0.5,
      },
      {
        modelName: 'Prophet',
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

const rows = [createData('active_power', 80, '1h 5m', 0), createData('pitch_angle', 20, '3m', 1)];

const Row = props => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.measureName}
        </TableCell>
        <TableCell align="center">
          <LinearProgressWithLabel value={row.progress} />
        </TableCell>
        <TableCell align="center">{row.estimatedTime}</TableCell>
        <TableCell align="center">
          <IconButton
            disabled={row.progress !== 100}
            onClick={() => {
              console.log(row.action);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </TableCell>
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
                    <TableCell/>
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

const ForecastingTrain = (props: IForecastingTrain) => {
  const { selectedMeasures } = useAppSelector(state => state.visualizer);
  const { forecastingForm, setForecastingForm } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePredictions = value => {
    setForecastingForm(state => ({ ...state, predictions: parseInt(value.target.value, 10) }));
  };

  return (
    <>
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
        <Grid sx={{ width: '90%', borderBottom: '1px solid rgba(0,0,0,0.3)', m: 'auto' }}>
          <Typography variant="subtitle1" fontSize={20}>
            {`Model Selection & Train Results`}
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.3)',
            borderRadius: 4,
            columnGap: 2,
            width: '70%',
            m: 'auto',
          }}
        >
          <Grid
            sx={{
              width: 'max-content',
              backgroundColor: grey[300],
              display: 'flex',
              alignItems: 'center',
              borderRadius: '16px 0 0 16px',
              pl: 1,
              height: 'auto',
            }}
          >
            <Typography variant="subtitle1" fontSize={20}>
              {`Selected Models`}
            </Typography>
            <Tooltip title="Add Feature" placement="top">
              <IconButton onClick={handleClick}>
                <AddCircleIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 50 * 4.5,
                },
              }}
            >
              <MenuItem onClick={handleClose}>LSTM</MenuItem>
              <MenuItem onClick={handleClose}>Prophet</MenuItem>
            </Menu>
          </Grid>
          <Grid>
            <Chip label={`LSTM`} onDelete={() => {}} />
            <Chip label={`Prophet`} onDelete={() => {}} />
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(0,0,0,0.3)',
            borderRadius: 4,
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
                  <TableCell align="center">Estimated Time</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <Row key={row.measureName} row={row} />
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
