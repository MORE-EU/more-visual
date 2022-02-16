import "../visualizer.scss"
import React, {useEffect, useState} from 'react';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official';
import {IDataset} from "app/shared/model/dataset.model";
import {updateChangePointDates, updateQueryResults, updateActiveTool} from '../visualizer.reducer';
import {IPatterns} from "app/shared/model/patterns.model";
import {Grid} from '@mui/material';
import indicatorsAll from "highcharts/indicators/indicators-all";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import priceIndicator from "highcharts/modules/price-indicator";
import fullScreen from "highcharts/modules/full-screen";
import stockTools from "highcharts/modules/stock-tools";
import {useScrollBlock} from "app/shared/util/useScrollBlock";
import EventNoteIcon from "@mui/icons-material/EventNote";
import {ChartDatePicker} from "app/modules/visualizer/chart/chart-control-buttons/chart-datepicker";
import {IChangePointDate} from "app/shared/model/changepoint-date.model";


Highcharts.setOptions({
  time: {
    useUTC: false
  },
  lang: {
    stockTools: {
      gui: {
        // @ts-ignore
        highlightIntervals: 'Highlight Intervals',
        pickIntervals: 'Use a Calendar',
        functionIntervals: 'Use a Function',
      }
    }
  },
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
  graphZoom: number,
  changePointDates: IChangePointDate[],
  updateChangePointDates: typeof updateChangePointDates,
  updateActiveTool: typeof updateActiveTool,

}

stockTools(Highcharts);
indicatorsAll(Highcharts);
annotationsAdvanced(Highcharts);
priceIndicator(Highcharts);
fullScreen(Highcharts);

export const Chart = (props: IChartProps) => {
  const {dataset, data, selectedMeasures,
    from, to, patterns, changeChart, folder, graphZoom,
    changePointDates, } = props;
  const [blockScroll, allowScroll] = useScrollBlock();
  const [showDatePick, setShowDatePick] = useState(false);
  const [open, setOpen] = useState(false);
  const setZones = () => {
    let zones = []

    zones = (patterns !== null && [].concat(...patterns.patternGroups.map(patternGroup => {
      const zone = [].concat(...patternGroup.patterns.map(pattern => {
        return [{value: pattern.start}, {value: pattern.end, color: patternGroup.color}]
      }));
      return zone;
    })).sort((a, b) => a.value.getTime() - b.value.getTime()));
    return zones;
  }

  const zones = setZones();
  useEffect(() => {
    props.updateQueryResults(folder, dataset.id);
  }, [dataset]);

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
      {/* <div id="chart-container"> */}
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
            zones,
          })),
          chart: {
            type: 'line',
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
            // min: from.getTime(),
            // max: to.getTime(),
            range: graphZoom
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
          stockTools: {
            gui: {
              enabled: true,
              buttons: [ 'indicators', 'highlightIntervals','separator',  'measure', 'toggleAnnotations', 'separator', 'verticalLabels','fullScreen',
                'typeChange', 'separator', 'saveChart'  ],
              className: "highcharts-bindings-wrapper",
              toolbarClassName: "stocktools-toolbar",
              definitions: {
                highlightIntervals: {
                  items: ['highlightIntervals', 'pickIntervals', 'functionIntervals'],
                  highlightIntervals: {
                    className: 'highlight-intervals',
                    symbol: 'measure-x.svg'
                  },
                  pickIntervals: {
                    className: 'pick-intervals',
                    symbol: ''
                  },
                  functionIntervals: {
                    className: 'function-intervals',
                    symbol: 'fibonacci.svg'
                  },
                },
              },
            }
          },
          navigation: {
            bindings: {
                highlightIntervals: {
                  className: 'highlight-intervals',
                  init(e) {
                  }
                },
                pickIntervals: {
                  className: 'pick-intervals',
                  init(e) {
                    setShowDatePick(true);
                  }
                },
                functionIntervals: {
                  className: 'function-intervals',
                  init(e) {
                    setShowDatePick(true);
                  }
                }
            }
          },
        }}
      />}
      {/* </div> */}
      {showDatePick &&
        <ChartDatePicker showDatePick={showDatePick} setShowDatePick={setShowDatePick} from={from} to={to}
                         changePointDates={changePointDates}
                         updateChangePointDates={props.updateChangePointDates} setOpen={setOpen}
                         updateActiveTool={props.updateActiveTool}/>}
    </Grid>
  );
};


export default Chart;
