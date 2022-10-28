import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTrip } from '../../../store/trips';
import './NewTripForm.css';
import NewTripSearchModal from './NewTripSearchModal';
import NewTripCalendarModal from './NewTripCalendarModal';
import NewTripTitleModal from './NewTripTitleModal';
import { useHistory } from 'react-router-dom';

function CreateNewTripForm ({userId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [tripTitle, setTripTitle] = useState("");
    const [tripDates, setDates] = useState([]);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const createTripSubmit = e => {
        e.preventDefault();
       const trip = { tripTitle, city, tripDates, country: "USA", planner: userId}
       dispatch(createTrip(trip))
        const to = `/profile`;
        history.push(to);
    }
// console.log(tripTitle)
// console.log(dates)
    return (
       <div id="new-trip-page">
        <h3>New Trip</h3>
        <div id="new-trip-form">
            <div id="ntf-left">
            <NewTripTitleModal tripTitle={tripTitle} setTripTitle={setTripTitle}/>
            <NewTripSearchModal city={city} setCity={setCity}/>
            <NewTripCalendarModal setDates={setDates}/>
            </div>
            <div id="ntf-right">
            {tripTitle && `Trip title: ${tripTitle}`}<br></br>
            {city && `City: ${city}`}<br></br>
            {(tripDates.length > 0) && `Dates: ${tripDates[0]} - ${tripDates[tripDates.length - 1]}`}<br></br>
            </div>
        </div>
            <button onClick={createTripSubmit} id="create-trip-button">Let's Go!</button>
        </div>  
    )
}

export default CreateNewTripForm;