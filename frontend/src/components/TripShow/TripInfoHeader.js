import React from 'react';
import AttendeeIcon from './AttendeesSpotlight';

function TripInfoHeader ({ city, dates, title, attendees }) {
    

    return (
        <>
        <div className='trip-info-container'>
            <div id='trip-image'> 
                <img id='trip-img' src={'https://hippark-photos.s3.amazonaws.com/allora-pics/veliko-karachiviev-hSvagWirWPA-unsplash.jpg'} alt=""></img>
            </div>
            <header id='trip-title-wrapper'>
                <span>{title}</span>
            </header>
            <div id='under-title-wrapper'>
                <span>{dates.length} Days in {city}</span>
            </div>
             <div id='attendees-spotlight-container'>
                {attendees.map((attendee, idx) => (
                    <div id='attendee-icon-each' key={idx}>
                        <AttendeeIcon
                            attendee={attendee}
                        />
                    </div>
                ))}
            </div>
            <div id='trip-dates-container'>
                <span>{dates.at(0)} - {dates.at(dates.length-1)}</span>
            </div>

        </div>
        </>
    )
}

export default TripInfoHeader;