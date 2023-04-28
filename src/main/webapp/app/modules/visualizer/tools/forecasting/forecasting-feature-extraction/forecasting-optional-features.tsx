import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';

const CollapseTemporal = props => {
  const { open } = props;
  const temporalSelection = ['Minute', 'Month', 'is Working hour', 'Hour', 'WeekDay', 'Is Weekend', 'Day', 'Week of Year'];
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 0 }}>
          <Typography variant="h6" gutterBottom component="div">
            Temporal Selection
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                {temporalSelection.map(text => (
                  <TableCell align="center">{text}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {temporalSelection.map(text => (
                  <TableCell align="center">
                    <Checkbox />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
};

const CollapsePastMetr = props => {
  const { open } = props;
  const pastMetrCategories = ['Previous Hour', 'Previous Day', 'Previous Week', 'Previous Month'];
  const pastMetrSelection = ['Actual Load', 'Average Load', 'Min Load', 'Max Load'];
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 0 }}>
          <Typography variant="h6" gutterBottom component="div">
            Past Metrics Selection
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell />
                {pastMetrSelection.map(text => (
                  <TableCell align="center">{text}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pastMetrCategories.map(text => (
                <TableRow>
                  <TableCell align="left">{text}</TableCell>
                  {pastMetrSelection.map(textMetric => (
                    <TableCell align="center">
                      <Checkbox />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
};

const CollapseDerivatives = props => {
  const { open } = props;
  const derivativesSelection = ['Slope', 'Curvature'];
  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ margin: 0 }}>
          <Typography variant="h6" gutterBottom component="div">
            Derivatives Selection
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <TableRow>
                {derivativesSelection.map(text => (
                  <TableCell align="center">{text}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {derivativesSelection.map(textMetric => (
                  <TableCell align="center">
                    <Checkbox />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
};

const Row = props => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <Checkbox />
        </TableCell>
        <TableCell component="th" scope="row">
          {row}
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        {row === 'Temporal' ? (
          <CollapseTemporal open={open} />
        ) : row === 'Past Metrics' ? (
          <CollapsePastMetr open={open} />
        ) : (
          <CollapseDerivatives open={open} />
        )}
      </TableRow>
    </>
  );
};

const rows = ['Temporal', 'Past Metrics', 'Derivatives'];

const OptionalFeaturesTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>Include</TableCell>
            <TableCell>feature Name</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(name => (
            <Row key={name} row={name} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OptionalFeaturesTable;
