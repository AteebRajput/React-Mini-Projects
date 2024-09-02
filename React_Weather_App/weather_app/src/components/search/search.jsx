// src/components/search/search.jsx

import React, { useContext, useState, useEffect } from "react";
import { CitiesDataContext } from "../../context-api/context";
import "./search.css";

const Search = () => {
  const { lat, lon, setCitiesData } = useContext(CitiesDataContext); // Access lat and lon
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cityName,setCityName] = useState('Karachi')

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  useEffect(() => {
    if (debouncedInput) {
      getApiResponse(debouncedInput);
    }
  }, [debouncedInput]);

  const getApiResponse = async (searchTerm) => {
    setLoading(true);
    setError(null);
    const url = `https://weather-data-api1.p.rapidapi.com/find-location?q=${searchTerm}&limit=5`;
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '8c0ec0146cmsh45ab8811f7e275ap190b91jsnaddc5fa7dccf',
        'x-rapidapi-host': 'weather-data-api1.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.length > 0) {
        setCitiesData(result);
        setCityName(result[0].name)
       
        
        console.log(result.name);
        
      } else {
        setCitiesData([]);
      }
    } catch (error) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setDebouncedInput(input);
    }
  };

  return (
    <div className="container">
      <div className="main-container">
        <div className="search-info">
          <div>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div>
            <label htmlFor="" className="loc-name">
              {cityName}
            </label>
          </div>
        </div>

        <div className="search">
          <div>
            <input
              type="text"
              id="search"
              className="search-txt"
              placeholder="Search cities"
              onChange={onInputChange}
              onKeyDown={handleKeyDown}
              value={input}
            />
          </div>
          <div className="icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
