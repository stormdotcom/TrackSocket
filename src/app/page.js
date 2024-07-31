"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ReactMapGL, { Marker } from 'react-map-gl';

let socket;

export default function Home() {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
    width: '100vw',
    height: '100vh'
  });
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    socket = io();

    socket.on('locationUpdate', (locationData) => {
      setLocations((prevLocations) => [...prevLocations, locationData]);
    });

    return () => {
      socket.off('locationUpdate');
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {locations.map((location, index) => (
          <Marker key={index} latitude={location.latitude} longitude={location.longitude}>
            <div style={{ color: 'red' }}>📍</div>
          </Marker>
        ))}
      </ReactMapGL>
    </main>
  );
}
