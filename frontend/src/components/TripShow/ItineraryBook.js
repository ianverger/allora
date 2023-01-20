import React, {useState, useEffect} from 'react';
import DateCard from './DatesFilterBar';
import ItineraryDay from './ItineraryDay';

function ItineraryBook ({ comments, dates, activities, tripId, currentUser }) {
    const [selectedDate, setSelectedDate] = useState(null);

    

    return (
        <>
        <div id='itinerary-book-section-container'>
            <div id='date-cards-container'>
                {dates && dates.map((date, idx) => (
                    // <button key={idx} id='card-button' onClick={(e) => setSelectedDate(date)}>
                    <a key={idx} id='card-button' href={`#${date}-it-day`} >
                        <DateCard
                            date={date}
                            numDay={idx+1}
                        />
                    </a>
                    // </button>
                ))}
            </div>

            <div id='itinerary-list-container'>
                {(tripId && activities) && dates.map((date, idx) => (
                    <ItineraryDay
                        key={idx}
                        date={date}
                        numDay={idx + 1}
                        activities={activities}
                        comments={comments}
                        currentUser={currentUser}
                        tripId={tripId}
                    />

                ))}
            </div>
        </div>
        </>
    )
}

export default ItineraryBook;