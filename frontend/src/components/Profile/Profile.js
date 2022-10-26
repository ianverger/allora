import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateNewTripForm from './NewTrip/NewTripForm';
import NewTripModal from './NewTrip/NewTripModal';
import './Profile.css'
// import { fetchUserTweets, clearTweetErrors } from '../../store/tweets';


function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

//   const userTweets = useSelector(state => Object.values(state.tweets.user))
  
//   useEffect(() => {
    // dispatch(fetchUserTweets(currentUser._id));
    // return () => dispatch(clearTweetErrors());
//   }, [currentUser, dispatch]);

    return (
      <div id="profile-body">
        <h2>{`${currentUser.username}'s Profile`}</h2>
        <p>This is my bio!</p>
        <p>Got the travel bug?</p>
        <NewTripModal userId={currentUser._id}/>
      </div>
    );
  
}

export default Profile;