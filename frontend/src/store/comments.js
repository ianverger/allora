import jwtFetch from "./jwt";
import { fetchTripComments } from "./trips";

const RECEIVE_NEW_COMMENT = 'comments/RECEIVE_NEW_COMMENT';
const RECEIVE_ACTIVITY_COMMENTS = 'comments/RECEIVE_ACTIVITY_COMMENTS';
const RECEIVE_COMMENT_ERRORS = 'comments/RECEIVE_COMMENT_ERRORS';
const CLEAR_COMMENT_ERRORS = 'comments/CLEAR_COMMENT_ERRORS';


const receiveNewComment = comment => ({
    type: RECEIVE_NEW_COMMENT,
    comment
})


const receiveCommentErrors = errors => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors
})

const clearCommentErrors = errors => ({
    type: CLEAR_COMMENT_ERRORS,
    errors
})





export const createComment = data => async dispatch => {
    try {
        const res = await jwtFetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(data)
        });
        
        const comment = await res.json();
        dispatch(fetchTripComments(comment.trip));
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            return dispatch(receiveCommentErrors(resBody.errors));
        }
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    const res = await jwtFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    const data = await res.json();
    // dispatch(fetchActivityComments(data.activity));
    return;
}

const nullErrors = null;

export const commentErrorsReducer = (state = nullErrors, action) => {
    switch(action.type) {
      case RECEIVE_COMMENT_ERRORS:
        return action.errors;
      case CLEAR_COMMENT_ERRORS:
        return nullErrors;
      default:
        return state;
    }
};



const commentsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_NEW_COMMENT:
           return { ...state, ...action.comment };
        // case RECEIVE_ACTIVITY_COMMENTS:
        //     return {...state, ...action.comments};
        default:
            return state;

    }
}

export default commentsReducer;