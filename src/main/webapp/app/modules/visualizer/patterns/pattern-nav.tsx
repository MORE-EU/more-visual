import * as React from 'react';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import {updatePatternNav} from '../visualizer.reducer';

export interface IPatternNavProps {
  patternNav: string,
  updatePatternNav: typeof updatePatternNav,
}

const PatternNav = (props: IPatternNavProps) => {

  const {patternNav} = props;

  return (
    <Grid container justifyContent="center">
      <Grid item sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={patternNav}
          onChange={(e, val) => {
            props.updatePatternNav(`${val}`);
          }}
          aria-label="basic tabs"
        >
          <Tab label="Pattern Extraction" value="0" />
          <Tab label="Changepoint Detection" value="1" />
          <Tab label="Deviation Detection" value="2" />
          <Tab label="Semantic Segmentation" value="3" />
        </Tabs>
      </Grid>
    </Grid>
  );
}

export default PatternNav;
