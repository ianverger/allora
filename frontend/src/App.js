import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';
// import LoginForm from './components/MainPage/SessionForms/LoginForm';
// import SignupForm from './components/MainPage/SessionForms/SignupForm';
import Profile from './components/Profile/Profile';
import NewTripCalendar from './components/Profile/NewTrip/NewTripCalendar';
import NewTripMap from './components/Profile/NewTrip/NewTripMap';
import NewTripSearch from './components/Profile/NewTrip/NewTripSearch';
// import ActivitiesMapWrapper from './components/Map/Map';
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
      </Switch>
    </>
  );
}

export default App;
