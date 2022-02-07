import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { Button, Grid, Typography, Tooltip, Modal, Box, Divider, MenuItem, Select, FormControl, InputLabel, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import Highcharts from 'highcharts/highstock'

export interface IChartCompareProps {
  showCompare: boolean;
  wdFiles: any[];
  setCompare: Dispatch<SetStateAction<boolean>>;
  data: any;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
} as const;

export const ChartCompare = (props: IChartCompareProps) => {
  const { showCompare, wdFiles, data } = props;

  const [selectVal, setSelectVal] = useState('');
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

//   const chart = Highcharts.chart('container', {
//   });

  return (
    <>
      <Modal open={showCompare} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
              value={selectVal}
              label="file"
              onChange={e => {
                setSelectVal(e.target.value);
              }}
              sx={{flexGrow: 1}}
            >
              {wdFiles.map((file, idx) => (
                <MenuItem value={`${file}`} key={idx}>{file}</MenuItem>
              ))}
            </Select>
            <Button variant="contained" sx={{textTransform: "none"}} onClick={() => {props.setCompare(false)}}>Add</Button>
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
