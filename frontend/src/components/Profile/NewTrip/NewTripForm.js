import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTrip } from '../../../store/trips';
import './NewTripForm.css';
import NewTripSearchModal from './NewTripSearchModal';
import NewTripCalendarModal from './NewTripCalendarModal';
import NewTripTitleModal from './NewTripTitleModal';

function CreateNewTripForm ({userId}) {
    const dispatch = useDispatch();
    const [tripTitle, setTripTitle] = useState("");
    const [tripDates, setDates] = useState([]);
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const createTripSubmit = e => {
        e.preventDefault();
       const trip = { tripTitle, city, tripDates, country: "USA", planner: userId}
       
       dispatch(createTrip(trip))
    }
// console.log(tripTitle)
// console.log(dates)
    return (
        <>
        <h3>New Trip</h3>

        <NewTripTitleModal tripTitle={tripTitle} setTripTitle={setTripTitle}/>
        <NewTripSearchModal city={city} setCity={setCity}/>
        <NewTripCalendarModal setDates={setDates}/>
        <br></br>
        {tripTitle && `${tripTitle}`}<br></br>
        {city && `${city}`}<br></br>
        {tripDates && `${tripDates}`}<br></br>
        <button onClick={createTripSubmit} id="create-trip-button">Let's Go!</button>
        </>

    )
}

export default CreateNewTripForm;