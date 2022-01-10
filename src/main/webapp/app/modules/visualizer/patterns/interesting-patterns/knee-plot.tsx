import {Fade, FormControl, Grid, InputLabel, ListItemText, MenuItem, Modal, Select} from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {Button, Checkbox, ListItemIcon} from '@mui/material';
import React from "react";
import {IDataset} from "app/shared/model/dataset.model";
import {IPatterns} from "app/shared/model/patterns.model";
import ModalStyles from "app/shared/layout/ModalStyle";

export interface IKneePlotProps {
  dataset: IDataset,
  patterns: IPatterns,
  setOpen: (boolean) => {},
}


export const KneePlot = (props: IKneePlotProps) => {
  const {dataset, patterns} = props;
  const [corrected, setCorrected] = React.useState(patterns.corrected.knee !== null);
  const correctedK = corrected ? patterns.corrected.knee.k : 0;
  const correctedDimensions = corrected ? patterns.corrected.knee.dimensions : [];

  const [k, setK] = React.useState(correctedK);
  const [selectedDimensions, setSelectedDimensions] = React.useState(correctedDimensions);
  const header = dataset.header;
  const classes = ModalStyles();
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const handleOpen = () => {
    setOpenSuccess(true);
  };

  const changeNoOfDimensions = (e) => {
    const dims = e.target.value;
    setK(dims);
  }

  const changeColumns = (e) => {
    const val = e.target.value;
    if (val[val.length - 1] === "all") {
      setSelectedDimensions(selectedDimensions.length === header.length ? [] : header);
      return;
    }
    setSelectedDimensions(val);
  }

  const filterDimensions = (e, open) => {
    // TODO: get dimensions through api
    const dimensions = ["active power", "wind speed", "rotor speed", "pitch angle"];

    // TODO: set correction through api
    const knee = {k: 4, dimensions}
    patterns.corrected.knee = knee; // api call

    setCorrected(true);
    handleOpen();
    // props.setOpen(false);
  }

  const resetDimensions = (e) => {
    setCorrected(false);
  }

  const options = {
    title: {
      text: 'Multivariate Pattern Knee Plot'
    },
    series: [
      {
        data: patterns.knee,
        name: "Number of Dimensions"
      }
    ],
    chart: {
      width: 700
    },
    yAxis: {
      title:{
        text: "Matrix Profile Min. Value"
      }
    }

  };

  return (
    <div className={classes.paper}>
      <Grid item xs={12}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Grid>
      {corrected &&
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={8}>
            <b>Dimensions found:</b> {correctedDimensions.map((d) =>  {return (d + ", ");})}
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained"
                    onClick = {e => resetDimensions(e)}
            >Re-Filter Dimensions</Button>
          </Grid>
        </Grid>
      }
      {!corrected &&
        <Grid item spacing={2} container xs={12}>
          <Grid item xs={4}>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel id="k-label">Choose No. of dimensions</InputLabel>
              <Select
                labelId="k-select-label"
                id="k-select"
                value={k}
                label="Choose No. Of Dimensions"
                onChange={changeNoOfDimensions}
              >
                {patterns.knee.map((mGroup, i) => {
                  return <MenuItem
                    key={i}
                    value={i + 1}>{i + 1}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl className={classes.formControlMulti}>
              <InputLabel id="mutiple-select-label">Choose Columns to be Included</InputLabel>
              <Select
                labelId="mutiple-select-label"
                multiple
                value={selectedDimensions}
                label="Choose Columns to be Included"
                onChange={changeColumns}
                renderValue={(selected) => selected.length === 0 ? "Choose Columns to be Included" : selected.join(", ")}
              >
                {header.map((option) => (
                  <MenuItem key={option} value={option}>
                    <ListItemIcon>
                      <Checkbox checked={selectedDimensions.includes(option)}/>
                    </ListItemIcon>
                    <ListItemText primary={option}/>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item container xs={4} spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
          >
            <Grid item xs='auto'>
              <Button variant="contained"
                      onClick={e => filterDimensions(e, open)}
                      disabled={k === 0}
              >Filter Dimensions</Button>
            </Grid>
          </Grid>
        </Grid>
      }
          <Grid item xs={12}>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openSuccess}
              onClose={handleClose}
              closeAfterTransition
              disableEnforceFocus
              // BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openSuccess}>
                <div className={classes.paper}>
                  <b>Dimensions found:</b> {correctedDimensions.map((d) => {
                  return (d + ", ");
                })}
                </div>
              </Fade>
            </Modal>
          </Grid>


    </div>
  );
}
