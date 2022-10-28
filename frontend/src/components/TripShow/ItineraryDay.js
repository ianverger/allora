// import './ItineraryDay.css'
import React from "react";
import { useSelector } from "react-redux";
import ActivityListItem from "./ActivityItem";
import AddActivityModal from "../NewActivity/AddActivityModal";

function ItineraryDay ({date, activities, highlightedActivity, setHighlightedActivity}) {
const dailyActivities = Object.values(activities).filter(activity => activity.tripDates.toString() === date)



    return (
        <>
        <div className="day-container">
            <header id="day-header">
                <span>{date}</span>
            </header>
            <div id="activity-container">
                {dailyActivities && dailyActivities.map((activity, idx) => (
                    <ActivityListItem
                        key={idx}
                        activity={activity}
                        isHighlighted={highlightedActivity === activity._id}
                        setHighlightedActivity={setHighlightedActivity}
                    />
                ))}
            </div>
            <div id='add-activity-button-wrapper'>
                <AddActivityModal/>
            </div>
        </div>
        </>
    )
}

export default ItineraryDay;

