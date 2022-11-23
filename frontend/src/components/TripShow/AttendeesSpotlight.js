
function AttendeeIcon ({ attendee }) {
    return (
        <>
            <div id='profile-pic-container'>
                <i className="fas fa-user-circle"></i>
                <div id="username-container">{attendee.username}</div>
            </div>
        </>
    )
}

export default AttendeeIcon;