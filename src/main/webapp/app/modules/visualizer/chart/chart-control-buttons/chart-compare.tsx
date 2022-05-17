import React, {Dispatch, SetStateAction, useState, useEffect} from 'react';
import {Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Tab} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@material-ui/lab';
import Highcharts from 'highcharts/highstock'
import { updateCompare, updateCompareQueryResults } from '../../visualizer.reducer';
import { IDataset } from 'app/shared/model/dataset.model';

export interface IChartCompareProps {
  dataset: IDataset;
  showCompare: boolean;
  from: Date;
  to: Date;
  wdFiles: any[];
  compare: string;
  folder: string;
  selectedMeasures: number[];
  updateCompare: typeof updateCompare;
  updateCompareQueryResults: typeof updateCompareQueryResults,
  setCompare: Dispatch<SetStateAction<boolean>>;
  data: any;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
} as const;

export const ChartCompare = (props: IChartCompareProps) => {
  const {showCompare, wdFiles, data, compare, folder, from, to, selectedMeasures, dataset} = props;

  const [tabVal, setTabVal] = useState('1');

  const handleChange = (event, newValue) => {
    setTabVal(newValue);
  };

  const handleClose = () => {
    props.setCompare(false);
  };

//   const handleCompareButton = () => {
//     chart.addSeries({
//   data: data.map(d => ([new Date(d[0]), parseFloat(d[0])])),
//   type: undefined
// })
//   };


  return (
    <>
      <Modal open={showCompare} onClose={handleClose} aria-labelledby="modal-modal-title"
             aria-describedby="modal-modal-description">
        <Box sx={style}>
        <TabContext value={tabVal}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Compare" value="1" />
            <Tab label="Date compare" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1"> 
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">File</InputLabel>
            <Grid container flexDirection="row" >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={compare}
              label="file"
              onChange={e => {
                props.updateCompare(e.target.value)
              }}
              sx={{flexGrow: 1}}
            >
              {wdFiles.map((file, idx) => (
               file.replace('.csv',"") !== dataset.id && <MenuItem value={`${file}`} key={idx}>{file}</MenuItem>
              ))}
            </Select>
            <Button variant="contained" sx={{textTransform: "none"}} 
            onClick={() => {props.setCompare(false), props.updateCompareQueryResults(folder, compare.replace('.csv',""), from.getTime(), to.getTime(), selectedMeasures)}}>Add</Button>
            <Button variant="contained" sx={{textTransform: "none"}} 
            onClick={() => {props.setCompare(false), props.updateCompare('')}}>Reset</Button>
            </Grid>
          </FormControl>
          </TabPanel>
        <TabPanel value="2">Date compare</TabPanel>
      </TabContext> 
         
        </Box>
      </Modal>
    </>
  );
};
