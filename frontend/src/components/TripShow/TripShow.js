import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import  { fetchTrip } from '../../store/trips';
import ActivitiesMap from '../Map/Map'
import ItineraryDay from './ItineraryDay';
import './TripShow.css'
import AddActivityModal from '../NewActivity/AddActivityModal'
import { fetchTripActivities } from '../../store/activities';
import { findLatandLng } from '../../store/geocode';
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);



function TripShow () {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const trip = useSelector(state => state.trips.trip);
  const activities = useSelector(state => state.activities.all);
  const currentUser = useSelector(state => state.session.user);
  const [dates, setDates] = useState([]);

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
        console.error(error)
      }
    );
  };

  


  

  const dateTranslate = (date) => {
    let arr = date.split("-");
    let parseDay = arr.at(2).slice(0,2);
    return arr.at(1) + "/" + parseDay;
  }

  const translatedDates = () => {
    let datesArr = [];

    trip.tripDates.forEach( date => {
      datesArr.push(dateTranslate(date));
    })

    setDates(datesArr);
  }

  

  useEffect(() => {
    if (trip) (findLatandLng());
  },[trip])

  useEffect(() => {
    if (trip) translatedDates();
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
            <div id='trip-image'> <img id='trip-img' src={'https://hippark-photos.s3.amazonaws.com/allora-pics/veliko-karachiviev-hSvagWirWPA-unsplash.jpg'} alt=""></img></div>
            <div id='trip-dates-container'>
                <span>{trip && (dates.at(0))} - {trip && (dates.at(dates.length-1))}</span>
            </div>
            <div id='trip-title-wrapper'>
                <span>{trip && trip.tripTitle}</span>
            </div>

            <div id='itinerary-list-container'>
              <div id='activities-header'><span>Your Itinerary</span></div>
              {trip && dates.map((date,idx) => (
                <ItineraryDay 
                  key={idx}
                  date={date}
                  activities={activities}
                  highlightedActivity={highlightedActivity}
                  setHighlightedActivity={setHighlightedActivity}
                  tripId={trip._id}
                />

              ))}
            </div> 
      
          
        </div>

  
        <div className='trip-right-container'>
            <div id='map-container'>
              {trip &&
                <ActivitiesMap  
                centerLat={centerLat}
                centerLng={centerLng}
                activities={activities}
                mapEventHandlers={mapEventHandlers}
                markerEventHandlers={{
                  click: (activity) => history.push(`//${activity._id}`),
                  mouseover: (activity) => setHighlightedActivity(activity._id),
                  mouseout: () => setHighlightedActivity(null)
                }}
                highlightedActivity={highlightedActivity}
              />
              }
            </div>
        </div>

      </div> 
    </>
    );
  
}

export default TripShow;