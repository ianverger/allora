import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserTrips } from '../../store/session';
import "./PersonalPage.css"

function PersonalPage () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const userTrips = useSelector(state => state.session.trip);

    useEffect(() => {
      dispatch(fetchUserTrips(currentUser._id));
    }, [dispatch]);

    console.log(userTrips);

    const today = new Date().toLocaleDateString();
    return (
        <>
            <h1>{currentUser.username}</h1>
            <h2>Past Trips:</h2>
            {userTrips && userTrips.map((trip, idx) => (
                <div>
                    <p>{trip.city}</p>
                    <p>{trip.tripDates[trip.tripDates.length - 1]}</p>
                    <p>{today}</p>
                </div>
            ))} 
            <h2>Friends:</h2>
        </>
    )
}

export default PersonalPage;