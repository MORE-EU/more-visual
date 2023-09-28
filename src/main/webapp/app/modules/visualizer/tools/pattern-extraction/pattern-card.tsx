import React, {useState} from 'react';
import {IChangepointDate} from "app/shared/model/changepoint-date.model";
import {Checkbox, TableCell} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import {useAppSelector} from "app/modules/store/storeConfig";
import SmallTimeSeriesChart from "app/modules/visualizer/sparklines/SmallTimeSeriesChart";
import './patterns.scss';
import IconButton from "@mui/material/IconButton"; // Import your CSS file for styling
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SubPatternCard from "app/modules/visualizer/tools/pattern-extraction/sub-pattern-card";
import RefreshIcon from '@mui/icons-material/Refresh';
import SaveIcon from '@mui/icons-material/Save';

export interface IPatternCardProps {
  value: number,
  changepoint: IChangepointDate,
  isChecked: boolean,
  onCheckboxChange: () => any,
}

const PatternCard = (props: IPatternCardProps) => {
  const {data, dataset} = useAppSelector(state => state.visualizer);
  const {patterns} = useAppSelector(state => state.patternExtraction);

  const [showPatterns, setShowPatterns] = useState([]);

  const [isExpanded, setIsExpanded] = useState(false);
  const {value, changepoint, isChecked, onCheckboxChange} = props;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getData = (from, to) => {
    return data.filter((d) =>
      (d.timestamp >= from)  && (d.timestamp <= to)
    ).map((d) =>
      d.values[changepoint.measureChartId]
    );
  }


  // Function to handle checkbox click
  const handleCheckboxClick = (value) => {
    if (showPatterns.includes(value)) {
      // If the checkbox is already checked, remove it from the list
      setShowPatterns(showPatterns.filter((item) => item !== value));
    } else {
      // If the checkbox is not checked, add it to the list
      setShowPatterns([...showPatterns, value]);
    }
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

  const handleResetSearchPattern = () => {

  }

  const handleSavePattern = () => {

  }

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  const checkForPatterns = () => {
    return patterns && patterns.patternGroups ? patterns.patternGroups.find(patternGroup => patternGroup.id === value) : null;
  }

  return (
    <>
      <TableRow>
        <TableCell>
          <SmallTimeSeriesChart data={getData(changepoint.range.from, changepoint.range.to)} />
        </TableCell>
        <TableCell align="center">{dataset.header[changepoint.measure]}</TableCell>
        <TableCell align="center">
          <span style={{ textAlign: "center" }}>{getDateFormatted(new Date(changepoint.range.from))}<br />
          -<br />
            {getDateFormatted(new Date(changepoint.range.to))}</span>
        </TableCell>
        <TableCell align="center"></TableCell>
        <TableCell align="left">
          <Checkbox checked={isChecked}
                    disabled={checkForPatterns() !== null}
                    onChange={onCheckboxChange} />
          {checkForPatterns()  &&
            <>
              <IconButton
                sx={{ width: '20%' }}
                onClick={() => handleResetSearchPattern()}
                disabled={!checkForPatterns()} // Disable when search is not applied for this pattern
              >
              <RefreshIcon />
            </IconButton>
            <IconButton
              sx={{ width: '20%' }}
              onClick={() => handleSavePattern()}
              disabled={!checkForPatterns()} // Disable when search is not applied for this pattern
            >
              <SaveIcon />
            </IconButton>
            </>}
        </TableCell>
        <TableCell>
          <IconButton disabled={!checkForPatterns()} onClick={handleExpandClick} size="small">
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <>
        <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">FROM</TableCell>
              <TableCell align="center">TO</TableCell>
              <TableCell align="center">SHOW</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
        </TableRow>
          {checkForPatterns() && patterns.patternGroups.find(patternGroup => patternGroup.id === value).similarPatterns.map((item, index) => (
            <SubPatternCard pattern={item} isChecked={showPatterns.includes(item)} key={index}
                            onCheckboxChange = {() => handleCheckboxClick(item)}/>
          ))}
          </>
      )}
    </>
  );

};

export default PatternCard;
