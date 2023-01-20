import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteActivity} from '../../store/activities';
import CommentItem from './CommentItem';
import AddNewComment from './NewCommentForm';
import ActivityMenu from './ActivityMenu';
import LikesSection from './LikesSpotlight';


function ActivityListItem ({comments, number, activity, activityId, tripId, currentUser}) {
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);
    const activityComments = Object.values(comments).filter(comment => comment.activity === activityId)
    
    
    const handleOpenMenu = () => {
        setMenuOpen(!menuOpen);
    }
    
    const handleDeleteClick = () => {
        dispatch(deleteActivity(activity._id));
        setMenuOpen(false);
    }
    

    return (
        <>
        <div className="activity-list-item-container">
            <header id="activity-item-header">
                <div id="activity-number">
                    {/* <span>{number}</span> */}
                    <i class="fa-solid fa-flag"></i>
                </div>
                <div id='act-header'>
                    <span id='act-title'>{activity && activity.title}</span>
                    <div id='act-head-right'>
                        <div id='likes-container'>
                            {activity && 
                                <LikesSection 
                                    likes={activity.likes}
                                    currentUserId={currentUser._id}
                                    activityId={activityId}

                            />}
                        </div>
                        <div id='activity-menu-container'>
                            <ActivityMenu 
                                open={menuOpen}
                                menuButton={
                                    <div id='activity-menu-button' onClick={handleOpenMenu}>
                                        <div id='bar1'></div>
                                        <div id='bar2'></div>
                                        <div id='bar3'></div>
                                    </div>}
                                activityActions={[<button id='delete-act-button' onClick={handleDeleteClick}>Delete Activity</button>]}
                                />
                        </div>
                    </div>
                </div>
            </header>
            <div id='activity-description-wrapper'>
                <span>{activity && activity.description}</span>
            </div>


            <div id='comments-container'>
                {activityComments && activityComments.map((comment,idx) => (
                    <div id='comment-item' key={idx}>
                        <CommentItem
                            publisher={comment.publisher}
                            currentUserId={currentUser._id}
                            text={comment.text}
                            commentId={comment._id}
                            />
                    </div>
                ))}
            </div>

            <div id="add-comment-box">
                <AddNewComment
                    activityId={activity._id}
                    tripId={tripId}
                    userId={currentUser._id}
                />
            </div>
            
    
        </div>
        </>
    )
}

export default ActivityListItem;
