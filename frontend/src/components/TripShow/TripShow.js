import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import  { fetchTrip } from '../../store/trips';
import ActivitiesMap from '../Map/Map'
import './TripShow.css'
import AddActivityModal from '../NewActivity/AddActivityModal'
import { fetchTripActivities, getTripActivities } from '../../store/activities';


function TripShow () {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();
  const trip = useSelector(state => state.trips.trip);
  const activities = useSelector(state => state.activities.all);
  const currentUser = useSelector(state => state.session.user);
  const [highlightedActivity,setHighlightedActivity] = useState(null);
  const [bounds, setBounds] = useState(null);
  // const activities = useSelector(state => Object.values(state.activites))
  // console.log(trip, 'here')
  // const test = trip.trip
  // console.log(test, 'test')
  // console.log(activities, 'here')
  
  useEffect(() => {
    dispatch(fetchTrip(tripId));
    dispatch(fetchTripActivities(tripId));
    // return () => dispatch(clearTweetErrors());
  }, [tripId]);
  
  
  
    const mapEventHandlers  = useMemo(() => ({
          click: event => {
                const search = new URLSearchParams(event.latLng.toJSON()).toString();
                history.push({ pathname: '/trip/:tripID', search });
              },
              idle: map => setBounds(map.getBounds().toUrlValue())
            }), [history]);
      console.log(activities, 'here');
      if (!trip) return <div></div>
      
      const {tripTitle, startDate, endDate, city, country, _id } = trip
   
    return (
      <>
      <div className="trip-container">
        <div className='trip-left-container'>
            <div id='trip-image'> <img src={'https://hippark-photos.s3.amazonaws.com/allora-pics/nicole-herrero-rWWLpxSefp8-unsplash.jpg'} alt=""></img></div>
            <div id='trip-dates-container'>
                <span>{startDate} - {endDate}</span>
            </div>
            <div id='trip-title-wrapper'>
                <span>{tripTitle}</span>

            </div>
            <div>
            <AddActivityModal 
              tripId={_id}
              userId={currentUser._id}
              />
            </div>
          
        </div>

  
         

        <div className='trip-right-container'>
            <div id='map-container'>
                <ActivitiesMap
                activities={activities}
                mapEventHandlers={mapEventHandlers}
                markerEventHandlers={{
                  click: (activity) => history.push(`//${activity._id}`),
                  mouseover: (activity) => setHighlightedActivity(activity._id),
                  mouseout: () => setHighlightedActivity(null)
                }}
              />
            </div>
        </div>

      </div> 
    </>
    );
  
}

export default TripShow;