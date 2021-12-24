import React, {useEffect} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography, ListItemText} from '@mui/material';
import { Grid } from '@mui/material';
import { IPatterns } from 'app/shared/model/patterns.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Tab, Tabs} from '@mui/material';
import {KneePlot} from "app/modules/visualizer/patterns/interesting-patterns/knee-plot";
import {AnnotationVector} from "app/modules/visualizer/patterns/interesting-patterns/annotation-vector";
import ModalStyles from "app/shared/layout/ModalStyle";


export interface IVisCorrectionProps {
  dataset: IDataset,
  patterns: IPatterns,
}

export const VisCorrection = (props: IVisCorrectionProps) => {
  const {dataset, patterns} = props;
  const classes = ModalStyles();
  const [open, setOpen] = React.useState(false);
  const [openC, setOpenC] = React.useState(-1);
  //let setOpenFunc = setOpen.bind(this); //so it can be passed as a prop of knee-plot
  const correctedKnee = patterns.corrected.knee !== null;
  const correctedAv = patterns.corrected.annotationVector !== null;

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (c) => () => {
    setOpen(true);
    setOpenC(c)
  };


  return (

    <Grid item container xs={12} spacing={4}>
      {correctedKnee &&
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={6}>
            Uneeded dimensions have been filtered
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleOpen(0)}>View Useful Dimensions</Button>
          </Grid>
        </Grid>}
      {!correctedKnee &&
        <Grid item container xs={12}>
          <Grid item xs={8}>
            <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> These Patterns may contain uneeded dimensions
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleOpen(0)}>Filter them</Button>
          </Grid>
        </Grid>
      }
      {correctedAv &&
        <Grid item container xs={12} spacing={4}>
          <Grid item xs={6}>
            Annotation Vector has been applied
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleOpen(1)}>View Annotation Vector</Button>
          </Grid>
        </Grid>}

      {!correctedAv &&
        <Grid item container xs={12}>
          <Grid item xs={8}>
            <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> Improve these patterns through the use of an Annotation Vector
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleOpen(1)}>Annotate Patterns</Button>
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
              {/*<Tabs value={openTab} onChange={(e, v) => { changeTab(v) }}  centered className={classes.paper}>*/}
              {/*  <Tab label="Knee Plot"/>*/}
              {/*  <Tab label="Annotation Vector"/>*/}
              {/*</Tabs>*/}
              {openC === 0 && <KneePlot dataset={dataset} patterns={patterns} setOpen={setOpen.bind(this)}/>}
              {openC === 1 && <AnnotationVector dataset={dataset} patterns={patterns} setOpen={setOpen.bind(this)}/>}
            </div>
          </Fade>
        </Modal>
      </Grid>
    </Grid>
  );};


export default VisCorrection;
