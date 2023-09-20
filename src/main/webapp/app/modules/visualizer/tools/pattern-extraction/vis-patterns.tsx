import React, { useState } from 'react';
import Highcharts from 'highcharts/highstock';
import DimensionSelector from "app/shared/layout/DimensionSelector";
import PatternResults from "app/modules/visualizer/tools/pattern-extraction/pattern-results";
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import { getPatterns, updatePatterns, updateSelectedMeasures } from 'app/modules/store/visualizerSlice';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

export const VisPatterns = () => {

  const {selectedMeasures, resampleFreq, data, patterns, dataset} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [dimensions, setDimensions] = useState(selectedMeasures);
  const [patternLength, setPatternLength] = useState(10);
  const [minNeighbors, setMinNeighbors] = useState(1);
  const [maxNeighbors, setMaxNeighbors] = useState(4);

  const changeComputedPatternLength = (e) => {
    const val = parseInt(e.target.value, 10);
    // TODO: Change to real data
    dispatch(getPatterns({data, val, resampleFreq}));
  }

  const clearPatterns = (e) => {
    // TODO: Change to real data
    dispatch(updatePatterns(null));
  }


  function handleFindPatterns(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) {
    // TODO: Change to real data
    dispatch(getPatterns({data, val: patternLength, resampleFreq}));
    dispatch(updateSelectedMeasures(dimensions));
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'column'}}>
      <Box>
        <Box>Dimensions</Box>
        <DimensionSelector
          disabled={patterns !== null}
          dimensions={dimensions}
          setDimensions={setDimensions}
          measures={dataset.measures}
          header={dataset.header}/>
      </Box>
      <Box sx={{pb: 2}}>
        <Box>Pattern Length</Box>
        <TextField
          disabled={patterns !== null}
          value={patternLength}
          onChange={(e) => setPatternLength(parseInt(e.target.value, 10))}
          sx={{width: "100%"}}
          type="number"
          inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
        />
      </Box>
      <Box sx={{pb: 2, display: 'flex', flexDirection: 'column'}}>
        <Box>Number of Neighbors</Box>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <TextField
            disabled={patterns !== null}
            value={minNeighbors}
            label="Min."
            onChange={(e) => setMinNeighbors(parseInt(e.target.value, 10))}
            sx={{flexBasis: "50%", pr: 1}}
            type="number"
            inputProps={{inputMode: 'numeric', pattern: '[0-9]*', max: maxNeighbors}}
          />
          <TextField sx={{flexBasis: "50%", pl: 1}}
                     disabled={patterns !== null}
                     value={maxNeighbors}
                     label="Max."
                     onChange={(e) => setMaxNeighbors(parseInt(e.target.value, 10))}
                     type="number"
                     inputProps={{inputMode: 'numeric', pattern: '[0-9]*', min: minNeighbors}}
          />
        </Box>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'row'}}>
        <Button
          disabled={patterns !== null}
          sx={{flexBasis: "50%", mr: 1}}
          onClick={e => handleFindPatterns(e)}
          variant="contained">Find</Button>
        <Button
          disabled={patterns === null}
          sx={{flexBasis: "50%", ml: 1}}
          onClick={e => clearPatterns(e)}
          variant="contained">Clear</Button>
      </Box>
      {patterns &&
        <PatternResults dimensions={dimensions} />
      }

    </Box>
  )
};


export default VisPatterns;
