import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTrips } from '../../store/trips';
import NewTripModal from './NewTrip/NewTripModal';
import './Profile.css'
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';


function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTrips = useSelector(state => Object.values(state.trips.all).filter(trip => trip.planner._id === currentUser._id));

  useEffect(() => {
    dispatch(fetchUserTrips(currentUser._id));
    // return () => dispatch(clearTweetErrors());
  }, [currentUser]);

  const tripsIndex = userTrips.map(trip => <p>{trip.city}</p>)
    return (
      <div id="profile-body">
        <h2>{`${currentUser.username}'s Profile`}</h2>
        <p>This is my bio!</p>
        <p>Got the travel bug?</p>
        <NewTripModal userId={currentUser._id}/>
        {tripsIndex}
      </div>
    );
  
}

export default Profile;