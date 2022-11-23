import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrip } from '../../store/trips';
import './TripIndexItem.css'

const TripIndexItem = ({trip}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const attendees = 


    const handleClick = useCallback(() => {
        const to = `/trips/${trip._id}`;
        history.push(to);
    }, [history, trip])

    const attendees = trip.tripAttendees.map((attendee, idx) => <p className="trip-card-attendees" key={idx}>{`@${attendee.username}`}</p>)

    return (
        <div id="trip-card" onClick={handleClick}>
            <div id="tc-left">
                <h3>{trip.tripTitle}</h3>
                <h5>{`${trip.city}, ${trip.country}`}</h5>
            </div>
            <div id="tc-right">
                {/* <button onClick={() => dispatch(deleteTrip(trip._id))}>Delete</button> */}
                {attendees.length < 7 ? attendees : attendees.slice(0, 6)}
                {attendees.length < 7 ? "" : <p className="trip-card-attendees">{`+ ${attendees.length - 6} more`}</p>}
            </div>
        </div>
    )
}

export default TripIndexItem;