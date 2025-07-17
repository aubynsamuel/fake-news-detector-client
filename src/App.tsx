import React, { useState, useEffect } from "react";
import "./App.css";
import * as FA from "react-icons/fa";
import "./FontAwesome.css";
import { FakeNewsAnalysis } from "./mockdata";

const FakeNewsDetector = () => {
  const [headline, setHeadline] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FakeNewsAnalysis>(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Update document theme when darkMode changes
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

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
      const mainUrl = "https://fakenewsdetectionmodel.onrender.com";
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

  const handleKeyDown = (e: { key: string; ctrlKey: any }) => {
    if (e.key === "Enter" && e.ctrlKey) {
      analyzeHeadline();
    }
  };

  const verdictConfig = {
    "Very High": {
      class: "fas fa-check-circle",
      color: "#2ecc71",
      icon: FA.FaCheckCircle,
    },
    High: {
      class: "fas fa-check-circle",
      color: "#27ae60",
      icon: FA.FaCheckCircle,
    },
    Moderate: {
      class: "fas fa-exclamation-triangle",
      color: "#f39c12",
      icon: FA.FaExclamationTriangle,
    },
    Low: {
      class: "fas fa-times-circle",
      color: "#e67e22",
      icon: FA.FaTimesCircle,
    },
    "Very Low": {
      class: "fas fa-times-circle",
      color: "#e74c3c",
      icon: FA.FaTimesCircle,
    },
  };

  const renderResults = () => {
    if (!results) return null;

    const { final_verdict, components } = results;
    const {
      verdict,
      confidence,
      score,
      components: scoreComponents,
    } = final_verdict;

    const config = verdictConfig[confidence] || {
      icon: "fas fa-question-circle",
      color: "#95a5a6",
    };

    return (
      <div className="results-section">
        <div
          className="verdict"
          style={{
            backgroundColor: `${config.color}20`,
            borderLeft: `5px solid ${config.color}`,
          }}
        >
          <config.icon
            className={`${config.class} verdict-icon`}
            style={{ color: config.color }}
          ></config.icon>
          <div>
            <h2 className="verdict-header" style={{ color: config.color }}>
              {verdict}
            </h2>
            <p>
              <strong>Score:</strong> {score.toFixed(2)}/1.00
            </p>
          </div>
        </div>

        <div className="metrics-grid">
          {Object.entries(scoreComponents).map(([key, value]) => (
            <div key={key} className="metric">
              <div
                className="metric-value"
                style={{ color: value >= 0.6 ? "#27ae60" : "#e74c3c" }}
              >
                {value.toFixed(2)}
              </div>
              <div className="metric-label">{key.replace(/_/g, " ")}</div>
            </div>
          ))}
        </div>

        <div className="metric-container">
          {components?.source_credibility && (
            <div className="metric-label" style={{ marginTop: "10px" }}>
              Trusted Sources:{" "}
              <b>{components.source_credibility.trusted_count}</b> &nbsp; |
              &nbsp; Suspicious Sources:{" "}
              <b>{components.source_credibility.suspicious_count}</b>
            </div>
          )}
          {components?.network && (
            <div className="metric-label">
              Domain Diversity: <b>{components.network.domain_diversity}</b>
            </div>
          )}
        </div>

        <div className="result-details">
          <p>
            <strong>Headline Analyzed:</strong> {results.headline}
          </p>
          <p>
            <strong>Timestamp:</strong>{" "}
            {new Date(results.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    );
  };

  const renderError = () => {
    if (!error) return null;

    return (
      <div className="results-section">
        <div
          className="verdict"
          style={{
            backgroundColor: "#e74c3c20",
            borderLeft: "5px solid #e74c3c",
          }}
        >
          <FA.FaExclamationCircle
            className="fas fa-exclamation-circle verdict-icon"
            style={{ color: "#e74c3c" }}
          ></FA.FaExclamationCircle>
          <div>
            <h2>Analysis Error</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="header">
        <a href="/" className="logo">
          <FA.FaRobot className="fas fa-robot"></FA.FaRobot>
          <h5>Fake News Detector</h5>
        </a>
        <div className="theme-switcher">
          <FA.FaSun className="fas fa-sun"></FA.FaSun>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
          <FA.FaMoon className="fas fa-moon"></FA.FaMoon>
        </div>
      </div>

      <div className="main-body">
        <p className="teaser-message">
          Your intelligent assistant for verifying news headlines with advanced
          AI analysis.
        </p>

        <div className="input-section">
          <div className="input-group">
            <label htmlFor="headline">Enter News Headline</label>
            <textarea
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="e.g., 'New study reveals surprising benefits of chocolate...'"
            />
          </div>
          <div className="analyze-btn-container">
            <button
              className="analyze-btn"
              onClick={analyzeHeadline}
              disabled={loading}
            >
              {loading ? (
                <>
                  <FA.FaSpinner className="fas fa-spinner fa-spin"></FA.FaSpinner>{" "}
                  Analyzing...
                </>
              ) : (
                <>
                  <FA.FaSearchengin className="fas fa-search"></FA.FaSearchengin>{" "}
                  Analyze
                </>
              )}
            </button>
          </div>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing... please wait.</p>
          </div>
        )}

        {results && renderResults()}
        {error && renderError()}

        {showMetrics && (
          <div className="metrics-explanation">
            <h3>Understanding the Metrics</h3>
            <ul>
              <li>
                <p>
                  <FA.FaCheckCircle className="fas fa-check-circle"></FA.FaCheckCircle>{" "}
                  <strong>Claim Verification:</strong>
                </p>
                How well the claim is backed by credible online sources.
              </li>
              <li>
                <p>
                  <FA.FaShieldAlt className="fas fa-shield-alt"></FA.FaShieldAlt>{" "}
                  <strong>Source Credibility:</strong>
                </p>
                The trustworthiness of the news sources.
              </li>
              <li>
                <p>
                  <FA.FaMousePointer className="fas fa-mouse-pointer"></FA.FaMousePointer>{" "}
                  <strong>Clickbait Detection:</strong>
                </p>
                Whether the headline uses sensational language to attract
                clicks.
              </li>
              <li>
                <p>
                  <FA.FaProjectDiagram className="fas fa-project-diagram"></FA.FaProjectDiagram>{" "}
                  <strong>Network Propagation:</strong>
                </p>
                How widely the news is being shared across platforms.
              </li>
            </ul>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>&copy; 2024 AI Fake News Detector. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FakeNewsDetector;
