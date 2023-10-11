import React, { useEffect, useRef, useState } from 'react';
import '../visualizer.scss';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more';
import annotationsAdvanced from 'highcharts/modules/annotations-advanced';
import { useScrollBlock } from 'app/shared/util/useScrollBlock';
import { ITimeRange } from 'app/shared/model/time-range.model';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import {
  updateChartRef,
  updateCompareQueryResults,
  updateFrom,
  updateQueryResults,
  updateResampleFreq,
  updateTo,
  applyChangepointDetection,
  toggleCustomChangepoints,
  applyDeviationDetection,
  liveDataImplementation,
  applyYawMisalignmentDetection,
  updateAlertResults,
  setAlertingPreview,
  setAlertingPlotMode,
  updateCustomChangepoints
} from 'app/modules/store/visualizerSlice';
import { ChartPlotBands } from 'app/modules/visualizer/chart/chart-plot-bands/chart-plot-bands';
import chartAlertingChecker, { alertingPlotBandsCreator } from './chart-alerting/chart-alerting-functions';
import { filterChangepoints } from 'app/modules/visualizer/tools/changepoint-detection/changepoint-detection';
import grey from '@mui/material/colors/grey';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';

HighchartsMore(Highcharts);
annotationsAdvanced(Highcharts);

export const Chart = () => {
  const {chartRef,folder,dataset,from,to,resampleFreq,selectedMeasures,measureColors,queryResultsLoading,filter, customChangepoints,
    queryResults,changeChart,compare,changepointDetectionEnabled,detectedChangepointFilter,customChangepointsEnabled,data,compareData,
    forecastData,soilingEnabled,soilingType,alertingPlotMode,alertResults,forecastingDataSplit,soilingWeeks,yawMisalignmentEnabled,secondaryData,chartType,
    liveDataImplLoading,alerts,alertingPreview,activeTool,forecastingStartDate,forecastingEndDate} = useAppSelector(state => state.visualizer);

  const dispatch = useAppDispatch();

  const [blockScroll, allowScroll] = useScrollBlock();

  const [zones, setZones] = useState([]);
  const [customPlotBands, setCustomPlotBands] = useState([]);
  const [manualPlotBands, setManualPlotBands] = useState([]);
  const [alertingPlotBands, setAlertingPlotBands] = useState([]);
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
  const latestPreview = useRef(alertingPreview);
  const latestCustomChangepoints = useRef([]);
  const isSoilingEnabled = useRef(soilingEnabled);
  const isYawMisalignmentEnabled = useRef(yawMisalignmentEnabled);
  const isChangepointDetectionEnabled = useRef(changepointDetectionEnabled);

  // Color Zones For Patterns
  // useEffect(() => {
  //   const newZones =
  //     patterns !== null &&
  //     []
  //       .concat(
  //         ...patterns.patternGroups.map(patternGroup => {
  //           return [].concat(
  //             ...patternGroup.patterns.map(pattern => {
  //               return [{ value: pattern.start }, { value: pattern.end, color: patternGroup.color }];
  //             })
  //           );
  //         })
  //       )
  //       .sort((a, b) => a.value.getTime() - b.value.getTime());
  //   setZones(newZones);
  // }, [patterns]);

  //change zones if forecasting is activated and both start & end date is set
  const getZones = color => {
    if (forecastingStartDate !== null && forecastingEndDate !== null) {
      return [
        { value: forecastingStartDate, color },
        { value: forecastingStartDate + (forecastingEndDate - forecastingStartDate) * (forecastingDataSplit [0] / 100), color: '#00FF00' },
        {
          value: forecastingStartDate + (forecastingEndDate - forecastingStartDate) * ((forecastingDataSplit [0] + forecastingDataSplit [1]) / 100),
          color: '#ff0000',
        },
        { value: forecastingEndDate, color: '#00FFFF' },
        { value: dataset.timeRange.to, color },
      ];
    } else {
      return null;
    }
  };

  // add plotlines for start & end date if forecasting is enabled
  useEffect(() => {
    if (forecastingStartDate !== null && forecastingEndDate !== null) {
      if(chartRef.xAxis[0].plotLinesAndBands.length > 0){
        chartRef.xAxis[0].removePlotLine("start")
        chartRef.xAxis[0].removePlotLine("end")
      }
      chartRef.xAxis[0].addPlotLine({id: "start", color: grey[500], value: forecastingStartDate, width: 2, zIndex: 3, label: { text: 'Start Date', verticalAlign: 'center', textAlign: 'left' }})
      chartRef.xAxis[0].addPlotLine({id: "end",color: grey[500], value: forecastingEndDate, width: 2, zIndex: 3, label: { text: 'End Date', verticalAlign: 'center', textAlign: 'left' }})
    }
  }, [forecastingStartDate, forecastingEndDate]);

  // update chart height & width when toolkit window changes
  useEffect(() => {
    chartRef && chartRef.reflow();
  }, [activeTool]);

  useEffect(() => {
    latestPreview.current = alertingPreview;
  }, [alertingPreview]);

  useEffect(() => {
    isSoilingEnabled.current = soilingEnabled;
  }, [soilingEnabled]);

  useEffect(() => {
    !liveDataImplLoading && data && alerts && dispatch(updateAlertResults(chartAlertingChecker(data, alerts, dataset, selectedMeasures)));
  }, [liveDataImplLoading, selectedMeasures, alerts]);

  useEffect(() => {
    alertingPlotMode && data && Object.keys(alertResults).length > 0 && setAlertingPlotBands(alertingPlotBandsCreator(alertResults));
  }, [alertingPlotMode, selectedMeasures, alertResults]);

  useEffect(() => {
    isYawMisalignmentEnabled.current = yawMisalignmentEnabled;
  }, [yawMisalignmentEnabled]);

  useEffect(() => {
    latestFilter.current = filter;
  }, [filter]);

  useEffect(() => {
    if (chartRef !== null) {
      !queryResultsLoading && chartRef.hideLoading();
    }
  }, [queryResultsLoading]);

  useEffect(() => {
    if (compare.length !== 0) {
      dispatch(updateCompareQueryResults({ folder, id: compare, from, to, selectedMeasures, filter }));
    }
  }, [compare]);

  useEffect(() => {
    latestMeasures.current = selectedMeasures;
    dispatch(
      updateQueryResults({ folder, id: dataset.id,
        from: from ? from : dataset.timeRange.to - (dataset.timeRange.to - dataset.timeRange.from) * 0.1,
        to: to ? to : dataset.timeRange.to, selectedMeasures, filter })
    );
    if (compare.length !== 0) {
      dispatch(updateCompareQueryResults({ folder, id: compare, from, to, selectedMeasures, filter }));
    }
    if (selectedMeasures.length === 6) toast('Maximum number of measures reached');
  }, [dataset, selectedMeasures]);

  useEffect(() => {
    latestCompare.current = compare;
  }, [compare]);

  useEffect(() => {
    latestSoilingWeeks.current = soilingWeeks;
  }, [soilingWeeks]);


  useEffect(() => {
    if (!changepointDetectionEnabled) setDetectedPlotBands([]);
    isChangepointDetectionEnabled.current = changepointDetectionEnabled;
  }, [changepointDetectionEnabled]);

  useEffect(() => {
    if (customChangepointsEnabled && changepointHighlight === false) {
      toast('Highlight a region on the chart');
      setChangepointHighlight(true);
    }
  }, [customChangepointsEnabled]);

  useEffect(() => {
    chart.current && toast(`Frequency: ${latestFrequency.current}`);
  }, [latestFrequency.current]);

  const getChartRef = (chartR: any) => {
    dispatch(updateChartRef(chartR));
  };

  const toast = toastMessage => {
    chart.current.toast && chart.current.toast.destroy();
    if (chart.current) {
      const left = chart.current.plotWidth / 2;
      chart.current.toast = chart.current.renderer
        .label(toastMessage, left, 0)
        .attr({
          fill: Highcharts.getOptions().colors[1],
          padding: 10,
          r: 5,
          zIndex: 8,
        })
        .css({
          color: '#FFFFFF',
        })
        .add();
      setTimeout(function () {
        chart.current.toast && chart.current.toast.fadeOut();
      }, 2000);
      setTimeout(function () {
        if (chart.current.toast) chart.current.toast = chart.current.toast.destroy();
      }, 2500);
    }
  };

  const getChangepointData = (start, end, series) => {
    return series.map((s, idx) => {
      const newCustomChangepoint = {
          range: { from: start, to: end } as ITimeRange,
          measure: dataset.header.indexOf(s.userOptions.name),
          measureChartId: s.userOptions.index,
          id: latestCustomChangepoints.current.reduce((max, obj) => obj.id > max ? obj.id : max, 0) + 1,
          custom: true,
        };
      return newCustomChangepoint;
    })
  }

  const customChangepointSelection = event => {
    event.preventDefault();
    const newCustomChangepoints = getChangepointData(event.xAxis[0].min, event.xAxis[0].max, event.target.series);
    latestCustomChangepoints.current = [...latestCustomChangepoints.current, ...newCustomChangepoints];
    dispatch(updateCustomChangepoints(latestCustomChangepoints.current));
    dispatch(toggleCustomChangepoints(false));
  };

  const setCustomChangepoints = newCustomChangepoints => {
    latestCustomChangepoints.current = newCustomChangepoints;
    dispatch(updateCustomChangepoints(latestCustomChangepoints.current));

  };

  const chartFunctions = (e: { target: any }) => {
    chart.current = e.target;
    timeRange.current = queryResults.timeRange;
    latestDatasetId.current = dataset.id;
    latestFolder.current = folder;
    // CHART: INSTRUCTIONS
    chart.current.showLoading('Click and drag to Pan <br> Use mouse wheel to zoom in/out <br> click once for this message to disappear');
    Highcharts.addEvent(chart.current.container, 'click', (event: MouseEvent) => {
      chart.current.hideLoading();
      Highcharts.removeEvent(chart.current.container, 'click');
    });

    const fetchData = (leftSide: number, rightSide: number) => {
      chart.current.showLoading();
      dispatch(
        updateQueryResults({
          folder: latestFolder.current,
          id: latestDatasetId.current,
          from: leftSide,
          to: rightSide,
          selectedMeasures: latestMeasures.current,
          filter: latestFilter.current,
        })
      );
      dispatch(updateFrom(leftSide));
      dispatch(updateTo(rightSide));
      if (latestCompare.current.length !== 0)
        dispatch(
          updateCompareQueryResults({
            folder: latestFolder.current,
            id: latestCompare.current,
            from: leftSide,
            to: rightSide,
            selectedMeasures: latestMeasures.current,
            filter: latestFilter.current,
          })
        );
      latestLeftSide.current = leftSide;
      latestRightSide.current = rightSide;
      if (isChangepointDetectionEnabled.current)
        dispatch(applyChangepointDetection({ id: latestDatasetId.current, from: leftSide, to: rightSide })).then(res => {
          if (isSoilingEnabled.current)
            dispatch(
              applyDeviationDetection({
                id: latestDatasetId.current,
                weeks: latestSoilingWeeks.current,
                from: leftSide,
                to: rightSide,
                type: soilingType,
                changepoints: filterChangepoints(res.payload, detectedChangepointFilter),
              })
            );
        });
      if (isYawMisalignmentEnabled.current)
        dispatch(applyYawMisalignmentDetection({ id: latestDatasetId.current, from: leftSide, to: rightSide }));
    };

    const checkForData = (min: number, max: number) => {
      const leftSide = min;
      const rightSide = max;
      latestLeftSide.current = latestLeftSide.current === null ? leftSide - 1 : latestLeftSide.current;
      latestRightSide.current = latestRightSide.current === null ? rightSide - 1 : latestRightSide.current;
      if (leftSide !== latestLeftSide.current || rightSide !== latestRightSide.current) {
        fetchData(leftSide, rightSide);
      }
    };


    const checkForDataOnPan = () => {
      const { max, min } = chart.current.xAxis[0].getExtremes();
      checkForData(min, max);
    };

    const checkForDataOnZoom = () => {
      const { max, min } = chart.current.xAxis[0].getExtremes();
      checkForData(min, max);
    };


    // CHART: ZOOM FUNCTION
    Highcharts.addEvent(chart.current.container, 'wheel', (event: WheelEvent) => {
      const p = chart.current.xAxis[0].toValue(chart.current.pointer.normalize(event).chartX);
      const { min, max } = chart.current.xAxis[0].getExtremes();
      const stepleft = (p - min) * 0.25;
      const stepright = (max - p) * 0.25;
      if (!chart.current.loadingShown) {
        if (event.deltaY < 0 && max - min > 10000) {
          // in, 10000 is the max range on a zoom level
          chart.current.xAxis[0].setExtremes(min + stepleft, max - stepright, true, true);
        } else if (event.deltaY > 0) {
          // out
          chart.current.xAxis[0].setExtremes(
            Math.max(min - stepleft, dataset.timeRange.from),
            Math.min(max + stepright, dataset.timeRange.to),
            true,
            true
          );
        }
        checkForDataOnZoom();
      }
    });

    const renderLabelForLiveData = () => {
      const { max } = chart.current.xAxis[0].getExtremes();
      if (max >= data[selectedMeasures[0]][data[selectedMeasures[0]].length - 1].timestamp) {
        toast('Live Data Mode');
      }
    };

    // CHART: PAN FUNCTION
    Highcharts.wrap(Highcharts.Chart.prototype, 'pan', function (proceed, ...args) {
      const event = args[0];
      console.log(args[1])
      const xAxis = chart.current.xAxis[0];
      const axisRange = xAxis.max - xAxis.min;
      const movementX = event.movementX;
      const percent = (movementX / 2) * Math.min(60, Math.sqrt(movementX ** 2 + 1));
      const deltaX = (axisRange) * percent / 100000;
      xAxis.setExtremes(
        Math.max(xAxis.min - deltaX, dataset.timeRange.from),
        Math.min(xAxis.max - deltaX, dataset.timeRange.to),
        true,
        true
      );
      checkForDataOnPan();
      renderLabelForLiveData();
    })

    // LIVE DATA IMPLEMENTATION
    setInterval(() => {
      if (!latestPreview.current) {
        const { max, min, dataMax } = chart.current.xAxis[0].getExtremes();
        if (max >= data[selectedMeasures[0]][data[selectedMeasures[0]].length - 1].timestamp) {
          dispatch(
            liveDataImplementation({
              folder: latestFolder.current,
              id: latestDatasetId.current,
              from: dataMax,
              to: dataMax + 50000,
              selectedMeasures: latestMeasures.current,
              filter: latestFilter.current,
            })
          );
          max === dataMax && chart.current.xAxis[0].setExtremes(min, dataMax + 50000, true, true);
        }
      }
    }, 500);


    // Set initial extremes
    chart.current.xAxis[0].setExtremes(data[selectedMeasures[0]][2].timestamp, data[selectedMeasures[0]][data[selectedMeasures[0]].length - 2].timestamp);

  };

  const getSecondaryText = () => {
    if (isYawMisalignmentEnabled.current) return 'Yaw Angle';
    if (isSoilingEnabled.current) {
      switch (soilingType){
        case "soilingRatio":
          return "Soiling Ratio"
        case "powerLoss":
          return "Power Loss"
        default:
          return "Soiling Ratio"
      }
    }
  };

  const computeChartData = () => {
    let chartData =
      data !== null
        ? selectedMeasures.map((measure, index) => ({
            data: data[measure] ? data[measure].map(d => {
              const val = d.value;
              return [d.timestamp, isNaN(val) ? null : val]
            }) : [],
            name: dataset.header[measure],
            yAxis: changeChart ? index : 0,
            color: measureColors[measure],
            zoneAxis: 'x',
            zones: getZones(measureColors[measure]),
          }))
        : [];
    if (secondaryData) {
      const sz = chartData !== null ? chartData.length : 0;
      const sData = secondaryData.map(d => {
        const val = d.values[0];
        return { x: d.timestamp, y: isNaN(val) ? null : val, tt: d.values[1] ? 'Est. Power Loss: ' + d.values[1].toFixed(2) : null };
      });
      // @ts-ignore
      chartData = [...chartData, { data: sData, yAxis: sz, name: getSecondaryText() }];
    }
    return chartData;
  };

  const computeYAxisData = () => {
    let yAxisData = changeChart
      ? selectedMeasures.map((measure, idx) => ({
          title: {
            enabled: true,
            text: dataset.header[measure],
          },
          opposite: false,
          top: `${(100 / selectedMeasures.length) * idx}%`,
          height: `${selectedMeasures.length > 1 ? 100 / selectedMeasures.length - 5 : 100}%`,
          offset: 0,
        }))
      : selectedMeasures.map((measure, idx) => ({
          title: {
            enabled: false,
            text: dataset.header[measure],
          },
          opposite: false,
          top: '0%',
          height: '100%',
          offset: undefined,
        }));
    if (secondaryData) {
      const sz = yAxisData.length;
      const percent = Math.floor(90 / sz);
      const newAxis = {
        title: {
          enabled: true,
          text: getSecondaryText(),
        },
        opposite: false,
        top: `0%`,
        height: `10%`,
        offset: 0,
        plotBands: [],
      };
      yAxisData = changeChart
        ? yAxisData.map((y, idx) => ({
            ...y,
            height: (percent - 5).toString() + '%',
            top: (12 + percent * idx).toString() + '%',
          }))
        : yAxisData.map((y, idx) => ({
            ...y,
            height: '90%',
            top: '12%',
          }));
      yAxisData.push(newAxis);
    }
    return yAxisData;
  };

  const forecastChartData =
    forecastData !== null
      ? selectedMeasures.map((measure, index) => ({
          data: forecastData.map(d => {
            const val = d.values[index];
            return [d.timestamp, isNaN(val) ? null : val];
          }),
          name: 'Forecasted ' + dataset.header[measure],
          yAxis: changeChart ? index : 0,
          zoneAxis: 'x',
          zones,
        }))
      : [];

  const compareChartData =
    compareData !== null && compare.length !== 0
      ? [
          ...[].concat(
            ...compareData.map((compData, idx) =>
              selectedMeasures.map((measure, index) => ({
                data: compData.map(d => {
                  const val = d.values[index];
                  return [d.timestamp, isNaN(val) ? null : val];
                }),
                name: dataset.header[measure] + ' ' + compare[idx],
                yAxis: changeChart ? index : 0,
                zoneAxis: 'x',
                zones,
              }))
            )
          ),
        ]
      : [];

  const handleMouseOverChart = () => {
    blockScroll();
    customChangepointsEnabled && chartRef
      ? chart.current.chartBackground.htmlCss({ cursor: 'crosshair' })
      : chart.current.chartBackground.htmlCss({ cursor: 'default' });
  };

  const handleMouseLeaveChart = () => {
    allowScroll();
  };

  return (
    <Grid
      sx={{ border: '1px solid rgba(0, 0, 0, .1)', height: activeTool ? '40%' : '70%', position: 'relative' }}
      onMouseOver={() => data ? handleMouseOverChart() : null}
      onMouseLeave={() => data ? handleMouseLeaveChart() : null}
    >
      {!data ? <LinearProgress /> : <LinearProgress variant="determinate" color="success" value={100} className={'linear-prog-hide'} />}
      {data && (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          containerProps={{ className: 'chartContainer', style: { height: 'calc(100% - 4px)', position: 'absolute', width: '100%' } }}
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
                    return [asc(groupData)[0], asc(groupData)[groupData.length - 1]];
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
                        return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
                      } else {
                        return sorted[base];
                      }
                    };

                    const q25 = (arr: any) => quantile(arr, 0.25);
                    const q50 = (arr: any) => quantile(arr, 0.5);
                    const q75 = (arr: any) => quantile(arr, 0.75);
                    const median = (arr: any) => q50(arr);
                    return [asc(groupData)[0], q25(groupData), q50(groupData), q75(groupData), asc(groupData)[groupData.length - 1]];
                  },
                },
              },
              series: {
                connectNulls: false,
                connectorAllowed: false,
                maxPointWidth: 80,
                marker: {
                  enabled: Object.keys(filter).length !== 0 ? true : false,
                },
              },
            },
            tooltip: {
              formatter: function () {
                // The first returned item is the header, subsequent items are the
                // points
                return ['<b>' + new Date(this.x) + '</b>'].concat(
                  this.points
                    ? this.points.map(function (point) {
                        let ss = `<span style="color:${point.color}">•</span> ${point.series.name}: ${point.y.toFixed(2)}`;
                        ss += point.point.tt ? `<br>${point.point.tt}</br>` : '';
                        return ss;
                      })
                    : []
                );
              },
              split: true,
            },
            series: [...computeChartData(), ...forecastChartData, ...compareChartData],
            chart: {
              type: chartType,
              marginTop: 10,
              plotBorderWidth: 0,
              backgroundColor: !activeTool ? null : 'rgba(0,0,0, 0.05)',
              zoomType: customChangepointsEnabled ? 'x' : false,
              events: {
                plotBackgroundColor: 'rgba(10,0,0,0)', // dummy color, to create an element
                load: chartFunctions,
                selection: customChangepointSelection,
              },
            },
            xAxis: {
              ordinal: false,
              type: 'datetime',
              plotBands: [...manualPlotBands, ...detectedPlotBands, ...customPlotBands, ...alertingPlotBands],
            },
            yAxis: computeYAxisData(),
            rangeSelector: {
              enabled: false,
            },
            subtitle: {
              text: `Frequency: ${resampleFreq}`,
              align: 'right',
              x: 0,
            },
            navigator: {
              enabled: false,
              adaptToUpdatedData: false,
            },
            scrollbar: {
              enabled: false,
              liveRedraw: false,
            },
            colorAxis: null,
            legend: {
              enabled: !changeChart,
            },
            credits: {
              enabled: false,
            },
            loading: {
              labelStyle: {
                color: 'black',
                fontSize: '20px',
              },
              style: {
                backgroundColor: 'transparent',
              },
            },
          }}
        />
      )}
      <ChartPlotBands
        manualPlotBands={manualPlotBands}
        setManualPlotBands={setManualPlotBands}
        detectedPlotBands={detectedPlotBands}
        setDetectedPlotBands={setDetectedPlotBands}
        customPlotBands={customPlotBands}
        setCustomPlotBands={setCustomPlotBands}
        customChangepoints={latestCustomChangepoints.current}
        setCustomChangepoints={setCustomChangepoints}
      />
    </Grid>
  );
};

export default Chart;
