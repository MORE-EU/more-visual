import React from "react";
import {toggleCustomChangepoints} from "app/modules/store/visualizerSlice";
import {useAppDispatch, useAppSelector} from "app/modules/store/storeConfig";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
export const AddCustomChangepoint = () => {
  const {customChangepointsEnabled, anchorEl} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const handleCustomChangepointsChange = () => {
    dispatch(toggleCustomChangepoints(!customChangepointsEnabled));
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <Box sx={{pt: 1}}>Add New

      </Box>
      <Button
        onClick={() => handleCustomChangepointsChange()}
      >
        {(customChangepointsEnabled && anchorEl === null)
          ?  <HighlightOffIcon /> : <AddCircleOutlineIcon color={"primary"}/>
        }
      </Button>
    </Box>
  );
}
