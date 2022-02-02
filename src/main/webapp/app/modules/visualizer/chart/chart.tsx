import React, {useEffect} from 'react';
// import Highcharts from 'highcharts'
import Highcharts from 'highcharts/highstock'

import HighchartsReact from 'highcharts-react-official';
import {IDataset} from "app/shared/model/dataset.model";
import {updateQueryResults} from '../visualizer.reducer';
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

  // ZOOM FUNCTION FOR CHART
  (function(H) {
    const step = 2000 * 200;
    H.addEvent(H.Chart, 'load', (e) => {
      const chart = e.target;
      H.addEvent(chart.container, 'wheel', (event: WheelEvent) => {
        const xAxis = chart.xAxis[0],
          extremes = xAxis.getExtremes(),
          newMin = extremes.min
        if (event.deltaY < 0) {
          (newMin + step < extremes.max) ? xAxis.setExtremes(newMin + step, extremes.max, true, true) : xAxis.setExtremes(extremes.max - 2000, extremes.max, true, true);
        } else if (event.deltaY > 0){
          (newMin - step > extremes.dataMin) ? xAxis.setExtremes(newMin - step, extremes.max, true, true) : xAxis.setExtremes(extremes.dataMin, extremes.max, true, true);
        }
      });
    });
  }(Highcharts));

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
          name: dataset.header[measure],
          yAxis: changeChart ? index : 0,
          zoneAxis: 'x',
        })),
        chart: {
          type: 'line',
          height: '400px',
          marginTop: 10,
          paddingTop: 0,
          plotBorderWidth: 1,
          panKey: "alt",
          panning: {
            enabled: true,
            type: "x",
          },
          zoomType: 'x',
        },
        xAxis: {
          ordinal: false,
          type: 'datetime',
          min: from.getTime(),
          max: to.getTime(),
        },
        yAxis: changeChart ? (selectedMeasures.map((measure,idx) => ({
          title: {
            text: dataset.header[measure],
          },
          opposite: false,
          top: `${(100/selectedMeasures.length)*idx}%`,
          height: `${selectedMeasures.length > 1 ? ((100/selectedMeasures.length)-5) : 100}%`,
          offset: 0,

        }))) : (selectedMeasures.map((measure,idx) => ({
          title: {
            text: dataset.header[measure],
          },
          opposite: false,
          top: "0%",
          height: "100%",
          offset: undefined,
        }))),
        rangeSelector: {
          buttons: [{
            type: 'second',
            count: 10,
            text: '10s'
          }, {
            type: 'minute',
            count: 1,
            text: '1m'
          }, 
             {
            type: 'minute',
            count: 30,
            text: '30m'
          }, {
            type: 'hour',
            count: 1,
            text: '1h'
          },
          {
            type: 'all',
            text: 'ALL'
          }],
          selected: 4
        },
        navigator: {
          enabled: false
        },
        scrollbar: {
          enabled: true,
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
