import React, {useEffect} from 'react';
// import Highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock'

import HighchartsReact from 'highcharts-react-official';
import {IDataset} from "app/shared/model/dataset.model";
import {updateQueryResults} from '../visualizer.reducer';
import {IQueryResults} from "app/shared/model/query-results.model";
import {IPatterns} from "app/shared/model/patterns.model";

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
  patterns: IPatterns,
  changeChart: boolean,
  folder: string,
}


export const Chart = (props: IChartProps) => {
  const {dataset, data, selectedMeasures, from, to, patterns, changeChart, folder} = props;
  const setZones = () => {
    let zones = []

    zones = (patterns !== null && [].concat(...patterns.patternGroups.map(patternGroup => {
      const zone = [].concat(...patternGroup.patterns.map(pattern => {
        return [{value: pattern.start}, {value: pattern.end, color: patternGroup.color}]
      }));
      return zone;
    })).sort((a, b)=>  a.value.getTime() - b.value.getTime()));
    return zones;
  }

  const zones = setZones();
  useEffect(() => {
    props.updateQueryResults(folder,dataset.id);
  }, [dataset]);

  return <div id='chart-container'>
    {data && <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
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
          name: dataset.header[measure],
          zoneAxis: 'x',
          zones,
        })),
        chart: {
          type: 'line',
          height: '400px',
          marginTop: 10,
          paddingTop: 0,
          plotBorderWidth: 1,
          zoomType: 'x',
        },
        xAxis: {
          type: 'datetime',
          min: from.getTime(),
          max: to.getTime(),
        },
        yAxis: changeChart ? (selectedMeasures.map((measure,idx) => ({
          title: {
            text: dataset.header[measure],
          },
          top: `${(100/selectedMeasures.length)*idx}%`,
          height: `${selectedMeasures.length > 1 ? ((100/selectedMeasures.length)-5) : 100}%`,
          offset: 0,

        }))) : (selectedMeasures.map((measure,idx) => ({
          title: {
            text: dataset.header[measure],
          },
          top: "0%",
          height: "100%",
          offset: undefined,
        }))),
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
          enabled: (changeChart ? false : true),
        },
        credits: {
          enabled: false
        },
      }}
    />}
  </div>
};


export default Chart;
