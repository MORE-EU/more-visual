import React, { useEffect, useState } from 'react';
import { FormControl, Paper, Select, MenuItem, Box, Button, Tooltip } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Heatmap from 'highcharts/modules/heatmap.js';
import { BarChart, ShowChart, TableChart } from '@material-ui/icons';
import GridViewIcon from '@mui/icons-material/GridView';
import { ConstructionOutlined } from '@mui/icons-material';

Heatmap(Highcharts);

export interface IHomeRightChartPanel {
  filSamples: any[];
  selected: any[];
}

// TODO: fix chart data when filters are selected

export const HomeRightChartPanel = (props: IHomeRightChartPanel) => {
  const { filSamples, selected } = props;

  const [chartCategYaxis, setChartCategYaxis] = useState([]);
  const [chartCateg, setChartCateg] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState('column');
  const [option1, setOption1] = useState('AVG');
  const [option2, setOption2] = useState('power');
  const [option3, setOption3] = useState('country');
  const [option4, setOption4] = useState('');

  const options = {
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
        text: chartType !== 'heatmap' ? `${option1}(${option2})` : null,
      },
      categories: chartType !== 'heatmap' ? null : chartCategYaxis,
    },
    colorAxis: {
      min: 0,
      minColor: chartType === 'heatmap' ? '#FFFFFF' : '#2185d0',
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
    setChartCateg([]);
    setChartData([]);
    for (const [key, value] of Object.entries(xCateg)) {
      setChartCateg(old => [...old, key]);
      chartType !== 'heatmap' && setChartData(old => [...old, Number(value)]);
    }

    chartType === 'heatmap' &&
      Object.keys(yCateg).map((category, idx) => {
        Object.keys(xCateg).map((itm, index) => {
          setChartData(old => [...old, [index, idx, yCateg[category].includes(itm) ? Number(xCateg[itm]) : 0]]);
        });
      });
  };

  useEffect(() => {
    setChartCategYaxis([]);
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
      console.log(xCateg);
      filSamples.map(fil => {
        Object.keys(fil).map(f => {
          if(selected.length !== 0){
            if (JSON.stringify(selected).includes(JSON.stringify([f, fil[f]]))) {
              console.log(f, fil[f]);
            xCateg[fil[option3]].push(fil[option2]);
            }
          }else{
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

    Object.keys(yCateg).map(key => {
      setChartCategYaxis(old => [...old, key]);
    });
    handleBoundStats(option1, xCateg, yCateg);
  }, [option1, option2, option3, option4, filSamples, selected]);

  return (
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
  );
};
