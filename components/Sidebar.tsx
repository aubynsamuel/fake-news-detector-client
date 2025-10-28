import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { FaRobot } from "react-icons/fa";
import { User, LogOut, Edit3, X, History } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SideBarProps {
  isVisible: boolean;
  toggleSideBar: () => void;
}

const Sidebar: React.FC<SideBarProps> = ({ isVisible, toggleSideBar }) => {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSettingsNav = () => {
    toggleSideBar();
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const sidebarVariants = {
    visible: { x: 0 },
    hidden: { x: "-100%" },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="sidebar-backdrop"
            onClick={toggleSideBar}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="sidebar"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="sidebar-header">
              <button onClick={toggleSideBar} className="close-button">
                <X size={24} />
              </button>
            </div>

            <div className="sidebar-profile">
              <div className="profile-avatar">
                <User size={32} />
              </div>
              <h3 className="profile-name">Welcome back!</h3>
              <p className="profile-email">
                {user?.email || "user@example.com"}
              </p>
            </div>

            <nav className="sidebar-nav">
              <Link
                href="/home"
                className="nav-item"
              >
                <FaRobot size={18} />
                <span>Home</span>
              </Link>

              <Link
                href="/history"
                className="nav-item"
              >
                <History size={18} />
                <span>Search History</span>
              </Link>

              <Link href="/settings" onClick={handleSettingsNav} className="nav-item">
                <Edit3 size={18} />
                <span>Settings</span>
              </Link>
            </nav>

            <div className="sidebar-footer">
              <button onClick={handleSignOut} className="sign-out-button">
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
