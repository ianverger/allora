import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
// import LoginForm from './components/MainPage/SessionForms/LoginForm';
// import SignupForm from './components/MainPage/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import TripShow from './components/TripShow/TripShow';

import { getCurrentUser } from './store/session';

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
        <ProtectedRoute exact path="/cal" component={NewTripCalendar} />
        <ProtectedRoute exact path="/map" component={NewTripMap} />
        <ProtectedRoute exact path="/search" component={NewTripSearch} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute exact path="/trips/:tripId" component={TripShow} />
      </Switch>
    </>
  );
}

export default App;
