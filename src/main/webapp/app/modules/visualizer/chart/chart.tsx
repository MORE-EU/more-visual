import React, { useEffect, useRef, useState } from "react";
import "../visualizer.scss";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import {Grid, LinearProgress} from "@mui/material";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
// import stockTools from "highcharts/modules/stock-tools";
import {useScrollBlock} from "app/shared/util/useScrollBlock";
import {ITimeRange} from "app/shared/model/time-range.model";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";
import {
  setCompare,
  updateChartRef,
  updateCompareQueryResults,
  updateFrom,
  updateQueryResults,
  updateResampleFreq,
  updateTo,
  applyChangepointDetection,
  toggleCustomChangepoints,
  applyDeviationDetection,
  liveDataImplementation
} from "app/modules/store/visualizerSlice";
import {Simulate} from "react-dom/test-utils";
import select = Simulate.select;
import ChartPlotBands from "app/modules/visualizer/chart/chart-plot-bands/chart-plot-bands";

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
        compareFiles: "Compare Files",
      },
    },
  },
});

// stockTools(Highcharts);
annotationsAdvanced(Highcharts);

export const Chart = () => {

  const {chartRef, folder, dataset, from, to, resampleFreq, selectedMeasures, measureColors,
    queryResultsLoading, filter, queryResults, changeChart, compare, changepointDetectionEnabled,
    customChangepointsEnabled, patterns, data, compareData, forecastData, soilingEnabled,
    soilingWeeks, secondaryData, chartType} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [blockScroll, allowScroll] = useScrollBlock();

  const [zones, setZones] = useState([]);
  const [customPlotBands, setCustomPlotBands] = useState([]);
  const [manualPlotBands, setManualPlotBands] = useState([]);
  const [detectedPlotBands, setDetectedPlotBands] = useState([]);
  const [changepointHighlight, setChangepointHighlight] = useState(false);
  //Refs
  const latestFrequency = useRef(resampleFreq);
  const latestLeftSide = useRef(null);
  const chart = useRef(chartRef);
  const timeRange = useRef(null);
  const latestRightSide = useRef(null);
  const latestFolder = useRef(null);
  const latestDatasetId = useRef(null);
  const latestMeasures = useRef(selectedMeasures);
  const latestSoilingWeeks = useRef(soilingWeeks);
  const latestCompare = useRef(compare);
  const latestFilter = useRef(filter);

  const latestCustomChangepoints = useRef([])
  const isSoilingEnabled = useRef(soilingEnabled);
  const isChangepointDetectionEnabled = useRef(changepointDetectionEnabled);


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


  useEffect(() => {
    isSoilingEnabled.current = soilingEnabled;
  }, [soilingEnabled]);

  useEffect(() => {
    latestFilter.current = filter;
  }, [filter])

  useEffect(() => {
    if(chartRef !== null){
    !queryResultsLoading && chartRef.hideLoading();
    }
  }, [queryResultsLoading])

  useEffect(() => {
    if (compare.length !== 0) {
      dispatch(updateCompareQueryResults({folder, id: compare, from, to, resampleFreq, selectedMeasures, filter}));
    }
  }, [compare])

  useEffect(() => {
    latestMeasures.current = selectedMeasures;
    dispatch(updateQueryResults({folder, id: dataset.id, from: from ? from : null, to: to ? to : null,
      resampleFreq, selectedMeasures, filter}));
    if (compare.length !== 0) {
      dispatch(updateCompareQueryResults({folder, id: compare, from, to, resampleFreq, selectedMeasures, filter}));
    }
    if(selectedMeasures.length === 6) toast("You can only view up to 6 measures at a time.");
  }, [dataset, selectedMeasures]);

  useEffect(() => {
    latestCompare.current = compare;
  }, [compare]);

  useEffect(() => {
    latestSoilingWeeks.current = soilingWeeks;
  }, [soilingWeeks]);

  useEffect(() => {
    if(!changepointDetectionEnabled) setDetectedPlotBands([]);
    isChangepointDetectionEnabled.current = changepointDetectionEnabled;
  }, [changepointDetectionEnabled]);

  useEffect(() => {
    if(customChangepointsEnabled && changepointHighlight === false){
      toast("Highlight a region on the chart");
      setChangepointHighlight(true);
    }
  }, [customChangepointsEnabled]);

  useEffect(() => {
    chart.current && toast(`Frequency: ${latestFrequency.current}`)
  }, [latestFrequency.current])

  const getChartRef = (chartR: any) => {
    dispatch(updateChartRef(chartR));
  };

  const toast = (toastMessage) => {
    chart.current.toast && chart.current.toast.destroy();
    if(chart.current) {
      const left =  chart.current.plotWidth / 2;
      chart.current.toast = chart.current.renderer.label(toastMessage, left, 0)
        .attr({
          fill: Highcharts.getOptions().colors[1],
          padding: 10,
          r: 5,
          zIndex: 8
        })
        .css({
          color: '#FFFFFF'
        })
        .add();
      setTimeout(function () {
        chart.current.toast && chart.current.toast.fadeOut();
      }, 2000);
      setTimeout(function () {
        if(chart.current.toast)chart.current.toast = chart.current.toast.destroy();
      }, 2500);
    }
  }

  const customChangepointSelection = (event) => {
    event.preventDefault();
    const newCustomChangepoint = {range: {from: event.xAxis[0].min, to: event.xAxis[0].max,} as ITimeRange, id: latestCustomChangepoints.current.length, custom: true};
    latestCustomChangepoints.current.push(newCustomChangepoint);
    dispatch(toggleCustomChangepoints(false));
  }


  const setCustomChangepoints = (newCustomChangepoints) => {
    latestCustomChangepoints.current = newCustomChangepoints;
  }

  const chartFunctions = (e: { target: any; }) => {
    chart.current = e.target;
    timeRange.current = queryResults.timeRange;
    latestDatasetId.current = dataset.id;
    latestFolder.current = folder;

    // CHART: INSTRUCTIONS
    chart.current.showLoading("Click and drag to Pan <br> Use mouse wheel to zoom in/out <br> click once for this message to disappear");
    Highcharts.addEvent(chart.current.container, "click", (event: MouseEvent) => {
      chart.current.hideLoading();
      Highcharts.removeEvent(chart.current.container, "click");
    });

    const fetchData = (leftSide: number, rightSide: number) => {
      chart.current.showLoading();
      dispatch(updateQueryResults({folder: latestFolder.current, id: latestDatasetId.current,
      from: leftSide, to: rightSide, resampleFreq: latestFrequency.current,
        selectedMeasures: latestMeasures.current, filter: latestFilter.current}));
      dispatch(updateFrom(leftSide));
      dispatch(updateTo(rightSide));
      if (latestCompare.current.length !== 0) dispatch(updateCompareQueryResults({folder: latestFolder.current,
        id: latestCompare.current, from: leftSide, to: rightSide, resampleFreq: latestFrequency.current,
        selectedMeasures: latestMeasures.current, filter: latestFilter.current}));
      latestLeftSide.current = leftSide;
      latestRightSide.current = rightSide;
      if(isChangepointDetectionEnabled.current)
        dispatch(
          applyChangepointDetection({id: latestDatasetId.current,
            from: leftSide, to: rightSide})).then((res) => {
          if(isSoilingEnabled.current) dispatch(applyDeviationDetection({id: latestDatasetId.current,
            folder: latestFolder.current, resampleFreq: latestFrequency.current, weeks: latestSoilingWeeks.current,
            from: leftSide, to: rightSide, changepoints: res.payload}));
        });
      };

    const getSides = (max: number, min: number, p: number) => {
      const pad = (max - min) + ((max - min) * p);
      const leftSide = Math.max(Math.min(min - pad, (timeRange.current[0] + min - pad)), timeRange.current[0]);
      const rightSide = Math.min(max + pad, data[data.length-1].timestamp);
      return {leftSide, rightSide};
    }

    const checkForData = (max: number, min: number) => {
      const {leftSide, rightSide} = getSides(max, min, 0.25);
      latestLeftSide.current = latestLeftSide.current === null ? leftSide - 1 : latestLeftSide.current;
      latestRightSide.current = latestRightSide.current === null ? rightSide - 1 : latestRightSide.current;
      if ((leftSide !== latestLeftSide.current || rightSide !== latestRightSide.current)) {
        fetchData(leftSide, rightSide);
      }
    }
    const checkForDataOnPan = () => {
      const {dataMax, dataMin, max, min} = chart.current.xAxis[0].getExtremes();
      // Conditions for loading new data
      if ((dataMax - max < 2 || min - dataMin < 2)
      && (max < data[data.length - 1].timestamp)) { //dataMAx
        checkForData(max, min);
      }
    }

    const getDateDiff = (max: moment.Moment, min: moment.Moment) => {
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
      return "hour";
    }

    const checkForDataOnZoom = () => {
      const {dataMax, dataMin, max, min} = chart.current.xAxis[0].getExtremes();
      const diff = getDateDiff(moment(max), moment(min));
      const newFreq = calculateFreqFromDiff(diff);
      if((newFreq !== latestFrequency.current) ||
         (max > dataMax && max !== timeRange.current[1]) ||
         (min < dataMin && min !== timeRange.current[0])) {
        latestFrequency.current = newFreq;
        dispatch(updateResampleFreq(newFreq));
        checkForData(max, min);
      }
    }

    // CHART: ZOOM FUNCTION
    Highcharts.addEvent(chart.current.container, "wheel", (event: WheelEvent) => {
      const p = chart.current.xAxis[0].toValue(chart.current.pointer.normalize(event).chartX);
      const {min, max} = chart.current.xAxis[0].getExtremes();
      const stepleft = (p - min) * 0.25;
      const stepright = (max - p) * 0.25;
      if(!chart.current.loadingShown){
      if (event.deltaY < 0 && (max - min) > 10000) { // in, 10000 is the max range on a zoom level
        chart.current.xAxis[0].setExtremes( min + stepleft, max - stepright, true, false);
      } else if (event.deltaY > 0) { // out
        chart.current.xAxis[0].setExtremes(Math.max(min - stepleft, timeRange.current[0]),
          Math.min(max + stepright, data[data.length -1].timestamp), true, false) // timeRange.current[1]
      }
      checkForDataOnZoom();
    }
    });

    const renderLabelForLiveData = () => {
      const {max} = chart.current.xAxis[0].getExtremes();
      if( max >= data[data.length -1].timestamp && latestFrequency.current === "second"){
        toast('Live Data Mode');
      }
    }

    // CHART: PAN FUNCTION
    Highcharts.wrap(Highcharts.Chart.prototype, "pan", function (proceed, ...args) {
      if(!chart.current.loadingShown){
      proceed.apply(this, args);
      checkForDataOnPan();
      renderLabelForLiveData();
      }
    });

    const calculateStep = (freq, refreshVal) => {
      const step = 1000 * refreshVal;
      if (freq === "hour"){
        return step * Math.pow(60, 2);
      }
      else if(freq === "minute"){
        return step * 60;
      }
      else if(freq === "second"){
        return step;
      }
    }

    // LIVE DATA IMPLEMENTATION
    setInterval(() => {
        const {max, min, dataMax} = chart.current.xAxis[0].getExtremes();
        if( max >= data[data.length - 1].timestamp && latestFrequency.current === "second"){
        dispatch(liveDataImplementation(
          {folder: latestFolder.current, id: latestDatasetId.current,
          from: dataMax, to: dataMax + calculateStep(latestFrequency.current, 30), resampleFreq: 'SECOND',
          selectedMeasures: latestMeasures.current, filter: latestFilter.current}))
          chart.current.xAxis[0].setExtremes(min, dataMax, false, true);
        }
    }, 5000);

    // Set initial extremes
    chart.current.xAxis[0].setExtremes(data[2].timestamp, data[data.length - 2].timestamp);
  };


  const computeChartData = () => {
    let chartData = (data !== null) ? selectedMeasures
      .map((measure, index) => ({
        data: data.map((d) => {
          const val = d.values[index];
          return [d.timestamp, isNaN(val) ? null : val];
        }),
        name: dataset.header[measure],
        yAxis: changeChart ? index : 0,
        color: measureColors[measure],
        zoneAxis: "x",
        zones,
      })) : [];
    if(secondaryData){
      const sz = chartData !== null ? chartData.length : 0;
      const sData = secondaryData.map((d) => {
        const val = d.values[0];
        return {x : d.timestamp, y : isNaN(val) ? null : val, tt : "Est. Power Loss: " + d.values[1].toFixed(2)}
      });
      // @ts-ignore
      chartData = [...chartData, {data: sData, yAxis: sz, name: 'Soiling Ratio'}]
    }
    return chartData;
  }

  const computeYAxisData = () => {
    let yAxisData = changeChart
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
      }));
    if(secondaryData){
      const sz = yAxisData.length;
      const percent = Math.floor(90 / sz);
      const newAxis = {
        title: {
          enabled: true,
          text: "Soiling Ratio",
        },
        opposite: false,
        top: `0%`,
        height: `10%`,
        offset: 0,
        plotBands: [],
      };
      yAxisData = changeChart
        ? yAxisData.map((y, idx) =>
          ({
            ...y,
            height: (percent - 5).toString() + "%",
            top:  (12 + percent * idx).toString() + "%",
          })
        ) :
        yAxisData.map((y, idx) =>
          ({
            ...y,
            height: "90%",
            top:  "12%",
          })
        );
      yAxisData.push(newAxis);
    }
    return yAxisData;
  }

  const forecastChartData = (forecastData !== null) ? selectedMeasures
    .map((measure, index) => ({
      data: forecastData.map((d) => {
        const val = d.values[index];
        return [d.timestamp, isNaN(val) ? null : val];
      }),
      name: "Forecasted " + dataset.header[measure],
      yAxis: changeChart ? index : 0,
      zoneAxis: "x",
      zones,
    })) : [];

    const compareChartData = (compareData !== null && compare.length !== 0) ? [...[].concat(...compareData.map((compData, idx) => selectedMeasures.map((measure, index) => ({
    data: compData.map(d => {
      const val = d.values[index];
      return [d.timestamp,isNaN(val) ? null : val];
    }),
    name: dataset.header[measure] + " " + compare[idx],
    yAxis: changeChart ? index : 0,
    zoneAxis: "x",
    zones,
  }))))] : [];

  const handleMouseOverChart = () => {
    blockScroll();
    (customChangepointsEnabled && chart.current)
      ?
      chart.current.chartBackground.htmlCss({cursor:'crosshair'}) :
      chart.current.chartBackground.htmlCss({cursor:'default'});
  }

  const handleMouseLeaveChart = () => {
    allowScroll();
  }

  return (
    <Grid
      sx={{border: "1px solid rgba(0, 0, 0, .1)", minHeight: "700px"}}
      onMouseOver={() => handleMouseOverChart()}
      onMouseLeave={() => handleMouseLeaveChart()}
    >
      {!data ?
        <LinearProgress />
        : <LinearProgress variant="determinate" color="success" value={100} className={"linear-prog-hide"}/>}
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
                  approximation(_: any, groupData: string | any) {
                    const asc = (arr: any[]) => arr.sort((a: number, b: number) => a - b);
                    return [
                      asc(groupData)[0],
                      asc(groupData)[groupData.length - 1],
                    ];
                  },
                },
              },
              boxplot: {
                dataGrouping: {
                  approximation(_: any, groupData: string | any[]) {
                    // sort array ascending
                    const asc = (arr: any) => arr.sort((a: number, b: number) => a - b);
                    const sum = (arr: any[]) => arr.reduce((a: any, b: any) => a + b, 0);
                    const mean = (arr: string | any) => sum(arr) / arr.length;
                    const std = (arr: any[]) => {
                      const mu = mean(arr);
                      const diffArr = arr.map((a: number) => (a - mu) ** 2);
                      return Math.sqrt(sum(diffArr) / (arr.length - 1));
                    };
                    const quantile = (arr: any, q: number) => {
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

                    const q25 = (arr: any) => quantile(arr, 0.25);
                    const q50 = (arr: any) => quantile(arr, 0.5);
                    const q75 = (arr: any) => quantile(arr, 0.75);
                    const median = (arr: any) => q50(arr);

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
                marker: {
                  enabled: filter.size != 0 ? true : false
                }
                // dataGrouping: {
                //   units: [[resampleFreq, [1]]],
                //   forced: true,
                //   enabled: resampleFreq !== "none",
                //   groupAll: true,
                // },
              },
            },
            tooltip: {
              formatter: function () {
                // The first returned item is the header, subsequent items are the
                // points
                return ['<b>' + new Date(this.x) + '</b>'].concat(
                  this.points ?
                    this.points.map(function (point) {
                      let ss = `<span style="color:${point.color}">•</span> ${point.series.name}: ${point.y.toFixed(2)}`;
                      ss += point.point.tt ? `<br>${point.point.tt}</br>` : "";
                      return ss;
                    }) : []
                );
              },
              split: true
            },
            series:
              [
                ...computeChartData(),
                ...forecastChartData,
                ...compareChartData
              ],
            chart: {
              type: chartType,
              height: "700px",
              marginTop: 10,
              plotBorderWidth: 0,
              zoomType: customChangepointsEnabled ? 'x' : false,
              events: {
                plotBackgroundColor: "rgba(10,0,0,0)", // dummy color, to create an element
                load: chartFunctions,
                selection: customChangepointSelection,
              },
            },
            xAxis: {
              ordinal: false,
              type: "datetime",
              plotBands: [
                ...manualPlotBands,
                ...detectedPlotBands,
                ...customPlotBands
              ],
            },
            yAxis: computeYAxisData(),
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
            // stockTools: {
            //   gui: {
            //     enabled: true,
            //     buttons: [
            //       "changeType",
            //       "compareFiles",
            //     ],
            //     className: "highcharts-bindings-wrapper",
            //     toolbarClassName: "stocktools-toolbar",
            //     definitions: {
            //       changeType: {
            //         items: [
            //           "lineChart",
            //           "splineChart",
            //           "boxPlotChart",
            //           "areaRangeChart",
            //         ],
            //         lineChart: {
            //           className: "chart-line",
            //           symbol: "series-line.svg",
            //         },
            //         splineChart: {
            //           className: "chart-spline",
            //           symbol: "line.svg",
            //         },
            //         boxPlotChart: {
            //           className: "chart-boxplot",
            //           symbol: "series-ohlc.svg",
            //         },
            //         areaRangeChart: {
            //           className: "chart-arearange",
            //           symbol: "series-ohlc.svg",
            //         },
            //       },
            //       compareFiles: {
            //         className: "compare-files",
            //         symbol: "comparison.svg",
            //       },
            //     },
            //   },
            // },
            // navigation: {
            //   iconsURL: "../../../../content/images/stock-icons/",
            //   bindings: {
            //     line: {
            //       className: "chart-line", // needs to be the same with above
            //       init(e: any) {
            //         setType("line");
            //       },
            //     },
            //     spline: {
            //       className: "chart-spline", // needs to be the same with above
            //       init(e: any) {
            //         setType("spline");
            //       },
            //     },
            //     boxPlot: {
            //       className: "chart-boxplot", // needs to be the same with above
            //       init(e: any) {
            //         setType("boxplot");
            //       },
            //     },
            //     areaRange: {
            //       className: "chart-arearange",
            //       init(e: any) {
            //         setType("arearange");
            //       },
            //     },
            //     compareFiles: {
            //       className: "compare-files", // needs to be the same with above
            //       init(e: any) {
            //         dispatch(setCompare(true));
            //       },
            //     },
            //   },
            // },
          }}
        />
      )}
      <ChartPlotBands
        manualPlotBands={manualPlotBands}
        setManualPlotBands={setManualPlotBands}
        detectedPlotBands={detectedPlotBands}
        setDetectedPlotBands={setDetectedPlotBands}
        customPlotBands={customPlotBands}
        setCustomPlotBands={setManualPlotBands}
        customChangepoints={latestCustomChangepoints.current}
        setCustomChangepoints={setCustomChangepoints}/>
    </Grid>
  );
};

export default Chart;

