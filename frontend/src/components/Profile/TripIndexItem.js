import { useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './TripIndexItem.css'

const TripIndexItem = ({trip}) => {
    // const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = useCallback(() => {
        const to = `/trips/${trip._id}`;
        history.push(to);
    }, [history, trip])

    return (
        <div id="trip-card" onClick={handleClick}>
            <h3>{trip.tripTitle}</h3>
            <h5>{`${trip.city}, ${trip.country}`}</h5>
        </div>
    )
}

export default TripIndexItem;