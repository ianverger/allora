import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
      <>
        <h2>{currentUser.username}'s Profile</h2>
        <p>profile profile profile profile profile profile profile profile</p>
        {/* {userTweets.map(tweet => (
          <TweetBox
            key={tweet._id}
            text={tweet.text}
          />
        ))} */}
      </>
    );
  
}

export default Profile;