import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';
import receiveActivityErrors from './activities';

// const RECEIVE_NEW_TRIP = 'trips/RECEIVE_NEW_TRIP';
// const RECEIVE_USER_TRIPS = 'trips/RECEIVE_USER_TRIPS';
const RECEIVE_TRIP_ERRORS = 'trips/RECEIVE_TRIP_ERRORS';
const CLEAR_TRIP_ERRORS = 'trips/CLEAR_TRIP_ERRORS';
const RECEIVE_TRIP = 'trips/RECEIVE_TRIP';
const RECEIVE_CITIES = 'trips/RECEIVE_CITIES';
const REMOVE_TRIP = 'trips/REMOVE_TRIP';

const RECEIVE_TRIP_ACTIVITIES = 'activities/RECEIVE_TRIP_ACTIVITIES';



// const receiveNewTrip = trip => ({
//     type: RECEIVE_NEW_TRIP,
//     trip
// });

const receiveTrip = trip => ({
    type: RECEIVE_TRIP,
    trip
});


// const receiveUserTrips = trips => ({
//     type: RECEIVE_USER_TRIPS,
//     trips
// });

const receiveTripErrors = errors => ({
    type: RECEIVE_TRIP_ERRORS,
    errors
});

const clearTripErrors = errors => ({
    type: CLEAR_TRIP_ERRORS,
    errors
});

const receiveCities = cities => ({
    type: RECEIVE_CITIES,
    cities
});

const removeTrip = tripId => ({
    type: REMOVE_TRIP,
    tripId
});

const receiveTripActivities = activities => ({
    type: RECEIVE_TRIP_ACTIVITIES,
    activities
})



// export const fetchUserTrips = userId => async dispatch => {
//     try {
//         const res = await jwtFetch(`/api/trips/user/${userId}`);
//         const trips = await res.json();
//         dispatch(receiveUserTrips(trips));
//     } catch(err) {
//         const resBody = await err.json();
//         if (resBody.statusCode === 400) {
//           return dispatch(receiveTripErrors(resBody.errors));
//         }
//     }
// };

export const createTrip = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/trips', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const trip = await res.json();
        dispatch(receiveTrip(trip));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveTripErrors(resBody.errors));
        }
    }
};

export const fetchTrip = tripId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/trips/${tripId}`);
        const trip = await res.json();
        console.log(trip, 'here');
        dispatch(receiveTrip(trip));
        dispatch(fetchTripActivities(tripId));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveTripErrors(resBody.errors));
        }
    }

}

export const fetchCities = () => async dispatch => {
    const res = await fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json');
    // const res = await fetch('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
    const data = await res.json();
    const cities = data.map(city => [city.name, city.subcountry, city.country]);

    dispatch(receiveCities(cities));

    return res;
};

export const deleteTrip = (tripId) => async (dispatch) => {
    const res = await jwtFetch(`/api/trips/${tripId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    // dispatch(fetchUserTrips(data.planner));
    return;
};

export const addAttendee = (tripId, userId) => async dispatch => {
    const res = await jwtFetch(`/api/trips/${tripId}/addAttendee/${userId}`, {
        method: 'PUT'
    })
    const trip = await res.json();
    dispatch(receiveTrip(trip))
}

export const removeAttendee = (tripId, userId) => async dispatch => {
    const res = await jwtFetch(`/api/trips/${tripId}/removeAttendee/${userId}`, {
        method: 'PUT'
    })
    const trip = await res.json();
    dispatch(receiveTrip(trip))
}



export const fetchTripActivities = tripId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/activities/trip/${tripId}`);
        const activities = await res.json();
        dispatch(receiveTripActivities(activities));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveActivityErrors(resBody.errors));
        }
    }
}

const nullErrors = null;

export const tripErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
      case RECEIVE_TRIP_ERRORS:
        return action.errors;
      case CLEAR_TRIP_ERRORS:
        return nullErrors;
      default:
        return state;
    }
};


const tripsReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_TRIP:
            return { ...state, ...action.trip };

        case RECEIVE_CITIES:
            return { ...state, cities: action.cities };

        case RECEIVE_TRIP_ACTIVITIES:
            state.activity = action.activities;
            return { ...state };
            // return { ...state, ...action.activities };
        default:
            return state;
    }
};


export default tripsReducer;

