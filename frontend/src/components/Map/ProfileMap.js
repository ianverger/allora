import React, { useEffect, useRef, useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";


function ProfileMap({trips}) {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});

    useEffect(() => {
        if (!map) {
            setMap(new window.google.maps.Map(mapRef.current, {
                center: {
                    lat: 42.75277,
                    lng: 33.81443
                },
            zoom: 13,
            clickableIcons: false
            }));
        }
    }, [mapRef, map]);

    useEffect(() => {
        if (trips) {
            trips.forEach((trip) => {
                if (markers.current[trip._id]) return;

                const marker = new window.google.maps.Marker({
                    map,
                    position: new window.google.maps.LatLng(parseFloat(trip.latitude), parseFloat(trip.longitude)),
                    label: {
                        text: `${trip.city}`,
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

            })
        }
    }, [trips, map]);

    return (
        <div ref={mapRef} className='profile-map'>
            Map
        </div>
    )

}

    

function ProfileMapWrapper(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                <ProfileMap {...props} />
        </Wrapper>
    );
};

export default ProfileMapWrapper;