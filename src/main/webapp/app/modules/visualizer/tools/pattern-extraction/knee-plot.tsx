import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, {useState} from "react";
import ModalStyles from "app/shared/layout/ModalStyle";
import DimensionSelector from "app/shared/layout/DimensionSelector";
import { useAppSelector, useAppDispatch } from 'app/modules/store/storeConfig';
import { setOpenToolkit, updateSelectedMeasures } from "app/modules/store/visualizerSlice";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const KneePlot = () => {

  const {patterns, dataset} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [corrected, setCorrected] = useState(patterns.corrected.knee !== null);
  const correctedK = corrected ? patterns.corrected.knee.k : 0;
  const correctedDimensions = corrected ? patterns.corrected.knee.dimensions : [];

  const [k, setK] = useState(correctedK);
  const [selectedDimensions, setSelectedDimensions] = useState(correctedDimensions);
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
    dispatch(updateSelectedMeasures(dimensions));
    setCorrected(true);
    dispatch(setOpenToolkit(false));
  }

  const createData = () => {
    const data = [];
    for (let i = 0; i < patterns.knee.length; i++) {
      data.push([(i + 1), patterns.knee[i]]);
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
              label="Choose Dimensions"
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
