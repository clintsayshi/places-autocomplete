import React, { Component } from "react";

export default class SearchC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessAddressData: {
        description: "",
        unitNo: "",
        streetName: "",
        suburb: "",
        city: "",
        province: "",
        postalCode: "",
        proofOfAddress: [],
        companyDetails: null,
        complete: false,
        id: null,
      },
    };
    this.formState = {
      isValid: false,
      values: {},
      touched: {},
      errors: {},
    };
  }

  componentDidUpdate() {}

  handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();
    console.log(description);
    const rl = `https://maps.googleapis.com/maps/api/geocode/json?address=${description}&key=AIzaSyDbdbJqR7UuqQPm9xqO52W_fd9GfDFSpIk`;
    fetch(rl)
      .then((res) => res.json())
      .then((data) => setAddress(data))
      .catch((err) => console.log(err));
  };

  renderSuggestions = () =>
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

  render() {
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
}
