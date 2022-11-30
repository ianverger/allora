import React, {useState, useEffect} from 'react';
import DateCard from './DatesFilterBar';
import ItineraryDay from './ItineraryDay';

function ItineraryBook ({ dates, activities}) {
    const [selectedDate, setSelectedDate] = useState(null);

    

    return (
        <>
        <div id='itinerary-book-section-container'>
            <div id='date-cards-container'>
                {dates && dates.map((date, idx) => (
                    <button key={idx} onClick={(e) => setSelectedDate(date)}>
                    <DateCard
                        date={date}
                        numDay={idx+1}
                        />
                    </button>
                ))}
            </div>
        </div>
        </>
    )
}

export default ItineraryBook;