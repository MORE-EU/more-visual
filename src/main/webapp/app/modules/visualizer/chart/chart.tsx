import "../visualizer.scss"
import React, {useEffect, useState, Dispatch, SetStateAction} from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import {IDataset} from "app/shared/model/dataset.model";
import {updateChangePointDates, updateQueryResults, updateActiveTool, updateCompareQueryResults} from '../visualizer.reducer';
import {IPatterns} from "app/shared/model/patterns.model";
import {Grid} from '@mui/material';
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import {useScrollBlock} from "app/shared/util/useScrollBlock";
import {IChangePointDate} from "app/shared/model/changepoint-date.model";
import {doc} from "prettier";
import group = doc.builders.group;

HighchartsMore(Highcharts);
Highcharts.setOptions({
  time: {
    useUTC: false
  },
  lang: {
    stockTools: {
      gui: {
        // @ts-ignore
        lineChart: 'Line Chart',
        splineChart: 'Spline Chart',
        areaRangeChart: 'Range Area Chart',
        boxPlotChart: 'Box Plot',
        highlightIntervals: 'Highlight Intervals',
        pickIntervals: 'Use a Calendar',
        functionIntervals: 'Compare Files',
        compareFiles: 'Compare Files'
      }
    }
  },
});

export interface IChartProps {
  dataset: IDataset,
  data: any,
  compareData: any[],
  updateQueryResults: typeof updateQueryResults,
  selectedMeasures: number[],
  from: Date,
  to: Date,
  resampleFreq: string,
  patterns: IPatterns,
  changeChart: boolean,
  folder: string,
  graphZoom: number,
  changePointDates: IChangePointDate[],
  updateChangePointDates: typeof updateChangePointDates,
  updateActiveTool: typeof updateActiveTool,
  setShowDatePick: Dispatch<SetStateAction<boolean>>,
  setShowChangePointFunction: Dispatch<SetStateAction<boolean>>,
  setCompare: Dispatch<SetStateAction<boolean>>,
  compare: string,
}

stockTools(Highcharts);
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);

