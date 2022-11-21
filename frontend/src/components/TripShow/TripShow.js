import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import  { fetchTrip, deleteTrip } from '../../store/trips';
import ActivitiesMap from '../Map/Map'
import ItineraryDay from './ItineraryDay';
import './TripShow.css'
import Geocode from "react-geocode";
import TripInfoHeader from './TripInfoHeader';
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);



function TripShow () {

  const dispatch = useDispatch();
  const history = useHistory();
  const { tripId } = useParams();

  //ensuring trip info is loaded before page is loaded
  const [loadContent, setLoadContent] = useState(false);

  //general activities,trip,user info from state
  const activities = useSelector(state => state.trips.activity);
  const trip = useSelector(state => state.trips);
  const { _id, city, tripDates, tripTitle} = trip;
  const currentUser = useSelector(state => state.session.user);
  
  //dateTranslate from state 
  const [dates, setDates] = useState([]);

  //mapElements
  const [mapLoaded, setMapLoaded] = useState(false);
  const [highlightedActivity,setHighlightedActivity] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [centerLat, setCenterLat] = useState(null);
  const [centerLng, setCenterLng] = useState(null);
  const [activityCoords, setActivityCoords] = useState([]);



  //API fetch
  useEffect(() => {
    const getTrip = async () => {
      const trip = await dispatch(fetchTrip(tripId))
      .then(setLoadContent(true))
      const data = await trip;
    }
    
    getTrip();
  }, [])

  //Date Translate for specific date format 
  const translatedDates = () => {
    let datesArr = [];
    
    if (trip) {
        tripDates.forEach( date => {
            datesArr.push(dateTranslate(date));
        })
    }
    
    setDates(datesArr);
  }

  const dateTranslate = (date) => {
    let arr = date.split("-");
    let parseDay = arr.at(2).slice(0,2);
    return arr.at(1) + "/" + parseDay;
  }

  useEffect(() => {
      if (loadContent) translatedDates();
  },[trip]);
  

  //Map Stuff
  const generateActivityCoords = (place, id) => {
    Geocode.fromAddress(place).then(
        (response) => {
            const {lat, lng } = response.results[0].geometry.location;
            let obj = { id: id, lat: lat, lng: lng, title: place }
            setActivityCoords(old => [...old, obj])
        },
        (error) => {
            console.error(error);
        }
    );
  };

  const generateCityLatLng = (city) => {
    Geocode.fromAddress(city).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCenterLat(lat);
        setCenterLng(lng);
      },
      (error) => {
        console.error(error)
      }
    );
  };

  useEffect(() => {
    if (city) {
        generateCityLatLng(city);
    }
  }, [city]);

  useEffect(() => {
    if (activities) {
        activities.forEach((activity) => {
            generateActivityCoords(activity.title, activity._id);
        })
    }
  }, [activities]);

  useEffect(() => {
    if (activities && activityCoords.length > 0) {
      setMapLoaded(true);
    }
  }, [activities]);

  const mapEventHandlers  = useMemo(() => ({
      click: event => {
        const search = new URLSearchParams(event.latLng.toJSON()).toString();
        history.push({ pathname: '/trip/:tripID', search });
        },
        idle: map => setBounds(map.getBounds().toUrlValue())
  }), [history]);


  if (loadContent) return (
    <>
    <div className="trip-container">
      <div className='trip-left-container'>
          <TripInfoHeader 
            dates={dates}
            title={tripTitle}
          />
          <div id='itinerary-list-container'>
            <div id='activities-header'><span>Your Itinerary</span></div>
            {activities && dates.map((date,idx) => (
              <ItineraryDay 
                key={idx}
                date={date}
                currentUser={currentUser}
                activities={activities}
                highlightedActivity={highlightedActivity}
                setHighlightedActivity={setHighlightedActivity}
                tripId={_id}
              />
            ))}
          </div>
      </div>


      <div className='trip-right-container'>
          <div id='map-container'>
            {mapLoaded &&
              <ActivitiesMap  
              centerLat={centerLat}
              centerLng={centerLng}
              activities={activityCoords}
              mapEventHandlers={mapEventHandlers}
              markerEventHandlers={{
                click: (activity) => history.push(`//${activity._id}`),
                mouseover: (activity) => setHighlightedActivity(activity._id),
                mouseout: () => setHighlightedActivity(null)
              }}
              highlightedActivity={highlightedActivity}
            />
            }
          </div>
      </div>

    </div> 
  </>
  );
  
}

export default TripShow;