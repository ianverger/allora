import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import './Map.css';

function ActivitiesMap({
    activities,
    mapOptions = {},
    mapEventHandlers = {},
    markerEventHandlers = {}
}) {

    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const history = useHistory();

    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                lat: 40.73644,
                lng: -73.99370
            }, // San Francisco coordinates
            zoom: 13,
            clickableIcons: false,
            ...mapOptions,
          }));
        }
    }, [mapRef, map, mapOptions]);

    useEffect(() => {
        if (map) {
            const listeners = Object.entries(mapEventHandlers).map(([event, handler]) => 
                window.google.maps.event.addListener(
                    map, 
                    event, 
                    (...args) => handler(...args, map)
                )
            );
    
            return () => listeners.forEach(window.google.maps.event.removeListener);
        }
    }, [map, mapEventHandlers]);

    useEffect(() => {
        if (map) {
          activities.forEach((activity) => {
            if (markers.current[activity.id]) return;
      
            const marker = new window.google.maps.Marker({ 
              map, 
              position: new window.google.maps.LatLng(activity.lat, activity.lng), 
              label: { 
                text: `$${activity.title}`, 
                fontWeight: 'bold',
                color: 'black'
              }, 
              icon: {
                path: `
                  M 1,0 
                  L 2,0 
                  A 1 1 0 0 1 3,1
                  A 1 1 0 0 1 2,2
                  L 1,2 
                  A 1 1 0 0 1 0,1
                  A 1 1 0 0 1 1,0
                  z
                `,
                fillOpacity: 1,
                fillColor: 'white',
                strokeColor: 'black',
                strokeWeight: 1,
                scale: 15,
                labelOrigin: new window.google.maps.Point(1.5, 1),
                anchor: new window.google.maps.Point(1.5, 1)
              }, 
            });

            Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                marker.addListener(event, () => handler(activity));
            });
            markers.current[activity.id] = marker;
        })
        
=            Object.entries(markers.current).forEach(([activityId, marker]) => {
              if (activities.some(activity => activity.id.toString() === activityId)) return;
              
              marker.setMap(null);
              delete markers.current[activityId];
            })
          }
    }, [activity, history, map, markerEventHandlers]);




}

function ActivitiesMapWrapper(props) {
    return (
        <Wrapper apiKey={process.env/REACT_APP_MAPS_API_KEY}>
            <ActivitiesMap  {...props} />
        </Wrapper>
    );
};

export default ActivitiesMapWrapper;
