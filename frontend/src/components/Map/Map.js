import React, { useEffect, useRef, useState } from "react";
import './Map.css';
import { Wrapper } from "@googlemaps/react-wrapper";
import { Loader } from '@googlemaps/js-api-loader';
import { useHistory } from "react-router-dom";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);


function ActivitiesMap({
    centerLat,
    centerLng,
    activities,
    mapOptions = {},
    mapEventHandlers = {},
    markerEventHandlers = {}
    }) 

    {

    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const history = useHistory();

    


    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                    lat: centerLat,
                    lng: centerLng
                }, 
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
        if (activities) {
            activities.forEach((activity) => {
                if (markers.current[activity._id]) return;

                const marker = new window.google.maps.Marker({ 
                    map, 
                    position: new window.google.maps.LatLng(activity.latitude, activity.longitude),
                    label: { 
                        text: `${activity.title}`, 
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '7px'
                    }, 
                icon: {
                    url: 'https://hippark-photos.s3.amazonaws.com/allora-logos/allora-marker-pin.png',
                    scaledSize: new window.google.maps.Size(45,45),
                    // anchor: new window.google.maps.Point(1.5,1),
                    labelOrigin: new window.google.maps.Point(1.5, 1)
                    },
                });

                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(activity));
                });
                markers.current[activity.place] = marker;
            })
    
            Object.entries(markers.current).forEach(([activityId, marker]) => {
                if (activities.some(activity => activity.id.toString() === activity._id)) return;
                
                marker.setMap(null);
                delete markers.current[activityId];
            })
        }
    }, [activities, history, map, markerEventHandlers]);


    return (
        <div ref={mapRef} className="map">
            Map
        </div>
        );
}

function ActivitiesMapWrapper(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
            <ActivitiesMap  {...props} />
        </Wrapper>
    );
};

export default ActivitiesMapWrapper;
