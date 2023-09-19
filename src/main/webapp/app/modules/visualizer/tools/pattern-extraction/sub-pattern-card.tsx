import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import {IChangepointDate} from "app/shared/model/changepoint-date.model";
import {Checkbox, TableCell} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {useAppSelector} from "app/modules/store/storeConfig";
import SmallTimeSeriesChart from "app/modules/visualizer/sparklines/SmallTimeSeriesChart";
import './patterns.scss';
import IconButton from "@mui/material/IconButton"; // Import your CSS file for styling
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {IPatterns} from "app/shared/model/patterns.model";
import {IPattern} from "app/shared/model/pattern.model";

export interface IPatternCardProps {
  pattern: IPattern,
  isChecked: boolean,
  onCheckboxChange: () => any,
}

const SubPatternCard = (props: IPatternCardProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const {pattern, isChecked, onCheckboxChange} = props;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getDateFormatted = (date) => {
    // Extract date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

  // Create the formatted date string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <TableRow>
        <TableCell align="center"></TableCell>
        <TableCell align="center">{getDateFormatted(new Date(pattern.range.from))}</TableCell>
        <TableCell align="center">{getDateFormatted(new Date(pattern.range.to))}</TableCell>
        <TableCell align="center">
          <Checkbox checked={isChecked} onChange={onCheckboxChange} />
        </TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    </>
  );
};

export default SubPatternCard;
