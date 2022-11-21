import React from 'react';

function TripInfoHeader ({ city, dates, title }) {
    

    return (
        <>
        <div className='trip-info-container'>
        <div id='trip-image'> <img id='trip-img' src={'https://hippark-photos.s3.amazonaws.com/allora-pics/veliko-karachiviev-hSvagWirWPA-unsplash.jpg'} alt=""></img></div>
            <div id='trip-dates-container'>
                <span>{dates.at(0)} - {dates.at(dates.length-1)}</span>
            </div>
            <div id='trip-title-wrapper'>
                <span>{title}</span>
            </div>
        </div>
        </>
    )
}

export default TripInfoHeader;