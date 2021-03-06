import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, Button, Divider, Grid, List, ListItem, ListItemText, Modal, Typography} from '@mui/material';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import {Calendar, DateObject} from 'react-multi-date-picker';
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import {IChangePointDate} from 'app/shared/model/changepoint-date.model';
import {updateActiveTool, updateCustomChangePoints} from '../../visualizer.reducer';
import DeleteIcon from '@mui/icons-material/Delete';

export interface IChartDatePickerProps {
  from: number;
  to: number;
  showDatePick: boolean;
  setShowDatePick?: Dispatch<SetStateAction<any>>;
  customChangePoints: IChangePointDate[];
  updateCustomChangePoints: typeof updateCustomChangePoints;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateActiveTool: typeof updateActiveTool;
}

export const ChartDatePicker = (props: IChartDatePickerProps) => {
  const {showDatePick, from, to, customChangePoints} = props;

  const [value, setValue] = useState({start: null, end: null});
  const [dateValues, setDateValues] = useState([]);

  const handleClose = () => {
    props.setShowDatePick(false);
  };

  useEffect(() => {
    props.updateCustomChangePoints(dateValues);
  }, [dateValues]);

  const handleCalendarChange = e => {
    if (e[1]) {
      const date1 = new Date();
      const date2 = new Date();
      date1.setFullYear(e[0].year, e[0].month.number - 1, e[0].day);
      date1.setHours(e[0].hour, e[0].minute, e[0].second, 0);
      date2.setFullYear(e[1].year, e[1].month.number - 1, e[1].day);
      date2.setHours(e[1].hour, e[1].minute, e[1].second, 0);
      setValue({start: date1, end: date2});
    }
  };

  const handleAddButton = () => {
    setDateValues([...dateValues, value]);
  };

  const handleDeleteButton = (idx) => {
    setDateValues(oldDateValues => oldDateValues.filter((date, i) => i !== idx));
  }

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
      <Modal open={showDatePick} onClose={handleClose} aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container alignItems="center" flexDirection="column">
            <Grid item sx={{textAlign: "center"}}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Date Picker
              </Typography>
              <Calendar
                range
                format="MM/DD/YYYY HH:mm:ss"
                // minDate={from}
                // maxDate={to}
                value={from}
                onChange={e => {
                  handleCalendarChange(e as DateObject[]);
                }}
                plugins={[<DatePanel key={"DatePanel"} position="right" markFocused/>,
                  <TimePicker key={"TimePicker"} position="bottom"/>]}
              />
              <Button
                sx={{mt: 1}}
                size="small"
                variant="contained"
                onClick={() => {
                  handleAddButton();
                }}
              >
                <Typography variant="overline" component="h2">
                  Add
                </Typography>
              </Button>
              <List dense>
                {dateValues.map((val, idx) => {
                  return (
                    <div key={idx}>
                      <Divider variant="inset" component="li" key={"d" + idx}/>
                      <ListItem
                        key={idx}
                        disableGutters
                        secondaryAction={
                          <Button>
                            <DeleteIcon color={"action"} onClick={() => {
                              handleDeleteButton(idx)
                            }}/>
                          </Button>
                        }
                      >
                        <ListItemText
                          primary={`${val.start.toString().substring(0, val.start.toString().indexOf('G'))} - ${val.end
                            .toString()
                            .substring(0, val.end.toString().indexOf('G'))}`}
                        />
                      </ListItem>
                    </div>
                  );
                })}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};
