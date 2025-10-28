import React from "react";
import { FaSun, FaMoon, FaRobot } from "react-icons/fa";
import { Menu } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  setIsSideBarOpen: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  setIsSideBarOpen,
}) => {

  return (
    <header className="header">
      <div className="header-content">
        <div className="flex ">
          <button className="sidebar-toggle" onClick={() => setIsSideBarOpen(true)}>
            <Menu />
          </button>
          <Link
            href="/home"
            className="logo hover:cursor-pointer"
          >
            <FaRobot className="logo-icon" />
            <span className="logo-text">TruthGuard</span>
          </Link>
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
