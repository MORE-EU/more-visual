import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts/highstock';
import {Box, Button, Divider, List, ListItem, Paper, TableCell, TableContainer, TextField} from '@mui/material';
import DimensionSelector from "app/shared/layout/DimensionSelector";
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import {
  toggleCustomChangepoints,
} from 'app/modules/store/visualizerSlice';
import PatternCard from "app/modules/visualizer/tools/pattern-extraction/pattern-card";
import {
  AddCustomChangepoint,
} from "app/modules/visualizer/tools/changepoint-detection/add-custom-changepoint";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {applySearchPatterns, removePattern} from "app/modules/store/patternExtractionSlice";

Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

export const VisPatterns = () => {
  const { dataset,
    customChangepointsEnabled, customChangepoints} = useAppSelector(state => state.visualizer);
  const {patterns} = useAppSelector(state => state.patternExtraction);

  const [searchPatterns, setSearchPatterns] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to simulate a loading delay
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  };

  useEffect(() => {
    const idsToKeep = new Set(customChangepoints.map(item => item.id));
    const filteredSearchPatterns = searchPatterns.filter(item => idsToKeep.has(item.id));
    if(patterns !== null && filteredSearchPatterns.length !== searchPatterns.length)
      dispatch(removePattern(searchPatterns.filter(item => !idsToKeep.has(item.id))[0]));
    setSearchPatterns(filteredSearchPatterns);
  }, [customChangepoints]);


  // Function to handle checkbox click
  const handleCheckboxClick = (value) => {
    if (searchPatterns.includes(value)) {
      // If the checkbox is already checked, remove it from the list
      setSearchPatterns(searchPatterns.filter((item) => item !== value));
    } else {
      // If the checkbox is not checked, add it to the list
      setSearchPatterns([...searchPatterns, value]);
    }
  };

  const dispatch = useAppDispatch();

  const handleNewPatternChange = () => {
    dispatch(toggleCustomChangepoints(!customChangepointsEnabled));
  }

  const handleToggleSearchPatterns = async () => {
    setLoading(true); // Set loading to true before dispatching
    try {
      await dispatch(applySearchPatterns({ dataset, searchPatterns }));
      // If the dispatch is successful, you can access the result here if needed
    } catch (error) {
      // Handle any errors that occur during dispatch here
    } finally {
      setLoading(false); // Set loading to false whether dispatch succeeds or fails
    }
  };


  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '90%', fontSize:'2em'}}>
      <AddCustomChangepoint name="Highlight" handleFunction={handleNewPatternChange} check={customChangepointsEnabled}/>
      <Box sx={{width:"100%",textAlign:"right"}}>
        <Button
          sx={{width:"20%"}}
          onClick={handleToggleSearchPatterns}
          disabled={loading || searchPatterns.length === 0}
        >
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </Box>
      <TableContainer component={Paper} style={{ overflowY: 'auto'}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">PATTERN</TableCell>
              <TableCell align="center">RANGE</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
            {customChangepoints.map((item, index) => (
                <PatternCard value={item.id} changepoint={item} key={index}
                             isChecked={searchPatterns.includes(item)}
                onCheckboxChange = {() => handleCheckboxClick(item)}/>
              ))}
          </TableHead>
        </Table>
      </TableContainer>

    </Box>
  )
};


export default VisPatterns;
