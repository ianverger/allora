import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import  { fetchTrip } from '../../store/trips';
import ActivitiesMap from '../Map/Map'
import './TripShow.css'
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';


function TripShow () {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const trip = useSelector(state => state.trips[tripId])

  const {tripTitle, startDate, endDate, city, country } = trip
  

  useEffect(() => {
    dispatch(fetchTrip(tripId));
    // return () => dispatch(clearTweetErrors());
  }, [tripId, dispatch]);

//   const mapEventHandlers = useMemo(() => ({
//     click: event => {
//       const search = new URLSearchParams(event.latLng.toJSON()).toString();
//       history.push({ pathname: '/spots', search });
//     },
//     idle: map => setBounds(map.getBounds().toUrlValue())
//   }), [history]);

  
    return (
      <div className="trip-container">
        <div className='trip-left-container'>
            <div id='trip-image'></div>
            <div id='trip-dates-container'>
                <span>{startDate} - {endDate}</span>
            </div>
            <div id='trip-title-wrapper'>
                <span>{tripTitle}</span>
            </div>

        </div>
        <div className='trip-right-container'>
            <div id='map-container'>
                {/* <ActivitiesMap
                //  activities={activities}
                 mapEventHandlers={mapEventHandlers}
                 markerEventHandlers={{
                   click: (activity) => history.push(`//${spot.id}`),
                   mouseover: (activity) => setHighlightedSpot(spot.id),
                   mouseout: () => setHighlightedSpot(null)
                 }}

                /> */}
            </div>
        </div>

      </div>
    );
  
}

export default TripShow;