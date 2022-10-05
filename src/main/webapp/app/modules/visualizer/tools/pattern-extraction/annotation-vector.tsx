import React, {useState} from "react";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import ModalStyles from "app/shared/layout/ModalStyle";
import { useAppDispatch, useAppSelector } from "app/modules/store/storeConfig";
import { setOpenToolkit } from "app/modules/store/visualizerSlice";

export const AnnotationVector = () => {

  const {patterns} = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();

  const [corrected, setCorrected] = useState(patterns.corrected.knee !== null);
  const [avFunction, setAVFunction] = useState(0);

  const applyAV = (e, p) => {
    // TODO: API CALL
    p.corrected.annotationVector = {func: e.target.value};
    dispatch(setOpenToolkit(false));
  }

  const classes = ModalStyles();
  const options = {
    title: {
      text: 'Multivariate Pattern Knee Plot'
    },
    series: [
      {
        data: patterns.annotationVector,
        name: "Number of Dimensions"
      }
    ],
    chart: {
      width: 700
    },
    yAxis: {
      title: {
        text: "Matrix Profile Min. Value"
      }
    }

  };

  const changeFunction = (e) => {
    setAVFunction(e.target.value);

  }

  const renderDescription = (description) => {
    switch (description) {
      case 0:
        return "Utility function that returns an annotation vector where values are based\n" +
          "    on the complexity estimation of the signal.";
      case 1:
        return "Utility function that returns an annotation vector where values are set to\n" +
          "    1 if the standard deviation is less than the mean of standard deviation.\n" +
          "    Otherwise, the values are set to 0."
      case 2:
        return "Utility function that returns an annotation vector such that\n" +
          "    subsequences that have more clipping have less importance."
      default:
        return 'foo';
    }
  }

  return (
    <div className={classes.paper} style={{width: "700px"}}>
      {/* <Grid item xs={12}> */}
      {/*  <HighchartsReact */}
      {/*    highcharts={Highcharts} */}
      {/*    options={options} */}
      {/*  /> */}
      {/* </Grid> */}
      <Grid item spacing={2} container xs={12}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="av-func-label">Choose an Annotation Vector Function</InputLabel>
            <Select
              labelId="av-func-select-label"
              id="av-func-select"
              value={avFunction}
              label="Choose an Annotation Vector Function"
              onChange={changeFunction}
            >
              <MenuItem
                key={0}
                value={0}>Complexity</MenuItem>
              <MenuItem
                key={1}
                value={1}>Meanstd</MenuItem>
              <MenuItem
                key={2}
                value={2}>Clipping</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <b>Description:</b>
          {renderDescription(avFunction)}
        </Grid>
        <Grid item container xs={12} direction="row"
              justifyContent="flex-end"
              alignItems="center">
          <Button onClick={e => applyAV(e, patterns)}>Apply</Button>
        </Grid>
      </Grid>
    </div>
  );
}
