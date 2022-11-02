import React, { useEffect, useRef, useState } from "react";
import './Map.css';
import { Wrapper } from "@googlemaps/react-wrapper";
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

}) {

    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});
    const history = useHistory();
    const [activityCoords, setActivityCoords] = useState([]);
    


const coordinatesHelper = (place, id) => {
    Geocode.fromAddress(place).then(
        (response) => {
            const {lat, lng } = response.results[0].geometry.location;
            let obj = { id: id, lat: lat, lng: lng, title: place }
            setActivityCoords(old => [...old, obj])
        },
        (error) => {
            console.error(error);
        }
    );
};


    useEffect(() => {
        if (activities) {
            activities.forEach((activity) => {
                coordinatesHelper(activity.title, activity._id);
            })
        }
    }, [activities]);



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
        if (map && activityCoords) {
            activityCoords.forEach((activity) => {
                if (markers.current[activity.id]) return;

                const marker = new window.google.maps.Marker({ 
                    map, 
                    position: new window.google.maps.LatLng(activity.lat, activity.lng),
                    label: { 
                        text: `${activity.title}`, 
                        fontWeight: 'bold',
                        color: 'black'
                    }, 
                icon: {
                    url: 'https://hippark-photos.s3.amazonaws.com/allora-logos/allora-icon.png',
                    scaledSize: new window.google.maps.Size(30, 30),
                    anchor: new window.google.maps.Point(1.5,1)
                },
                    // icon: {
                    //         M 1,0 
                    //         L 2,0 
                    //         A 1 1 0 0 1 3,1
                    //         A 1 1 0 0 1 2,2
                    //         L 1,2 
                    //         A 1 1 0 0 1 0,1
                    //         A 1 1 0 0 1 1,0
                    //         z
                    //     `,
                    //     fillOpacity: 1,
                    //     fillColor: 'white',
                    //     strokeColor: 'black',
                    //     strokeWeight: 1,
                    //     scale: 15,
                    //     labelOrigin: new window.google.maps.Point(1.5, 1),
                    //     anchor: new window.google.maps.Point(1.5, 1)
                    // }, 
                });

                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(activity));
                });
                markers.current[activity.place] = marker;
            })
    
            Object.entries(markers.current).forEach(([activityId, marker]) => {
                if (activities.some(activity => activity._id.toString() === activityId)) return;
                
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
