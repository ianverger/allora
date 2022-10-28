import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities } from '../../../store/trips';
import './NewTripSearch.css';

const NewTripSearch = ({setCity}) => {
    const dispatch = useDispatch();
    // const [selectedCity, setSelectedCity] = useState('');
    const [matchedCities, setMatchedCities] = useState([]);
    // const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = useSelector(({ trips: { cities } }) => cities);

    useEffect(() => {
        dispatch(fetchCities());
    }, []);

    // const promise = fetch(endpoint)
    //                 .then(blob => blob.json())
    //                 .then(data => cities.push(...data))

    const findMatches = function(wordToMatch, cities) {
        return cities.filter(city => {
            const regex = new RegExp(wordToMatch, 'gi');
            return city.match(regex) 
        })
    }  

    const handleClick = (idx) => {
        // e.preventDefault();
        console.log(idx)
    }

    const displayMatches = function(e) {
        // const matchArray = findMatches(e.target.value, cities);
        const value = e.target.value;
        let matches = [];

        if(value) matches = findMatches(value, cities);
        setMatchedCities(matches);
        // console.log(matchArray);
        // const matches = matchArray.map(match => {
        //     // return match.city
        //         return <button>{`${match.city}`}</button>
        // })
        // .join(' ')
       
      
        // suggestions.innerHTML = matches
        // return matches;
      }

   const handleSubmit = (city) => {
        // e.preventDefault();
        // console.log(city)
        setCity(city);
   }

    const matchedCityList = matchedCities.map((city, idx) => {
        return (
            <li key={idx}>
                <button onClick={() => handleSubmit(city)}>{city}</button>
            </li>
        );
    });
    
    return (
        <div className="search-form">
            <input type="text" className="search" placeholder="Enter City Name..." 
                onChange = {displayMatches}
            />
            <ul className="suggestions">
                {matchedCityList.length > 0 ? matchedCityList : (<li>Filter for a city</li>)}
            </ul>
        </div>
    )
}

export default NewTripSearch;