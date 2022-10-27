import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTrip } from '../../../store/trips';
import './NewTripForm.css';

function CreateNewTripForm ({userId}) {
    const dispatch = useDispatch();
    const [tripTitle, setTripTitle] = useState("");
    const [startDate, setStartDate] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const createTripSubmit = e => {
        // e.preventDefault();
       const trip = { tripTitle, startDate, endDate, city, country, planner: userId}
       
       dispatch(createTrip(trip))
    }

    return (
        <form onSubmit={createTripSubmit} id="new-trip-form">
        <h3>New Trip</h3>
        <input type="text"  
        value={tripTitle}
        onChange={(e) => setTripTitle(e.target.value)}
        placeholder="Trip Title"
        className="inputs"
        />
        <input type="text"  
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        placeholder="Start Date"
        className="inputs"
        />
        <input type="text"  
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        placeholder="End Date"
        className="inputs"
        />
        <input type="text"  
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        className="inputs"
        />
        <input type="text"  
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Country"
        className="inputs"
        />
        <input type="submit" 
        value="Let's Go!"
        id="create-trip-button"
        />
        </form>

    )
}

export default CreateNewTripForm;