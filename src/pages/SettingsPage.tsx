import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { Lock, User, AlertCircle, Eye, EyeOff } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState(user?.displayName || "");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!user) {
      setMessage({ type: "error", text: "User not logged in." });
      setLoading(false);
      return;
    }

    try {
      // Update display name in Firebase Auth
      await updateDoc(doc(db, "users", user.uid), {
        username: username,
      });
      setMessage({ type: "success", text: "Username updated successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!user) {
      setMessage({ type: "error", text: "User not logged in." });
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({
        type: "error",
        text: "Password should be at least 6 characters.",
      });
      setLoading(false);
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setMessage({ type: "success", text: "Password updated successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <Sidebar
        isVisible={isSideBarOpen}
        toggleSideBar={() => setIsSideBarOpen(false)}
      />
      <Header
        darkMode={
          document.documentElement.getAttribute("data-theme") === "dark"
        }
        setDarkMode={() => {
          const newTheme =
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "light"
              : "dark";
          document.documentElement.setAttribute("data-theme", newTheme);
          localStorage.setItem("theme", newTheme);
        }}
        toggleSideBar={() => setIsSideBarOpen(true)}
      />

      <main className="main-content settings-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="settings-container"
        >
          <h1 className="settings-title">Account Settings</h1>

          {message && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`message-box ${message.type}`}
              >
                <AlertCircle size={20} />
                <p>{message.text}</p>
              </motion.div>
            </AnimatePresence>
          )}

          <div className="settings-section">
            <h2 className="section-title">Change Username</h2>
            <form onSubmit={handleUpdateUsername} className="settings-form">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-wrapper">
                  <User className="input-icon-left" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-input"
                    placeholder="Your username"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Username"}
              </button>
            </form>
          </div>

          <div className="settings-section">
            <h2 className="section-title">Change Password</h2>
            <form onSubmit={handleUpdatePassword} className="settings-form">
              <div className="form-group">
                <label htmlFor="current-password" className="form-label">
                  Current Password
                </label>
                <div className="input-wrapper">
                  <Lock className="input-icon-left" />
                  <input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="form-input has-right-icon"
                    placeholder="Enter current password"
                    required
                  />
                  <div
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="input-icon-right"
                  >
                    {showCurrentPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="new-password" className="form-label">
                  New Password
                </label>
                <div className="input-wrapper">
                  <Lock className="input-icon-left" />
                  <input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input has-right-icon"
                    placeholder="Enter new password"
                    required
                  />
                  <div
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="input-icon-right"
                  >
                    {showNewPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-new-password" className="form-label">
                  Confirm New Password
                </label>
                <div className="input-wrapper">
                  <Lock className="input-icon-left" />
                  <input
                    id="confirm-new-password"
                    type={showConfirmNewPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="form-input has-right-icon"
                    placeholder="Confirm new password"
                    required
                  />
                  <div
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                    className="input-icon-right"
                  >
                    {showConfirmNewPassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage;
