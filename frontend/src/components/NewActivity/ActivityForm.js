import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { createActivity } from '../../store/activities';
import { getCoords } from '../../util/util';

function AddNewActivity ({tripId, userId, currentDate}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [activityDate, setActivityDate] = useState(`${currentDate}`);
    
  
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { lat, lng } = await getCoords(title);
        const activity = {
            title, 
            description, 
            activityDate,
            latitude: lat,
            longitude: lng,
            trip: tripId, 
            creator: userId
        }
        dispatch(createActivity(activity));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
            value={activityDate}
            onChange={(e) => setActivityDate(e.target.value)}
            placeholder="Date test"
            />
            <input type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Try something like Eiffel Tower..."
            />
            <input type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="How about a little description?"
            />

            <button type='submit' className='add-activity-submit'>Add this activity!</button>
        </form>
    )

}

export default AddNewActivity;