import jwtFetch from "./jwt";
import { fetchTripActivities } from "./trips";


// const RECEIVE_NEW_ACTIVITY = 'activities/RECEIVE_NEW_ACTIVITY';
// const RECEIVE_TRIP_ACTIVITIES = 'activities/RECEIVE_TRIP_ACTIVITIES';
const RECEIVE_ACTIVITY_ERRORS = 'activities/RECEIVE_ACTIVITY_ERRORS';
const CLEAR_ACTIVITY_ERRORS = 'activities/CLEAR_ACTIVITY_ERRORS';
const RECEIVE_ACTIVITY = 'activities/RECEIVE_ACTIVITY';

// const RECEIVE_ACTIVITY_COMMENTS = 'comments/RECEIVE_ACTIVITY_COMMENTS';

// const receiveNewActivity = activity => ({
//     type: RECEIVE_NEW_ACTIVITY,
//     activity
// })
const receiveActivity = activity => ({
    type: RECEIVE_ACTIVITY,
    activity
})

// const receiveTripActivities = activities => ({
//     type: RECEIVE_TRIP_ACTIVITIES,
//     activities
// })

// const receiveActivityComments = comments => ({
//     type: RECEIVE_ACTIVITY_COMMENTS,
//     comments
// })

const receiveActivityErrors = errors => ({
    type: RECEIVE_ACTIVITY_ERRORS,
    errors
})

const clearActivityErrors = errors => ({
    type: CLEAR_ACTIVITY_ERRORS,
    errors
})

// export const getTripActivities = tripId => state => (
//     Object.values(state.activities)
//     .filter(activity => activity.tripId === tripId)
//     .map(activity => ({
//         ...activity,
//         creator: state.users[activity.creatorId]?.username
//     }))
// );

// export const fetchTripActivities = tripId => async dispatch => {
//     try {
//         const res = await jwtFetch(`/api/activities/trip/${tripId}`);
//         const activities = await res.json();
//         dispatch(receiveTripActivities(activities));
//     } catch(err) {
//         const resBody = await err.json();
//         if (resBody.statusCode === 400) {
//             return dispatch(receiveActivityErrors(resBody.errors));
//         }
//     }
// }


export const createActivity = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/activities', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        const activity = await res.json();
        dispatch(receiveActivity(activity));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveActivityErrors(resBody.errors));
        }
    }
}

export const fetchActivity = activityId => async dispatch => {
    try {
        const res = await jwtFetch(`/api/activities/${activityId}`);
        const activity = await res.json();
        dispatch(receiveActivity(activity));
    } catch(err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveActivityErrors(resBody.errors));
        }
    } 
    
}

export const deleteActivity = (activityId) => async (dispatch) => {
    const res = await jwtFetch(`/api/activities/${activityId}`, {
        method: "DELETE",
    });
    const data = await res.json();
    dispatch(fetchTripActivities(data.trip));
    return;
};

export const likeActivity = activityId => async dispatch => {
    // try {
        const res = await jwtFetch(`/api/activities/${activityId}/like`, {
            method: 'PUT'
        })
        const activity = await res.json();
        dispatch(fetchTripActivities(activity.trip));
        // dispatch(receiveActivity(activity));
        // return;
    // } catch(err) {
    //     const resBody = await err.json();
    //     if (resBody.statusCode === 400) {
    //         return dispatch(receiveActivityErrors(resBody.errors));
    //     }
    // }
}

export const unlikeActivity = activityId => async dispatch => {
    // try {
        const res = await jwtFetch(`/api/activities/${activityId}/unlike`, {
            method: 'PUT'
        })
        const activity = await res.json();
        dispatch(fetchTripActivities(activity.trip));
        // return;
    // } catch(err) {
    //     const resBody = await err.json();
    //     if (resBody.statusCode === 400) {
    //         return dispatch(receiveActivityErrors(resBody.errors));
    //     }
    // }
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


const activitiesReducer = (state = {}, action) => {
    switch(action.type) {
        case RECEIVE_ACTIVITY:
            return { ...state, ...action.activity };
        // case RECEIVE_ACTIVITY_COMMENTS:
        //     return {...state, comments: action.comments};
        default:
            return state;
    }
};

export default activitiesReducer;