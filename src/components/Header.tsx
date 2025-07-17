import React from "react";
import * as FA from "react-icons/fa";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  return (
    <div className="header">
      <a href="/" className="logo">
        <FA.FaRobot className="fas fa-robot"></FA.FaRobot>
        <h5>Fake News Detector</h5>
      </a>
      <div className="theme-switcher">
        <FA.FaSun className="fas fa-sun"></FA.FaSun>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <span className="slider round"></span>
        </label>
        <FA.FaMoon className="fas fa-moon"></FA.FaMoon>
      </div>
    </div>
  );
};

export default Header;
