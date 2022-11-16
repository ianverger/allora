import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteActivity, downvoteActivity, upvoteActivity } from '../../store/activities';
import AddActivityModal from '../NewActivity/AddActivityModal';
// import './ActivityItem.css'


function ActivityListItem ({activity, isHighlighted, setHighlightedActivity}) {
const history = useHistory();
const dispatch = useDispatch();

    return (
        <>
        <div 
            className={"activity-list-item-container" + (isHighlighted ? "highlighted" : "")}
            onMouseEnter={()=> setHighlightedActivity(activity._id)}
            onMouseLeave={() => setHighlightedActivity(null)}
        >
            <header id="activity-item-header">
                <div id="small-icon-logo"><img src={'https://hippark-photos.s3.amazonaws.com/allora-logos/allora-icon.png'} alt=""></img></div>
                <span id='act-title'>{activity && activity.title}</span>
            </header>
            <div id='activity-description-wrapper'>
                <span>{activity && activity.description}</span>
            </div>
            <div><button onClick={() => dispatch(deleteActivity(activity._id))}>Delete</button></div>
            <button className="voting-buttons" onClick={() => dispatch(upvoteActivity(activity._id))}>
                <i className="fa-solid fa-thumbs-up"></i>
            </button>
            <p>{activity.votes.length}</p>
            <button className="voting-buttons" onClick={() => dispatch(downvoteActivity(activity._id))}>
                <i className="fa-solid fa-thumbs-down"></i>
            </button>
        </div>
        </>
    )
}

export default ActivityListItem;
