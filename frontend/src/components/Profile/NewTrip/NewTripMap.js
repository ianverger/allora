import { useMemo } from "react";
import { GoogleMap, StandaloneSearchBox, useLoadScript, Marker } from "@react-google-maps/api";
import './NewTripMap.css';

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
    <>
      {/* <StandaloneSearchBox /> */}
    <GoogleMap zoom={7} center={center} mapContainerClassName="map-container" options={{
      streetViewControl: false, mapTypeControl: false, disableDoubleClickZoom: true, fullscreenControl: false
  }}>
    {/* <SearchBox /> */}
      <Marker position={center} />
    </GoogleMap>
    </>
  );
}

