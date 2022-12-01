import React, { useState} from "react";

function AttendeeIcon ({ attendee }) {
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    };


    return (
        <>
            <div 
            id='profile-pic-container'
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            >
                <i id='pro-pic-in-header' className="fas fa-user-circle"></i>
                <div id="username-container">
                    {hover ? `${attendee.username}` : ""}
                </div>
            </div>
        </>
    )
}

export default AttendeeIcon;