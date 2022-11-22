import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTrip } from '../../../store/trips';
import './NewTripForm.css';
import NewTripTitle from './NewTripTitle';
import NewTripSearch from './NewTripSearch';
import NewTripCalendar from './NewTripCalendar';
import { useHistory } from 'react-router-dom';
import NewTripFriendsSearch from './NewTripFriendsSearch';

function CreateNewTripForm () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [x, setX] = useState(0);
    const [page, setPage] = useState(0);
    const [formData, setFormData] = useState({
        tripTitle: "",
        tripDates: [],
        city: "",
        country: "USA",
        tripAttendees: []
    })

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
        <NewTripFriendsSearch
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
        const friendIds = formData.tripAttendees.map(friend => friend._id)
        friendIds.push(currentUser._id)
        const trip = { ...formData, tripAttendees: friendIds, planner: currentUser}
        dispatch(createTrip(trip))
        const to = `/profile`;
        history.push(to);
    }
    // console.log(currentUser._id);
    return (
       <div id="new-trip-page">
            <h3>New Trip</h3>
            <div className="progress-bar">
                <div style={{width: page === 0? "25%": page === 1? "50%": page === 2? "75%": page === 3? "100%" : "100%"}}></div>
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