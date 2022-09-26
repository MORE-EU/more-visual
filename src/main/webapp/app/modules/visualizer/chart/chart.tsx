import React, { useEffect, useRef, useState } from "react";
import "../visualizer.scss";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import {Grid, Slider, LinearProgress} from "@mui/material";
import annotationsAdvanced from "highcharts/modules/annotations-advanced";
import stockTools from "highcharts/modules/stock-tools";
import {useScrollBlock} from "app/shared/util/useScrollBlock";
import {ITimeRange} from "app/shared/model/time-range.model";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";
import {
  setCompare,
  setShowChangePointFunction,
  setShowDatePick,
  updateChartRef,
  updateCompareQueryResults,
  updateCustomChangePoints,
  updateFrom,
  updateQueryResults,
  updateResampleFreq,
  updateTo,
  applyChangepointDetection,
  applyDeviationDetection
} from "app/modules/store/visualizerSlice";
import CloseIcon from "@mui/icons-material/Close";
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

// TODO: FIX FULLSCREEN

stockTools(Highcharts);
annotationsAdvanced(Highcharts);

export const Chart = () => {

  const {chartRef, folder, dataset, from, to, resampleFreq, selectedMeasures, measureColors,
    queryResultsLoading, filters, customChangePoints,
    queryResults, changeChart, compare, changepointDetectionEnabled, patterns, detectedChangePoints, data, compareData,
    forecastData, soilingEnabled, soilingWeeks, manualChangepointsEnabled, manualChangePoints,
    secondaryData} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [blockScroll, allowScroll] = useScrollBlock();

  const [zones, setZones] = useState([]);
  const [plotBands, setPlotBands] = useState([]);
  const [type, setType] = useState("line");
  const [sliderVal, setSliderVal] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  // Refs
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
  const isChangePointDetectionEnabled = useRef(changepointDetectionEnabled);
  const isSoilingEnabled = useRef(soilingEnabled);

  const manualPlotBands = ((manualChangePoints !== null && manualChangepointsEnabled) && [].concat(...manualChangePoints.map(date => {
    return {
      color: '#425af5',
      from: date.range.from,
      to: date.range.to,
      label: {
        // text: 'I am a label 2', // Content of the label.
        // align: 'left', // Positioning of the label.
      }
    };
  })));

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
    let newChangepointPlotBands = ((detectedChangePoints !== null && changepointDetectionEnabled) ? [].concat(...detectedChangePoints.map((date, idx) => {
      return {
        color: '#f5dd42',
        from: date.range.from,
        to: date.range.to,
        id: "pb" + idx,
        // label: {
        //   text: 'plot 1',
        //   align: 'center'
        // },
        borderWidth: 0,
        borderColor: 'black',
        events: {
          // mouseup(e) {
          //   handlePlotBandsSelection(this.id);
          // }
          mouseover: function(e) {
            this.svgElem.attr('fill', new Highcharts.Color(this.options.color).brighten(0.1).get());
          },
          mouseout: function(e) {
            this.svgElem.attr('fill', this.options.color);
          },
        }
      };
    })) : []);
    if(manualChangepointsEnabled) newChangepointPlotBands = newChangepointPlotBands.concat(manualPlotBands);
    setPlotBands(newChangepointPlotBands);

  }, [detectedChangePoints, manualChangepointsEnabled]);


  useEffect(() => {
    isChangePointDetectionEnabled.current = changepointDetectionEnabled;
    if(!changepointDetectionEnabled){
      if(manualChangepointsEnabled) setPlotBands(manualPlotBands);
      else setPlotBands([]);
    }
  }, [changepointDetectionEnabled, manualChangepointsEnabled]);

  useEffect(() => {
    isSoilingEnabled.current = soilingEnabled;
  }, [soilingEnabled]);

  useEffect(() => {
    if(chartRef !== null){
    !queryResultsLoading && chartRef.hideLoading();
    }
  }, [queryResultsLoading])

  useEffect(() => {
    if (compare.length !== 0) {
      dispatch(updateCompareQueryResults({folder, id: compare, from, to, resampleFreq, selectedMeasures}));
    }
  }, [compare])

  useEffect(() => {
    latestMeasures.current = selectedMeasures;
    dispatch(updateQueryResults({folder, id: dataset.id, from: from ? from : null, to: to ? to : null,
      resampleFreq, selectedMeasures}));
    if (compare.length !== 0) {
      dispatch(updateCompareQueryResults({folder, id: compare, from, to, resampleFreq, selectedMeasures}));
    }
  }, [dataset, selectedMeasures]);

  useEffect(() => {
    latestCompare.current = compare;
  }, [compare]);

  useEffect(() => {
    latestSoilingWeeks.current = soilingWeeks;
  }, [soilingWeeks]);

  const getChartRef = (chartR: any) => {
    dispatch(updateChartRef(chartR));
  };

  const annotationToDate = (annotation: { startXMin: any; startXMax: any; }, len: any) => {
    const startPoint = annotation.startXMin,
      endPoint = annotation.startXMax;
    return {range: {from: startPoint, to: endPoint} as ITimeRange, id: len};
  };


  const handlePlotBandsSelection = (id) => {
    if(typeof id === "string") {
      const idx = plotBands.findIndex(x => x.id === id);
      if(idx !== selectedPlot){
        setSelectedPlot(idx);
        setSliderVal([plotBands[idx].from, plotBands[idx].to])
        setPlotBands([...plotBands].map(object => {
          if(object.id === id) {
            return {
              ...object,
              borderWidth: 1,
            }
          }else if(object.id !== id && object.borderWidth === 1){
            return {
              ...object,
              borderWidth: 0,
            }
          }
          else return object;
        }))
      }
    }
    else if(Array.isArray(id)) {
      setSliderVal(id);
      setPlotBands([...plotBands].map((object, idx) => {
        if(idx === selectedPlot) {
          return {
            ...object,
            from: id[0],
            to: id[1]
          }
        }
        else return object;
      }))
    }
    else {
      setSliderVal(null);
      setSelectedPlot(null);
      setPlotBands([...plotBands].map((object, idx) => {
        if(object.borderWidth === 1) {
          return {
            ...object,
            borderWidth: 0
          }
        }
        else return object;
      }))
    }
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
        selectedMeasures: latestMeasures.current}));
      dispatch(updateFrom(leftSide));
      dispatch(updateTo(rightSide));
      if (latestCompare.current.length !== 0) {
        dispatch(updateCompareQueryResults({folder: latestFolder.current, id: latestCompare.current,
        from: leftSide, to: rightSide, resampleFreq: latestFrequency.current,
          selectedMeasures: latestMeasures.current}))
      }
      latestLeftSide.current = leftSide;
      latestRightSide.current = rightSide;
      if(isChangePointDetectionEnabled.current)
        dispatch(
          applyChangepointDetection({id: latestDatasetId.current,
            from: leftSide, to: rightSide, changepoints: customChangePoints})).then((res) => {
          if(isSoilingEnabled.current) dispatch(applyDeviationDetection({id: latestDatasetId.current,
            folder: latestFolder.current, resampleFreq: latestFrequency.current, weeks: latestSoilingWeeks.current,
            from: leftSide, to: rightSide, changepoints: res.payload}));
        });
      };

    const getSides = (max: number, min: number, p: number) => {
      const pad = (max - min) + ((max - min) * p);
      const leftSide = Math.max(Math.min(min - pad, (timeRange.current[0] + min - pad)), timeRange.current[0]);
      const rightSide = Math.min(max + pad, timeRange.current[1]);
      return {leftSide, rightSide};
    }

    const checkForData = (max: any, min: any) => {
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
      if ((dataMax - max < 2 || min - dataMin < 2)) {
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
      const {min, max} = chart.current.xAxis[0].getExtremes();
      const step = (max - min) / 10;
      if(!chart.current.loadingShown){
      if (event.deltaY < 0) { // in
        chart.current.xAxis[0].setExtremes( min + step, max - step, true, false);
      } else if (event.deltaY > 0) { // out
        chart.current.xAxis[0].setExtremes(Math.max(min - step, timeRange.current[0]),
          Math.min(max + step, timeRange.current[1]), true, false)
      }
      checkForDataOnZoom();
    }
    });

    // CHART: PAN FUNCTION
    Highcharts.wrap(Highcharts.Chart.prototype, "pan", function (proceed, ...args) {
      if(!chart.current.loadingShown){
      proceed.apply(this, args);
      checkForDataOnPan();
      }
    });

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

  const compareChartData = (compareData !== null) ? compareData.map((compData, idx) => selectedMeasures.map((measure, index) => ({
    data: compData.map(d => {
      const val = d.values[index];
      return [d.timestamp,isNaN(val) ? null : val];
    }),
    name: dataset.header[measure] + " " + compare[idx],
    yAxis: changeChart ? index : 0,
    zoneAxis: "x",
    zones,
  }))) : [];

  return (
    <Grid
      sx={{border: "1px solid rgba(0, 0, 0, .1)", minHeight: "700px"}}
      onMouseOver={() => blockScroll()}
      onMouseLeave={() => allowScroll()}
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
                  init(e: any) {
                    setType("line");
                  },
                },
                spline: {
                  className: "chart-spline", // needs to be the same with above
                  init(e: any) {
                    setType("spline");
                  },
                },
                boxPlot: {
                  className: "chart-boxplot", // needs to be the same with above
                  init(e: any) {
                    setType("boxplot");
                  },
                },
                areaRange: {
                  className: "chart-arearange",
                  init(e: any) {
                    setType("arearange");
                  },
                },
                pickIntervals: {
                  className: "pick-intervals", // needs to be the same with above
                  init(e: any) {
                    dispatch(setShowDatePick(true));
                  },
                },
                functionIntervals: {
                  className: "function-intervals", // needs to be the same with above
                  init(e: any) {
                    dispatch(setShowChangePointFunction(true));
                  },
                },
                compareFiles: {
                  className: "compare-files", // needs to be the same with above
                  init(e: any) {
                    dispatch(setCompare(true));
                  },
                },
                measureX: {
                  annotationsOptions: {
                    id: customChangePoints !== null  ? customChangePoints.length : 0,
                    events: {
                      remove(event: { target: { userOptions: { id: any; }; }; }) {
                        // get annotations
                        const annotations = this.chart.annotations.filter(
                          (a: { userOptions: { id: any; }; }) =>
                            a.userOptions.id !== event.target.userOptions.id
                        );
                        // convert annotations to dates
                        dispatch(updateCustomChangePoints(
                          annotations.map((a: any, id: any) => annotationToDate(a, id))
                        ));
                      },
                      afterUpdate(event: { target: { cancelClick: any; }; }) {
                        // convert annotations to dates
                        if (event.target.cancelClick !== undefined) {
                          const annotations = this.chart.annotations;
                          dispatch(updateCustomChangePoints(
                            annotations.map((a: any, id: any) => annotationToDate(a, id))
                          ));
                        }
                      },
                    },
                  },
                  end() {
                    dispatch(updateCustomChangePoints(
                      this.chart.annotations.map((a: any, id: any) =>
                        annotationToDate(a, id)
                      )
                    ));
                  },
                },
              },
            },
          }}
        />
      )}
      {sliderVal &&
        <Grid sx={{ml: 3, mr: 3, display: "flex"}}>
          <CloseIcon onClick={() => {handlePlotBandsSelection(null)}}/>
          <Slider
            value={sliderVal}
            onChange={(e, newVal) => {handlePlotBandsSelection(newVal)}}
            min={parseInt(data[0].timestamp, 10)}
            max={parseInt(data[data.length-1].timestamp, 10)}
            valueLabelDisplay="auto"
            valueLabelFormat={x => `${new Date(x)}`}
          />
        </Grid>}
    </Grid>
  );
};

export default Chart;

