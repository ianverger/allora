import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import  { fetchTrip } from '../../store/trips';
import ActivitiesMap from '../Map/Map'
import './TripShow.css'
import AddActivityModal from '../NewActivity/AddActivityModal'
import { fetchTripActivities } from '../../store/activities';
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);


function TripShow () {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const trip = useSelector(state => state.trips.trip);
  const activities = useSelector(state => state.activities.all);
  const currentUser = useSelector(state => state.session.user);

  const [centerLat, setCenterLat] = useState(null);
  const [centerLng, setCenterLng] = useState(null);
  const [highlightedActivity,setHighlightedActivity] = useState(null);
  const [bounds, setBounds] = useState(null);

  
  useEffect(() => {
    dispatch(fetchTrip(tripId));
    dispatch(fetchTripActivities(tripId));
    // return () => dispatch(clearTweetErrors());
  }, [tripId]);
  

  const findLatandLng = () => {
    Geocode.fromAddress(trip.city).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenterLat(lat);
        setCenterLng(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };


  // const {tripTitle, startDate, endDate, city, country, _id } = trip

  useEffect(() => {
    if (trip) findLatandLng();
  },[trip])
  
  
    const mapEventHandlers  = useMemo(() => ({
          click: event => {
                const search = new URLSearchParams(event.latLng.toJSON()).toString();
                history.push({ pathname: '/trip/:tripID', search });
              },
              idle: map => setBounds(map.getBounds().toUrlValue())
            }), [history]);

  
  
   
    return (
      <>
      <div className="trip-container">
        <div className='trip-left-container'>
            <div id='trip-image'> <img src={'https://hippark-photos.s3.amazonaws.com/allora-pics/nicole-herrero-rWWLpxSefp8-unsplash.jpg'} alt=""></img></div>
            <div id='trip-dates-container'>
                <span>{trip && trip.startDate} - {trip && trip.endDate}</span>
            </div>
            <div id='trip-title-wrapper'>
                <span>{trip && trip.tripTitle}</span>

            </div>
            <div>
            <AddActivityModal 
              tripId={trip && trip._id}
              userId={trip && currentUser._id}
              />
            </div>
          
        </div>

  
         

        <div className='trip-right-container'>
            <div id='map-container'>
              {trip &&
                <ActivitiesMap
                centerLat={centerLat}
                centerLng={centerLng}
                city={trip.city}
                activities={activities}
                mapEventHandlers={mapEventHandlers}
                markerEventHandlers={{
                  click: (activity) => history.push(`//${activity._id}`),
                  mouseover: (activity) => setHighlightedActivity(activity._id),
                  mouseout: () => setHighlightedActivity(null)
                }}
              />
}
            </div>
        </div>

      </div> 
    </>
    );
  
}

export default TripShow;