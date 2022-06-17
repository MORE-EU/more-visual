import "../visualizer.scss";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import {IDataset} from "app/shared/model/dataset.model";
import {
  applyCpDetection,
  updateActiveTool,
  updateChartRef,
  updateCompareQueryResults,
  updateCustomChangePoints,
  updateFrom,
  updateQueryResults,
  updateResampleFreq,
  updateTo,
} from "../visualizer.reducer";
import {IPatterns} from "app/shared/model/patterns.model";
import {Grid} from "@mui/material";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import stockTools from "highcharts/modules/stock-tools";
import {useScrollBlock} from "app/shared/util/useScrollBlock";
import {IChangePointDate} from "app/shared/model/changepoint-date.model";
import {IDataPoint} from "app/shared/model/data-point.model";
import {IQueryResults} from "app/shared/model/query-results.model";
import {ITimeRange} from "app/shared/model/time-range.model";
import _debounce from "lodash/debounce";
import moment from "moment";
HighchartsMore(Highcharts);
Highcharts.setOptions({
  time: {
    useUTC: false,
  },
  lang: {
    stockTools: {
      gui: {
        // @ts-ignore
        lineChart: "Line Chart",
        splineChart: "Spline Chart",
        areaRangeChart: "Range Area Chart",
        boxPlotChart: "Box Plot",
        highlightIntervals: "Highlight Intervals",
        pickIntervals: "Use a Calendar",
        functionIntervals: "Compare Files",
        compareFiles: "Compare Files",
      },
    },
  },
});

export interface IChartProps {
  dataset: IDataset;
  loading: boolean;
  queryResultsLoading: boolean;
  queryResults: IQueryResults;
  data: IDataPoint[];
  compareData: any[];
  updateQueryResults: typeof updateQueryResults;
  selectedMeasures: number[];
  from: number;
  to: number;
  resampleFreq: string;
  patterns: IPatterns;
  changeChart: boolean;
  folder: string;
  filters: any;
  graphZoom: number;
  customChangePoints: IChangePointDate[];
  detectedChangePoints: IChangePointDate[];
  cpDetectionEnabled: boolean;
  updateCustomChangePoints: typeof updateCustomChangePoints;
  applyCpDetection: typeof applyCpDetection;
  updateActiveTool: typeof updateActiveTool;
  setShowDatePick: Dispatch<SetStateAction<boolean>>;
  setShowChangePointFunction: Dispatch<SetStateAction<boolean>>;
  setCompare: Dispatch<SetStateAction<boolean>>;
  updateCompareQueryResults: typeof updateCompareQueryResults;
  updateFrom: typeof updateFrom;
  updateTo: typeof updateTo;
  updateChartRef: typeof updateChartRef;
  updateResampleFreq: typeof updateResampleFreq;
  compare: string;
}

// TODO: FIX FULLSCREEN

stockTools(Highcharts);
annotationsAdvanced(Highcharts);

