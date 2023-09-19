import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import { grey } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from 'app/modules/store/storeConfig';
import { deleteModelByName, setPredModalOpen, setSelectedModel } from 'app/modules/store/forecastingSlice';
import ForecastingPredModal from '../forecasting-prediction/forecasting-prediction-modal';

const ForecastingModelSelection = props => {
  const { setNewTrain, savedModels } = props;
  const dispatch = useAppDispatch();

  const handleNewTrain = () => {
    setNewTrain(true);
  };

  const handleDelete = modelName => e => {
    dispatch(deleteModelByName(modelName));
  };

  const handleInference = modelName => e => {
    dispatch(setPredModalOpen(true));
    dispatch(setSelectedModel(modelName));
  };

  return (
    <>
    <ForecastingPredModal />
    <Grid sx={{ height: '100%', width: '100%', scroll: 'auto', display: 'flex', flexDirection: 'column', rowGap: 2 }}>
      <Grid sx={{ width: '80%', borderBottom: '1px solid rgba(0,0,0,0.3)', textAlign: 'center', m: 'auto' }}>
        <Typography variant="subtitle1" fontSize={20}>
          Saved Models
        </Typography>
      </Grid>
      <Grid
        sx={{
          width: '100%',
          textAlign: 'center',
          m: 'auto',
          rowGap: 1,
          display: 'flex',
          flexDirection: 'column',
          pb: 4,
          pr: '20%',
          pl: '20%',
          overflowY: 'auto',
        }}
      >
        <TableContainer sx={{ maxheight: '80%' }} component={Paper}>
          <Table stickyHeader aria-label="caption table" size="small">
            <caption style={{ padding: 0 }}>
              <Button
                variant="text"
                onClick={handleNewTrain}
              >
                <AddIcon sx={{ fontSize: 16 }} />
                <Typography variant="subtitle1" fontSize={12}>
                  Train a new model
                </Typography>
              </Button>
            </caption>
            <TableHead>
              <TableRow>
                <TableCell>Model Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedModels.map(model => (
                <TableRow key={model.model_name}>
                  <TableCell component="th" scope="row">
                    {model.model_name}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Retrain Model">
                      <IconButton>
                        <ModelTrainingIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Predict">
                      <IconButton onClick={handleInference(model.model_name)}>
                        <QueryStatsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={handleDelete(model.model_name)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
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

export default ForecastingModelSelection;
