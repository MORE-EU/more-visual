import React from 'react';
import Highcharts from 'highcharts/highstock'
import {IDataset} from "app/shared/model/dataset.model";
import {getPatterns, updatePatterns, updateSelectedMeasures,} from '../../visualizer.reducer';
import {Box, Button, TextField} from '@mui/material';
import {IPatterns} from "app/shared/model/patterns.model";
import DimensionSelector from "app/shared/layout/DimensionSelector";
import PatternResults from "app/modules/visualizer/tools/pattern-extraction/pattern-results";

Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

export interface IVisPatternsProps {
  dataset: IDataset,
  data: any,
  selectedMeasures: number[],
  resampleFreq: string,
  updateSelectedMeasures: typeof updateSelectedMeasures,
  updatePatterns: typeof updatePatterns,
  getPatterns: typeof getPatterns,
  patterns: IPatterns,
}


export const VisPatterns = (props: IVisPatternsProps) => {
  const {
    dataset, data, selectedMeasures,
    patterns, resampleFreq
  } = props;

  const [dimensions, setDimensions] = React.useState(selectedMeasures);
  const [patternLength, setPatternLength] = React.useState(10);
  const [minNeighbors, setMinNeighbors] = React.useState(1);
  const [maxNeighbors, setMaxNeighbors] = React.useState(4);

  const changeComputedPatternLength = (e) => {
    const val = parseInt(e.target.value, 10);
    // TODO: Change to real data
    props.getPatterns(data, val, resampleFreq);
  }

  const clearPatterns = (e) => {
    // TODO: Change to real data
    props.updatePatterns(null);
  }


  function handleFindPatterns(e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>) {
    // TODO: Change to real data
    props.getPatterns(data, patternLength, resampleFreq);
    props.updateSelectedMeasures(dimensions);
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
        <PatternResults
          dataset={dataset}
          patterns={patterns}
          dimensions={dimensions}
          updateSelectedMeasures={props.updateSelectedMeasures}
        />
      }

    </Box>
  )
};


export default VisPatterns;
