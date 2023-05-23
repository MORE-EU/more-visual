import React from 'react';
import Modal from '@mui/material/Modal';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import { useAppSelector } from 'app/modules/store/storeConfig';
import Grid from '@mui/material/Grid';

HighchartsMore(Highcharts);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  height: 'max-content',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

const ModalWithChart = (props) => {
  const {chartRef} = useAppSelector(state => state.visualizer)
  const {resultsModal, setResultsModal} = props;

  function generateSimilarTimeSeries(inputSeries) {
    const similarSeries = [];
    
    for (let i = 0; i < inputSeries.length; i++) {
      const value = inputSeries[i];
      
      // Generate a random value within the range of -10 to +10 from the original value
      const newValue = [value[0], value[1] + getRandomNumberInRange(-100, 100)];
      
      similarSeries.push(newValue);
    }
    
    return similarSeries;
  }
  
  // Helper function to generate a random number within a specified range
  function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleClose = () => {
    setResultsModal(false)
  };

  function findArrayWithClosestNumber(targetNumber, arrayOfArrays) {
    let closestArray;
    let minDifference = Infinity;
  
    arrayOfArrays.forEach(array => {
      array.forEach(number => {
        const difference = Math.abs(targetNumber - number);
        if (difference < minDifference) {
          minDifference = difference;
          closestArray = array;
        }
      });
    });
  
    return closestArray;
  }

  const getInitialTimeseries = () => {
    const startingPoint = chartRef.series[0].userOptions.data.findIndex(item => item === findArrayWithClosestNumber(chartRef.series[0].zones[2].value, chartRef.series[0].userOptions.data))
    const endingPoint = chartRef.series[0].userOptions.data.findIndex(item => item === findArrayWithClosestNumber(chartRef.series[0].zones[3].value, chartRef.series[0].userOptions.data))
    const target_timeseries = chartRef.series[0].userOptions.data.slice(startingPoint, endingPoint);
    return target_timeseries;
  }

  const generateCharts = () => {
    const initialTimeseries = getInitialTimeseries();
    const generatedSeries1 = generateSimilarTimeSeries(initialTimeseries);
    return [
      {
        name: 'Initial Series',
        data: initialTimeseries,
        opposite: false,
        title: {
          anabled: true,
          text: "Initial Series"
        },
        offset: 0
      },
      {
        name: 'Predicted Series',
        data: generatedSeries1,
        opposite: false,
        title: {
          anabled: true,
          text: "Initial Series"
        },
        offset: 0
      },
    ];
  };

  const options = {
    title: {
      text: 'Initial vs. Predicted Time Series',
    },
    series: generateCharts(),
    xAxis: {
      ordinal: false,
      type: 'datetime',
    },
    rangeSelector: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
  };

  return (
      <Modal open={resultsModal} onClose={handleClose}>
        <Grid sx={style}>
          <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={options} />
        </Grid>
      </Modal>
  );
};

export default ModalWithChart;