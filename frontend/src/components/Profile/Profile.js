import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTrips } from '../../store/session';
import TripIndexItem from './TripIndexItem';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css'

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const userTrips = useSelector(state => state.session.trip);
  
  useEffect(() => {
    dispatch(fetchUserTrips(currentUser._id));
    // return () => dispatch(clearTripErrors());
  }, [dispatch]);
  
  
  
    return (
      <>
      
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
          {userTrips && userTrips.map((trip, idx) => (
            <TripIndexItem
              key={idx}
              trip={trip}
            />
          ))}
          {/* {tripIndexItems} */}
        </div>
          <div id="right">
          <div className="profile-carousel-unit">
          <Carousel indicators={false} controls={false} fade>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Third slide"
              />
            </Carousel.Item>
          <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/4388167/pexels-photo-4388167.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/5029795/pexels-photo-5029795.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fourth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Sixth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Seventh slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Eighth slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Ninth slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
          </div>
      </div>

      </>
   
    );
  
}

export default Profile;