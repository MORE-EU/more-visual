import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import { icon } from '../home/home-map';

interface IUpFarmModal {
  formData: any;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

const MapSettings = props => {
    const map = useMap();
    map.attributionControl.remove();
    return null;
  };

const UploadFarmModal = (props: IUpFarmModal) => {
  const { formData } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button
        variant="outlined"
        disabled={formData.latitude.length === 0 || formData.longitude.length === 0}
        sx={{ textTransform: 'none', borderRadius: '20px', color: grey[700], border: `1px solid ${grey[400]}` }}
        onClick={handleClick}
      >
        Show on Map
      </Button>
      <Modal open={open} onClose={handleClick} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <MapContainer center={[formData.latitude, formData.longitude]} zoom={8} className="showOnMap" style={{height: 600, width: 600}} zoomControl={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapSettings />
            <Marker position={[formData.latitude, formData.longitude]} icon={icon} key={'showOnMap'} />
          </MapContainer>
        </Box>
      </Modal>
    </>
  );
};

export default UploadFarmModal;
