import jwtFetch from './jwt';
import { RECEIVE_USER_LOGOUT } from './session';

const RECEIVE_NEW_TRIP = 'trips/RECEIVE_NEW_TRIP';
const RECEIVE_USER_TRIPS = 'trips/RECEIVE_USER_TRIPS';
const RECEIVE_TRIP_ERRORS = 'trips/RECEIVE_TRIP_ERRORS';
const CLEAR_TRIP_ERRORS = 'trips/CLEAR_TRIP_ERRORS';

const receiveNewTrip = trip => ({
    type: RECEIVE_NEW_TRIP,
    trip
});

const receiveUserTrips = trips => ({
    type: RECEIVE_USER_TRIPS,
    trips
});

const receiveTripErrors = errors => ({
    type: RECEIVE_TRIP_ERRORS,
    errors
});

const clearTripErrors = errors => ({
    type: CLEAR_TRIP_ERRORS,
    errors
});

// export const 

export const fetchUserTrips = userId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/trips/user/${userId}`);
        const trips = await res.json();
        dispatch(receiveUserTrips(trips));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveTripErrors(resBody.errors));
        }
    }
};

export const createTrip = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/trips', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const trip = await res.json();
        dispatch(receiveNewTrip(trip));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveTripErrors(resBody.errors));
        }
    }
};

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

const tripsReducer = (state = { all: {}, new: undefined }, action) => {
    switch(action.type) {
        case RECEIVE_NEW_TRIP:
            let newState = { ...state };
            newState.all[action.trip.id] = action.trip; 
            newState.new = action.trip;
            return newState;
        case RECEIVE_USER_TRIPS:
            return { ...state, all: action.trips, new: undefined };
        default:
            return state;
    }
};

export default tripsReducer;