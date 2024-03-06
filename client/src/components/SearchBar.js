// SearchBar.js
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="box">
      <input
        type="text"
        placeholder="Search by product name"
        onChange={handleChange}
      />
      <button className="invisible__btn" onClick={handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
    </div>
  );
};

export default SearchBar;
