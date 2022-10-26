import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import  { fetchTrip } from '../../store/trips';
import './TripShow.css'
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';


function TripShow () {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  

  useEffect(() => {
    dispatch(fetchTrip(tripId));
    // return () => dispatch(clearTweetErrors());
  }, [tripId, dispatch]);

  
    return (
      <div className="trip">

      </div>
    );
  
}

export default TripShow;