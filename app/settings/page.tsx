/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { sendPasswordResetEmail } from "@/lib/passwordReset";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { User, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import "../css/SettingsStyles.css";
import { getFirebaseErrorMessage } from "@/utils/getFirebaseErrorMessage";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState(user?.displayName || "");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState(user?.email || "");

  const handleUpdateUsername = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!user) {
      setMessage({ type: "error", text: "User not logged in." });
      setLoading(false);
      return;
    }

    if (username.trim() === "") {
      setMessage({ type: "error", text: "Username cannot be empty." });
      setLoading(false);
      return;
    }

    try {
      await updateDoc(doc(db, "users", user.uid), {
        username: username,
      });
      setMessage({ type: "success", text: "Username updated successfully!" });
    } catch (error: any) {
      setMessage({ type: "error", text: getFirebaseErrorMessage(error.code) });
    } finally {
      setLoading(false);
    }
  };

  const handleSendPasswordResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!resetEmail) {
      setMessage({ type: "error", text: "Please enter your email address." });
      setLoading(false);
      return;
    }

    try {
      const result = await sendPasswordResetEmail(resetEmail);
      if (result.success) {
        setMessage({ type: "success", text: result.message });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error: any) {
      console.error(error)
      setMessage({
        type: "error",
        text: "Failed to send reset email. Please try again.",
      });
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
            <h2 className="section-title">Reset Password</h2>
            <form
              onSubmit={handleSendPasswordResetEmail}
              className="settings-form"
            >
              <div className="form-group">
                <label htmlFor="reset-email" className="form-label">
                  Email Address
                </label>
                <div className="input-wrapper">
                  <User className="input-icon-left" />
                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="form-input"
                    placeholder="Enter your email for password reset"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Password Reset Email"}
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
