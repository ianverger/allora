import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import  { fetchTrip, deleteTrip } from '../../store/trips';
import ActivitiesMap from '../Map/Map'
import ItineraryDay from './ItineraryDay';
import './TripShow.css'
import Geocode from "react-geocode";
import TripInfoHeader from './TripInfoHeader';
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);



function TripShow () {

  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const [loadContent, setLoadContent] = useState(false);

  const activities = useSelector(state => state.trips.activity);

  const trip = useSelector(state => state.trips);
  const { _id, city, tripDates, tripTitle} = trip;
  
  const currentUser = useSelector(state => state.session.user);
  
  const [dates, setDates] = useState([]);

  const [highlightedActivity,setHighlightedActivity] = useState(null);
  const [bounds, setBounds] = useState(null);



  
  useEffect(() => {
    const getTrip = async () => {
      const trip = await dispatch(fetchTrip(tripId))
      .then(setLoadContent(true))
      const data = await trip;
    }
    
    getTrip();
  }, [])


  const translatedDates = () => {
    let datesArr = [];
    
    if (trip) {
        tripDates.forEach( date => {
            datesArr.push(dateTranslate(date));
        })
    }
    
    setDates(datesArr);
  }

  const dateTranslate = (date) => {
    let arr = date.split("-");
    let parseDay = arr.at(2).slice(0,2);
    return arr.at(1) + "/" + parseDay;
  }

  useEffect(() => {
      if (trip)  translatedDates();
  },[trip])
  


  // const handleDeleteClick = () => {
  //   dispatch(deleteTrip(trip._id));
  //   Redirect top
  // }

  
  
    const mapEventHandlers  = useMemo(() => ({
          click: event => {
                const search = new URLSearchParams(event.latLng.toJSON()).toString();
                history.push({ pathname: '/trip/:tripID', search });
              },
              idle: map => setBounds(map.getBounds().toUrlValue())
            }), [history]);


    if (loadContent) return (
      <>
      <div className="trip-container">
        <div className='trip-left-container'>
            <TripInfoHeader 
              city={city}
              dates={dates}
              title={tripTitle}
            />
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