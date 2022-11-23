import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTrip } from '../../../store/trips';
import './NewTripForm.css';
import NewTripTitle from './NewTripTitle';
import NewTripSearch from './NewTripSearch';
import NewTripCalendar from './NewTripCalendar';
import { useHistory } from 'react-router-dom';
import NewTripFriendsSearch from './NewTripFriendsSearch';
import { getCoords } from '../../../util/geocode';


function CreateNewTripForm () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const history = useHistory();
    const [x, setX] = useState(0);
    const [page, setPage] = useState(0);
    const [selectedCity, setSelectedCity] = useState('');
    const [friendsList, setFriendsList] = useState([]);
    const [formData, setFormData] = useState({
        tripTitle: "",
        tripDates: [],
        city: "",
        country: "",
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
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        />,
        <NewTripFriendsSearch
        formData={formData}
        setFormData={setFormData}
        page={page}
        setPage={setPage}
        x={x}
        setX={setX}
        friendsList={friendsList}
        setFriendsList={setFriendsList}
        currentUser={currentUser}
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

    const createTripSubmit = async (e) => {
        e.preventDefault();
        const geoCity = formData.city
        const { lat, lng } = await getCoords(geoCity);
        // const friendIds = formData.tripAttendees.map(friend => friend._id);
        formData.tripAttendees.push(currentUser);
        const trip = { 
            ...formData, 
            // tripAttendees: friendIds,
            latitude: lat,
            longitude: lng,
            planner: currentUser
        }
        dispatch(createTrip(trip))
        const to = `/trips/${trip._id}`;
        history.push(to);
    }

    const attendees = formData.tripAttendees.map((attendee, idx) => <p className="a-u" key={idx}>{`@${attendee.username}`}</p>)
  
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
                    <div className="rup-card-row">
                        <div className="rcr-left"><p>Title:</p></div>
                        <div className="rcr-right"><p>{formData.tripTitle}</p></div>
                    </div>
                    <div className="rup-card-row">
                        <div className="rcr-left"><p>City:</p></div>
                        <div className="rcr-right"><p>{formData.city}</p></div>
                    </div>
                    <div className="rup-card-row">
                        <div className="rcr-left"><p>Country:</p></div>
                        <div className="rcr-right"><p>{formData.country}</p></div>
                    </div>
                    <div className="rup-card-row">
                        <div className="rcr-left"><p>Trip Dates:</p></div>
                        <div className="rcr-right">
                            {(formData.tripDates.length > 0) && <p className="trip-dates">{`${formData.tripDates[0].toString().split(' ').slice(0,4).join(' ')} -`}</p>}
                            {(formData.tripDates.length > 0) && <p>{formData.tripDates[formData.tripDates.length - 1].toString().split(' ').slice(0,4).join(' ')}</p>}
                        </div>
                    </div>
                    <div className="rup-card-row">
                        <div className="rcr-left"><p>Friends:</p></div>
                        <div className="rcr-right">{(formData.tripAttendees.length > 0) && <div id="attendees">{attendees}</div>}</div>
                    </div>
                </div>
                <button className="ntp-button" id="final-submit" onClick={createTripSubmit}>Let's Go!</button>
            </div>
        </div>  
    )
}

export default CreateNewTripForm;

// multi-page form tutorial sourced from https://blog.openreplay.com/multi-step-forms-with-transition-effects-in-react/