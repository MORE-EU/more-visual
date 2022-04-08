import React, { useEffect, useState } from 'react';
import { FormControl, Paper, Select, Typography, MenuItem, Box, Button, Tooltip } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Heatmap from 'highcharts/modules/heatmap.js';
import { BarChart, ShowChart, TableChart } from '@material-ui/icons';
import GridViewIcon from '@mui/icons-material/GridView';
import { includes } from 'lodash';

Heatmap(Highcharts);
//TODO: change name of ff ff1, bounditems1, and fix axisColor
export interface IHomeRightPanel {
  filSamples: any[];
}

export const HomeRightPanel = (props: IHomeRightPanel) => {
  const { filSamples } = props;

  const [statSelect, setStatSelect] = useState('noOfTurbines');
  const [statCateg, setStatCateg] = useState([]);
  const [statCategYaxis, setStatCategYaxis] = useState(['Europe', 'Asia', 'North America', 'South America']);
  const [chartCateg, setChartCateg] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('column');
  const [option1, setOption1] = useState('AVG');
  const [option2, setOption2] = useState('power');
  const [option3, setOption3] = useState('country');
  const [option4, setOption4] = useState('');

  useEffect(() => {
    let stCat = [];
    if (filSamples.length !== 0) {
      for (const [key, value] of Object.entries(filSamples[0])) {
        !isNaN(Number(value)) && stCat.push(key);
      }
    }
    stCat = stCat.filter(st => st === 'noOfTurbines' || st === 'power');
    setStatCateg(stCat);
  }, [filSamples, chartType]);

  const options =
    chartType === 'heatmap'
      ? {
          title: {
            text: '',
          },
          series: [
            {
              data: chartData,
            },
          ],
          xAxis: {
            categories: chartCateg,
          },
          yAxis: {
            categories: statCategYaxis,
          },
          colorAxis: {
            min: 0,
            minColor: '#FFFFFF',
            maxColor: '#2185d0',
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
          },
        }
      : {
          title: {
            text: '',
          },
          series: [
            {
              data: chartData,
            },
          ],
          xAxis: {
            categories: chartCateg,
          },
          yAxis: {
            title: {
              text: `${option1}(${option2})`,
            },
            categories: null,
          },
          colorAxis: null,
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
          },
        };

  const handleBoundStats = (operation, boundItems, boundItems1) => {
    if (operation === 'AVG') {
      Object.keys(boundItems).map(item => {
        boundItems[`${item}`] =
          Math.floor(
            (boundItems[item].reduce((prevVal, nextVal) => Number(prevVal) + Number(nextVal), 0) / boundItems[item].length) * 100
          ) / 100;
      });
    } else if (operation === 'MIN') {
      Object.keys(boundItems).map(item => {
        boundItems[item] = Math.min(...boundItems[item]);
      });
    } else if (operation === 'MAX') {
      Object.keys(boundItems).map(item => {
        boundItems[item] = Math.max(...boundItems[item]);
      });
    } else if (operation === 'SUM') {
      Object.keys(boundItems).map(item => {
        boundItems[`${item}`] = boundItems[item].reduce((prevVal, nextVal) => Number(prevVal) + Number(nextVal), 0);
      });
    } else if (operation === 'COUNT') {
      Object.keys(boundItems).map(item => {
        boundItems[`${item}`] = boundItems[item].length;
      });
    }
    setChartCateg([]);
    setChartData([]);
    for (const [key, value] of Object.entries(boundItems)) {
      setChartCateg(old => [...old, key]);
      chartType !== 'heatmap' && setChartData(old => [...old, Number(value)]);
    }

    chartType === 'heatmap' &&
      statCategYaxis.map((category, idx) => {
        Object.keys(boundItems).map((itm, index) => {
          setChartData(old => [...old, [index, idx, boundItems1.includes(category) ? Number(boundItems[itm]) : 0]]);
        });
      });
  };

  useEffect(() => {
    const ff = {};
    const ff1 = [];

    if (filSamples.length !== 0) {
      filSamples.map(fil => {
        for (const [key, value] of Object.entries(fil)) {
          if (key.toString() === option3) {
            ff[`${value}`] = [];
          }
        }
      });

      filSamples.map(fil => {
        for (const [key, value] of Object.entries(fil)) {
          if (key.toString() === option3) {
            ff[`${value}`].push(fil[`${option2}`]);
          }
          if (chartType === 'heatmap' && key.toString() === option4) {
            !ff1.includes(fil[`${option4}`]) && ff1.push(fil[`${option4}`]);
          }
        }
      });
    }
    chartType !== 'heatmap' ? handleBoundStats(option1, ff, null) : handleBoundStats(option1, ff, ff1);
  }, [option1, option2, option3, option4, filSamples]);

  const handleChange = event => {
    setStatSelect(event.target.value);
  };

  const handleStats = val => {
    let sd, mean, newVals;
    let sd2 = 0;
    newVals = filSamples.map(sample => {
      return parseInt(sample[`${statSelect}`], 10);
    });
    if (val === 'min') {
      newVals.length !== 0 ? (newVals = Math.min(...newVals)) : (newVals = 'N/A');
    } else if (val === 'max') {
      newVals.length !== 0 ? (newVals = Math.max(...newVals)) : (newVals = 'N/A');
    } else if (val === 'mean') {
      newVals = Math.floor((newVals.reduce((prevVal, nextVal) => prevVal + nextVal, 0) / newVals.length) * 100) / 100;
    } else if (val === 'SD') {
      sd = newVals;
      mean = Math.floor(newVals.reduce((prevVal, nextVal) => prevVal + nextVal, 0) / newVals.length);
      newVals = sd.map(value => {
        return Math.pow(value - mean, 2);
      });
      newVals.forEach(va => (sd2 = sd2 + parseInt(va, 10)));
      sd2 = Math.floor(Math.sqrt((sd2 / newVals.length) * 100) / 100);
      newVals = sd2;
    } else if (val === 'VAR') {
      sd = filSamples.map(sample => {
        return parseInt(sample[`${statSelect}`], 10);
      });
      mean = Math.floor(newVals.reduce((prevVal, nextVal) => prevVal + nextVal, 0) / newVals.length);
      newVals = sd.map(value => {
        return Math.pow(Number(value) - Number(mean), 2);
      });
      newVals.forEach(va => (sd2 = sd2 + parseInt(va, 10)));
      sd2 = Math.floor((sd2 / newVals.length - 1) * 100) / 100;
      newVals = sd2;
    } else if (val === '') {
      newVals = 'N/A';
    }
    return newVals;
  };

  return (
    <>
      <Paper elevation={3} sx={{ position: 'fixed', bottom: 320, right: 10, width: '400px', height: 'auto', zIndex: 999 }}>
        <Paper sx={{ textAlign: 'center' }}>
          <Box sx={{ textAlign: 'center', alignItems: 'center', display: 'flex' }}>
            <Typography textAlign="center" variant="h6" sx={{ fontSize: 16, flex: 1 }}>
              Statistics for Field:
            </Typography>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120, flex: 1 }}>
              <Select value={statSelect} onChange={handleChange} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                {statCateg.map(categ => {
                  return (
                    <MenuItem key={categ} value={categ}>
                      {categ}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('min')} <br />
              min <br />
            </Typography>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('max')}
              <br />
              max <br />
            </Typography>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('mean')} <br />
              mean <br />
            </Typography>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('SD')} <br />
              SD <br />
            </Typography>
            <Typography variant="overline" sx={{ fontSize: 12, flex: 1 }}>
              <br />
              {handleStats('VAR')} <br />
              VAR <br />
            </Typography>
          </Box>
        </Paper>
      </Paper>
      <div>
        <Paper elevation={3} sx={{ position: 'fixed', bottom: 10, right: 10, width: '400px', height: 'auto', zIndex: 999 }}>
          <Box sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
            <Tooltip title="Bar Chart">
              <Button
                onClick={() => {
                  setChartType('column');
                  setOption4('');
                }}
              >
                <BarChart />
              </Button>
            </Tooltip>
            <Tooltip title="Line Chart">
              <Button
                onClick={() => {
                  setChartType('line');
                  setOption4('');
                }}
              >
                <ShowChart />
              </Button>
            </Tooltip>
            <Tooltip title="Area Chart">
              <Button
                onClick={() => {
                  setChartType('area');
                  setOption4('');
                }}
              >
                <TableChart />
              </Button>
            </Tooltip>
            <Tooltip title="Heatmap">
              <Button
                onClick={() => {
                  setChartType('heatmap');
                  setOption4('continent');
                }}
              >
                <GridViewIcon />
              </Button>
            </Tooltip>
          </Box>
          <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />
          <Box sx={{ textAlign: 'center', alignItems: 'center', display: 'flex', mt: 1, mb: 1, mr: 1, ml: 1, fontSize: 16 }}>
            {`Find `}
            <FormControl variant="standard" sx={{ flex: 1 }}>
              <Select
                value={option1}
                onChange={e => {
                  setOption1(e.target.value);
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
            {`of `}
            <FormControl variant="standard" sx={{ flex: 1 }}>
              <Select
                value={option2}
                onChange={e => {
                  setOption2(e.target.value.toString());
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
            {`per `}
            <FormControl variant="standard" sx={{ flex: 1 }}>
              <Select
                value={option3}
                onChange={e => {
                  setOption3(e.target.value);
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
                <FormControl variant="standard" sx={{ flex: 1 }}>
                  <Select
                    value={option4}
                    onChange={e => {
                      setOption3(e.target.value);
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
    </>
  );
};
