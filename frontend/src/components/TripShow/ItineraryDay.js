// import './ItineraryDay.css'
import React from "react";
import { useSelector } from "react-redux";
import ActivityListItem from "./ActivityItem";
import AddActivityModal from "../NewActivity/AddActivityModal";

function ItineraryDay ({date, currentUser, activities, highlightedActivity, setHighlightedActivity, tripId}) {
const dailyActivities = Object.values(activities).filter(activity => activity.activityDate === date)


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
                        currentUser={currentUser}
                        activity={activity}
                        isHighlighted={highlightedActivity === activity._id}
                        setHighlightedActivity={setHighlightedActivity}
                    />
                ))}
            </div>
            <div id='add-activity-button-wrapper'>
                {tripId && <AddActivityModal
                    tripId={tripId}
                    userId={currentUser._id}
                    currentDate={date}
                />}
            </div>
        </div>
        </>
    )
}

export default ItineraryDay;

