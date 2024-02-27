import React, { useState, ChangeEvent } from "react";

// component for the searchfield
export const SearchField: React.FC<{ handleSearch: (inputValue: string) => void }> = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState<string>("");

  // function for storing the current input value into the inputValue state.
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="searchField">
      <input
        className="inputField"
        type="text"
        placeholder="Enter your search query"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        className="searchButton"
        onClick={() => handleSearch(inputValue)}
      >
        Search
      </button>
    </div>
  );
};
