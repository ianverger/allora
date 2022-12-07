import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserTrips, getUser } from '../../store/session';
import { dateTranslate2 } from '../../util/util';
import "./PersonalPage.css"

function PersonalPage () {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    // const selectedUserId = useParams().userId;
    // const selectedUser = getUser(selectedUserId);
    const userTrips = useSelector(state => state.session.trip);

    useEffect(() => {
        // dispatch(getUser(selectedUserId))
        dispatch(fetchUserTrips(currentUser._id));
    }, [dispatch]);

    let pastTrips = [];
    const today = new Date()
    if (userTrips) pastTrips = userTrips.filter(trip => new Date(trip.tripDates[trip.tripDates.length - 1]) < today)

    let friends = [];
    let uniqueFriends = [];
    if (userTrips) userTrips.map(trip => friends = friends.concat(trip.tripAttendees))
    if (friends) {
        for (let i = 0; i < friends.length; i++) {
            let friend = friends[i];
            const found = uniqueFriends.some(fr => fr._id === friend._id)
            if (!found) uniqueFriends.push(friend);
        }
    }

    // console.log(selectedUserId);
    return (
        <div id="personal_page">
            <h1>@{currentUser.username}</h1>
            <div id="pp-bottom">
                <div id="pp-bl">
                    <h2>Past Trips:</h2>
                    <div id="pp-past-trips">
                        {userTrips && pastTrips.map((trip, idx) => (
                            <NavLink to={`/trips/${trip._id}`} className="pt-link">
                                <div className="past-trips">
                                    <h6>{trip.tripTitle}</h6>
                                    <p id="pt-title">{trip.city}</p>
                                    <p>{dateTranslate2(trip.tripDates[0])} -</p>
                                    <p>{dateTranslate2(trip.tripDates[trip.tripDates.length - 1])}</p>
                                </div>
                            </NavLink>
                        ))} 
                    </div>
                </div>
                <div id="pp-br">
                    <h2>Friends:</h2>
                    <div id="pp-friends">
                        {userTrips && uniqueFriends.map((friend, idx) => (
                            // <NavLink to={`/users/${friend._id}`}>
                                <div className="friends">
                                    {/* <p>{friend._id}</p> */}
                                    <p>@{friend.username}</p>
                                </div>
                            // </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalPage;