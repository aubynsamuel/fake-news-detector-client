import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Eye, EyeOff, Mail, Lock, User, Shield } from "lucide-react";

const AuthToggle: React.FC = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignIn) {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), { email: user.email });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignIn(!isSignIn);
    setError("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const styles = {
    container: {
      height: "100dvh",
      width: "100dvw",
      background:
        "linear-gradient(135deg, #f8fafc 0%, #dbeafe 50%, #e0e7ff 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
    contentWrapper: {
      width: "100%",
      height: "100%",
      maxWidth: "448px",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
    },
    header: {
      textAlign: "center" as const,
      justifyContent: "center",
      width: "100%",
      marginBottom: "24px",
    },
    iconContainer: {
      height: "64px",
      width: "64px",
      background: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      margin: "0 auto",
    },
    title: {
      marginTop: "14px",
      fontSize: "30px",
      fontWeight: "bold",
      color: "#111827",
      lineHeight: "1.2",
    },
    subtitle: {
      marginTop: "6px",
      fontSize: "14px",
      color: "#6b7280",
    },
    formContainer: {
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      border: "1px solid #f3f4f6",
      padding: "40px",
      marginBottom: "24px",
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "15px",
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column" as const,
    },
    label: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "8px",
    },
    inputContainer: {
      position: "relative" as const,
    },
    inputIcon: {
      position: "absolute" as const,
      top: "50%",
      left: "12px",
      transform: "translateY(-50%)",
      pointerEvents: "none" as const,
      color: "#9ca3af",
    },
    input: {
      display: "block",
      width: "100%",
      paddingLeft: "40px",
      paddingRight: "12px",
      paddingTop: "12px",
      paddingBottom: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      color: "#111827",
      fontSize: "14px",
      transition: "all 0.2s ease",
      outline: "none",
      boxSizing: "border-box" as const,
    },
    inputPassword: {
      display: "block",
      width: "100%",
      paddingLeft: "40px",
      paddingRight: "40px",
      paddingTop: "12px",
      paddingBottom: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      color: "#111827",
      fontSize: "14px",
      transition: "all 0.2s ease",
      outline: "none",
      boxSizing: "border-box" as const,
    },
    inputFocus: {
      borderColor: "transparent",
      boxShadow: "0 0 0 2px #3b82f6",
    },
    passwordToggle: {
      position: "absolute" as const,
      top: "50%",
      right: "12px",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#9ca3af",
      transition: "color 0.2s ease",
    },
    errorContainer: {
      background: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: "8px",
      padding: "12px",
    },
    errorText: {
      fontSize: "14px",
      color: "#dc2626",
      textAlign: "center" as const,
      margin: "0",
    },
    submitButton: {
      position: "relative" as const,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "16px",
      paddingRight: "16px",
      border: "none",
      fontSize: "14px",
      fontWeight: "600",
      borderRadius: "8px",
      color: "white",
      background: "linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)",
      cursor: "pointer",
      transition: "all 0.2s ease",
      outline: "none",
    },
    submitButtonHover: {
      background: "linear-gradient(135deg, #2563eb 0%, #4338ca 100%)",
      transform: "scale(1.02)",
    },
    submitButtonActive: {
      transform: "scale(0.98)",
    },
    submitButtonDisabled: {
      opacity: "0.5",
      cursor: "not-allowed",
    },
    loadingSpinner: {
      width: "16px",
      height: "16px",
      border: "2px solid white",
      borderTop: "2px solid transparent",
      borderRadius: "50%",
      marginRight: "8px",
      animation: "spin 1s linear infinite",
    },
    toggleContainer: {
      marginTop: "24px",
      textAlign: "center" as const,
    },
    toggleText: {
      fontSize: "14px",
      color: "#6b7280",
      margin: "0",
    },
    toggleButton: {
      marginLeft: "4px",
      fontWeight: "600",
      color: "#2563eb",
      background: "none",
      border: "none",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    footer: {
      textAlign: "center" as const,
    },
    footerText: {
      fontSize: "12px",
      color: "#6b7280",
      margin: "0",
    },
    footerLink: {
      color: "#2563eb",
      textDecoration: "none",
      transition: "color 0.2s ease",
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .auth-input:focus {
            border-color: transparent !important;
            box-shadow: 0 0 0 2px #3b82f6 !important;
          }
          
          .auth-input::placeholder {
            color: #6b7280;
          }
          
          .auth-button:hover {
            background: linear-gradient(135deg, #2563eb 0%, #4338ca 100%) !important;
            transform: scale(1.02) !important;
          }
          
          .auth-button:active {
            transform: scale(0.98) !important;
          }
          
          .auth-toggle:hover {
            color: #1d4ed8 !important;
          }
          
          .auth-link:hover {
            color: #1d4ed8 !important;
          }
          
          .password-toggle:hover {
            color: #4b5563 !important;
          }
          
          @media (min-width: 640px) {
            .auth-container {
              padding: 24px !important;
            }
            .auth-form {
              padding: 48px !important;
            }
          }
          
          @media (min-width: 1024px) {
            .auth-container {
              padding: 32px !important;
            }
          }
        `}
      </style>

      <div style={styles.container} className="auth-container">
        <div style={styles.contentWrapper}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.iconContainer}>
              {isSignIn ? (
                <Shield
                  style={{ height: "32px", width: "32px", color: "white" }}
                />
              ) : (
                <User
                  style={{ height: "32px", width: "32px", color: "white" }}
                />
              )}
            </div>
            <h2 style={styles.title}>
              {isSignIn ? "Welcome back" : "Create account"}
            </h2>
            <p style={styles.subtitle}>
              {isSignIn
                ? "Sign in to your account to continue"
                : "Join us and start your journey today"}
            </p>
          </div>

          {/* Form */}
          <div style={styles.formContainer} className="auth-form">
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* Email Field */}
              <div style={styles.fieldGroup}>
                <label htmlFor="email" style={styles.label}>
                  Email address
                </label>
                <div style={styles.inputContainer}>
                  <div style={styles.inputIcon}>
                    <Mail style={{ height: "20px", width: "20px" }} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.input}
                    className="auth-input"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={styles.fieldGroup}>
                <label htmlFor="password" style={styles.label}>
                  Password
                </label>
                <div style={styles.inputContainer}>
                  <div style={styles.inputIcon}>
                    <Lock style={{ height: "20px", width: "20px" }} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={styles.inputPassword}
                    className="auth-input"
                    placeholder="Enter your password"
                  />
                  <div
                    style={styles.passwordToggle}
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff style={{ height: "20px", width: "20px" }} />
                    ) : (
                      <Eye style={{ height: "20px", width: "20px" }} />
                    )}
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div style={styles.errorContainer}>
                  <p style={styles.errorText}>{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...styles.submitButton,
                  ...(loading ? styles.submitButtonDisabled : {}),
                }}
                className="auth-button"
              >
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div style={styles.loadingSpinner}></div>
                    {isSignIn ? "Signing in..." : "Creating account..."}
                  </div>
                ) : (
                  <span>{isSignIn ? "Sign in" : "Create account"}</span>
                )}
              </button>
            </form>

            {/* Toggle Auth Mode */}
            <div style={styles.toggleContainer}>
              <p style={styles.toggleText}>
                {isSignIn
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <span
                  onClick={toggleAuthMode}
                  style={styles.toggleButton}
                  className="auth-toggle"
                >
                  {isSignIn ? "Sign up" : "Sign in"}
                </span>
              </p>
            </div>
          </div>

          {/* Footer */}
          {/* <div style={styles.footer}>
            <p style={styles.footerText}>
              By continuing, you agree to our{" "}
              <a href="#" style={styles.footerLink} className="auth-link">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" style={styles.footerLink} className="auth-link">
                Privacy Policy
              </a>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AuthToggle;
