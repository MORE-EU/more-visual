import * as React from 'react';
import {Box, IconButton} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {Dispatch, SetStateAction} from "react";

export interface IActiveToolProps {
  activeTool: number,
  setActiveTool:  Dispatch<SetStateAction<number>>,
}

const ActiveTool = (props: IActiveToolProps) => {
  const {activeTool} = props;

  const goBack = () => {
    props.setActiveTool(-1);
  }
  return (
    <Box>
      {activeTool !== -1 &&
        <Box>
          <IconButton onClick = {() => goBack()}>
            <ArrowBackIosIcon/>
          </IconButton>
        </Box>
      }
    </Box>
  );
}


export default ActiveTool;
