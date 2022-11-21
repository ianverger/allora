import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import  { fetchTrip, deleteTrip } from '../../store/trips';
import ActivitiesMap from '../Map/Map'
import ItineraryDay from './ItineraryDay';
import './TripShow.css'
import AddActivityModal from '../NewActivity/AddActivityModal'
import { fetchTripActivities } from '../../store/trips';
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);



function TripShow () {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const currentUser = useSelector(state => state.session.user);
  const trip = useSelector(state => state.trips);
  const { _id, city, tripDates, tripTitle} = trip;
  const activities = useSelector(state => state.trips.activity);
  const [dates, setDates] = useState([]);

  // const [centerLat, setCenterLat] = useState(null);
  // const [centerLng, setCenterLng] = useState(null);
  const [highlightedActivity,setHighlightedActivity] = useState(null);
  const [bounds, setBounds] = useState(null);



  
  useEffect(() => {
    dispatch(fetchTrip(tripId));
    // return () => dispatch(clearTweetErrors());
  }, [tripId]);
  

  // const findLatandLng = () => {
  //   Geocode.fromAddress(trip.city).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       setCenterLat(lat);
  //       setCenterLng(lng);
  //     },
  //     (error) => {
  //       console.error(error)
  //     }
  //   );
  // };

  // const handleDeleteClick = () => {
  //   dispatch(deleteTrip(trip._id));
  //   Redirect top
  // }

  


  

  const dateTranslate = (date) => {
    let arr = date.split("-");
    let parseDay = arr.at(2).slice(0,2);
    return arr.at(1) + "/" + parseDay;
  }

  const translatedDates = () => {
    let datesArr = [];

    if (trip) {
      tripDates.forEach( date => {
      datesArr.push(dateTranslate(date));
      })
    }

    setDates(datesArr);
  }

  

  // useEffect(() => {
  //   if (trip) (findLatandLng());
  // },[trip])

  useEffect(() => {
    if (trip)  translatedDates();
  },[trip])
  
  
    // const mapEventHandlers  = useMemo(() => ({
    //       click: event => {
    //             const search = new URLSearchParams(event.latLng.toJSON()).toString();
    //             history.push({ pathname: '/trip/:tripID', search });
    //           },
    //           idle: map => setBounds(map.getBounds().toUrlValue())
    //         }), [history]);


    return (
      <>
      <div className="trip-container">
        <div className='trip-left-container'>
            <div id='trip-image'> <img id='trip-img' src={'https://hippark-photos.s3.amazonaws.com/allora-pics/veliko-karachiviev-hSvagWirWPA-unsplash.jpg'} alt=""></img></div>
            <div id='trip-dates-container'>
                <span>{trip && (dates.at(0))} - {trip && (dates.at(dates.length-1))}</span>
            </div>
            <div id='trip-title-wrapper'>
                <span>{trip && tripTitle}</span>
            </div>
            {/* <div>
                {trip.planner === currentUser?._id && (
                  <button
                    onClick={() => dispatch(deleteTrip(trip._id))}
                    id="delete-trip-button">Delete trip</button>
                )}
            </div> */}

            <div id='itinerary-list-container'>
              <div id='activities-header'><span>Your Itinerary</span></div>
              {trip && dates.map((date,idx) => (
                <ItineraryDay 
                  key={idx}
                  date={date}
                  currentUser={currentUser}
                  activities={activities}
                  highlightedActivity={highlightedActivity}
                  setHighlightedActivity={setHighlightedActivity}
                  tripId={_id}
                />

              ))}
            </div>
        </div>

  
        <div className='trip-right-container'>
            <div id='map-container'>
              {trip &&
                <ActivitiesMap  
                city={city}
                activities={activities}
                // mapEventHandlers={mapEventHandlers}
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