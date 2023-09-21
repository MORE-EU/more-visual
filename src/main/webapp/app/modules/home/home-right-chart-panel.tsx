import React, {useEffect} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Heatmap from 'highcharts/modules/heatmap.js';
import GridViewIcon from '@mui/icons-material/GridView';
import BarChart from '@mui/icons-material/BarChart';
import TableChart from '@mui/icons-material/TableChart';
import ShowChart from '@mui/icons-material/ShowChart';
import { useAppSelector, useAppDispatch } from '../store/storeConfig';
import { setChartCateg, setChartCategYaxis, setChartData, setChartType, setOption1, setOption2, setOption3, setOption4 } from '../store/homeSlice';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

Heatmap(Highcharts);

// TODO: Fix tooltip when heatmap is used
// TODO: Fix heatmap chartData when moving maps

export const HomeRightChartPanel = () => {

  const { chartData, chartCateg, option1, option2, option3, option4, chartType, 
  chartCategYaxis, filSamples, selected } = useAppSelector(state => state.home);
  const dispatch = useAppDispatch(); 

  const options = {
    title: {
      text: '',
    },
    series: [
      {
        data: chartData? chartData: null,
      },
    ],
    xAxis: {
      categories: chartCateg,
    },
    yAxis: {
      title: {
        text: chartType !== 'heatmap' ? `${option1}(${option2})` : null,
      },
      categories: chartType !== 'heatmap' ? null : chartCategYaxis,
    },
    colorAxis: {
      min: 0,
      minColor: chartType === 'heatmap' ? '#FFFFFF' : 'cadetblue',
      maxColor: 'cadetblue',
    },
    stockTools: {
      gui: {
        enabled: false,
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    chart: {
      height: 200,
      type: chartType,
      backgroundColor: grey[300],
    },
  };

  const handleBoundStats = (operation, xCateg, yCateg) => {
    if (operation === 'AVG') {
      Object.keys(xCateg).map(item => {
        xCateg[`${item}`] =
          Math.floor((xCateg[item].reduce((prevVal, nextVal) => Number(prevVal) + Number(nextVal), 0) / xCateg[item].length) * 100) / 100;
      });
    } else if (operation === 'MIN') {
      Object.keys(xCateg).map(item => {
        xCateg[item] = Math.min(...xCateg[item]);
      });
    } else if (operation === 'MAX') {
      Object.keys(xCateg).map(item => {
        xCateg[item] = Math.max(...xCateg[item]);
      });
    } else if (operation === 'SUM') {
      Object.keys(xCateg).map(item => {
        xCateg[`${item}`] = xCateg[item].reduce((prevVal, nextVal) => Number(prevVal) + Number(nextVal), 0);
      });
    } else if (operation === 'COUNT') {
      Object.keys(xCateg).map(item => {
        xCateg[`${item}`] = xCateg[item].length;
      });
    }
    const chartCategValues = [];
    const chartDataValues = [];
    for (const [key, value] of Object.entries(xCateg)) {
      chartCategValues.push(key);
      chartType !== 'heatmap' && chartDataValues.push(Number(value));
    }
    dispatch(setChartCateg(chartCategValues));
    chartType !== 'heatmap' && dispatch(setChartData(chartDataValues));

    const chartDataValuesHeat = [];
    chartType === 'heatmap' && (
    Object.keys(yCateg).map((category, idx) => {
      Object.keys(xCateg).map((itm, index) => {
        chartDataValuesHeat.push([index, idx, yCateg[category].includes(itm) ? Math.trunc(Number(xCateg[itm])) : 0]);
      });
    }))
    chartType === 'heatmap' && dispatch(setChartData(chartDataValuesHeat));
  };

  useEffect(() => {
    dispatch(setChartCategYaxis([]));
    const xCateg = {};
    const yCateg = {};
    if (filSamples.length !== 0) {
      filSamples.map(fil => {
        Object.keys(fil).map(f => {
          if (selected.length !== 0) {
            if (JSON.stringify(selected).includes(JSON.stringify([f, fil[f]]))) {
              xCateg[`${fil[option3]}`] = [];
            }
          } else {
            if (f === option3) {
              xCateg[`${fil[f]}`] = [];
            }
          }
          if (f === option4) {
            yCateg[`${fil[f]}`] = [];
          }
        });
      });
      filSamples.map(fil => {
        Object.keys(fil).map(f => {
          if (selected.length !== 0) {
            if (JSON.stringify(selected).includes(JSON.stringify([f, fil[f]]))) {
              xCateg[fil[option3]].push(fil[option2]);
            }
          } else {
            if (f === option3) {
              xCateg[fil[f]].push(fil[option2]);
            }
          }
          if (chartType === 'heatmap' && f === option4) {
            Object.hasOwnProperty.call(yCateg, fil[option4]) &&
            !yCateg[fil[f]].includes(fil[option3]) &&
            yCateg[fil[f]].push(fil[option3]);
          }
        })
      });
    }

    const chartCategYaxisValues = [];
    Object.keys(yCateg).map(key => {
      chartCategYaxisValues.push(key);
    });
    dispatch(setChartCategYaxis(chartCategYaxisValues));

    handleBoundStats(option1, xCateg, yCateg);
  }, [option1, option2, option3, option4, filSamples, selected]);

  const handleChartTypeChange = (e, newVal) => {
    dispatch(setChartType(newVal));
    newVal === "heatmap" ? dispatch(setOption4('continent')) : dispatch(setOption4(''))
  }

  return (
    <div>
      <Paper elevation={3} sx={{position: 'fixed', bottom: 10, right: 10, width: '400px', height: 'auto', zIndex: 401, bgcolor: grey[300]}}>
        <Box sx={{textAlign: 'center', p: 1, ml: 1, mr: 1, mb: 1, borderBottom: "3px solid", borderBottomColor: grey[700], display: "flex"}}>
          <Typography variant='subtitle1' sx={{alignSelf: "center", flex: 1, color: grey[700]}}>Chart type</Typography>
        <ToggleButtonGroup
      value={{type: "column", option4: ""}}
      exclusive
      aria-label="text alignment"
      size="small"
      onChange={handleChartTypeChange}
      sx={{mr: 4}}
    >
      <ToggleButton value="column" aria-label="left aligned">
      <Tooltip title="Bar Chart" placement='top'>
      <BarChart/>
      </Tooltip>
      </ToggleButton>
      <ToggleButton value="line" aria-label="centered">
      <Tooltip title="Line Chart" placement='top'>
      <ShowChart/>
      </Tooltip>
      </ToggleButton>
      <ToggleButton value="area" aria-label="right aligned">
      <Tooltip title="Area Chart" placement='top'>
      <TableChart/>
      </Tooltip>
      </ToggleButton>
      <ToggleButton value="heatmap" aria-label="justified" >
      <Tooltip title="Heatmap" placement='top'>
      <GridViewIcon/>
      </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>
        </Box>
        <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options}/>
        <Box
          sx={{textAlign: 'center', alignItems: 'center', display: 'flex', m: 1, pr: 1, pl: 1, fontSize: 16}}>
          <Typography variant="subtitle1" color={grey[700]}>{"Find "}</Typography>
          <FormControl variant="standard" sx={{flex: 1}}>
            <Select
              value={option1}
              onChange={e => {
                dispatch(setOption1(e.target.value));
              }}
            >
              <MenuItem key={1} value={`AVG`}>
                AVG
              </MenuItem>
              <MenuItem key={2} value={'MIN'}>
                MIN
              </MenuItem>
              <MenuItem key={3} value={'MAX'}>
                MAX
              </MenuItem>
              <MenuItem key={4} value={'SUM'}>
                SUM
              </MenuItem>
              <MenuItem key={5} value={'COUNT'}>
                COUNT
              </MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" color={grey[700]}>{"of "}</Typography>
          <FormControl variant="standard" sx={{flex: 1}}>
            <Select
              value={option2}
              onChange={e => {
                dispatch(setOption2(e.target.value.toString()));
              }}
            >
              <MenuItem key={1} value={`noOfTurbines`}>
                noOfTurbines
              </MenuItem>
              <MenuItem key={2} value={'power'}>
                power
              </MenuItem>
            </Select>
          </FormControl>
          <Typography variant="subtitle1" color={grey[700]}>{"per "}</Typography>
          <FormControl variant="standard" sx={{flex: 1}}>
            <Select
              value={option3}
              onChange={e => {
                dispatch(setOption3(e.target.value));
              }}
            >
              <MenuItem key={1} value={`country`}>
                Country
              </MenuItem>
            </Select>
          </FormControl>
          {chartType === 'heatmap' && (
            <>
              {`and `}
              <FormControl variant="standard" sx={{flex: 1}}>
                <Select
                  value={option4}
                  onChange={e => {
                    dispatch(setOption3(e.target.value));
                  }}
                >
                  <MenuItem key={1} value={`continent`}>
                    Continent
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          )}
        </Box>
      </Paper>
    </div>
  );
};
