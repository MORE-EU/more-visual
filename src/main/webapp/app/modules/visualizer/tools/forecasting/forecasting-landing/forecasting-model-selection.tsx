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

const savedModels = ['model1', 'model2', 'model3', 'model4', 'model5'];

const ForecastingModelSelection = props => {
  const handleNewTrain = () => {
    props.setNewTrain(true);
  };
  return (
    <Grid sx={{ height: '100%', width: '100%', scroll: 'auto', display: 'flex', flexDirection: 'column', rowGap: 2 }}>
      <Grid sx={{ width: '80%', borderBottom: '1px solid rgba(0,0,0,0.3)', textAlign: 'center', m: 'auto' }}>
        <Typography variant="subtitle1" fontSize={20}>
          Saved Models
        </Typography>
      </Grid>
      <Grid sx={{ width: '100%', textAlign: 'center', m: 'auto', rowGap: 1, display: 'flex', flexDirection: 'column', pb: 4, pr: "20%", pl: "20%", overflowY:"auto" }}>
        {/* {savedModels.map((modelName) => (
          <Grid key={modelName} sx={{ width: '100%', display: 'flex', bgcolor: grey[200], borderRadius: 10, alignItems: 'center' }}>
            <Typography variant="subtitle1" fontSize={16} sx={{ pl: 3 }}>
              {modelName}
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Tooltip title="Retrain Model">
            <IconButton>
              <ModelTrainingIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Predict">
            <IconButton>
              <QueryStatsIcon />
            </IconButton>
            </Tooltip>
          </Grid>
        ))}
        <Button variant="contained" sx={{ borderRadius: 10, fontSize: 4, textDecoration: 'none', justifyContent: "flex-start", alignItems: "end", bgcolor: grey[400], color: grey[800] }} onClick={handleNewTrain}>
          <AddIcon />
          <Typography variant="subtitle1" fontSize={14}>
            Train a new model
          </Typography>
        </Button> */}
        <TableContainer sx={{maxheight: "80%"}} component={Paper}>
          <Table stickyHeader aria-label="caption table" size="small">
            <caption style={{padding: 0}}>
              <Button
                variant="text"
                // sx={{
                //   borderRadius: 10,
                //   fontSize: 4,
                //   textDecoration: 'none',
                //   justifyContent: 'flex-start',
                //   alignItems: 'center',
                //   bgcolor: grey[400],
                //   color: grey[800],
                // }}
                onClick={handleNewTrain}
              >
                <AddIcon sx={{fontSize: 16}}/>
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
              {savedModels.map(modelName => (
                <TableRow key={modelName}>
                  <TableCell component="th" scope="row">
                    {modelName}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Retrain Model">
                      <IconButton>
                        <ModelTrainingIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Predict">
                      <IconButton>
                        <QueryStatsIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton>
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
  );
};

export default ForecastingModelSelection;
