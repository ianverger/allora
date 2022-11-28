import React from 'react';
import AttendeeIcon from './AttendeesSpotlight';

function TripInfoHeader ({ city, dates, title, attendees }) {
    

    return (
        <>
        <div className='trip-info-container'>
            <div id='trip-image'> 
                <img id='trip-img' src={'https://hippark-photos.s3.amazonaws.com/allora-pics/veliko-karachiviev-hSvagWirWPA-unsplash.jpg'} alt=""></img>
            </div>
            <div id='under-image-container'>
                <header id='trip-title-wrapper'>
                    <span id='trip-title'>{title}</span>
                </header>
                <div id='under-title-wrapper'>
                    <span id='num-days'>{dates.length} </span>
                    <span id='days-in'>Days in </span>
                    <span id='under-title-city'>{city}</span>
                </div>
                <div id='trip-dates-container'>
                    <span>{dates.at(0)} - {dates.at(dates.length-1)}</span>
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
            </div>

        </div>
        </>
    )
}

export default TripInfoHeader;