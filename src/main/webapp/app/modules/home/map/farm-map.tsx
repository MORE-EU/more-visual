import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import L, { LatLng, LatLngTuple } from 'leaflet';
import './map.scss';
import 'leaflet/dist/leaflet.css';
require('react-leaflet-markercluster/dist/styles.min.css');


export interface IFarmMap {
  fly: LatLng;
}

const FlyComponent = (props) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(props.fly, 15, {
      animate: true,
      duration: 2
});
  }, [props.fly]);
  return null;
}

export const FarmMap = (props: IFarmMap) => {
  const {fly} = props;

  const icon = new L.Icon({
    iconUrl: '../../../content/images/leaflet-icons/marker-icon.png',
    shadowUrl: '../../../content/images/leaflet-icons/marker-shadow.png',
    iconSize: [18, 28],
    shadowSize: [18, 28],
});
// useEffect(() => {

//   var coverages = new L.LayerGroup();
//   const map = useMap();
//   group.on("animationend", function() {
//     // Here getting clusters randomly, but you can decide which one you want to show coverage of.
  
//     coverages.clearLayers();
  
//     group._featureGroup.eachLayer(function(layer) {
//       if (layer instanceof L.MarkerCluster && layer.getChildCount() > 2) {
//         //mcg._showCoverage({ layer: layer });
//         coverages.addLayer(L.polygon(layer.getConvexHull()));
  
//       }
//       coverages.addTo(map);
//     });
//   });
  
//   group.fire("animationend");

// }, [group]);


  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} className="farmMap" zoomControl={false}>
        <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright"/>
        <FlyComponent fly={fly}/>
        <MarkerClusterGroup 
        showCoverageOnHover={true}
        >
        <Marker position={[51.505, -0.09]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz1cut"}>Go to bbz1</Link>
      </Popup>
        </Marker>
        <Marker position={[51.505, -0.091]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz2cut"}>Go to bbz2</Link>
      </Popup>
        </Marker>
        <Marker position={[51.505, -0.092]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz3cut"}>Go to bbz3</Link>
      </Popup>
        </Marker>
        </MarkerClusterGroup>
        <MarkerClusterGroup 
        showCoverageOnHover={true}
        >
        <Marker position={[50.488328, 30.658219]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz1cut"}>Go to bbz1</Link>
      </Popup>
        </Marker>
        <Marker position={[50.487694, 30.672040]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz2cut"}>Go to bbz2</Link>
      </Popup>
        </Marker>
        <Marker position={[50.485552, 30.668372]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz3cut"}>Go to bbz3</Link>
      </Popup>
        </Marker>
        </MarkerClusterGroup>
        <MarkerClusterGroup 
        showCoverageOnHover={true}
        >
        <Marker position={[38.052526, 23.813360]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz1cut"}>Go to bbz1</Link>
      </Popup>
        </Marker>
        <Marker position={[38.051156, 23.812977]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz2cut"}>Go to bbz2</Link>
      </Popup>
        </Marker>
        <Marker position={[38.051646, 23.811164]} icon={icon}>
      <Popup >
        <Link to={"/visualize/bbz/bbz3cut"}>Go to bbz3</Link>
      </Popup>
        </Marker>
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};
