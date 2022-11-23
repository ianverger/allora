import UserSearch from "../../UserSearch/UserSearch";
import { useDispatch } from "react-redux";
import { useState } from "react";

const NewTripFriendsSearch = ({page, setPage, formData, setFormData, x, setX, friendsList, setFriendsList}) => {
    const dispatch = useDispatch();
    // const [friendsList, setFriendsList] = useState([]);
    
    return (
        <div id="new-trip-friend-search">
            <div className="pn-buttons">
                <button className="ntp-button"
                    onClick={() => {
                    setPage(page - 1);
                    setX(-1000);
                    }}>
                    Previous
                </button>
                <button className="ntp-button"
                    onClick={() => {
                    setFormData({ ...formData, tripAttendees: friendsList});
                    setPage(page + 1);
                    setX(1000);
                    }}>
                    Next
                </button>
            </div>
            <UserSearch friendsList={friendsList} setFriendsList={setFriendsList}/>
        </div>
    )
}

export default NewTripFriendsSearch;