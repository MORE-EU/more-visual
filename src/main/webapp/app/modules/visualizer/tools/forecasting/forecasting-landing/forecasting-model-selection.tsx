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

const savedModels = ['model1', 'model2', 'model3', 'model4', 'model5'];

const ForecastingModelSelection = (props) => {
    const handleNewTrain = () => {
        props.setNewTrain(true);
    }
  return (
    <Grid sx={{ height: '100%', width: '100%', scroll: 'auto', display: 'flex', flexDirection: 'column' }}>
      <Grid sx={{ width: '80%', borderBottom: '1px solid rgba(0,0,0,0.3)', textAlign: 'center', m: 'auto' }}>
        <Typography variant="subtitle1" fontSize={20}>
          Saved Models
        </Typography>
      </Grid>
      <Grid sx={{ width: '40%', textAlign: 'center', m: 'auto', rowGap: 1, display: 'flex', flexDirection: 'column' }}>
        {savedModels.map((modelName) => (
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
        </Button>
      </Grid>
    </Grid>
  );
};

export default ForecastingModelSelection;
