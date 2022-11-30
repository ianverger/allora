import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteActivity, likeActivity, unlikeActivity } from '../../store/activities';
import CommentItem from './CommentItem';
import AddNewComment from './NewCommentForm';
import { fetchActivityComments } from '../../store/activities';
import AddActivityModal from '../NewActivity/AddActivityModal';
// import './ActivityItem.css'


function ActivityListItem ({activity, currentUser}) {
// const comments = Object.values(comments).filter(comment => comment.activity === activity._id);
const history = useHistory();
const dispatch = useDispatch();
const [loadComments, setLoadComments] = useState(false);


// useEffect(() => {
//     const getComments = async () => {
//       const comments = await dispatch(fetchActivityComments(activity._id))
//       .then(setLoadComments(true))
//       const data = await comments;
//     }
    
//     getComments();
//   }, [dispatch, activity])

    return (
        <>
        <div className="activity-list-item-container">
            <header id="activity-item-header">
                <div id="small-icon-logo"><img src={'https://hippark-photos.s3.amazonaws.com/allora-logos/allora-icon.png'} alt=""></img></div>
                <span id='act-title'>{activity && activity.title}</span>
            </header>
            <div id='activity-description-wrapper'>
                <span>{activity && activity.description}</span>
            </div>
            {activity.likes.includes(currentUser._id)
            ?
            <button className="voting-buttons" onClick={() => dispatch(likeActivity(activity._id))}>
                <i className="fa-solid fa-thumbs-down"></i>
            </button>
            :
            <button className="voting-buttons" onClick={() => dispatch(unlikeActivity(activity._id))}>
                <i className="fa-solid fa-thumbs-up"></i>
            </button>
            }
            <div><button onClick={() => dispatch(deleteActivity(activity._id))}>Delete</button></div>
            <p>{activity.likes.length}</p>
            <div id='comments-container'>
                {/* {comments && comments.map((comment,idx) => (
                    <CommentItem
                        key={idx}
                        currentUser={currentUser}
                        comment={comment}
                    />
                ))} */}
            </div>

            <div id="add-comment-box">
                <AddNewComment
                    activityId={activity._id}
                    userId={currentUser._id}
                />
            </div>
            
    
        </div>
        </>
    )
}

export default ActivityListItem;
