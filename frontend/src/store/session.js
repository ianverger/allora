import jwtFetch from './jwt';
import receiveTripErrors from './trips';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";
const RECEIVE_USER = "session/RECEIVE_USER";

const RECEIVE_USER_TRIPS = 'trips/RECEIVE_USER_TRIPS';


// Dispatch receiveCurrentUser when a user logs in.
const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveUser = user => ({
  type: RECEIVE_USER,
  user
})
  
// Dispatch receiveErrors to show authentication errors on the frontend.
const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

// Dispatch logoutUser to clear the session user when a user logs out.
const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT
});

// Dispatch clearSessionErrors to clear any session errors.
export const clearSessionErrors = () => ({
  type: CLEAR_SESSION_ERRORS
});


const receiveUserTrips = trips => ({
  type: RECEIVE_USER_TRIPS,
  trips
});


export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async dispatch => {
  try {  
    const res = await jwtFetch(route, {
      method: "POST",
      body: JSON.stringify(userInfo)
    });
    const { user, token } = await res.json();
    localStorage.setItem('jwtToken', token);
    return dispatch(receiveCurrentUser(user));
  } catch(err) {
    const res = await err.json();
    if (res.statusCode === 400) {
      return dispatch(receiveErrors(res.errors));
    }
  }
};

export const getCurrentUser = () => async dispatch => {
    const res = await jwtFetch('/api/users/current');
    const user = await res.json();
    return dispatch(receiveCurrentUser(user));
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  dispatch(logoutUser());
};

// export const getUser = userId => async dispatch => {
//   const res = await jwtFetch(`/api/users/selected/${userId}`);
//   const user = await res.json();
//   dispatch(receiveUser(user));
// }


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

const nullErrors = null;

export const sessionErrorsReducer = (state = nullErrors, action) => {
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
    case CLEAR_SESSION_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const initialState = {
    user: undefined
};
  
  const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
      case RECEIVE_CURRENT_USER:
        return { user: action.currentUser };
      case RECEIVE_USER:
        return {selectedUser: action.user};
      case RECEIVE_USER_LOGOUT:
        return initialState;
      
      case RECEIVE_USER_TRIPS:
        state.trip = action.trips;
        return {...state};
      default:
        return state;
    }
};
  
export default sessionReducer;