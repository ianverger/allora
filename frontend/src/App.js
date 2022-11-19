import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
// import NewTripSearch from './components/Profile/NewTrip/NewTripSearch';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
import Profile from './components/Profile/Profile';
import TripShow from './components/TripShow/TripShow';
import CreateNewTripForm from './components/Profile/NewTrip/NewTripForm';
import MeetTheTeam from './components/MeetTheTeam/MeetTheTeam';

import { getCurrentUser } from './store/session';
import UserSearch from './components/UserSearch/UserSearch';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/" component={MainPage} />
        {/* <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} /> */}
   
        <ProtectedRoute exact path="/search" component={UserSearch} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/newTrip" component={CreateNewTripForm}/>
        <ProtectedRoute exact path="/trips/:tripId" component={TripShow} />
        <ProtectedRoute exact path="/meetTheTeam" component={MeetTheTeam} />
      </Switch>
    </>
  );
}

export default App;
