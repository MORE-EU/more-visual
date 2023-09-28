import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import {IChangepointDate} from "app/shared/model/changepoint-date.model";
import {Checkbox, TableCell, Typography} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import './patterns.scss';
import {IPattern} from "app/shared/model/pattern.model";
import {makeStyles} from "@mui/styles";

export interface IPatternCardProps {
  pattern: IPattern,
  isChecked: boolean,
  onCheckboxChange: () => any,
  datasetType: string,
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
  },
  circle: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'green',
    marginRight: theme.spacing(1), // Adjust spacing as needed
  },
}));


const SubPatternCard = (props: IPatternCardProps) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const {pattern, datasetType, isChecked, onCheckboxChange} = props;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const classes = useStyles();

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
          <div className={classes.container}>
            <div className={classes.circle}></div>
            <Typography>{0.96}</Typography>
          </div>
        </TableCell>
        <TableCell align="center">
          <Checkbox checked={isChecked} onChange={onCheckboxChange} />
        </TableCell>
        <TableCell align="center"></TableCell>
      </TableRow>
    </>
  );
};

export default SubPatternCard;
