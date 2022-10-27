import { useState, useEffect } from 'react';
import './NewTripSearch.css';

const NewTripSearch = () => {
    const [city, setCity] = useState();
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
    const cities = [];

    // useEffect(() => {
    //     displayMatches();
    // }, []);

    const promise = fetch(endpoint)
                    .then(blob => blob.json())
                    .then(data => cities.push(...data))

    const findMatches = function(wordToMatch, cities) {
        return cities.filter(place => {
            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) 
        })
    }  

    const handleClick = e => {
        e.preventDefault();
        console.log('werk')
    }

    const displayMatches = function() {
        const matchArray = findMatches(this.value, cities);
        console.log(matchArray);
        const matches = matchArray.map(match => {
                return <button>{`${match.city}`}</button>
        }).join(' ')
       
      
        suggestions.innerHTML = matches
      }

      const searchInput = document.querySelector('.search')
      const suggestions = document.querySelector('.suggestions')
      
      //   if (!searchInput) return <div></div>
      
    //   window.onload = function () {
        searchInput.addEventListener('change', displayMatches)
        searchInput.addEventListener('keyup', displayMatches)
    //   }
      
      
    return (
        <form className="search-form">
            <input type="text" className="search" placeholder="Enter City Name..." />
            <ul className="suggestions">
                <li>Filter for a city</li>
                {displayMatches}
            </ul>
        </form>
    )
}

export default NewTripSearch;