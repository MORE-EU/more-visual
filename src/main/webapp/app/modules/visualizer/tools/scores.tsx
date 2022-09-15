import React from 'react';
import {Box, Button, Grid, List, ListItem, ListItemButton, ListItemText,} from "@mui/material";
import ModalStyles from "app/shared/layout/ModalStyle";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";


const functions = ["R-SQUARED", "MAE", "ME", "MAPE", "MPE"];

export const Scores = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scores, setScores] = React.useState({});
  const [changePointDates, setChangePointDates] = React.useState([]);

  const getLabels = () => {
    const labels = [];
    for (let j = 0; j < changePointDates.length; j++) {
      const name = changePointDates[j].start.toUTCString().concat(" -<br>", changePointDates[j].end.toUTCString())
      labels.push(name);
    }
    return labels;
  }

  const createScores = () => {
    for (let i = 0; i < functions.length; i++) {
      const func = functions[i];
      const score = [];
      for (let j = 0; j < changePointDates.length; j++) {
        score.push({name: "Interval".concat(" ", (j + 1).toString(10)), y: Math.random()});
      }
      scores[func] = score;
    }
  }

  createScores();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const classes = ModalStyles();


  const options = {
    title: {
      text: 'Scores'
    },
    stockTools: {
      gui: {
        enabled: false // disable the built-in toolbar
      }
    },
    series: [
      {
        data: scores[functions[selectedIndex]],
        name: "Score"
      }
    ],
    chart: {
      type: 'bar'
    },
    xAxis: {
      type: 'datetime',
      categories: getLabels()
    },
    yAxis: {
      title: {
        text: "Score"
      }
    }

  };
  return (
    <Box sx={{textAlign: "center"}}>
      <p>Training Complete</p>
      <p>Found predictions for {changePointDates.length} dates</p>
      <Button onClick={() => setOpen(true)}>Show Scores</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        disableEnforceFocus
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item container xs={12} className={classes.paper}>
            <Grid item xs={10}>
              <HighchartsReact
                highcharts={Highcharts}
                options={options}
              />
            </Grid>
            <Grid item xs={2}>
              <p>Scoring Function</p>
              <List>
                <ListItem disablePadding selected={selectedIndex === 0}
                          onClick={(event) => handleListItemClick(event, 0)}>
                  <ListItemButton>
                    <ListItemText primary="R-SQUARED"/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding selected={selectedIndex === 1}
                          onClick={(event) => handleListItemClick(event, 1)}>
                  <ListItemButton>
                    <ListItemText primary="MAE"/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding selected={selectedIndex === 2}
                          onClick={(event) => handleListItemClick(event, 2)}>
                  <ListItemButton>
                    <ListItemText primary="ME"/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding selected={selectedIndex === 3}
                          onClick={(event) => handleListItemClick(event, 3)}>
                  <ListItemButton>
                    <ListItemText primary="MAPE"/>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding selected={selectedIndex === 4}
                          onClick={(event) => handleListItemClick(event, 4)}>
                  <ListItemButton>
                    <ListItemText primary="MPE"/>
                  </ListItemButton>
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Box>
  );
}

export default Scores;
