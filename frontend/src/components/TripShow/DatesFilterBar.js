import React, { useState } from 'react';

function DateCard ({date, numDay}) {

    
    return (
        <>
            <div
                className="date-card-container"
            >

                <header id='num-day-wrapper'>
                    <span>DAY {numDay}</span>
                </header>
                <div id='actual-date-wrapper'>{date}</div>
             
            </div>
        </>
    )
}

export default DateCard;