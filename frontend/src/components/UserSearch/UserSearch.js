import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtFetch from '../../store/jwt';
import './UserSearch.css'

const UserSearch = () => {
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const [matchedUsers, setMatchedUsers] = useState([]);
    const [friendsList, setFriendsList] = useState([]);
    const [inputValue, setInputValue] = useState("");

    let userItems;

    const fetchUsers = () => async dispatch => {
        const res = await jwtFetch('/api/users/');
        const data = await res.json();
        // data.map(user => users.push(user))
        setUsers(data.map(user => user.username));
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const findMatches = function(wordToMatch, users) {
        return users.filter(user => {
            console.log(user)
            const regex = new RegExp(wordToMatch, 'gi');
            return user.match(regex) 
        })
    }  

    const displayMatches = function(e) {
        // const matchArray = findMatches(e.target.value, cities);
        setInputValue(e.target.value);
        const value = e.target.value;
        let matches = [];

        if(value) matches = findMatches(value, users);
        setMatchedUsers(matches);
    }

    const handleSubmit = (user, e) => {
        setFriendsList([...friendsList, user])
        setMatchedUsers([]);
        setInputValue("");
    }

    const matchedUsersList = matchedUsers.map((user, idx) => {
        return (
            <li key={idx}>
                <button id={`${idx}-user`} className="user-cards" onClick={(e) => handleSubmit(user)}>{user}</button>
            </li>
        );
    });
   
    console.log(inputValue)
    return (
        <div id="USD">
            <h2>Friends List</h2>
            <ul>{friendsList}</ul>
            <div id="friends-"></div>
            <div className="user-search-form">
                    <input type="text" className="search" placeholder={"Enter a user handle..."} 
                        onChange = {displayMatches} value={inputValue}
                    />
                    <ul className="suggestions">
                        {matchedUsersList.length > 0 ? matchedUsersList : (<li>Filter for a user</li>)}
                    </ul>
            </div>
            {/* {users.map(user => <div>{user}</div>)} */}

        </div>
    )
}

export default UserSearch;