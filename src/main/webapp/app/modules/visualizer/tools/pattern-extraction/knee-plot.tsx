import {Button, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React from "react";
import {IDataset} from "app/shared/model/dataset.model";
import {IPatterns} from "app/shared/model/patterns.model";
import ModalStyles from "app/shared/layout/ModalStyle";
import {updateSelectedMeasures} from "app/modules/visualizer/visualizer.reducer";
import DimensionSelector from "app/shared/layout/DimensionSelector";

export interface IKneePlotProps {
  dataset: IDataset,
  patterns: IPatterns,
  setOpen: (boolean) => {},
  updateSelectedMeasures: typeof updateSelectedMeasures,
}


export const KneePlot = (props: IKneePlotProps) => {
  const {dataset, patterns} = props;
  const [corrected, setCorrected] = React.useState(patterns.corrected.knee !== null);
  const correctedK = corrected ? patterns.corrected.knee.k : 0;
  const correctedDimensions = corrected ? patterns.corrected.knee.dimensions : [];

  const [k, setK] = React.useState(correctedK);
  const [selectedDimensions, setSelectedDimensions] = React.useState(correctedDimensions);
  const header = dataset.header;
  const measures = dataset.measures;
  const classes = ModalStyles();

  const changeNoOfDimensions = (e) => {
    const dims = e.target.value;
    setK(dims);
  }

  const filterDimensions = (e, open) => {
    // TODO: get dimensions through api
    const dimensions = [1, 2, 3, 4];

    // TODO: set correction through api
    const knee = {k: 4, dimensions}
    patterns.corrected.knee = knee; // api call
    props.updateSelectedMeasures(dimensions);
    setCorrected(true);
    props.setOpen(false);
  }

  const createData = () => {
    let data = [];
    for (let i = 0; i < patterns.knee.length; i ++){
      data.push([(i+1), patterns.knee[i]]);
    }
    return data;
  }
  const resetDimensions = (e) => {
    setCorrected(false);
  }

  const options = {
    title: {
      text: 'Multivariate Pattern Knee Plot'
    },
    series: [
      {
        data: createData(),
        name: "Number of Dimensions"
      }
    ],
    stockTools: {
      gui: {
        enabled: false // disable the built-in toolbar
      }
    },
    chart: {
      width: 700
    },
    xAxis: {
      min: 1,
      startOnTick: true,
    },
    yAxis: {
      title: {
        text: "Matrix Profile Min. Value"
      },
    }

  };

  return (
    <div className={classes.paper}>
      <Grid item xs={12}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </Grid>
      {corrected &&
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={8}>
            <b>Dimensions found:</b> {correctedDimensions.map((d) => {
            return (header[d] + ", ");
          })}
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained"
                    onClick={e => resetDimensions(e)}
            >Re-Filter Dimensions</Button>
          </Grid>
        </Grid>
      }
      {!corrected &&
        <Grid item spacing={2} container xs={12}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="k-label">Choose No. of dimensions</InputLabel>
              <Select
                labelId="k-select-label"
                id="k-select"
                value={k}
                label="Choose No. Of Dimensions"
                onChange={changeNoOfDimensions}
              >
                {patterns.knee.map((mGroup, i) => {
                  return <MenuItem
                    key={i}
                    value={i + 1}>{i + 1}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <DimensionSelector
              label = "Choose Dimensions"
              dimensions={selectedDimensions}
              header={header}
              measures={measures}
              setDimensions={setSelectedDimensions}/>
          </Grid>
          <Grid item container xs={4} spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
          >
            <Grid item xs='auto'>
              <Button variant="contained"
                      onClick={e => filterDimensions(e, open)}
                      disabled={k === 0}
              >Filter Dimensions</Button>
            </Grid>
          </Grid>
        </Grid>
      }
    </div>
  );
}
