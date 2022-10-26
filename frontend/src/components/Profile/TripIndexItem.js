import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './TripIndexItem.css'

const TripIndexItem = ({trip}) => {
    // const dispatch = useDispatch();
console.log(trip)
    return (
        <div id="trip-card">
            <h3>{trip.tripTitle}</h3>
            <h5>{`${trip.city}, ${trip.country}`}</h5>
        </div>
    )
}

export default TripIndexItem;