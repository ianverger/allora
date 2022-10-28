import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { createActivity } from '../../store/activities';

function AddNewActivity ({tripId, userId}) {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [zipCode, setZipCode] = useState("");

    const handleSubmit = e => {
        const activity = {title, description, startDate, endDate, startTime, endTime, maxGuests, address, city, country, zipCode, trip: tripId, creator: userId}
        dispatch(createActivity(activity));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            />
            <input type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            />
            <input type="text"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="date"
            />
            <input type="text"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="enddate"
            />
            <input type="text"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            placeholder="starttime"
            />
            <input type="text"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            placeholder="endtime"
            />
            <input type="text"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            placeholder="max guests"
            />
            <input type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="address"
            />
            <input type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="city"
            />
            <input type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="country"
            />
            <input type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="zipCode"
            />
        </form>
    )

}

export default AddNewActivity;