import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Grid} from "@mui/material";

export default function PatternNav() {
  return (
    <Grid container xs ={12}>
      <Grid item xs = {6}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Interesting Patterns
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Extract interesting patterns from a multivariate Time-series through the use of the Matrix Profile
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Go</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs = {6}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Semantic Segmentation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Learn the segmentation parameters from one or more initial, “golden truth” time series which is segmented on areas with different behaviors, and is able to segment a new input time series into areas with correspondingly different behaviors.
              The goal of this tool is to identify segments of a time series that correspond to aligned or misaligned areas.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Go</Button>
          </CardActions>
        </Card>
      </Grid>
        <Grid item xs = {6}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Changepoint Detection
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Detect and recognize changepoints in a time series.
                Given a set of intervals in the time series, where changepoints may lie, this tool essentially ranks those intervals with respect to the possibility of containing a changepoint.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Go</Button>
            </CardActions>
          </Card>
        </Grid>
          <Grid item xs = {6}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Deviation Detection
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Detect windows of a time series that deviate significantly from a learned model.
                  Given a set of intervals where there is a behaviour for examination, a model is trained on those intervals and a search is performed for regions that their behaviour deviates significantly from our model.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go</Button>
              </CardActions>
            </Card>
          </Grid>
    </Grid>
  );
}
