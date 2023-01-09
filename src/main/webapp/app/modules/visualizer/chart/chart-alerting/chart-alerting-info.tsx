import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import PreviewIcon from '@mui/icons-material/Preview';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from 'app/modules/store/storeConfig';
import { setAlertingPlotMode } from 'app/modules/store/visualizerSlice';
import moment from 'moment';
import React from 'react';
import Box from '@mui/material/Box';

const AlertingInfo = props => {
  const dispatch = useAppDispatch();

  return (
    <>
      {!props.alertPreviewName ? (
        <>
          <Grid>
            <Typography id="modal-error-message" color={'#757575'} component="span" variant="subtitle1" fontSize={18}>
              Press {<VisibilityIcon sx={{ verticalAlign: 'middle' }} />} in order to see alert results
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography id="modal-modal-title" variant="h5" sx={{ alignSelf: 'center' }} component="span">
              Results
            </Typography>
            <Tooltip title="Chart Preview" placement="right">
              <IconButton
                aria-label="chart-preview"
                id="long-button"
                size="large"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={() => {
                  props.setOpen(false);
                  props.chartRef.xAxis[0].setExtremes(
                    props.alertResults[props.alertPreviewName].results[0][0],
                    props.alertResults[props.alertPreviewName].results[props.alertResults[props.alertPreviewName].results.length - 1][1],
                    true,
                    false
                  );
                  dispatch(setAlertingPlotMode(true));
                }}
              >
                <PreviewIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <TableContainer component={Box} sx={{ height: 200 }}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Start Date</TableCell>
                    <TableCell align="left">End Date</TableCell>
                    <TableCell align="right">Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.alertResults.hasOwnProperty(props.alertPreviewName) && props.alertResults[props.alertPreviewName].results.map((item, idx) => (
                    <TableRow key={`row-result-${idx}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell align="left">{moment(item[0]).format('YYYY-MM-DD HH:mm:ss').toString()}</TableCell>
                      <TableCell align="left">{moment(item[1]).format('YYYY-MM-DD HH:mm:ss').toString()}</TableCell>
                      <TableCell align="right">{moment.duration(moment(item[1]).diff(moment(item[0]))).asSeconds() + 's'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </>
      )}
    </>
  );
};

export default AlertingInfo;
