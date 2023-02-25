import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';

function LocationAutocompleteBtn() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const locationRef = useRef();
  const handleChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      // Only make API request if input length is > 2
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${value}&limit=5&countrycode=us&key=f92f7062e242431ea1f865252196fffe&pretty=1`
      );
      let filteredResults = response.data.results.filter(
        (result) => result.components.city && result.components.state // Only keep results with both city and state
      );

      if (filteredResults.length === 0 && value.length === 2) {
        // If input is a state code and no cities found, get largest cities in state
        const stateResponse = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${value}&limit=5&countrycode=us&key=f92f7062e242431ea1f865252196fffe&no_annotations=1&pretty=1`
        );
        const citiesInState = stateResponse.data.results[0].components.city;
        if (citiesInState) {
          filteredResults = citiesInState.split(',').map((city) => ({
            formatted: `${city.trim()}, ${value.toUpperCase()}`,
            components: { city: city.trim(), state: value.toUpperCase() },
          }));
        }
      }

      // Keep only city and state
      filteredResults = filteredResults.map((result) => ({
        formatted: `${result.components.city}, ${result.components.state}`,
        components: {
          city: result.components.city,
          state: result.components.state,
        },
      }));

      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.formatted);
    setResults([]);
  };

  return (
    <Form.Group className='mb-3' controlId='location'>
      <Form.Label>Location</Form.Label>
      <Form.Control
        type='text'
        value={searchTerm}
        onChange={handleChange}
        placeholder='Start typing a city...'
        ref={locationRef}
      />

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {results.map((result) => (
          <li
            key={result.formatted}
            onClick={() => handleSuggestionClick(result)}
            style={{ cursor: 'pointer' }}
          >
            {result.formatted}
          </li>
        ))}
      </ul>
    </Form.Group>
    // <div>
    //   <input
    //     type='text'
    //     value={searchTerm}
    //     onChange={handleChange}
    //     placeholder='Enter a city or state'
    //   />
    //   <ul style={{ listStyleType: 'none', padding: 0 }}>
    //     {results.map((result) => (
    //       <li
    //         key={result.formatted}
    //         onClick={() => handleSuggestionClick(result)}
    //         style={{ cursor: 'pointer' }}
    //       >
    //         {result.formatted}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default LocationAutocompleteBtn;
