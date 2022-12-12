import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from 'app/modules/store/storeConfig';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { deleteAlert, editAlert } from 'app/modules/store/visualizerSlice';
import { getMatchedMeasures } from './chart-alerting-functions';
import Switch from '@mui/material/Switch';
import { grey } from '@mui/material/colors';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';

const AlertsTable = props => {
  const { alerts, selectedMeasures, dataset, alertResults } = useAppSelector(state => state.visualizer);
  const dispatch = useAppDispatch();
  const [selectedAlerts, setSelectedAlerts] = useState([]);

  useEffect(() => {
    setSelectedAlerts(getMatchedMeasures(alerts, dataset, selectedMeasures));
  }, [alerts, selectedMeasures]);

  const handleSwitchChange = (alert) => {
    const newAl = {...alert, active: !alert.active}
    dispatch(editAlert(newAl));
  }

  return (
    <TableContainer component={Paper} sx={{ height: 200 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center"></TableCell>
            <TableCell>Alert Name</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">measure</TableCell>
            <TableCell align="right">Operation</TableCell>
            <TableCell align="right">Value1</TableCell>
            <TableCell align="right">Value2</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {alerts.map(row => {
            const disabledRow = !selectedAlerts.includes(row.measure);
            return(
            <TableRow key={`row-${row.name}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align="right" scope="row">
              {!disabledRow && <Switch checked={row.active} disabled={disabledRow} onChange={() => handleSwitchChange(row)} size="small" />}
              </TableCell>
              <TableCell component="th" sx={{color: disabledRow ? grey[400] : grey[900]}} scope="row">
              {row.name}
              </TableCell>
              <TableCell align="right" sx={{color: disabledRow ? grey[400] :  grey[900]}}>{row.duration}</TableCell>
              <TableCell align="right" sx={{color: disabledRow ? grey[400] :  grey[900]}}>{row.measure}</TableCell>
              <TableCell align="right" sx={{color: disabledRow ? grey[400] :  grey[900]}}>{row.operation}</TableCell>
              <TableCell align="right" sx={{color: disabledRow ? grey[400] :  grey[900]}}>{row.values.value1}</TableCell>
              <TableCell align="right" sx={{color: disabledRow ? grey[400] :  grey[900]}}>{row.values.value2 === '' ? 'empty' : row.values.value2}</TableCell>
              <TableCell align="center">
                {
                  <>
                    <Tooltip title="Edit" placement="top">
                      <IconButton
                        aria-label="edit"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={() => {
                          props.setAlertInfo(row);
                          props.setValue(1);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={disabledRow ? 'Measure must be selected in order to preview' : 'Preview'}
                      placement="top"
                    >
                      <span>
                      <Badge badgeContent={alertResults.hasOwnProperty(row.name) && alertResults[row.name].length} invisible={!alertResults.hasOwnProperty(row.name)} color="primary" variant="dot">
                        <IconButton
                          aria-label="preview"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          disabled={disabledRow}
                          onClick={() => {
                            props.setAlertPreviewName(row.name);
                            props.setValue(2);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        </Badge>
                      </span>
                    </Tooltip>
                    <Tooltip title="Delete" placement="top">
                      <IconButton
                        aria-label="delete"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={() => {
                          dispatch(deleteAlert(row.name));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                }
              </TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AlertsTable;
