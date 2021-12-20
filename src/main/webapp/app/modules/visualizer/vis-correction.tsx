import React, {useEffect} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography, ListItemText} from '@mui/material';
import { Grid } from '@mui/material';
import { IPatterns } from 'app/shared/model/patterns.model';
import Highcharts from 'highcharts/highstock'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HighchartsReact from 'highcharts-react-official';
import {Tab, Tabs} from '@mui/material';
import {KneePlot} from "app/modules/visualizer/knee-plot";
import {TabPanel} from "@mui/lab";
import {AnnotationVector} from "app/modules/visualizer/annotation-vector";


export interface IVisCorrectionProps {
  dataset: IDataset,
  data: any,
  // selectedMeasures: number[],
  // patternLength: number,
  // resampleFreq: string,
  // selectedPattern: number,
  // computedPatternLength: number,
  // updateComputedPatternLength: typeof updateComputedPatternLength,
  // updateSelectedPattern: typeof  updateSelectedPattern,
  // updatePatterns: typeof updatePatterns,
  // getPatterns: typeof  getPatterns,
  isCorrected: boolean,
  patterns: IPatterns,
}


const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

export const VisCorrection = (props: IVisCorrectionProps) => {
  const {dataset, data, patterns, isCorrected} = props;
  const classes = useStyles();
  let [open, setOpen] = React.useState(false);
  const [openTab, setopenTab] = React.useState(0);
  setOpen = setOpen.bind(this); //so it can be passed as a prop of knee-plot
  const corrected = patterns.corrected.knee !== null;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const changeTab = (v) => {
    setopenTab(v);
  }
  console.log(open);
  return (

    <Grid item container xs={12} spacing={4}>
      {corrected &&
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={6}>
            These Patterns have been corrected
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleOpen}>View corrections</Button>
          </Grid>
        </Grid>}
      {!corrected &&
        <Grid item container xs={12}>
          <Grid item xs={6}>
            <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> These Patterns have not been corrected
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleOpen}>Apply Corrections</Button>
          </Grid>
        </Grid>
      }
      <Grid item xs={12}>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          disableEnforceFocus
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div>
              { /*<h2>Pattern Correction</h2>*/ }
              <Tabs value={openTab} onChange={(e, v) => { changeTab(v) }}  centered className={classes.paper}>
                <Tab label="Knee Plot"/>
                <Tab label="Annotation Vector"/>
              </Tabs>
              {openTab === 0 && <KneePlot dataset={dataset} patterns={patterns} setOpen={setOpen.bind(this)}/>}
              {openTab === 1 && <AnnotationVector dataset={dataset} patterns={patterns}/>}
            </div>
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );};


export default VisCorrection;
