


function AttendeeIcon ({ attendee }) {
    return (
        <>
            <div id='profile-pic-container'>
            <i class='fas fa-user-circle' style='font-size:48px;color:red'></i>
                <div id="username-container">{attendee.username}</div>
            </div>
        </>
    )
}

export default AttendeeIcon;