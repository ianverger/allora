import React from 'react';
import { useHistory } from 'react-router-dom';
import AddActivityModal from '../NewActivity/AddActivityModal';
// import './ActivityItem.css'


function ActivityListItem ({activity, isHighlighted, setHighlightedActivity}) {
const history = useHistory();

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
        </div>
        </>
    )
}

export default ActivityListItem;

