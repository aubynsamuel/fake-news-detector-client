import React, { useState, useEffect } from "react";
import "../css/App.css";
import "../css/FontAwesome.css";
import { FakeNewsAnalysis } from "../types";
import Header from "../components/Header";
import HeadlineInput from "../components/HeadlineInput";
import Results from "../components/Results";
import Error from "../components/Error";
import MetricsExplanation from "../components/MetricsExplanation";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const FakeNewsDetector = () => {
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FakeNewsAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/health`);
    } catch (err) {
      console.error("Error fetching health check:", err);
      setError(
        "Could not connect to the analysis service. Please try again later."
      );
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Handle body scroll when sidebar is open
  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSideBarOpen]);

  const analyzeHeadline = async () => {
    const trimmedHeadline = headline.trim();
    if (!trimmedHeadline) {
      alert("Please enter a headline.");
      return;
    }

    setLoading(true);
    setResults(null);
    setError(null);
    setShowMetrics(false);

    try {
      const mainUrl = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${mainUrl}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ headline: headline }),
      });
      const data = await response.json();

      console.log(data);

      setResults(data);
      setShowMetrics(true);
    } catch (err) {
      setError(
        "Could not connect to the analysis service. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      analyzeHeadline();
    }
  };

  const toggleSideBar = (value: boolean) => {
    setIsSideBarOpen(value);
  };

  return (
    <div className="container">
      <Sidebar isVisible={isSideBarOpen} toggleSideBar={toggleSideBar} />
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleSideBar={toggleSideBar}
      />

      <div className="main-body">
        <p className="teaser-message">
          Your intelligent assistant for verifying news headlines with advanced
          AI analysis.
        </p>

        <HeadlineInput
          headline={headline}
          setHeadline={setHeadline}
          handleKeyDown={handleKeyDown}
          analyzeHeadline={analyzeHeadline}
          loading={loading}
        />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing... please wait.</p>
          </div>
        )}

        {results && <Results results={results} />}
        {error && <Error error={error} />}

        {showMetrics && <MetricsExplanation />}
      </div>

      <Footer />
    </div>
  );
};

export default FakeNewsDetector;
