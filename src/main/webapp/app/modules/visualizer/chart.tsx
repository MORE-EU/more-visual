import React, {useEffect} from 'react';
// import Highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock'

import HighchartsReact from 'highcharts-react-official';
import {IDataset} from "app/shared/model/dataset.model";
import {updateQueryResults} from './visualizer.reducer';
import {IQueryResults} from "app/shared/model/query-results.model";

Highcharts.setOptions({
  time: {
    useUTC: false
  }
});

export interface IChartProps {
  dataset: IDataset,
  data: any,
  updateQueryResults: typeof updateQueryResults,
  selectedMeasures: number[],
  from: Date,
  to: Date,
  resampleFreq: string,
}


export const Chart = (props: IChartProps) => {
  const {dataset, data, selectedMeasures, from, to} = props;

  useEffect(() => {
    props.updateQueryResults(dataset.id);
  }, [dataset]);


  return <div id='chart-container'>
    {data && <HighchartsReact
      highcharts={Highcharts}
      constructorType={'stockChart'}
      allowChartUpdate={true}
      immutable={false}
      updateArgs={[true, true, true]}
      options={{
        title: null,
        plotOptions: {
          series: {
            maxPointWidth: 80,
            dataGrouping: {
              units: [
                [props.resampleFreq, [1]]
              ],
              forced: true,
              enabled: props.resampleFreq !== 'none',
              groupAll: true
            }
          }
        },
        series: selectedMeasures.map((measure, index) => ({
          data: data.map(d => ([new Date(d[0]), parseFloat(d[measure])])),
          yAxis: index,
          name: dataset.header[measure]
        })),
        chart: {
          type: 'line',
          height: '350px',
          marginTop: 10,
          paddingTop: 0,
          marginBottom: 50,
          plotBorderWidth: 1,
          zoomType: 'x',
        },
        xAxis: {
          type: 'datetime',
          min: from.getTime(),
          max: to.getTime(),
        },
        yAxis: selectedMeasures.map(measure => ({
          title: {
            text: dataset.header[measure]
          }
        })),
        rangeSelector: {
          enabled: false
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: false
        },
        colorAxis: null,
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
      }}
    />}
  </div>
};


export default Chart;
