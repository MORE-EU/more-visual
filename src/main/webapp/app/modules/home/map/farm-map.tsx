import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap, useMapEvents, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { Link, Redirect, useHistory } from 'react-router-dom';
import L, {LatLng} from 'leaflet';
import * as L1 from 'leaflet.markercluster';
import './map.scss';
import 'leaflet/dist/leaflet.css';
import { Paper, Typography } from '@mui/material';
require('react-leaflet-markercluster/dist/styles.min.css');

export interface IFarmMap {
  fly: LatLng;
  setBounds?: Dispatch<SetStateAction<{}>>;
  items: any[];
  selected: any[];
}

const FlyComponent = props => {
  const map = useMap();
  map.attributionControl.remove();
  useMapEvents({
    moveend() {
      props.setBounds(map.getBounds());
    },
  });
  useEffect(() => {
    map.flyTo(props.fly, 6, {
      animate: true,
      duration: 2,
    });
  }, [props.fly]);
  return null;
};

export const FarmMap = (props: IFarmMap) => {
  const { fly, items, selected } = props;

  const icon = new L.Icon({
    iconUrl: '../../../content/images/leaflet-icons/marker-icon.png',
    shadowUrl: '../../../content/images/leaflet-icons/marker-shadow.png',
    iconSize: [18, 28],
    shadowSize: [18, 28],
  });

  // const history = useHistory();

  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} className="farmMap" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />
        <FlyComponent fly={fly} setBounds={props.setBounds} />
        {items.map((item, itemIdx) => 
          (
          <MarkerClusterGroup showCoverageOnHover={true} key={itemIdx}>
          {item.farmInfo.map((info, locIdx) => {
            const rand = Math.floor((Math.random() * 3) + 1);
            let count = 0;
            let count1 = [];
            selected.map(sele => {!count1.includes(sele[0]) && count1.push(sele[0])});
            let rendItem = true;
            if(selected.length > 0){
            for (const [key, value] of Object.entries(info)) {
              selected.map(sel => {
                if(sel[0] === key && sel[1] === value){
                  count++;
                }
              })
              }
            count === count1.length ? rendItem = true : rendItem = false;
          }
            return(
            rendItem === true && (
            <Marker
            position={[info.lat, info.lng]}
            icon={icon}
            key={locIdx}
            // eventHandlers={{
            //   click() {
            //     history.push(`/visualize/bbz/bbz${rand}cut`);
            //   },
            // }}
          >
            {/* <Tooltip direction="top"> */}
              <Popup>
              <Paper elevation={0} sx={{textAlign: "center"}}>
              <Link to={`/visualize/bbz/bbz${rand}cut`}>
              <Typography variant="overline" sx={{textDecoration: "none"}}>Detailed View
              </Typography>
              </Link> <br/>
              </Paper>
              <Typography variant="subtitle2">
              city: {info.city} <br/>
              country: {info.country} <br/>
              manufacturer: {info.name} <br/>
              turbine: {info.turbine} <br/>
              owner: {info.owner}
              </Typography>
              
              </Popup>
            {/* </Tooltip> */}
          </Marker>)
          )})}
          </MarkerClusterGroup>))}
      </MapContainer>
    </div>
  );
};
