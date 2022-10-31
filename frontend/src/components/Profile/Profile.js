import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTrips } from '../../store/trips';
import TripIndexItem from './TripIndexItem';
import './Profile.css'

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
        <div id="profile-left">
          <div id="p-l-top">
            <div id="bio">
              <h2>{`@${currentUser.username}'s Profile`}</h2>
              <p>This is my bio!</p>
            </div>
            <NavLink to="/newTrip">
              <button id="new-trip-button"><span>Got the travel bug?</span></button>
            </NavLink>
          </div>
          {tripIndexItems}
        </div>
          <div id="right">
            <img src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-724345765-1579196353.jpg?crop=0.5xw:1xh;center,top&resize=640:*" alt="amalfi" style={{height: "110vh", width: "100%"}}/>
          </div>
      </div>
   
    );
  
}

export default Profile;