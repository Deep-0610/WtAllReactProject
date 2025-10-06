import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <FaSearch />
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search tasks"
      />
    </div>
  );
}

export default SearchBar;
