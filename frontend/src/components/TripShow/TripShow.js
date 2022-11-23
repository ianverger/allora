import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import  { fetchTrip, deleteTrip } from '../../store/trips';
import { dateTranslate } from '../../util/util';
import ItineraryDay from './ItineraryDay';
import './TripShow.css'
import TripInfoHeader from './TripInfoHeader';
import TripMap from './TripMap';
import ActivitiesMap from '../Map/Map';



function TripShow () {

  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();

  //ensuring trip info is loaded before page is loaded
  const [loadContent, setLoadContent] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  //general activities,trip,user info from state
  const activities = useSelector(state => state.trips.activity);
  const trip = useSelector(state => state.trips);
  const { _id, city, tripDates, tripTitle, latitude, longitude } = trip;
  const currentUser = useSelector(state => state.session.user);

 
  //dateTranslate from state 
  const [dates, setDates] = useState([]);


  //API fetch
  useEffect(() => {
    const getTrip = async () => {
      const trip = await dispatch(fetchTrip(tripId))
      .then(setLoadContent(true))
      const data = await trip;
    }
    
    getTrip();
  }, [dispatch, tripId])



  useEffect(() => {
    const translatedDates = () => {
      let datesArr = [];

      if (trip) {
        tripDates.forEach ((date) => {
          datesArr.push(dateTranslate(date));
        })
      }

      setDates(datesArr);
    }

    translatedDates();
      
  },[trip]);

  console.log(latitude, longitude, 'here')


  if (loadContent) return (
    <>
    <div className="trip-container">
      <div className='trip-left-container'>
          {trip && <TripInfoHeader 
            dates={dates}
            title={tripTitle}
          />}
          <div id='itinerary-list-container'>
            <div id='activities-header'><span>Your Itinerary</span></div>
            {activities && dates.map((date,idx) => (
              <ItineraryDay 
                key={idx}
                date={date}
                currentUser={currentUser}
                activities={activities}
                // highlightedActivity={highlightedActivity}
                // setHighlightedActivity={setHighlightedActivity}
                tripId={_id}
              />
            ))}
          </div>
      </div>

      <div className='trip-right-container'>
          <div id='map-container'>
            {trip && 
              <ActivitiesMap  
                centerLat={latitude}
                centerLng={longitude}
                activities={activities}
                // mapEventHandlers={mapEventHandlers}
                markerEventHandlers={{
                    click: (activity) => history.push(`//${activity._id}`),
                    // mouseover: (activity) => setHighlightedActivity(activity._id),
                    // mouseout: () => setHighlightedActivity(null)
                }}
                // highlightedActivity={highlightedActivity}
            />}
          </div>
      </div>

    </div> 
  </>
  );
  
}

export default TripShow;