import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function NewTripMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXGNAupiWq7UFb78IxEXvouh2lOmdZ_EU",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <Marker position={center} />
    </GoogleMap>
  );
}



// import { useState, useMemo, useEffect } from 'react';
// import { Wrapper, Status } from '@googlemaps/react-wrapper';
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
// import './NewTripMap.css';

// const NewTripMap = () => {
//     const { isLoaded } = useLoadScript({
//       googleMapsApiKey: "AIzaSyCXGNAupiWq7UFb78IxEXvouh2lOmdZ_EU",
//     });
  
//     if (!isLoaded) return <div>Loading...</div>;
//     return <Map />;
// }
  
// function Map() {
// const center = useMemo(() => ({ lat: 44, lng: -80 }), []);

// return (
//     <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
//     <Marker position={center} />
//     </GoogleMap>
// );
// }

// export default NewTripMap;