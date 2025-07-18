import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import * as FA from "react-icons/fa";
import { User, LogOut, Edit3, SidebarCloseIcon } from "lucide-react";

interface SideBarProps {
  isVisible: boolean;
  toggleSideBar: (value: boolean) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ isVisible, toggleSideBar }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEditProfile = () => {
    alert("Edit profile functionality is not yet implemented.");
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-80" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => toggleSideBar(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 md:w-90 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col justify-center gap-5 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <SidebarCloseIcon
          size={30}
          onClick={() => toggleSideBar(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-600/50 transition-colors duration-200 text-slate-300 hover:text-white"
        />

        {/* User Profile Section */}
        <div className="border-slate-700/50">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <User size={32} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900"></div>
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">
              Welcome back!
            </h3>
            <p className="text-slate-300 text-sm truncate w-full px-2">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-1.5 h-[60%] px-3">
          {/*Edit Profile */}
          <button
            onClick={handleEditProfile}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group"
          >
            <Edit3
              size={18}
              className="text-slate-400 group-hover:text-blue-400 transition-colors"
            />
            <span className="font-medium">Edit Profile</span>
          </button>

          {/* Settings */}
          {/* <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group">
            <Settings
              size={18}
              className="text-slate-400 group-hover:text-blue-400 transition-colors"
            />
            <span className="font-medium">Settings</span>
          </button> */}

          {/* <div className="border-t border-slate-700/50 my-4"></div> */}

          {/* Help and Support */}
          <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group">
            <FA.FaQuestionCircle
              size={18}
              className="text-slate-400 group-hover:text-blue-400 transition-colors"
            />
            <span className="font-medium">Help & Support</span>
          </button>

          {/* About */}
          <button className="w-full flex items-center gap-3 px-4 py-3 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 group">
            <FA.FaInfoCircle
              size={18}
              className="text-slate-400 group-hover:text-blue-400 transition-colors"
            />
            <span className="font-medium">About</span>
          </button>
        </div>

        {/* Sign Out Button */}
        <div className="absolute bottom-6 left-4 right-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-300 hover:text-red-200 hover:bg-red-900/20 rounded-lg transition-all duration-200 group border border-red-800/30 hover:border-red-700/50"
          >
            <LogOut
              size={18}
              className="text-red-400 group-hover:text-red-300 transition-colors"
            />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
