import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { blue, grey, red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { setLoadingButton, uploadFile } from '../store/fileManagementSlice';
import CircularProgress from '@mui/material/CircularProgress';
import DoneIcon from '@mui/icons-material/Done';
import { setOpenHomeModal } from '../store/homeSlice';
import Grid from '@mui/material/Grid';
import SimpleBar from 'simplebar-react';
import Popper from '@mui/material/Popper';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 10,
  width: 980,
  p: 4,
  height: 800,
  backgroundColor: grey[200],
};

const menuButtonStyle = {
  color: grey[700],
  textTransform: 'none',
  fontSize: 20,
  borderRadius: 20,
  border: '1px solid rgb(0, 0, 0, 0.2)',
  ':hover': {
    border: '2px solid rgb(95, 158, 160, 1)',
    bgColor: 'rgb(95, 158, 160, 0.2)',
  },
  mr: '3px',
  p: 2,
};

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

const CircularProgressWithLabel = props => (
  <Box sx={{ position: 'relative', display: 'inline-flex' }}>
    <CircularProgress variant="determinate" color={props.value === 100 ? 'success' : 'primary'} {...props} />
    <Box
      sx={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {props.value < 100 ? (
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      ) : (
        <DoneIcon />
      )}
    </Box>
  </Box>
);

const HomeEditFarmModal = () => {
  const { loadingButton, uploadState } = useAppSelector(state => state.fileManagement);
  const { selectedDir, openHomeModal } = useAppSelector(state => state.home);
  const { farmMetaFile } = useAppSelector(state => state.visualizer);
  const [popper, setPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState({ input: null, name: null });
  const [formData, setFormData] = useState(null);
  const dispatch = useAppDispatch();

  const handleOnCloseModal = () => {
    dispatch(setOpenHomeModal(false));
  };

  const handleUploadChange = e => {
    dispatch(setLoadingButton(true));
    const files = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      files.append('files', e.target.files[i]);
    }
    files.append('farmName', selectedDir);
    const data = { farmName: selectedDir, fileData: files };
    dispatch(uploadFile(data));
  };

  const handleInputChanges = (fileName: string, property: string) => e => {
    if (fileName) {
      setFormData(prev => ({
        ...prev,
        data: prev.data.reduce((acc, curVal) => {
          if (curVal.id === fileName) {
            return [...acc, { ...curVal, [property]: e.target.value }];
          } else {
            return [...acc, curVal];
          }
        }, []),
      }));
    } else {
      setFormData(prev => ({ ...prev, [property]: e.target.value }));
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
    setFormData(farmMetaFile);
    console.log(farmMetaFile);
  }, [farmMetaFile]);

  return (
    <>
      {console.log(formData)}
      <Modal
        open={openHomeModal}
        onClose={handleOnCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop
      >
        <Box sx={style}>
          <Grid xs={12} sx={{ height: '20%' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add files
            </Typography>
            {!loadingButton ? (
              <Button size="medium" component="label" sx={menuButtonStyle}>
                <input hidden multiple type="file" accept=".csv" onChange={handleUploadChange} />
                <FileUploadRoundedIcon fontSize="large" sx={{ color: grey[800] }} />
                Upload More Files
              </Button>
            ) : (
              <CircularProgressWithLabel value={uploadState} />
            )}
          </Grid>
          <Grid xs={12} sx={{ height: '80%' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', height: '10%' }}>
              <Typography variant="subtitle1" fontSize={25} sx={{ color: grey[700], mb: 2, mt: 2 }}>
                Farm Configuration
              </Typography>
              <Typography variant="subtitle1" fontWeight={800} fontSize={15} sx={{ color: grey[700], ml: 1, flex: 1 }}>
                {'(*) required fields'}
              </Typography>
              {/* {nextError && (
              <Typography variant="subtitle1" fontWeight={800} fontSize={17} sx={{ color: red[600], mr: 2 }}>
                {'Fill the required fields!'}
              </Typography>
            )} */}
            </Grid>
            {formData !== null && (
              <Grid key={'general-settings-grid'} className="general-settings-form" sx={{ height: '90%', overflow: 'hidden' }}>
                <SimpleBar key="simpleBar-Settings" style={{ height: '100%' }}>
                  <Grid sx={{ border: '1px solid rgb(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden' }}>
                    <Grid sx={{ backgroundColor: 'cadetblue' }}>
                      <Typography variant="subtitle1" fontWeight={800} fontSize={20} sx={{ color: grey[200], ml: 3 }}>
                        General Settings
                      </Typography>
                    </Grid>
                    <Grid className="" sx={{ alignItems: 'center', p: 3, backgroundColor: grey[50] }}>
                      <Popper id={'lonlatPopper'} open={popper} anchorEl={anchorEl.input}>
                        <Box
                          sx={{ border: '1px solid rgb(0,0,0,0.5)', p: 1, bgcolor: 'background.paper', color: red[600], fontWeight: 600 }}
                        >
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
                            value={formData.name}
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
                            value={formData.latitude === null ? '' : formData.latitude}
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
                            value={formData.longitude === null ? '' : formData.longitude}
                            onChange={latLonValidation(null, 'longitude')}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                  {formData.data.map((f, idx) => (
                    <Grid sx={{ border: '1px solid rgb(0,0,0,0.2)', borderRadius: 4, overflow: 'hidden', mt: 2 }}>
                      <Grid sx={{ backgroundColor: 'cadetblue' }}>
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
                              onChange={handleInputChanges(f.id, 'id')}
                              value={f.id}
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
                              value={f.name.substring(0, f.name.indexOf('.'))}
                              onChange={handleInputChanges(f.id, 'name')}
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
                              onChange={handleInputChanges(f.id, 'formalName')}
                              value={f.formalName}
                            />
                          </FormControl>
                          <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                            Has Header:
                          </Typography>
                          <Checkbox checked={f.hasHeader} onChange={handleInputChanges(f.id, 'hasHeader')} sx={{ color: 'cadetblue' }} />
                        </Grid>
                        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" fontWeight={800} sx={inputSx}>
                            DateTime Column:
                          </Typography>
                          <FormControl sx={{ m: 1, width: '20ch' }} size="small">
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={f.timeCol}
                              onChange={handleInputChanges(f.id, 'timeCol')}
                            >
                              {f.measures.map((field, idx) => (
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
        </Box>
      </Modal>
    </>
  );
};

export default HomeEditFarmModal;
