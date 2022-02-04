import React, {useEffect} from 'react';
import {IDataset} from "app/shared/model/dataset.model";
import {Button, FormControl, InputLabel, MenuItem, Select, Typography, ListItemText, Box} from '@mui/material';
import { IPatterns } from 'app/shared/model/patterns.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {updateSelectedMeasures} from '../../visualizer.reducer';
import {KneePlot} from "app/modules/visualizer/tools/pattern-extraction/knee-plot";
import {AnnotationVector} from "app/modules/visualizer/tools/pattern-extraction/annotation-vector";
import ModalStyles from "app/shared/layout/ModalStyle";


export interface IVisCorrectionProps {
  dataset: IDataset,
  patterns: IPatterns,
  updateSelectedMeasures: typeof updateSelectedMeasures,
}

export const VisCorrection = (props: IVisCorrectionProps) => {
  const {dataset, patterns} = props;
  const classes = ModalStyles();
  const [open, setOpen] = React.useState(false);
  const [openC, setOpenC] = React.useState(-1);
  // let setOpenFunc = setOpen.bind(this); //so it can be passed as a prop of knee-plot
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

    <Box sx={{display:'flex', flexDirection: 'column', pt: 2}}>
      {correctedKnee &&
        <Box>
          <Box >
            Uneeded dimensions have been filtered
          </Box>
          <Box>
            <Button onClick={handleOpen(0)}>View Useful Dimensions</Button>
          </Box>
        </Box>}
      {!correctedKnee &&
        <Box>
          <Box sx={{display:'flex', flexDirection: 'row'}}>
            <Box>
              <FontAwesomeIcon icon={faExclamationTriangle}/>
            </Box>
            <Box>
              <Typography variant='body1' >These Patterns may contain uneeded dimensions</Typography>
            </Box>
          </Box>
          <Box sx={{float:'right'}} >
            <Button onClick={handleOpen(0)}>Filter them</Button>
          </Box>
        </Box>
      }
      {correctedAv &&
        <Box >
          <Box >
            An Annotation Vector of type {correctedAv} has been applied
          </Box>
          <Box>
            <Button onClick={handleOpen(1)}>View Annotation Vector</Button>
          </Box>
        </Box>}
      {!correctedAv &&
        <Box>
          <Box sx={{display:'flex', flexDirection: 'row'}}>
            <Box >
              <FontAwesomeIcon icon={faExclamationTriangle}/>
            </Box>
            <Box>
              <Typography variant='body1' >Improve these patterns through the use of an Annotation Vector</Typography>
            </Box>
          </Box>
          <Box sx={{float:'right'}}>
            <Button onClick={handleOpen(1)}>Annotate Patterns</Button>
          </Box>
        </Box>
      }
      <Box>
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

              {openC === 0 && <KneePlot dataset={dataset} patterns={patterns}
                                        updateSelectedMeasures = {props.updateSelectedMeasures}
                                        setOpen={setOpen.bind(this)}/>}
              {openC === 1 && <AnnotationVector dataset={dataset} patterns={patterns} setOpen={setOpen.bind(this)}/>}
            </div>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );};


export default VisCorrection;
