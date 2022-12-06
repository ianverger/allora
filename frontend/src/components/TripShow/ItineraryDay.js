// import './ItineraryDay.css'
import React from "react";
import { useSelector } from "react-redux";
import ActivityListItem from "./ActivityItem";
import AddActivityModal from "../NewActivity/AddActivityModal";
import { useEffect } from "react";

    function ItineraryDay ({numDay, date, currentUser, activities, comments, tripId}) {
    const dailyActivities = Object.values(activities).filter(activity => activity.activityDate === date)



        return (
            <>
            <div className="day-container">
                <header id="day-header">
                    <span>Day {numDay} </span>
                    <span>{date}</span>
                </header>
                <div id="activity-container">
                    {dailyActivities && dailyActivities.map((activity, idx) => (
                        <ActivityListItem
                            key={idx}
                            number={idx + 1}
                            currentUser={currentUser}
                            activity={activity}
                            comments={comments}
                            tripId={tripId}
                            activityId={activity._id}
    
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

