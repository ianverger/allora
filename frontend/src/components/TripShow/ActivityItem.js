import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteActivity} from '../../store/activities';
import CommentItem from './CommentItem';
import AddNewComment from './NewCommentForm';
import { fetchActivityComments } from '../../store/comments';
import AddActivityModal from '../NewActivity/AddActivityModal';
import ActivityMenu from './ActivityMenu';
import LikesSection from './LikesSpotlight';
// import './ActivityItem.css'


function ActivityListItem ({number, activity, activityId, currentUser}) {
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.activity === activityId));
    const history = useHistory();
    const dispatch = useDispatch();
    const [loadComments, setLoadComments] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


useEffect(() => {
    const getComments = async () => {
      const comments = await dispatch(fetchActivityComments(activity._id))
      .then(setLoadComments(true))
      const data = await comments;
    }
    
    getComments();
  }, [dispatch, activity])


  const handleOpenMenu = () => {
    setMenuOpen(!menuOpen);
  }

  const handleDeleteClick = () => {
    dispatch(deleteActivity(activity._id));
    setMenuOpen(false);
}


    if (loadComments) return (
        <>
        <div className="activity-list-item-container">
            <header id="activity-item-header">
                <div id="activity-number">
                    <span>{number}</span>
                </div>
                <div id='act-header'>
                    <span id='act-title'>{activity && activity.title}</span>
                    <div id='activity-menu-container'>
                        <ActivityMenu 
                            open={menuOpen}
                            menuButton={
                                <div id='activity-menu-button' onClick={handleOpenMenu}>
                                    <div id='bar1'></div>
                                    <div id='bar2'></div>
                                    <div id='bar3'></div>
                                </div>}
                            activityActions={[<button onClick={handleDeleteClick}>Delete Activity</button>]}
                            />
                    </div>
                </div>
            </header>
            <div id='activity-description-wrapper'>
                <span>{activity && activity.description}</span>
            </div>


            <div id='likes-container'>
                {activity && 
                    <LikesSection 
                        likes={activity.likes}
                        currentUserId={currentUser._id}
                        activityId={activityId}

                />}
            </div>
            <div id='comments-container'>
                {comments && comments.map((comment,idx) => (
                    <div id='comment-item' key={idx}>
                        <CommentItem
                            text={comment.text}
                            publisherName={comment.publisher.username}
                            />
                    </div>
                ))}
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