export const Chart = (props: IChartProps) => {
  const {
    dataset,
    data,
    selectedMeasures,
    filters,
    from,
    to,
    resampleFreq,
    patterns,
    changeChart,
    folder,
    graphZoom,
    detectedChangePoints,
    customChangePoints,
    cpDetectionEnabled,
    compare,
    compareData,
    queryResults,
    queryResultsLoading,
    loading,
  } = props;

  const [blockScroll, allowScroll] = useScrollBlock();

  const [zones, setZones] = useState([]);
  const [plotBands, setPlotBands] = useState([]);
  const [type, setType] = useState("line");

  // Refs
  const latestFrequency = useRef(resampleFreq);
  const latestLoading = useRef(queryResultsLoading);
  const latestLeftSide = useRef(null);
  const latestRightSide = useRef(null);
  const latestMeasures = useRef(selectedMeasures);
  const latestCompare = useRef(compare);
  const isCpDetectionEnabled = useRef(cpDetectionEnabled);


  // Color Zones For Patterns
  useEffect(() => {
  const newZones =
      patterns !== null &&
      []
        .concat(
          ...patterns.patternGroups.map((patternGroup) => {
            return [].concat(
              ...patternGroup.patterns.map((pattern) => {
                return [
                  {value: pattern.start},
                  {value: pattern.end, color: patternGroup.color},
                ];
              })
            );
          })
        )
        .sort((a, b) => a.value.getTime() - b.value.getTime());
    setZones(newZones);
  }, [patterns]);



  // Color Bands for Change-points
  useEffect(() => {
    const newPlotBands = (detectedChangePoints !== null && [].concat(...detectedChangePoints.map(date => {
      return {
        color: '#1e90ff',
        from: date.range.from,
        to: date.range.to,
      };
    })));
    setPlotBands(newPlotBands);
  }, [detectedChangePoints]);


  useEffect(() => {
    isCpDetectionEnabled.current = cpDetectionEnabled;
    if(!cpDetectionEnabled) setPlotBands([]);
  }, [cpDetectionEnabled]);


  useEffect(() => {
    latestLoading.current = queryResultsLoading;
  }, [queryResultsLoading])

  useEffect(() => {
    latestMeasures.current = selectedMeasures;
    props.updateQueryResults(folder, dataset.id, from ? from : null, to ? to : null, resampleFreq, selectedMeasures);
    if (compare !== "") {
      props.updateCompareQueryResults(folder, compare.replace('.csv', ""), from, to, selectedMeasures);
    }
  }, [dataset, selectedMeasures, resampleFreq]);

  useEffect(() => {
    latestCompare.current = compare;
  }, [compare]);

  const getChartRef = (chart) => {
    props.updateChartRef(chart);
  };

  const annotationToDate = (annotation, len) => {
    const startPoint = annotation.startXMin,
      endPoint = annotation.startXMax;
    return {range: {from: startPoint, to: endPoint} as ITimeRange, id: len};
  };

  const chartFunctions = (e) => {

    const chart = e.target;

    // CHART: INSTRUCTIONS
    chart.showLoading("Click and drag to Pan <br> Use mouse wheel to zoom in/out <br> click once for this message to disappear");
    Highcharts.addEvent(chart.container, "click", (event: MouseEvent) => {
      chart.hideLoading();
    });

    const fetchData = (leftSide, rightSide) => {
      chart.showLoading();
      props.updateQueryResults(folder, dataset.id, leftSide, rightSide, resampleFreq, latestMeasures.current);
      props.updateFrom(leftSide);
      props.updateTo(rightSide);
      if (latestCompare.current !== "") {
        props.updateCompareQueryResults(folder, latestCompare.current.replace('.csv', ""), leftSide, rightSide, latestMeasures.current);
      }
      latestLeftSide.current = leftSide;
      latestRightSide.current = rightSide;
      if(isCpDetectionEnabled.current) props.applyCpDetection(dataset.id, leftSide, rightSide, customChangePoints);
      latestLoading.current && chart.hideLoading();
    };

    const debounceFetchData = _debounce(fetchData, 500);

    const getSides = (max, min, p) => {
      const pad = (max - min) + ((max - min) * p);
      const leftSide = Math.max(Math.min(min - pad, (queryResults.timeRange[0] + min - pad)), queryResults.timeRange[0]);
      const rightSide = Math.min(max + pad, queryResults.timeRange[1]);
      return {leftSide, rightSide};
    }

    const checkForData = (max, min) => {
      const {leftSide, rightSide} = getSides(max, min, 0.25);
      latestLeftSide.current = latestLeftSide.current === null ? leftSide - 1 : latestLeftSide.current;
      latestRightSide.current = latestRightSide.current === null ? rightSide - 1 : latestRightSide.current;
      if ((leftSide !== latestLeftSide.current || rightSide !== latestRightSide.current)) {
        debounceFetchData(leftSide, rightSide);
      }
    }
    const checkForDataOnPan = () => {
      const currentExtremes = chart.xAxis[0].getExtremes();
      const {dataMax, dataMin, max, min} = currentExtremes;
      // Conditions for loading new data
      if ((dataMax - max < 2 || min - dataMin < 2)) {
        checkForData(max, min);
      }
    }

    const getDateDiff = (max, min) => {
      return moment.duration(max.diff(min)).humanize();
    }

    const calculateFreqFromDiff = (diff : string) => {
      if (diff.includes("month") || diff.includes("day")){
        return "hour";
      }
      else if(diff.includes("hour")){
        return "minute";
      }
      else if(diff.includes("minute") || diff.includes("second")){
        return "second";
      }
      return "minute";
    }

    const checkForDataOnZoom = () => {
      const {dataMax, dataMin, max, min} = chart.xAxis[0].getExtremes();
      const diff = getDateDiff(moment(max), moment(min));
      const newFreq = calculateFreqFromDiff(diff);
      console.log(newFreq, latestFrequency.current);
      if((newFreq !== latestFrequency.current) ||
        (dataMax - max < 2 || min - dataMin < 2)) {
        latestFrequency.current = newFreq;
        props.updateResampleFreq(newFreq);
        checkForData(max, min);
      }
    }

    // CHART: ZOOM FUNCTION
    Highcharts.addEvent(chart.container, "wheel", (event: WheelEvent) => {
      const xAxis = chart.xAxis[0],
        extremes = xAxis.getExtremes(),
        newMin = extremes.min;
      const {dataMax, dataMin, max, min} = extremes;
      const step = (max - min) / 10;
      if (event.deltaY < 0) { // in
        xAxis.setExtremes( newMin + step, max - step, true, false);
      } else if (event.deltaY > 0) { // out
        xAxis.setExtremes(Math.max(newMin - step, queryResults.timeRange[0]),
          Math.min(Math.max(max + step, max), queryResults.timeRange[1]), true, false)
      }
      checkForDataOnZoom();
    });

    // CHART: PAN FUNCTION
    Highcharts.wrap(Highcharts.Chart.prototype, "pan", function (proceed) {
      proceed.apply(this, [].slice.call(arguments, 1));
      checkForDataOnPan();
    });

    // Set initial extremes
    chart.xAxis[0].setExtremes(data[2].timestamp, data[data.length - 2].timestamp);
    };

  return (
    <Grid
      sx={{border: "1px solid rgba(0, 0, 0, .1)"}}
      onMouseOver={() => blockScroll()}
      onMouseLeave={() => allowScroll()}

    >
      {data && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          containerProps={{className: "chartContainer"}}
          allowChartUpdate={true}
          immutable={false}
          callback={getChartRef}
          updateArgs={[true, true, true]}
          options={{
            title: null,
            plotOptions: {
              arearange: {
                dataGrouping: {
                  approximation(_, groupData) {
                    const asc = (arr) => arr.sort((a, b) => a - b);
                    return [
                      asc(groupData)[0],
                      asc(groupData)[groupData.length - 1],
                    ];
                  },
                },
              },
              boxplot: {
                dataGrouping: {
                  approximation(_, groupData) {
                    // sort array ascending
                    const asc = (arr) => arr.sort((a, b) => a - b);
                    const sum = (arr) => arr.reduce((a, b) => a + b, 0);
                    const mean = (arr) => sum(arr) / arr.length;
                    const std = (arr) => {
                      const mu = mean(arr);
                      const diffArr = arr.map((a) => (a - mu) ** 2);
                      return Math.sqrt(sum(diffArr) / (arr.length - 1));
                    };
                    const quantile = (arr, q) => {
                      const sorted = asc(arr);
                      const pos = (sorted.length - 1) * q;
                      const base = Math.floor(pos);
                      const rest = pos - base;
                      if (sorted[base + 1] !== undefined) {
                        return (
                          sorted[base] +
                          rest * (sorted[base + 1] - sorted[base])
                        );
                      } else {
                        return sorted[base];
                      }
                    };

                    const q25 = (arr) => quantile(arr, 0.25);
                    const q50 = (arr) => quantile(arr, 0.5);
                    const q75 = (arr) => quantile(arr, 0.75);
                    const median = (arr) => q50(arr);

                    return [
                      asc(groupData)[0],
                      q25(groupData),
                      q50(groupData),
                      q75(groupData),
                      asc(groupData)[groupData.length - 1],
                    ];
                  },
                },
              },
              series: {
                connectNulls: false,
                connectorAllowed: false,
                maxPointWidth: 80,
                // dataGrouping: {
                //   units: [[resampleFreq, [1]]],
                //   forced: true,
                //   enabled: resampleFreq !== "none",
                //   groupAll: true,
                // },
              },
            },
            series:
              compare.length !== 0 && compareData !== null
                ? selectedMeasures
                  .map((measure, index) => ({
                    data: data.map((d) => {
                      const val = d.values[index];
                      return [d.timestamp, isNaN(val) ? null : val];
                    }),
                    name: dataset.header[measure],
                    yAxis: changeChart ? index : 0,
                    zoneAxis: "x",
                    zones,
                  }))
                  .concat(
                    selectedMeasures.map((measure, index) => ({
                      data: compareData.map((d) => {
                        const val = d.values[index];
                        return [
                          d.timestamp,
                          isNaN(val) ? null : val,
                        ];
                      }),
                      name: dataset.header[measure] + " " + compare,
                      yAxis: changeChart ? index : 0,
                      zoneAxis: "x",
                      zones,
                    }))
                  )
                : selectedMeasures.map((measure, index) => ({
                  data: data.map((d) => {
                    const val = d.values[index];
                    return [d.timestamp, isNaN(val) ? null : val];
                  }),
                  name: dataset.header[measure],
                  yAxis: changeChart ? index : 0,
                  zoneAxis: "x",
                  zones,
                })),
            chart: {
              type,
              height: "700px",
              marginTop: 10,
              plotBorderWidth: 0,
              // panKey: "alt",
              panning: {
                enabled: true,
                type: "x",
              },
              zoomType: false,
              events: {
                load: chartFunctions
              },
            },
            xAxis: {
              ordinal: false,
              type: "datetime",
              // range: graphZoom !== null ? graphZoom : Number.MAX_SAFE_INTEGER,
              plotBands,
            },
            yAxis: changeChart
              ? selectedMeasures.map((measure, idx) => ({
                title: {
                  enabled: true,
                  text: dataset.header[measure],
                },
                opposite: false,
                top: `${(100 / selectedMeasures.length) * idx}%`,
                height: `${
                  selectedMeasures.length > 1
                    ? 100 / selectedMeasures.length - 5
                    : 100
                }%`,
                offset: 0,
                plotBands:
                  measure in filters
                    ? [
                      {
                        from: filters[measure][0],
                        to: filters[measure][1],
                      },
                    ]
                    : null,
              }))
              : selectedMeasures.map((measure, idx) => ({
                title: {
                  enabled: false,
                  text: dataset.header[measure],
                },
                opposite: false,
                top: "0%",
                height: "100%",
                offset: undefined,
                plotBands:
                  measure in filters
                    ? [
                      {
                        from: filters[measure][0],
                        to: filters[measure][1],
                      },
                    ]
                    : null,
              })),
            rangeSelector: {
              enabled: false,
            },
            navigator: {
              enabled: false,
              adaptToUpdatedData: false,
            },
            scrollbar: {
              enabled: false,
              liveRedraw: false
            },
            colorAxis: null,
            legend: {
              enabled: !changeChart,
            },
            credits: {
              enabled: false,
            },
            stockTools: {
              gui: {
                enabled: true,
                // buttons: ['changeType', 'indicators', 'verticalLabels', 'highlightIntervals',
                //   'separator', 'compareFiles', 'fullScreen',],
                buttons: [
                  "changeType",
                  "verticalLabels",
                  "highlightIntervals",
                  "compareFiles",
                ],
                className: "highcharts-bindings-wrapper",
                toolbarClassName: "stocktools-toolbar",
                definitions: {
                  changeType: {
                    items: [
                      "lineChart",
                      "splineChart",
                      "boxPlotChart",
                      "areaRangeChart",
                    ],
                    lineChart: {
                      className: "chart-line",
                      symbol: "series-line.svg",
                    },
                    splineChart: {
                      className: "chart-spline",
                      symbol: "line.svg",
                    },
                    boxPlotChart: {
                      className: "chart-boxplot",
                      symbol: "series-ohlc.svg",
                    },
                    areaRangeChart: {
                      className: "chart-arearange",
                      symbol: "series-ohlc.svg",
                    },
                  },
                  highlightIntervals: {
                    items: ["measure", "pickIntervals", "functionIntervals"],
                    measure: {
                      className: "highcharts-measure-x",
                      symbol: "measure-x.svg",
                    },
                    pickIntervals: {
                      className: "pick-intervals",
                      symbol: "event_note.svg",
                      width: 10,
                    },
                    functionIntervals: {
                      className: "function-intervals",
                      symbol: "elliott-5.svg",
                    },
                  },
                  compareFiles: {
                    className: "compare-files",
                    symbol: "comparison.svg",
                  },
                },
              },
            },
            navigation: {
              iconsURL: "../../../../content/images/stock-icons/",
              bindings: {
                line: {
                  className: "chart-line", // needs to be the same with above
                  init(e) {
                    setType("line");
                  },
                },
                spline: {
                  className: "chart-spline", // needs to be the same with above
                  init(e) {
                    setType("spline");
                  },
                },
                boxPlot: {
                  className: "chart-boxplot", // needs to be the same with above
                  init(e) {
                    setType("boxplot");
                  },
                },
                areaRange: {
                  className: "chart-arearange",
                  init(e) {
                    setType("arearange");
                  },
                },
                pickIntervals: {
                  className: "pick-intervals", // needs to be the same with above
                  init(e) {
                    props.setShowDatePick(true);
                  },
                },
                functionIntervals: {
                  className: "function-intervals", // needs to be the same with above
                  init(e) {
                    props.setShowChangePointFunction(true);
                  },
                },
                compareFiles: {
                  className: "compare-files", // needs to be the same with above
                  init(e) {
                    props.setCompare(true);
                  },
                },
                measureX: {
                  annotationsOptions: {
                    id: customChangePoints.length,
                    events: {
                      remove(event) {
                        // get annotations
                        const annotations = this.chart.annotations.filter(
                          (a) =>
                            a.userOptions.id !== event.target.userOptions.id
                        );
                        // convert annotations to dates
                        props.updateCustomChangePoints(
                          annotations.map((a, id) => annotationToDate(a, id))
                        );
                      },
                      afterUpdate(event) {
                        // convert annotations to dates
                        if (event.target.cancelClick !== undefined) {
                          const annotations = this.chart.annotations;
                          props.updateCustomChangePoints(
                            annotations.map((a, id) => annotationToDate(a, id))
                          );
                        }
                      },
                    },
                  },
                  end() {
                    props.updateCustomChangePoints(
                      this.chart.annotations.map((a, id) =>
                        annotationToDate(a, id)
                      )
                    );
                  },
                },
              },
            },
          }}
        />
      )}
    </Grid>
  );
};

export default Chart;

