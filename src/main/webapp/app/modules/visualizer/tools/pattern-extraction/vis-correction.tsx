import React, { useState } from 'react';
import {Box, Button, Typography} from '@mui/material';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {KneePlot} from "app/modules/visualizer/tools/pattern-extraction/knee-plot";
import {AnnotationVector} from "app/modules/visualizer/tools/pattern-extraction/annotation-vector";
import ModalStyles from "app/shared/layout/ModalStyle";
import { useAppSelector } from 'app/modules/store/storeConfig';

export const VisCorrection = () => {

  const {patterns} = useAppSelector(state => state.visualizer);

  const classes = ModalStyles();
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(-1);
  // let setOpenFunc = setOpen.bind(this); //so it can be passed as a prop of knee-plot
  const correctedKnee = patterns.corrected.knee !== null;
  const correctedAv = patterns.corrected.annotationVector !== null;


  const getAVName = () => {
    if (correctedAv)
      switch (patterns.corrected.annotationVector.func) {
        case 0:
          return "Complexity";
        case 1:
          return "Meanstd"
        case 2:
          return "Clipping"
        default:
          return 'foo';
      }
    return "";
  }

  const avName = getAVName();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (c) => () => {
    setOpen(true);
    setOpenC(c)
  };


  return (

    <Box sx={{display: 'flex', flexDirection: 'column', pt: 2}}>
      {correctedKnee &&
        <Box>
          <Box>
            Uneeded dimensions have been filtered
          </Box>
          <Box>
            <Button onClick={handleOpen(0)}>View Useful Dimensions</Button>
          </Box>
        </Box>}
      {!correctedKnee &&
        <Box>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{pr: 1}}>
              <FontAwesomeIcon icon={faExclamationTriangle}/>
            </Box>
            <Box sx={{whiteSpace: "normal"}}>
              <Typography variant='body1'>These Patterns may contain uneeded dimensions</Typography>
            </Box>
          </Box>
          <Box sx={{float: 'right'}}>
            <Button onClick={handleOpen(0)}>Filter them</Button>
          </Box>
        </Box>
      }
      {correctedAv &&
        <Box>
          <Box sx={{whiteSpace: "normal"}}>
            A {avName} Annotation Vector has been applied
          </Box>
          <Box>
            <Button onClick={handleOpen(1)}>View Annotation Vector</Button>
          </Box>
        </Box>}
      {!correctedAv &&
        <Box>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box sx={{pr: 1}}>
              <FontAwesomeIcon icon={faExclamationTriangle}/>
            </Box>
            <Box>
              <Typography sx={{whiteSpace: "normal"}} variant='body1'>Improve these patterns through the use of an
                Annotation Vector</Typography>
            </Box>
          </Box>
          <Box sx={{float: 'right'}}>
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

              {openC === 0 && <KneePlot />}
              {openC === 1 && <AnnotationVector />}
            </div>
          </Fade>
        </Modal>
      </Box>
    </Box>
  );
};


export default VisCorrection;
