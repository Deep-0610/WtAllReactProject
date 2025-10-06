import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function DarkModeToggle({ isDarkMode, onToggle }) {
  return (
    <button
      className="dark-mode-toggle"
      onClick={onToggle}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default DarkModeToggle;
