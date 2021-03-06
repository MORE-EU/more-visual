import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {Box, Button, Tooltip} from '@mui/material';
import EventNoteIcon from "@mui/icons-material/EventNote";
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import FunctionsIcon from '@mui/icons-material/Functions';
import {ChartDatePicker} from "app/modules/visualizer/chart/chart-control-buttons/chart-datepicker";
import {IChangePointDate} from "app/shared/model/changepoint-date.model";
import {updateActiveTool, updateCustomChangePoints} from "app/modules/visualizer/visualizer.reducer";

interface IIntervalsPickerProps {
  from: number,
  to: number,
  customChangePoints: IChangePointDate[],
  updateCustomChangePoints: typeof updateCustomChangePoints,
  setOpen: Dispatch<SetStateAction<boolean>>,
  updateActiveTool: typeof updateActiveTool,
}


export const IntervalsPicker = (props: IIntervalsPickerProps) => {
  const {from, to, customChangePoints} = props;
  const ref = useRef(null);
  const [fixedWidth, setFixedWidth] = React.useState(0);
  const [expand, setExpand] = React.useState(false);
  const [showDatePick, setShowDatePick] = useState(false);

  useEffect(() => {
    setFixedWidth(ref.current.offsetWidth);
  }, []);

  const expanded = {
    backgroundColor: 'lightgrey',
    color: 'white',
  }
  return (
    <Box sx={{verticalAlign: "middle", textAlign: 'center', position: 'relative'}}>
      <Tooltip title="Pick Intervals">
        <Button ref={ref} variant="text" size="small"
                color={expand ? 'success' : 'primary'}
                style={expand ? expanded : null}
                onClick={() => {
                  setExpand(!expand);
                }}><EventNoteIcon color='action'/></Button>
      </Tooltip>
      {expand &&
        <Box sx={{
          width: fixedWidth,
          display: 'flex',
          flexDirection: 'row',
          zIndex: 2, position: 'absolute'
        }}>
          <Tooltip title="Highlight Intervals">
            <Button variant="text" size="small">
              <HighlightAltIcon color='action'/></Button>
          </Tooltip>
          <Tooltip title="Pick Intervals">
            <Button variant="text" size="small" onClick={() => setShowDatePick(true)}>
              <EventNoteIcon color='action'/></Button>
          </Tooltip>
          <Tooltip title="Use a Function">
            <Button variant="text" size="small">
              <FunctionsIcon color='action'/></Button>
          </Tooltip>
        </Box>}
      {showDatePick &&
        <ChartDatePicker showDatePick={showDatePick} setShowDatePick={setShowDatePick} from={from} to={to}
                         customChangePoints={customChangePoints}
                         updateCustomChangePoints={props.updateCustomChangePoints} setOpen={props.setOpen}
                         updateActiveTool={props.updateActiveTool}/>}
    </Box>
  )
}

export default IntervalsPicker;
