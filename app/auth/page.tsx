/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FaRobot } from "react-icons/fa";
import { sendPasswordResetEmail } from "@/lib/passwordReset";
import { getFirebaseErrorMessage } from "@/utils/getFirebaseErrorMessage";
import "../css/AuthStyles.css";

const AuthToggle: React.FC = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        if (!email || !password) {
            setError("Please enter both email and password.");
            setLoading(false);
            return;
        }

        try {
            if (isSignIn) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), { email: user.email });
            }
        } catch (err: any) {
            setError(getFirebaseErrorMessage(err.code));
        } finally {
            setLoading(false);
        }
    };

    const toggleAuthMode = () => {
        setIsSignIn(!isSignIn);
        setError("");
        setSuccessMessage("");
        setEmail("");
        setPassword("");
        setShowPassword(false);
        setShowForgotPassword(false); // Reset forgot password state
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setLoading(true);

        if (!forgotPasswordEmail) {
            setError("Please enter your email address.");
            setLoading(false);
            return;
        }

        try {
            const result = await sendPasswordResetEmail(forgotPasswordEmail);
            if (result.success) {
                setSuccessMessage(result.message);
                setForgotPasswordEmail("");
                setShowForgotPassword(false);
            } else {
                setError(result.message);
            }
        } catch (error: any) {
            setError("Failed to send reset email. Please try again.");
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`auth-container`}>
            <div className="auth-wrapper">
                <div className="auth-header">
                    <div className="auth-logo">
                        <FaRobot size={40} />
                    </div>
                    <h1 className="auth-title">Truth Guard</h1>
                    <p className="auth-subtitle">
                        {isSignIn
                            ? "Sign in to continue"
                            : "Create an account to get started"}
                    </p>
                </div>

                <div className="auth-form-container">
                    {!showForgotPassword ? (
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon-left" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Password
                                </label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon-left" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        placeholder="••••••••"
                                        className="form-input has-right-icon"
                                    />
                                    <div
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="input-icon-right"
                                    >
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </div>
                                </div>
                            </div>

                            {isSignIn && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPassword(true)}
                                        className="toggle-button text-sm"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            {error && (
                                <div className="auth-error-message">
                                    <p>{error}</p>
                                </div>
                            )}

                            {successMessage && (
                                <div className="success-message">
                                    <p>{successMessage}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="submit-button"
                            >
                                {loading ? (
                                    <div className="loading-content">
                                        <svg
                                            className="loading-spinner"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>
                                            {isSignIn ? "Signing in..." : "Creating account..."}
                                        </span>
                                    </div>
                                ) : (
                                    <span>{isSignIn ? "Sign in" : "Create account"}</span>
                                )}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleForgotPassword} className="auth-form">
                            <div className="form-group">
                                <label htmlFor="forgot-email" className="form-label">
                                    Email address
                                </label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon-left" />
                                    <input
                                        id="forgot-email"
                                        type="email"
                                        value={forgotPasswordEmail}
                                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                        required
                                        placeholder="you@example.com"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="auth-error-message">
                                    <p>{error}</p>
                                </div>
                            )}

                            {successMessage && (
                                <div className="success-message">
                                    <p>{successMessage}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="submit-button"
                            >
                                {loading ? (
                                    <div className="loading-content">
                                        <svg
                                            className="loading-spinner"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        <span>Sending Reset Email...</span>
                                    </div>
                                ) : (
                                    <span>Send Reset Email</span>
                                )}
                            </button>

                            <div className="text-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPassword(false)}
                                    className="toggle-button text-sm"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        </form>
                    )}

                    <p className="toggle-text">
                        {isSignIn
                            ? "Don't have an account?  "
                            : "Already have an account?  "}
                        <span onClick={toggleAuthMode} className="toggle-button">
                            {isSignIn ? "Sign up" : "Sign in"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthToggle;
