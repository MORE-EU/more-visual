import React, { Dispatch, SetStateAction } from 'react';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import { IForecastingForm } from 'app/shared/model/forecasting.model';
import Tooltip from '@mui/material/Tooltip';
import { useAppSelector } from 'app/modules/store/storeConfig';
import Chip from '@mui/material/Chip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import OptionalFeaturesTable from './forecasting-optional-features';

const map = {
  'Previous Hour': 'prevHour',
  'Previous Day': 'prevDay',
  'Previous Week': 'prevWeek',
  'Previous Month': 'prevMonth',
};

interface IForecastingFeatureExtr {
  forecastingForm: IForecastingForm;
  setForecastingForm: Dispatch<SetStateAction<IForecastingForm>>;
}

const ForecastingFeatureExtr = (props: IForecastingFeatureExtr) => {
  const { forecastingForm, setForecastingForm } = props;
  const { selectedMeasures, dataset } = useAppSelector(state => state.visualizer);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const hadleOptionalFeatureCheckBoxes = value => e => {
    if (Object.hasOwn(forecastingForm.features.optionalFeatures, value)) {
      const feat = forecastingForm.features.optionalFeatures;
      delete feat[value];
      setForecastingForm(state => ({ ...state, features: { ...state.features, optionalFeatures: feat } }));
    } else {
      if (value === 'pastMetrics') {
        setForecastingForm(state => ({
          ...state,
          features: {
            ...forecastingForm.features,
            optionalFeatures: { ...state.features.optionalFeatures, [value]: { prevDay: [], prevHour: [], prevWeek: [], prevMonth: [] } },
          },
        }));
      } else {
        setForecastingForm(state => ({
          ...state,
          features: { ...forecastingForm.features, optionalFeatures: { ...state.features.optionalFeatures, [value]: [] } },
        }));
      }
    }
  };

  const handleTemporalCheckboxes = value => e => {
    if (forecastingForm.features.optionalFeatures.temporal.includes(value)) {
      setForecastingForm(state => ({
        ...state,
        features: {
          ...state.features,
          optionalFeatures: {
            ...state.features.optionalFeatures,
            temporal: state.features.optionalFeatures.temporal.filter(val => val !== value),
          },
        },
      }));
    } else {
      setForecastingForm(state => ({
        ...state,
        features: {
          ...state.features,
          optionalFeatures: { ...state.features.optionalFeatures, temporal: [...state.features.optionalFeatures.temporal, value] },
        },
      }));
    }
  };

  const handlePastMetricsCheckboxes = (mapValue, value) => e => {
    if (forecastingForm.features.optionalFeatures.pastMetrics[map[mapValue]].includes(value)) {
      setForecastingForm(state => ({
        ...state,
        features: {
          ...state.features,
          optionalFeatures: {
            ...state.features.optionalFeatures,
            pastMetrics: {
              ...state.features.optionalFeatures.pastMetrics,
              [map[mapValue]]: state.features.optionalFeatures.pastMetrics[map[mapValue]].filter(val => val !== value),
            },
          },
        },
      }));
    } else {
      setForecastingForm(state => ({
        ...state,
        features: {
          ...state.features,
          optionalFeatures: {
            ...state.features.optionalFeatures,
            pastMetrics: {
              ...state.features.optionalFeatures.pastMetrics,
              [map[mapValue]]: [...state.features.optionalFeatures.pastMetrics[map[mapValue]], value],
            },
          },
        },
      }));
    }
  };

  const handleDerivativesCheckboxes = value => e => {
    if (forecastingForm.features.optionalFeatures.derivatives.includes(value)) {
      setForecastingForm(state => ({
        ...state,
        features: {
          ...state.features,
          optionalFeatures: {
            ...state.features.optionalFeatures,
            derivatives: state.features.optionalFeatures.derivatives.filter(val => val !== value),
          },
        },
      }));
    } else {
      setForecastingForm(state => ({
        ...state,
        features: {
          ...state.features,
          optionalFeatures: { ...state.features.optionalFeatures, derivatives: [...state.features.optionalFeatures.derivatives, value] },
        },
      }));
    }
  };

  return (
    <>
      <Grid className={'Features-values'} sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: 2, textAlign: 'center' }}>
        <Grid
          sx={{
            width: '90%',
            m: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            rowGap: 2,
          }}
        >
          <Grid sx={{ width: '100%', borderBottom: '1px solid rgba(0,0,0,0.3)' }}>
            <Typography variant="subtitle1" fontSize={20}>
              Features
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, width: '70%', textAlign: 'center', m: 'auto' }}>
            {selectedMeasures.map(mez => (
              <Grid sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.3)', borderRadius: 4, columnGap: 2 }}>
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
                    {`${dataset.header[mez]}`}
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
                    {dataset.header.map(header => (
                      <MenuItem onClick={handleClose}>{header}</MenuItem>
                    ))}
                  </Menu>
                </Grid>
                <Grid>
                  <Chip label={`${dataset.header[mez + 1]}`} onDelete={() => {}} />
                  <Chip label={`${dataset.header[mez + 2]}`} onDelete={() => {}} />
                  <Chip label={`${dataset.header[mez + 3]}`} onDelete={() => {}} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid className="optional-feature-extraction" sx={{ display: 'flex', flexDirection: 'column', rowGap: 2 }}>
          <Grid sx={{ width: '90%', borderBottom: '1px solid rgba(0,0,0,0.3)', m: 'auto' }}>
            <Typography variant="subtitle1" fontSize={20}>
              Optional Features
            </Typography>
          </Grid>
          <Grid
            className={'Features-values-choices'}
            sx={{ display: 'flex', flexDirection: 'row', width: '40%', m: 'auto', border: '1px solid rgba(0,0,0,0.3)', borderRadius: 6 }}
          >
            {/* <Grid
            sx={{
              width: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid rgba(0,0,0,0.3)',
            }}
          >
            <Typography variant="subtitle1" fontSize={20}>
              Optional Features
            </Typography>
          </Grid> */}
            <Grid sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="subtitle1" fontSize={15}>
                  Temporal
                </Typography>
                <Tooltip
                  title="any feature that is associated with or changes over time (time-related data), such as hour, minute, day, weekday, etc.."
                  placement="right"
                >
                  <HelpIcon color="primary" />
                </Tooltip>
                <Checkbox
                  value={Object.hasOwn(forecastingForm.features.optionalFeatures, 'temporal')}
                  onChange={hadleOptionalFeatureCheckBoxes('temporal')}
                />
              </Grid>
              <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="subtitle1" fontSize={15}>
                  Past Metrics
                </Typography>
                <Tooltip
                  title="features associated with the past that happened in the same chronological interval, such as last day, last week, etc."
                  placement="right"
                >
                  <HelpIcon color="primary" />
                </Tooltip>
                <Checkbox
                  value={Object.hasOwn(forecastingForm.features.optionalFeatures, 'pastMetrics')}
                  onChange={hadleOptionalFeatureCheckBoxes('pastMetrics')}
                />
              </Grid>
              <Grid sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="subtitle1" fontSize={15}>
                  Derivatives
                </Typography>
                <Tooltip
                  title="generated features by calculating the first and second derivatives of the input features. The first derivative represents the slope of a curve, while the second derivative represents its curvature."
                  placement="right"
                >
                  <HelpIcon color="primary" />
                </Tooltip>
                <Checkbox
                  value={Object.hasOwn(forecastingForm.features.optionalFeatures, 'derivatives')}
                  onChange={hadleOptionalFeatureCheckBoxes('derivatives')}
                />
              </Grid>
            </Grid>
          </Grid>
          {Object.hasOwn(forecastingForm.features.optionalFeatures, 'temporal') && (
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
                      <Checkbox
                        value={forecastingForm.features.optionalFeatures['temporal'].includes(text)}
                        onChange={handleTemporalCheckboxes(text)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
          {Object.hasOwn(forecastingForm.features.optionalFeatures, 'pastMetrics') && (
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
                          value={forecastingForm.features.optionalFeatures['pastMetrics'][map[text]].includes(loadText)}
                          onChange={handlePastMetricsCheckboxes(text, loadText)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          {Object.hasOwn(forecastingForm.features.optionalFeatures, 'derivatives') && (
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
                    <Checkbox
                      value={forecastingForm.features.optionalFeatures.derivatives.includes(text)}
                      onChange={handleDerivativesCheckboxes(text)}
                    />
                    <Typography variant="subtitle1" fontSize={20}>
                      {text}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}
          <Grid sx={{width: "60%", m: "auto"}}>
            <OptionalFeaturesTable />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ForecastingFeatureExtr;
