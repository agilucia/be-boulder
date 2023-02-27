// 'use client';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
// import 'leaflet-defaulticon-compatibility';
// import { Marker, Popup } from 'react-leaflet';
// import { MapContainer } from 'react-leaflet/MapContainer';
// import { TileLayer } from 'react-leaflet/TileLayer';
// // import { getLocation } from '../../../database/locations';
// import styles from './page.module.scss';

// export default function Map(props) {
//   // const locations = await getLocation();
//   return (
//     <MapContainer
//       className={styles.map}
//       center={[47.5162, 14.5501]}
//       zoom={7}
//       scrollWheelZoom={true}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright"'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {props.locations.map((location) => (
//         <Marker
//           key={`location-${location.id}`}
//           position={{ lat: location.lat, lng: location.lng }}
//         >
//           <Popup>{location.location.name}</Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }
