import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtFetch from '../../store/jwt';
import './UserSearch.css'

const UserSearch = ({friendsList, setFriendsList}) => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [inputValue, setInputValue] = useState("");

    let userItems;

    const fetchUsers = () => async dispatch => {
        const res = await jwtFetch('/api/users/');
        const data = await res.json();
        // setUsers(data.map(user => user.username));
        setUsers(data)
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const findMatches = function(wordToMatch, users) {
        return users.filter(user => {
            const regex = new RegExp(wordToMatch, 'gi');
            return user.username.match(regex) 
        })
    }  

    const displayMatches = function(e) {
        // const matchArray = findMatches(e.target.value, cities);
        setInputValue(e.target.value);
        const value = e.target.value;
        let matches = [];

        if(value) matches = findMatches(value, users);
        console.log(matches)
        setMatchedUsers(matches);
    }

    const handleSubmit = (user, e) => {
        if (!friendsList.includes(user)) setFriendsList([...friendsList, user]) 
        setMatchedUsers([]);
        setInputValue("");
    }

    const matchedUsersList = matchedUsers.map((user, idx) => {
        return (
            <li key={idx}>
                <button id={`${idx}-user`} className="user-cards" onClick={(e) => handleSubmit(user)}>{user.username}</button>
            </li>
        );
    });

    const friends = friendsList.map(friend => <li className="friend">{`@${friend.username}`}</li>)
   
    return (
        <div id="USD">
            <h1>Friends List</h1>
            <div id="friends-list">
                {friendsList.length > 0 ? friends : "add some friends to the trip!"}
            </div>
            {/* <div id="friends-"></div> */}
            <div className="user-search-form">
                    <input type="text" className="search" placeholder={"Enter a user handle..."} 
                        onChange = {displayMatches} value={inputValue}
                    />
                    <ul className="suggestions">
                        {matchedUsersList.length > 0 ? matchedUsersList : (<li style={{padding: "10px"}}>Filter for a user</li>)}
                    </ul>
            </div>

        </div>
    )
}

export default UserSearch;