export const Chart = (props: IChartProps) => {
  const {dataset, data, selectedMeasures,
    from, to, resampleFreq, patterns, changeChart, folder,
    graphZoom, changePointDates, compare, compareData,} = props;

  const [blockScroll, allowScroll] = useScrollBlock();
  const [zones, setZones] = useState([]);
  const [plotBands, setPlotBands] =  useState([]);
  const [type, setType] = useState('line');

  useEffect(() => {
    let newZones = [];
    newZones = (patterns !== null && [].concat(...patterns.patternGroups.map(patternGroup => {
      const zone = [].concat(...patternGroup.patterns.map(pattern => {
        return [{value: pattern.start}, {value: pattern.end, color: patternGroup.color}]
      }));
      return zone;
    })).sort((a, b) => a.value.getTime() - b.value.getTime()));
    setZones(newZones);
  }, [patterns]);

  // useEffect(() => {
  //   let newPlotBands = [];
  //   newPlotBands = (changePointDates !== null && [].concat(...changePointDates.map(date => {
  //     return {
  //       color: 'blue',
  //       from: date.start,
  //       to: date.end,
  //     };
  //   })));
  //   setPlotBands(newPlotBands);
  // }, [changePointDates]);

  useEffect(() => {
    props.updateQueryResults(folder, dataset.id);
  }, [dataset]);

  const annotationToDate = (annotation, len) => {
    const x1 = annotation.startXMin,
      x2 = annotation.startXMax,
      series = annotation.chart.series[0],
      filteredPoints = series.points.filter(
        point => point.x > x1 && point.x < x2
      ),
      startPoint = new Date(filteredPoints[0].x),
      endPoint = new Date(filteredPoints[filteredPoints.length - 1].x);
    return {start: startPoint, end: endPoint, id: len}
  }
  // CHART: ZOOM FUNCTION
  (function (H) {
    const step = 2000 * 200;
    H.addEvent(H.Chart, 'load', (e) => {
      const chart = e.target;
      H.addEvent(chart.container, 'wheel', (event: WheelEvent) => {
        const xAxis = chart.xAxis[0],
          extremes = xAxis.getExtremes(),
          newMin = extremes.min
        if (event.deltaY < 0) {
          (newMin + step < extremes.max) ? xAxis.setExtremes(newMin + step, extremes.max, true, true) : xAxis.setExtremes(extremes.max - 2000, extremes.max, true, true);
        } else if (event.deltaY > 0) {
          (newMin - step > extremes.dataMin) ? xAxis.setExtremes(newMin - step, extremes.max, true, true) : xAxis.setExtremes(extremes.dataMin, extremes.max, true, true);
        }
      });
    });
  }(Highcharts));

  return (
    <Grid
      sx={{border: "1px solid rgba(0, 0, 0, .1)"}}
      onMouseOver={() => blockScroll()}
      onMouseLeave={() => allowScroll()}>
      {data && <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        containerProps={{className: 'chartContainer'}}
        allowChartUpdate={true}
        immutable={false}
        updateArgs={[true, true, true]}
        options={{
          title: null,
          plotOptions: {
            arearange: {
              dataGrouping:{
                approximation(_, groupData) {
                  const asc = arr => arr.sort((a, b) => a - b);
                  return  [asc(groupData)[0], asc(groupData)[groupData.length - 1] ];
                }
              }
            },
            boxplot: {
              dataGrouping: {
                approximation(_, groupData) {
                  // sort array ascending
                  const asc = arr => arr.sort((a, b) => a - b);
                  const sum = arr => arr.reduce((a, b) => a + b, 0);
                  const mean = arr => sum(arr) / arr.length;
                  const std = (arr) => {
                    const mu = mean(arr);
                    const diffArr = arr.map(a => (a - mu) ** 2);
                    return Math.sqrt(sum(diffArr) / (arr.length - 1));
                  };
                  const quantile = (arr, q) => {
                    const sorted = asc(arr);
                    const pos = (sorted.length - 1) * q;
                    const base = Math.floor(pos);
                    const rest = pos - base;
                    if (sorted[base + 1] !== undefined) {
                      return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
                    } else {
                      return sorted[base];
                    }
                  };

                  const q25 = arr => quantile(arr, .25);
                  const q50 = arr => quantile(arr, .50);
                  const q75 = arr => quantile(arr, .75);
                  const median = arr => q50(arr)

                  return [asc(groupData)[0], q25(groupData), q50(groupData), q75(groupData), asc(groupData)[groupData.length - 1]];
                  },
              }
            },
            series: {
              connectNulls: false,
              connectorAllowed: false,
              maxPointWidth: 80,
              dataGrouping: {
                units: [
                  [resampleFreq, [1]]
                ],
                forced: true,
                enabled: resampleFreq !== 'none',
                groupAll: true
              }
            }
          },
          series: compare.length !== 0 && compareData !== null ? selectedMeasures.map((measure, index) => ({
            data: data.map(d => ([new Date(d[0]), parseFloat(d[measure])])),
            name: dataset.header[measure],
            yAxis: changeChart ? index : 0,
            zoneAxis: 'x',
            zones,
          })).concat(selectedMeasures.map((measure, index) => ({
            data: compareData.map(d => ([new Date(d[0]), parseFloat(d[measure]) + 10])),
            name: dataset.header[measure] + " " + compare,
            yAxis: changeChart ? index : 0,
            zoneAxis: 'x',
            zones,
          }))) : selectedMeasures.map((measure, index) => ({
            data: data.map(d => {
              const val = parseFloat(d[measure]);
              return [new Date(d[0]), isNaN(val) ? null : val];
            }),
            name: dataset.header[measure],
            yAxis: changeChart ? index : 0,
            zoneAxis: 'x',
            zones,
          })),
          chart: {
            type,
            height: "700px",
            marginTop: 10,
            plotBorderWidth: 0,
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
            range: graphZoom !== null ? graphZoom : 1000000000,
            plotBands,
          },
          yAxis: changeChart ? (selectedMeasures.map((measure, idx) => ({
            title: {
              enabled: true,
              text: dataset.header[measure],
            },
            opposite: false,
            top: `${(100 / selectedMeasures.length) * idx}%`,
            height: `${selectedMeasures.length > 1 ? ((100 / selectedMeasures.length) - 5) : 100}%`,
            offset: 0,

          }))) : (selectedMeasures.map((measure, idx) => ({
            title: {
              enabled: false,
              text: dataset.header[measure],
            },
            opposite: false,
            top: "0%",
            height: "100%",
            offset: undefined,
          }))),
          rangeSelector: {
            enabled: false,
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
            enabled: false,
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
          stockTools: {
            gui: {
              enabled: true,
              buttons: ['changeType', 'indicators', 'verticalLabels', 'highlightIntervals',
                'separator', 'compareFiles', 'fullScreen',],
              className: "highcharts-bindings-wrapper",
              toolbarClassName: "stocktools-toolbar",
              definitions: {
                changeType: {
                  items: ['lineChart', 'splineChart', 'boxPlotChart', 'areaRangeChart'],
                  lineChart: {
                    className: 'chart-line',
                    symbol: 'series-line.svg',
                  },
                  splineChart: {
                    className: 'chart-spline',
                    symbol: 'line.svg',
                  },
                  boxPlotChart: {
                    className: 'chart-boxplot',
                    symbol: 'series-ohlc.svg',
                  },
                  areaRangeChart: {
                    className: 'chart-arearange',
                    symbol: 'series-ohlc.svg',
                  },
                },
                highlightIntervals: {
                  items: ['measure', 'pickIntervals', 'functionIntervals'],
                  measure: {
                    className: 'highcharts-measure-x',
                    symbol: 'measure-x.svg'
                  },
                  pickIntervals: {
                    className: 'pick-intervals',
                    symbol: 'event_note.svg',
                    width: 10,
                  },
                  functionIntervals: {
                    className: 'function-intervals',
                    symbol: 'elliott-5.svg',

                  },
                },
                compareFiles: {
                className: "compare-files",
                symbol: 'comparison.svg'
                }
              },
            }
          },
          navigation: {
            iconsURL: "../../../../content/images/stock-icons/",
            bindings: {
                line: {
                  className: 'chart-line', // needs to be the same with above
                  init(e) {
                    setType('line')
                  }
                },
                spline: {
                  className: 'chart-spline', // needs to be the same with above
                  init(e) {
                    setType('spline')
                  }
                },
                boxPlot: {
                  className: 'chart-boxplot', // needs to be the same with above
                  init(e) {
                    setType('boxplot')
                  }
                },
                areaRange: {
                  className: 'chart-arearange',
                  init(e){
                    setType('arearange')
                  }
                },
                pickIntervals: {
                  className: 'pick-intervals', // needs to be the same with above
                  init(e) {
                    props.setShowDatePick(true);
                  }
                },
                functionIntervals: {
                  className: 'function-intervals', // needs to be the same with above
                  init(e) {
                    props.setShowChangePointFunction(true);
                  }
                },
                compareFiles: {
                  className: 'compare-files', // needs to be the same with above
                  init(e) {
                    props.setCompare(true);
                  }
                },
                measureX: {
                  annotationsOptions: {
                      id: changePointDates.length,
                      events: {
                        remove(event) {
                          // get annotations
                          const annotations = this.chart.annotations.filter(a => a.userOptions.id !== event.target.userOptions.id);
                          // convert annotations to dates
                          props.updateChangePointDates(annotations.map((a, id) => annotationToDate(a, id)));
                        },
                        afterUpdate(event) {
                          // convert annotations to dates
                          if(event.target.cancelClick !== undefined) {
                            const annotations = this.chart.annotations;
                            props.updateChangePointDates(annotations.map((a, id) => annotationToDate(a, id)));
                          }
                        }
                      }
                    },
                    end() {
                      props.updateChangePointDates(this.chart.annotations.map((a, id) => annotationToDate(a, id)));
                    }
                }
              }
            },
          }}
          />}
    </Grid>
  );
};


export default Chart;
