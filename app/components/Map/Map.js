'use client';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './page.module.scss';

export default function Map() {
  return (
    <MapContainer
      className={styles.map}
      center={[47.5162, 14.5501]}
      zoom={7}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="http://127.0.0.1:8000/tiles/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
