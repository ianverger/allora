import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../../../store/trips';
import './NewTripSearch.css';

const NewTripSearch = ({page, setPage, formData, setFormData, x, setX, selectedCity, setSelectedCity}) => {
    const dispatch = useDispatch();
    // const [selectedCity, setSelectedCity] = useState('');
    const [matchedCities, setMatchedCities] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const cities = useSelector(({ trips: { cities } }) => cities);

    useEffect(() => {
        dispatch(fetchCities());
    }, []);

    const findMatches = function(wordToMatch, cities) {
        return cities.filter(city => {
            const regex = new RegExp(wordToMatch, 'gi');
            return city[0].match(regex) 
        })
    }  

    const displayMatches = function(e) {
        // const matchArray = findMatches(e.target.value, cities);
        setInputValue(e.target.value);
        const value = e.target.value;
        let matches = [];

        if (value) matches = findMatches(value, cities);
        setMatchedCities(matches.slice(0, 100));
    }

   const handleSubmit = async (city, idx) => {
        // e.preventDefault();
        setSelectedCity(city);
        setMatchedCities([]);
        setInputValue("");
        setFormData({ ...formData, city: city[0], country: city[2]});
   }

    const matchedCityList = matchedCities.map((city, idx) => {
        return (
            <li key={idx}>
                <button id={`${idx}-city`} className="city-cards" onClick={() => handleSubmit(city, idx)}>{`${city[0]}, ${city[1]}, ${city[2]}`}</button>
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
                <div id="selectedcity"><h1>{selectedCity ? `${selectedCity[0]}, ${selectedCity[1]}, ${selectedCity[2]}` : "Where you off to, doll?"}</h1></div>
                <div className="search-form">
                    <input type="text" className="search" placeholder={"Enter City Name..."} 
                        onChange = {displayMatches} value={inputValue}
                    />
                    <ul className="suggestions">
                        {matchedCityList.length > 0 ? matchedCityList : (<li style={{padding: "10px"}}>Filter for a city</li>)}
                    </ul>
                </div>
            </div>
        // </motion.div>
    )
}

export default NewTripSearch;