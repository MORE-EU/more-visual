import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import { blue, grey, red } from '@mui/material/colors';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Popper from '@mui/material/Popper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useAppSelector } from '../store/storeConfig';
import UploadFarmModal from './upload-farm-info-modal';

const inputSx = {
  color: grey[700],
  bgcolor: grey[400],
  width: '150px',
  textAlign: 'center',
  height: '38px',
  display: 'inline-grid',
  alignItems: 'center',
  borderRadius: '20px',
};

interface IUploadFarmProps {
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
  nextError: boolean;
}

const UploadFarmInfoTable = (props: IUploadFarmProps) => {
  const { csvSample, files } = useAppSelector(state => state.uploadFarm);
  const { formData, setFormData, nextError } = props;
  const [popper, setPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState({ input: null, name: null });
  const checkCellInfo = number => {
    if (!isNaN(number)) {
      return Number.parseFloat(number).toFixed(2);
    } else {
      return number;
    }
  };

  const handleInputChanges = (fileName: string, property: string) => e => {
    if (fileName !== null && property === 'name') {
      setFormData(prev => ({ ...prev, [fileName]: { ...prev[fileName], [property]: `${e.target.value}.csv` } }));
    } else if (fileName !== null && property === 'hasHeader') {
      setFormData(prev => ({ ...prev, [fileName]: { ...prev[fileName], [property]: !formData[fileName].hasHeader } }));
    } else {
      setFormData(prev =>
        fileName !== null
          ? { ...prev, [fileName]: { ...prev[fileName], [property]: e.target.value } }
          : { ...prev, [property]: e.target.value }
      );
    }
  };

  const latLonValidation = (fileName: string, property: string) => e => {
    const val = e.target.value;
    if ((property === 'latitude' && (val > 90 || val < -90)) || (property === 'longitude' && (val > 180 || val < -180))) {
      setAnchorEl({ input: e.currentTarget, name: property });
      setPopper(true);
    } else {
      popper && setPopper(false);
      handleInputChanges(fileName, property)(e);
    }
  };

  useEffect(() => {
    // Initialize formData for each data file
    const form = files.reduce((prev, file) => {
      return {
        ...prev,
        [file['name']]: {
          id: '',
          name: file['name'],
          formalName: '',
          hasHeader: true,
          timeCol: 0,
          measures: csvSample.meta.fields.map((f, idx) => idx).filter(val => val !== 0),
        },
      };
    }, formData);
    setFormData(form);
  }, []);

  return (
    <>
      {Object.keys(formData).length > 4 && (
        <Grid sx={{ pt: 1, pl: 10, pr: 10, width: '100%', height: "100%" }}>
          <Grid sx={{height: "40%", overflow: "hidden"}}>
            <Grid sx={{height: "20%"}}>
            <Typography variant="subtitle1" fontSize={25} sx={{ color: grey[700], mb: 2 }}>
              File Sample
            </Typography>
            </Grid>
            <Grid sx={{height: "80%"}}>
            <TableContainer
              component={Box}
              sx={{ width: '100%', overflowX: 'hidden', overflowY: 'hidden', height: "99%", m: 'auto', border: '1px solid rgb(0,0,0,0.2)' }}
            >
              <SimpleBar key="simpleBar-table" style={{ height: '100%' }}>
                <Table aria-label="simple table" size="small" stickyHeader>
                  <TableHead>
                    <TableRow key={`table-row-headers`}>
                      {csvSample.meta.fields.map((f, idx) => (
                        <TableCell
                          key={`${f}-${idx}-header-cell`}
                          align={idx === 0 ? 'left' : 'right'}
                          sx={{ backgroundColor: blue[800], color: grey[50] }}
                        >
                          {f}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {csvSample.data.map((row, idx) => (
                      <TableRow key={`row-${idx}`}>
                        {csvSample.meta.fields.map((field, idx) => (
                          <TableCell key={`${field}-${idx}-body-cell`} align={idx === 0 ? 'left' : 'right'} sx={{ bgcolor: grey[50] }}>
                            {checkCellInfo(row[field])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </SimpleBar>
            </TableContainer>
            </Grid>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center', height: "10%" }}>
            <Typography variant="subtitle1" fontSize={25} sx={{ color: grey[700], mb: 2, mt: 2 }}>
              Farm Configuration
            </Typography>
            <Typography variant="subtitle1" fontWeight={800} fontSize={15} sx={{ color: grey[700], ml: 1, flex: 1 }}>
              {'(*) required fields'}
            </Typography>
            {nextError && (
              <Typography variant="subtitle1" fontWeight={800} fontSize={17} sx={{ color: red[600], mr: 2 }}>
                {'Fill the required fields!'}
              </Typography>
            )}
          </Grid>
          {Object.keys(formData).length > 2 && (
            <Grid key={'general-settings-grid'} className="general-settings-form" sx={{ height: "60%", overflow: 'hidden' }}>
              <SimpleBar key="simpleBar-Settings" style={{ height: '100%' }}>
                <Grid sx={{ border: '1px solid rgb(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                  <Grid sx={{ backgroundColor: blue[800] }}>
                    <Typography variant="subtitle1" fontWeight={800} fontSize={20} sx={{ color: grey[200], ml: 3 }}>
                      General Settings
                    </Typography>
                  </Grid>
                  <Grid className="" sx={{ alignItems: 'center', p: 3, backgroundColor: grey[50] }}>
                    <Popper id={'lonlatPopper'} open={popper} anchorEl={anchorEl.input}>
                      <Box sx={{ border: '1px solid rgb(0,0,0,0.5)', p: 1, bgcolor: 'background.paper', color: red[600], fontWeight: 600 }}>
                        {anchorEl.name === 'latitude' ? 'Accepted values between (-90 - 90)' : 'Accepted values between (-180 - 180)'}
                      </Box>
                    </Popper>
                    <Grid sx={{ display: 'flex' }}>
                      <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                        *Farm Name:
                      </Typography>
                      <FormControl variant="standard" sx={{ m: 1, width: '15ch' }} required>
                        <Input
                          id="standard-adornment-weight"
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                          onChange={handleInputChanges(null, 'name')}
                        />
                      </FormControl>
                      <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                        Type:
                      </Typography>
                      <FormControl sx={{ m: 0, ml: 1, width: '20ch' }} size="small">
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={formData.type}
                          onChange={handleInputChanges(null, 'type')}
                        >
                          <MenuItem key={'wind-choice'} value={0}>
                            Wind Farm
                          </MenuItem>
                          <MenuItem key={'solar-choice'} value={1}>
                            Solar Farm
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid sx={{ display: 'flex' }}>
                      <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                        *Latitude:
                      </Typography>
                      <FormControl variant="standard" sx={{ m: 1, width: '15ch' }} required>
                        <Input
                          id="standard-adornment-weight"
                          type="number"
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                          value={formData.latitude}
                          onChange={latLonValidation(null, 'latitude')}
                        />
                      </FormControl>
                      <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                        *Longitude:
                      </Typography>
                      <FormControl variant="standard" sx={{ m: 1, width: '15ch', mr: 4 }} required>
                        <Input
                          id="standard-adornment-weight"
                          type="number"
                          aria-describedby="standard-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                          value={formData.longitude}
                          onChange={latLonValidation(null, 'longitude')}
                        />
                      </FormControl>
                      <UploadFarmModal formData={formData}/>
                    </Grid>
                  </Grid>
                </Grid>
                {files.map((f, idx) => (
                  <Grid sx={{ border: '1px solid rgb(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden', mt: 2 }}>
                    <Grid sx={{ backgroundColor: blue[800] }}>
                      <Typography variant="subtitle1" fontWeight={800} fontSize={20} sx={{ color: grey[200], ml: 3 }}>
                        {f.name}
                      </Typography>
                    </Grid>
                    <Grid sx={{ p: 3, backgroundColor: grey[50] }}>
                      <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                          *ID:
                        </Typography>
                        <FormControl variant="standard" sx={{ m: 1, width: '15ch' }}>
                          <Input
                            id={`standard-adornment-weight-${f.name}`}
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                            }}
                            onChange={handleInputChanges(f.name, 'id')}
                            value={formData[f.name].id}
                          />
                        </FormControl>
                        <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                          *File Name:
                        </Typography>
                        <FormControl variant="standard" sx={{ m: 1, width: '15ch' }}>
                          <Input
                            id="standard-adornment-weight"
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                            }}
                            endAdornment={<InputAdornment position="end">.csv</InputAdornment>}
                            value={formData[f.name].name.substring(0, formData[f.name].name.indexOf('.'))}
                            onChange={handleInputChanges(f.name, 'name')}
                          />
                        </FormControl>
                      </Grid>
                      <Grid sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                          *Formal Name:
                        </Typography>
                        <FormControl variant="standard" sx={{ m: 1, width: '15ch' }}>
                          <Input
                            id="standard-adornment-weight"
                            aria-describedby="standard-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                            }}
                            onChange={handleInputChanges(f.name, 'formalName')}
                            value={formData[f.name].formalName}
                          />
                        </FormControl>
                        <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                          Has Header:
                        </Typography>
                        <Checkbox checked={formData[f.name].hasHeader} onChange={handleInputChanges(f.name, 'hasHeader')} />
                      </Grid>
                      <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                          DateTime Column:
                        </Typography>
                        <FormControl sx={{ m: 1, width: '20ch' }} size="small">
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formData[f.name].timeCol}
                            onChange={handleInputChanges(f.name, 'timeCol')}
                          >
                            {csvSample.meta.fields.map((field, idx) => (
                              <MenuItem key={`${field}-${idx}-${f.name}`} value={idx}>
                                {idx}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </SimpleBar>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default UploadFarmInfoTable;
