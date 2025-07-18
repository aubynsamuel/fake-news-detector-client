import React, { useState, useEffect, useRef } from "react";
import { FakeNewsAnalysis } from "../types";
import Header from "../components/Header";
import HeadlineInput from "../components/HeadlineInput";
import Results from "../components/Results";
import Error from "../components/Error";
import MetricsExplanation from "../components/MetricsExplanation";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { mockData } from "../data/mockServerResponse";

const FakeNewsDetector: React.FC = () => {
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FakeNewsAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_SERVER_URL}/health`);
    } catch (err) {
      console.error("Error fetching health check:", err);
      setError(
        "Could not connect to the analysis service. Please try again later."
      );
    }

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

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
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

    try {
      const mainUrl = import.meta.env.VITE_SERVER_URL;
      // const response = await fetch(`${mainUrl}/analyze`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ headline: trimmedHeadline }),
      // });

      // if (!response.ok) {
      //   setError("An error occurred. Please try again later.");
      // }

      // const data = await response.json();
      const data = mockData;
      setResults(data);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (err) {
      setError(
        "Could not connect to the analysis service. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      analyzeHeadline();
    }
  };

  return (
    <div className={`container-fluid ${darkMode ? "dark" : ""}`}>
      <Sidebar
        isVisible={isSideBarOpen}
        toggleSideBar={() => setIsSideBarOpen(false)}
      />
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        toggleSideBar={() => setIsSideBarOpen(true)}
      />

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Truth Guard: Your Shield Against Misinformation
            </h1>

            <p className="hero-subtitle">
              Your intelligent assistant for verifying news headlines with
              advanced AI analysis
            </p>
            <HeadlineInput
              headline={headline}
              setHeadline={setHeadline}
              handleKeyDown={handleKeyDown}
              analyzeHeadline={analyzeHeadline}
              loading={loading}
            />
          </div>
        </section>

        <AnimatePresence>
          {loading && (
            <motion.div
              className="loading-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="spinner"></div>
              <p>Analyzing... please wait.</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={resultsRef} className="results-container">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Error error={error} />
              </motion.div>
            )}
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Results results={results} />
                <MetricsExplanation />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {results && <Footer />}
    </div>
  );
};

export default FakeNewsDetector;
