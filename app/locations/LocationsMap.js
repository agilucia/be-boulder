'use client';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
// import * as L from 'leaflet';
import Link from 'next/link';
import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

export const dynamic = 'force-dynamic';

// const map = L.map('Map');

export default function LocationsMap(props) {
  const position = [47.5162, 14.5501];

  return (
    <MapContainer
      className="card w-96 bg-base-100 shadow-xl my-2 z-0"
      center={position}
      zoom={7}
      scrollWheelZoom={true}
      style={{ height: 350, width: 350 }}
      animate={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright"'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.locations.map((location) => (
        <Marker
          key={`location-${location.id}`}
          position={{ lat: location.lat, lng: location.lng }}
        >
          <Popup>
            <Link href={`/locations/${location.id}`}>{location.name}</Link>
            <br />
            {location.address}
            <br />
            {location.openingHours}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
