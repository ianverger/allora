import jwtFetch from "./jwt";


const ADD_ACTIVITY = 'activities/addActivity';
const ADD_ACTIVITIES = 'activities/addActivities';
const REMOVE_ACTIVITY = 'activities/removeActivity';


const addActivity = activity => ({
    type: ADD_ACTIVITY,
    activity
})
const removeActivity = activity => ({
    type: REMOVE_ACTIVITY,
    activity
})

const addActivities = activities => ({
    type: ADD_ACTIVITIES,
    activities
})

export const getTripActivities = tripId => state => (
    Object.values(state.activities)
    .filter(activity => activity.tripId === tripId)
    .map(activity => ({
        ...activity,
        creator: state.users[activity.creatorId]?.username
    }))
);

export const createActivity = (activity) => async dispatch => {
    try {
        const res = await jwtFetch('/api/activities', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const activity = await res.json();
        dispatch(addActivity(activity));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveActivityErrors(resBody.errors));
        }
    }
}


const nullErrors = null;

export const activityErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
      case RECEIVE_ACTIVITY_ERRORS:
        return action.errors;
      case CLEAR_ACTIVITY_ERRORS:
        return nullErrors;
      default:
        return state;
    }
};



const tripsReducer = (state = { all: {}, new: undefined }, action) => {
    switch(action.type) {
        case ADD_ACTIVITY:
            let newState = { ...state };
            newState.all[action.activity.id] = action.activity; 
            newState.new = action.activity;
            return newState;
        case REMOVE_ACTIVITY:
            return { ...state, all: action.trips, new: undefined };
      
        default:
            return state;
    }
};

export default activitiesReducer;