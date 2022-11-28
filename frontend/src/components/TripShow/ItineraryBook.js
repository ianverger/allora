import React, {useState, useEffect} from 'react';
import DateCard from './DatesFilterBar';
import ItineraryDay from './ItineraryDay';

function ItineraryBook ({ dates, activities, currentUser, tripId }) {
    const [selectedDate, setSelectedDate] = useState(null);

    console.log(activities, 'act')
    

    return (
        <>
        <div id='itinerary-book-section-container'>
            <div id='date-cards-container'>
                {dates && dates.map((date, idx) => (
                    <button onClick={(e) => setSelectedDate(date)}>
                    <DateCard
                        key={idx}
                        date={date}
                        numDay={idx+1}
                        />
                    </button>
                ))}
            </div>

            <div id='itinerary-list-container'>
                {activities && dates.map((date, idx) => (
                    <ItineraryDay
                        key={idx}
                        date={date}
                        activities={activities}
                        currentUser={currentUser}
                        // highlightedActivity={highlightedActivity}
                        // setHighlightedActivity={setHighlightedActivity} 
                        // tripId={tripId}
                    />

                ))}
            </div>
        </div>
        </>
    )
}

export default ItineraryBook;