import React from 'react';
import Modal from '@mui/material/Modal';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useAppSelector } from 'app/modules/store/storeConfig';

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
    console.log(startingPoint, endingPoint)
    return target_timeseries;
  }

  const generateCharts = () => {
    const initialTimeseries = getInitialTimeseries();
    const generatedSeries1 = generateSimilarTimeSeries(initialTimeseries);
    // console.log(initialTimeseries, generatedSeries1);
    return [
      {
        name: 'Initial Series',
        data: initialTimeseries,
      },
      {
        name: 'Predicted Series',
        data: generatedSeries1,
      },
    ];
  };

  const options = {
    title: {
      text: 'Initial vs. Predicted Time Series',
    },
    series: generateCharts(),
  };

  return (
      <Modal open={resultsModal} onClose={handleClose}>
        <div style={{ margin: 'auto', width: 600, height: 400, padding: 20 }}>
          {console.log(chartRef)}
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </Modal>
  );
};

export default ModalWithChart;