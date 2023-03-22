import React, { Dispatch, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import { IAutoMLForm } from 'app/shared/model/autoML.model';

const map = {
  'Previous Hour': 'prevHour',
  'Previous Day': 'prevDay',
  'Previous Week': 'prevWeek',
  'Previous Month': 'prevMonth',
};

interface IAutoMLFeatureExtr {
  autoMLForm: IAutoMLForm;
  setAutoMLForm: Dispatch<SetStateAction<IAutoMLForm>>;
}

const AutoMLFeatureExtr = (props: IAutoMLFeatureExtr) => {
  const { autoMLForm, setAutoMLForm } = props;

  const hadleFeatureCheckBoxes = value => e => {
    if (Object.hasOwn(autoMLForm.features, value)) {
      const feat = autoMLForm.features;
      delete feat[value];
      setAutoMLForm(state => ({ ...state, features: feat }));
    } else {
      if (value === 'pastMetrics') {
        setAutoMLForm(state => ({
          ...state,
          features: { ...autoMLForm.features, [value]: { prevDay: [], prevHour: [], prevWeek: [], prevMonth: [] } },
        }));
      } else {
        setAutoMLForm(state => ({ ...state, features: { ...autoMLForm.features, [value]: [] } }));
      }
    }
  };

  const handleTemporalCheckboxes = value => e => {
    if (autoMLForm.features.temporal.includes(value)) {
      setAutoMLForm(state => ({
        ...state,
        features: { ...state.features, temporal: state.features.temporal.filter(val => val !== value) },
      }));
    } else {
      setAutoMLForm(state => ({ ...state, features: { ...state.features, temporal: [...state.features.temporal, value] } }));
    }
  };

  const handlePastMetricsCheckboxes = (mapValue, value) => e => {
    if (autoMLForm.features.pastMetrics[map[mapValue]].includes(value)) {
      setAutoMLForm(state => ({
        ...state,
        features: { ...state.features, pastMetrics: { ...state.features.pastMetrics, [map[mapValue]]:  state.features.pastMetrics[map[mapValue]].filter(val => val !== value)}},
      }));
    } else {
      setAutoMLForm(state => ({
        ...state,
        features: {
          ...state.features,
          pastMetrics: { ...state.features.pastMetrics, [map[mapValue]]: [...state.features.pastMetrics[map[mapValue]], value] },
        },
      }));
    }
  };

  const handleDerivativesCheckboxes = value => e => {
    if (autoMLForm.features.derivatives.includes(value)) {
      setAutoMLForm(state => ({
        ...state,
        features: { ...state.features, derivatives: state.features.derivatives.filter(val => val !== value) },
      }));
    } else {
      setAutoMLForm(state => ({ ...state, features: { ...state.features, derivatives: [...state.features.derivatives, value] } }));
    }
  }

  return (
    <>
      <Grid className={'Features-values'} sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 2, textAlign: 'center' }}>
        <Grid
          className={'Features-values-choices'}
          sx={{ display: 'flex', flexDirection: 'row', width: '40%', m: 'auto', border: '1px solid rgba(0,0,0,0.3)', borderRadius: 6 }}
        >
          <Grid
            sx={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid rgba(0,0,0,0.3)',
            }}
          >
            <Typography variant="subtitle1" fontSize={20}>
              Features
            </Typography>
          </Grid>
          <Grid sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="subtitle1" fontSize={15}>
                Temporal
              </Typography>
              <HelpIcon color="primary" />
              <Checkbox value={Object.hasOwn(autoMLForm.features, 'temporal')} onChange={hadleFeatureCheckBoxes('temporal')} />
            </Grid>
            <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="subtitle1" fontSize={15}>
                Past Metrics
              </Typography>
              <HelpIcon color="primary" />
              <Checkbox value={Object.hasOwn(autoMLForm.features, 'pastMetrics')} onChange={hadleFeatureCheckBoxes('pastMetrics')} />
            </Grid>
            <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="subtitle1" fontSize={15}>
                Derivatives
              </Typography>
              <HelpIcon color="primary" />
              <Checkbox value={Object.hasOwn(autoMLForm.features, 'derivatives')} onChange={hadleFeatureCheckBoxes('derivatives')} />
            </Grid>
          </Grid>
        </Grid>
        {Object.hasOwn(autoMLForm.features, 'temporal') && (
          <Grid className={'Features-values-choice-1'} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '100%' }}>
            <Grid sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" fontSize={20}>
                Temporal
              </Typography>
            </Grid>
            <Grid sx={{ textAlign: 'center' }}>
              <Grid
                sx={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  gap: 1,
                  textAlign: 'center',
                  width: '50%',
                  m: 'auto',
                  justifyContent: 'space-evenly',
                }}
              >
                {['Minute', 'Month', 'is Working hour', 'Hour', 'Weekday', 'Is Weekend', 'day', 'Week of year'].map(text => (
                  <Grid
                    key={`${text}-Temporal-choice`}
                    sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.3)', borderRadius: 6, pl: 1, pr: 1 }}
                  >
                    <Typography variant="subtitle1" fontSize={15}>
                      {text}
                    </Typography>
                    <Checkbox value={autoMLForm.features['temporal'].includes(text)} onChange={handleTemporalCheckboxes(text)} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}
        {Object.hasOwn(autoMLForm.features, 'pastMetrics') && (
          <Grid className={'Features-values-choice-2'} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '100%' }}>
            <Grid sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" fontSize={20}>
                Past Metrics
              </Typography>
            </Grid>
            <Grid
              sx={{
                textAlign: 'center',
                width: '50%',
                display: 'flex',
                flexFlow: 'row wrap',
                m: 'auto',
                gap: 2,
                justifyContent: 'space-evenly',
              }}
            >
              {['Previous Hour', 'Previous Day', 'Previous Week', 'Previous Month'].map(text => (
                <Grid
                  key={`${text}-Past-Metrics-categories`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    border: '1px solid rgba(0,0,0,0.3)',
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Typography variant="subtitle1" fontSize={20}>
                    {text}
                  </Typography>
                  {['Actual Load', 'Average Load', 'Min Load', 'Max Load'].map(loadText => (
                    <Grid
                      key={`${loadText}-Past-Metrics-category-choice`}
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <Typography variant="subtitle1" fontSize={15}>
                        {loadText}
                      </Typography>
                      <Checkbox
                        value={autoMLForm.features['pastMetrics'][map[text]].includes(loadText)}
                        onChange={handlePastMetricsCheckboxes(text, loadText)}
                      />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {Object.hasOwn(autoMLForm.features, 'derivatives') && (
          <Grid className={'Features-values-choice-3'} sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '100%' }}>
            <Grid sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1" fontSize={20}>
                Derivatives
              </Typography>
            </Grid>
            <Grid
              sx={{
                textAlign: 'center',
                width: '40%',
                display: 'flex',
                flexFlow: 'row wrap',
                m: 'auto',
                columnGap: 1,
                justifyContent: 'space-evenly',
              }}
            >
              {['Slope', 'Curvature'].map(text => (
                <Grid
                  key={`${text}-Derivative-choice`}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '40%',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    border: '1px solid rgba(0,0,0,0.3)',
                    borderRadius: 6,
                  }}
                >
                  <Checkbox value={autoMLForm.features.derivatives.includes(text)} onChange={handleDerivativesCheckboxes(text)}/>
                  <Typography variant="subtitle1" fontSize={20}>
                    {text}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AutoMLFeatureExtr;
