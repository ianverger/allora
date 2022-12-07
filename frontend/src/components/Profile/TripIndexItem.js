import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTrip } from '../../store/trips';
import { getMonth } from '../../util/util';
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
    const planner = trip.tripAttendees.find(attendee => attendee._id === trip.planner)

    return (
        <div id="trip-card" onClick={handleClick}>
            <div id="tc-left">
                <h3>{trip.tripTitle}</h3>
                <h5>{`${trip.city}, ${trip.country}`}</h5>
                <p>{getMonth(trip.tripDates[0])} · {trip.tripDates.length} days</p>
            </div>
            <div id="tc-right">
                {/* <button onClick={() => dispatch(deleteTrip(trip._id))}>Delete</button> */}
                <div id="planner">
                    <i class="fa-solid fa-crown"></i>
                    <p className="trip-card-attendees">@{planner.username}</p>  
                </div>   
                <div id="attnd">
                    <i class="fa-solid fa-user-group"></i>
                    <div>{attendees.length < 3 ? attendees : attendees.slice(0, 3)}</div>
                    {attendees.length < 4 ? "" : <p className="more-attendees">{`+ ${attendees.length - 3}`}</p>}
                </div>
                {/* {attendees.length < 7 ? attendees : attendees.slice(0, 6)} */}
                {/* {attendees.length < 7 ? "" : <p className="trip-card-attendees">{`+ ${attendees.length - 6} more`}</p>} */}
            </div>
        </div>
    )
}

export default TripIndexItem;