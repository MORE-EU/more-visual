import React, {useState} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {
  Box,
  Button,
  Fade,
  FormControl,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Modal,
  Radio,
  Select
} from "@mui/material";
import DatePicker, {DateObject} from "react-multi-date-picker";
import ToolStyles from "app/shared/layout/ToolStyle";
import {getChangePointDates, updateChangePointDates} from "app/modules/visualizer/visualizer.reducer";
import Backdrop from "@material-ui/core/Backdrop";
import ModalStyles from "app/shared/layout/ModalStyle";
import Filter from "app/shared/layout/Filter";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

export interface IChangepointPickerProps {
  dataset: IDataset,
  from: Date,
  to: Date,
  changePointDates: DateObject[],
  getChangePointDates: typeof getChangePointDates,
  updateChangePointDates: typeof updateChangePointDates,
}


export const ChangepointPicker = (props: IChangepointPickerProps) => {
  const {dataset, from, to, changePointDates} = props;
  const [filterFunction, setFilterFunction] = useState(0);
  const [filterColumn, setFilterColumn] = useState(1);
  const [userSelectedDates, setUserSelectedDates] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);
  const filters = [];
  const [openFilter, setOpenFilter] = React.useState(false);
  const classes = ToolStyles();
  const modalClasses = ModalStyles();

  const header = dataset.header;

  const changeFunction = (e) => {
    setFilterFunction(e.target.value);
  }

  const saveFilters = () => {
    setOpenFilter(false);
  }

  const findDates = () => {
    // API CALL
    props.getChangePointDates(null, null);
  }

  const clearDates = () => {
    props.updateChangePointDates([]);
    setUserSelectedDates([]);
  }
  const applyDates = () => {
    props.updateChangePointDates(changePointDates.concat(userSelectedDates));
    setHasChanged(false);
    setUserSelectedDates([]);
  }

  const removeDate = (dates, index) => {
    const filtered = [];
    for (let i = 0; i < dates.length; i++)
      if (i !== index) filtered.push(dates[i]);
    setHasChanged(true);
    return filtered;
  }

  return (
    <Grid item container xs={12} justifyContent="space-between">
      <Grid item xs={6}>
        <Box sx={{display: "flex"}}>
          <Box sx={{padding: "10px 0px 10px 0px", fontWeight: 600, fontSize: "1.3em"}}>
            Select Dates:
          </Box>
          <Box sx={{margin: "auto"}}>
            <DatePicker
              multiple
              value={userSelectedDates}
              onChange={e => {
                setUserSelectedDates(e as DateObject[])
              }}
              // plugins={[
              //   <DatePanel sort="date" key={0}/>
              // ]}
            />
          </Box>
        </Box>
        <Box sx={{textAlign: "center", padding: "10px 0px 10px 0px", fontWeight: 600, fontSize: "1.3em"}}>OR</Box>
        <Box sx={{textAlign: "center"}} className={classes.infoBox}>
          <Box sx={{verticalAlign: "center"}}>
            <p>Choose Dates using</p>
            <FormControl>
              <Select
                labelId="filter-func-select-label"
                id="filter-func-select"
                value={filterFunction}
                onChange={changeFunction}
              >
                <MenuItem
                  key={0}
                  value={0}>Maximal Intervals</MenuItem>
              </Select>
            </FormControl>
            <p>ON</p>
            <FormControl className={classes.formControlMulti}>
              <Select
                labelId="select-filter-col"
                value={filterColumn}
                label="Choose Columns to be Included"
                onChange={e => setFilterColumn(e.target.value as number)}
                renderValue={(selected) => header[selected]}
              >
                {header.map((option, index) => (
                  <MenuItem key={index} value={index}>
                    <ListItemIcon>
                      <Radio checked={filterColumn === index}/>
                    </ListItemIcon>
                    <ListItemText primary={option}/>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box>
              <Button onClick={() => {
                findDates()
              }}>Apply</Button>
              <Button onClick={() => setOpenFilter(true)}>ADD Filters</Button>
            </Box>
            <Modal
              aria-labelledby="filters-modal"
              aria-describedby="Modal for adding filters"
              className={modalClasses.modal}
              open={openFilter}
              onClose={() => setOpenFilter(false)}
              closeAfterTransition
              disableEnforceFocus
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openFilter}>
                <div className={modalClasses.paper}>
                  <Filter filters={filters} columns={[header[filterColumn]]}/>
                  <Button onClick={() => saveFilters()} style={{float: "right"}}>Apply</Button>
                </div>
              </Fade>
            </Modal>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={3}
            sx={{maxHeight: "380px"}}
            className={classes.infoBox}
      >
        <Box sx={{
          width: "100%", height: "8%", borderBottom: "solid 1px black", textAlign: "center"
        }}>
          Dates
        </Box>
        <Box sx={{width: "80%", textAlign: "center", margin: "0 auto", height: "84%", overflow: "hidden"}}>
          {userSelectedDates.map((date, idx) => (
            <Box key={idx} sx={{
              textAlign: "center", margin: "5px 0px 5px 0px", color: "white",
              backgroundColor: "rgb(25, 118, 210)", borderRadius: "5px"
            }}>
              {date.format()}
              <IconButton aria-label="close" onClick={e => setUserSelectedDates(removeDate(userSelectedDates, idx))}>
                <DoNotDisturbOnIcon style={{color: "white", fontSize: "medium"}}/>
              </IconButton>
            </Box>
          ))}
          {changePointDates.length > 0 &&
            <Box>
              {changePointDates.map((date, idx) => (
                <Box key={idx} sx={{
                  textAlign: "center", margin: "5px 0px 5px 0px", color: "white",
                  backgroundColor: "orange", borderRadius: "5px"
                }}>
                  {date.format()}
                  <IconButton aria-label="close"
                              onClick={e => props.updateChangePointDates(removeDate(changePointDates, idx))}>
                    <DoNotDisturbOnIcon style={{color: "white", fontSize: "medium"}}/>
                  </IconButton>
                </Box>
              ))
              }
            </Box>
          }
        </Box>
        <Box sx={{width: "100%", height: "8%", borderTop: "solid 1px black", textAlign: "center"}}>
          <Button
            onClick={() => applyDates()}
            disabled={!(userSelectedDates.length > 0 || hasChanged)}>Apply</Button>
          <Button
            onClick={() => clearDates()}
            disabled={!(changePointDates.length > 0 || userSelectedDates.length > 0)}>Clear</Button>
        </Box>

      </Grid>
    </Grid>
  );

}

export default ChangepointPicker;
