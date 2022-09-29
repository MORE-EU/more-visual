import {Box, Button} from "@mui/material";
import React from "react";
import {toggleCustomChangepoints} from "app/modules/store/visualizerSlice";
import {useAppDispatch} from "app/modules/store/storeConfig";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddCustomChangepoint = () => {

  const dispatch = useAppDispatch();

  const handleCustomChangepointsChange = () => {
    dispatch(toggleCustomChangepoints(true));
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}>
      <Box sx={{pt: 1}}>Add Custom</Box>
      <Button
        onClick={() => handleCustomChangepointsChange()}
      >
        <AddCircleOutlineIcon color={"primary"}/>
      </Button>
    </Box>
  );
}
