import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTrip } from '../../../store/trips';
import './NewTripForm.css';
import NewTripTitle from './NewTripTitle';
import NewTripSearch from './NewTripSearch';
import NewTripCalendar from './NewTripCalendar';
import { useHistory } from 'react-router-dom';

function CreateNewTripForm ({userId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [x, setX] = useState(0);
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        tripTitle: "",
        tripDates: [],
        city: "",
        country: "USA"
    })
    // const [tripTitle, setTripTitle] = useState("");
    // const [tripDates, setDates] = useState([]);
    // const [city, setCity] = useState("");
    // const [country, setCountry] = useState("");

    const componentList = [
        <NewTripTitle 
        formData={formData}
        setFormData={setFormData}
        page={page}
        setPage={setPage}
        x={x}
        setX={setX}
        />,
        <NewTripSearch 
        formData={formData}
        setFormData={setFormData}
        page={page}
        setPage={setPage}
        x={x}
        setX={setX}
        />,
        <NewTripCalendar  
        formData={formData}
        setFormData={setFormData}
        page={page}
        setPage={setPage}
        x={x}
        setX={setX}
        />
    ];

    const createTripSubmit = e => {
        e.preventDefault();
       const trip = { ...formData, planner: userId}
       dispatch(createTrip(trip))
        const to = `/profile`;
        history.push(to);
    }

    // console.log(formData.tripDates[0].toString().split(' ').slice(0,4).join(' '))
    return (
       <div id="new-trip-page">
            <h3>New Trip</h3>
            <div className="progress-bar">
                <div style={{width: page === 0? "33%": page === 1? "66%": page === 2? "100%" : "100%"}}></div>
            </div> 
            <div>{componentList[page]}</div>
            <div id="final-roundup" style={{display: "none"}}>
                <h2>You're off!</h2>
                <div id="rup-card">
                    <p>Title: {formData.tripTitle}</p>
                    <p>City: {formData.city}</p>
                    <p>Country: {formData.country}</p>
                    <p>Trip Dates:</p>
                    {(formData.tripDates.length > 0) && <p>{`${formData.tripDates[0].toString().split(' ').slice(0,4).join(' ')} -`}</p>}
                    {(formData.tripDates.length > 0) && <p>{formData.tripDates[formData.tripDates.length - 1].toString().split(' ').slice(0,4).join(' ')}</p>}
                </div>
                <button className="ntp-button" id="final-submit" onClick={createTripSubmit}>Let's Go!</button>
            </div>
        </div>  
    )
}

export default CreateNewTripForm;

// multi-page form tutorial sourced from https://blog.openreplay.com/multi-step-forms-with-transition-effects-in-react/