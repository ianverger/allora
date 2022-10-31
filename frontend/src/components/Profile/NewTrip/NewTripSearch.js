import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../../../store/trips';
import { motion } from "framer-motion";
import './NewTripSearch.css';

const NewTripSearch = ({page, setPage, formData, setFormData, x, setX}) => {
    const dispatch = useDispatch();
    const [selectedCity, setSelectedCity] = useState('');
    const [matchedCities, setMatchedCities] = useState([]);
    // const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = useSelector(({ trips: { cities } }) => cities);

    useEffect(() => {
        dispatch(fetchCities());
    }, []);

    const findMatches = function(wordToMatch, cities) {
        return cities.filter(city => {
            const regex = new RegExp(wordToMatch, 'gi');
            return city.match(regex) 
        })
    }  

    const displayMatches = function(e) {
        // const matchArray = findMatches(e.target.value, cities);
        const value = e.target.value;
        let matches = [];

        if(value) matches = findMatches(value, cities);
        setMatchedCities(matches);
    }

   const handleSubmit = (city, idx) => {
        // e.preventDefault();
        setSelectedCity(city);
        // const selectedCity = document.getElementById(`${idx}-city`)
        // selectedCity.style={backgroundColor: "red"}
        setFormData({ ...formData, city: city});
   }

    const matchedCityList = matchedCities.map((city, idx) => {
        return (
            <li key={idx}>
                <button id={`${idx}-city`} className="city-cards" onClick={() => handleSubmit(city, idx)}>{city}</button>
            </li>
        );
    });
    
    return (
        // <motion.div
        // initial={{ x: x }}
        // transition={{ duration: 1 }}
        // animate={{ x: 0 }}
        // className="nt-card"
        // >
            <div id="search-modal">
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
                        setPage(page + 1);
                        setX(1000);
                        }}>
                        Next
                    </button>
                </div>
                <div id="selectedcity"><h1>{selectedCity ? selectedCity : "Where you off to, doll?"}</h1></div>
                <div className="search-form">
                    <input type="text" className="search" placeholder={"Enter City Name..."} 
                        onChange = {displayMatches}
                    />
                    <ul className="suggestions">
                        {matchedCityList.length > 0 ? matchedCityList : (<li>Filter for a city</li>)}
                    </ul>
                </div>
            </div>
        // </motion.div>
    )
}

export default NewTripSearch;