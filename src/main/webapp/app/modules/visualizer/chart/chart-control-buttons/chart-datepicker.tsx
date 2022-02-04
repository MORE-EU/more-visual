import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Button, Grid, Typography, Tooltip, Modal, Box, Divider } from '@mui/material';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { fromPairs } from 'lodash';

export interface IChartDatePickerProps {
  from: Date;
  to: Date;
  showDatePick: boolean;
  setShowDatePick?: Dispatch<SetStateAction<any>>;
}

export const ChartDatePicker = (props: IChartDatePickerProps) => {
  const { showDatePick, from, to } = props;

  const [value, setValue] = useState([]);

  const handleClose = () => {
    props.setShowDatePick(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  } as const;

  return (
    <div>
      <Modal open={showDatePick} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container alignItems="center">
            <Grid item>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Date Picker
              </Typography>
              <DatePicker
                range
                format="MM/DD/YYYY HH:mm:ss"
                minDate={from}
                maxDate={to}
                value={from}
                onChange={e => {setValue(e as DateObject[])}}
                plugins={[<TimePicker position="bottom" />, <DatePanel position="right" markFocused />]}
              />
            </Grid>
            <Divider orientation="vertical" />
            <Grid item>
            <Typography variant="h6" component="h2">
                Use a Function
              </Typography>
              <Button 
              size='small'
              variant="contained"
                onClick={() => {
                }}
              >
                <Typography variant="overline" component="h2">
                Changepoint detection
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
