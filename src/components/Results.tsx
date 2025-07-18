import React from "react";
import * as FA from "react-icons/fa";
import { FakeNewsAnalysis } from "../types";

interface ResultsProps {
  results: FakeNewsAnalysis;
}

const Results: React.FC<ResultsProps> = ({ results }) => {
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

  if (!results || !results.final_verdict || !results.final_verdict.score)
    return (
      <p className="text-center my-3 text-red-600">No results available</p>
    );

  const { final_verdict, components } = results;
  const {
    verdict,
    confidence,
    score,
    components: scoreComponents,
  } = final_verdict;

  const config = verdictConfig[confidence] || {
    icon: FA.FaQuestionCircle,
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
          className={`verdict-icon`}
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
            <b>{components.source_credibility.trusted_count}</b> &nbsp; | &nbsp;
            Suspicious Sources:{" "}
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

export default Results;
