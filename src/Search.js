import React, { useState, useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";

export default function Search({ setAddress }) {
  //const [address, setAddress] = useState({});

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();
    console.log(description);
    const rl = `https://maps.googleapis.com/maps/api/geocode/json?address=${description}&key=AIzaSyDbdbJqR7UuqQPm9xqO52W_fd9GfDFSpIk`;
    fetch(rl)
      .then((res) => res.json())
      .then((data) => {
        setAddress(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
}
