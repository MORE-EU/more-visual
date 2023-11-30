import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { updateQueryResults } from 'app/modules/store/visualizerSlice';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const ChartDatePicker = () => {
  const dispatch = useAppDispatch();

  const { chartRef, folder, dataset, from, to, resampleFreq, selectedMeasures, queryResults, connected, farmMeta, datasetChoice } = useAppSelector(state => state.visualizer);

  const handleOnAccept = (e, category) => {
    if (category === 'from') {
      chartRef.xAxis[0].setExtremes(e.getTime() + 200, to - 200);
      dispatch(updateQueryResults({ folder, id: dataset.id, from: e.getTime(), to, selectedMeasures, filter: null }));
    } else {
      chartRef.xAxis[0].setExtremes(from + 200, e.getTime() - 200);
      dispatch(updateQueryResults({ folder, id: dataset.id, from, to: e.getTime(), selectedMeasures, filter: null }));
    }
  };

  return (
    <>
      <Typography variant="body1" fontWeight={600} fontSize={15}>
        Time
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={p => <TextField size="small" {...p} />}
          label="From"
          value={from ? from : null}
          minDateTime={queryResults ? queryResults.timeRange[0] : null}
          maxDateTime={queryResults ? queryResults.timeRange[1] : null}
          onAccept={e => {
            handleOnAccept(e, 'from');
          }}
          onChange={e => {}}
          inputFormat="dd/MM/yyyy hh:mm a"
        />
        <Typography variant="body1" fontWeight={400} fontSize={30}>
          {' - '}
        </Typography>
        <DateTimePicker
          renderInput={p => <TextField size="small" {...p} />}
          label="To"
          value={to ? to : null}
          minDateTime={queryResults ? queryResults.timeRange[0] : null}
          maxDateTime={queryResults ? queryResults.timeRange[1] : null}
          onAccept={e => {
            handleOnAccept(e, 'to');
          }}
          onChange={e => {}}
          inputFormat="dd/MM/yyyy hh:mm a"
        />
      </LocalizationProvider>
    </>
  );
};

export default ChartDatePicker;
