import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTrips } from '../../store/trips';
import NewTripModal from './NewTrip/NewTripModal';
import TripIndexItem from './TripIndexItem';
import './Profile.css'
import TripCalendar from './NewTrip/TripCalendar';
// import Calendar from 'react-calendar';
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';


function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTrips = useSelector(state => Object.values(state.trips.all).filter(trip => trip.planner._id === currentUser._id));

  useEffect(() => {
    dispatch(fetchUserTrips(currentUser._id));
    // return () => dispatch(clearTripErrors());
  }, [currentUser]);

  const tripIndexItems = userTrips.map(trip => <TripIndexItem trip={trip}/>)
    return (
      <div id="profile-body">
        <h2>{`${currentUser.username}'s Profile`}</h2>
        <p>This is my bio!</p>
        <p>Got the travel bug?</p>
        <NewTripModal userId={currentUser._id}/>
        {tripIndexItems}
        <TripCalendar />
      </div>
    );
  
}

export default Profile;