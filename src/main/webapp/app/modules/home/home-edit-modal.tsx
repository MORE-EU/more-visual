import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
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
import Chip from '@mui/material/Chip';
import grey from '@mui/material/colors/grey';
import red from '@mui/material/colors/red';

const style = {
  position: 'absolute',
  top: '50%',
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
  fontSize: 12,
  borderRadius: 4,
  border: '1px solid rgb(0, 0, 0, 0.2)',
  ':hover': {
    border: '2px solid rgb(95, 158, 160, 1)',
    bgColor: 'rgb(95, 158, 160, 0.2)',
  },
  ml: '10px',
  p: 0,
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const { farmMeta } = useAppSelector(state => state.visualizer);
  const [popper, setPopper] = useState(false);
  const [anchorEl, setAnchorEl] = useState({ input: null, name: null });
  const [formData, setFormData] = useState(null);
  const dispatch = useAppDispatch();

  const handleOnCloseModal = () => {
    dispatch(setOpenHomeModal(false));
  };

  const handleUploadChange = e => {
    // dispatch(setLoadingButton(true));
    // const files = new FormData();
    // for (let i = 0; i < e.target.files.length; i++) {
    //   files.append('files', e.target.files[i]);
    // }
    // files.append('farmName', selectedDir);
    // const data = { farmName: selectedDir, fileData: files };
    // dispatch(uploadFile(data));
    setSelectedFiles([...e.target.files]);
  };

  const handleChipDelete = () => e => {
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
    setFormData(farmMeta);
  }, [farmMeta]);

  return (
    <>
      <Modal
        open={openHomeModal}
        onClose={handleOnCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid xs={12} sx={{ height: '20%' }}>
            <Grid sx={{ display: 'flex', mb: 2, height: '20%' }}>
              <Typography id="modal-modal-title" variant="subtitle1" fontSize={25} sx={{ color: grey[700] }}>
                Add files
              </Typography>
              {!loadingButton ? (
                <Button size="medium" component="label" sx={menuButtonStyle}>
                  <input hidden multiple type="file" accept=".csv" onChange={handleUploadChange} />
                  <FileUploadRoundedIcon fontSize="small" sx={{ color: grey[800] }} />
                </Button>
              ) : (
                <CircularProgressWithLabel value={uploadState} />
              )}
            </Grid>
            <Grid sx={{ d: 'flex', flexDirection: 'row', height: '80%', alignItems: 'center', m: 'auto' }}>
              <Typography id="modal-modal-title" variant="subtitle1" fontSize={20}>
                Selected Files
              </Typography>
              {selectedFiles.length > 0 &&
                selectedFiles.map(file => <Chip label={`${file.name}`} variant="outlined" onDelete={handleChipDelete} />)}
            </Grid>
          </Grid>
          <Grid xs={12} sx={{ height: '80%' }}>
            <Grid sx={{ display: 'flex', alignItems: 'center', height: '10%' }}>
              <Typography variant="subtitle1" fontSize={25} sx={{ color: grey[700], mb: 2, mt: 2 }}>
                Farm Configuration
              </Typography>
              <Typography variant="subtitle1" fontWeight={800} fontSize={15} sx={{ color: grey[700], ml: 1, flex: 1 }}>
                {'(*) required fields'}
              </Typography>
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
