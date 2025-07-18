import React from "react";
import { FaSun, FaMoon, FaRobot } from "react-icons/fa";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleSideBar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  toggleSideBar,
}) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-content">
        <div className="flex ">
          <button className="sidebar-toggle" onClick={toggleSideBar}>
            <Menu />
          </button>
          <a
            onClick={() => navigate("/home")}
            className="logo hover:cursor-pointer"
          >
            <FaRobot className="logo-icon" />
            <span className="logo-text">TruthGuard</span>
          </a>
        </div>
        <div className="header-actions">
          <div className="theme-switcher">
            <FaSun className={`icon ${!darkMode ? "active" : ""}`} />
            <label className="switch">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
            <FaMoon className={`icon ${darkMode ? "active" : ""}`} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
