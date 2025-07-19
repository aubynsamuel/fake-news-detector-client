import React, { useState } from "react";
import * as FA from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FakeNewsAnalysis } from "../types";

interface ResultsProps {
  results: FakeNewsAnalysis;
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

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

  const sortedSources = (components?.claim_verification?.source_details || [])
    .filter(
      (source) =>
        source.domain_type === "trusted" || source.domain_type === "neutral"
    )
    .sort((a, b) => {
      if (a.domain_type === "trusted" && b.domain_type !== "trusted") return -1;
      if (a.domain_type !== "trusted" && b.domain_type === "trusted") return 1;
      return b.semantic_similarity - a.semantic_similarity;
    })
    .slice(0, 3);

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

      {sortedSources.length > 0 && (
        <div>
          <motion.div
            onClick={() => setIsSourcesOpen(!isSourcesOpen)}
            className="w-fit h-12 flex gap-5 items-center hover:cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-semibold text-[15px]">
              {isSourcesOpen ? "Hide" : "Show"} Top Sources
            </span>
            <motion.div
              animate={{ rotate: isSourcesOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FA.FaChevronDown />
            </motion.div>
          </motion.div>
          <AnimatePresence>
            {isSourcesOpen && (
              <motion.div
                className="flex flex-col gap-5"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {sortedSources.map((source, index) => (
                  <motion.div
                    key={index}
                    className="border-b flex flex-col gap-1 border-gray-300 dark:border-gray-600 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <p className="truncate text-[15px]">
                      URL:{" "}
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {source.url}
                      </a>
                    </p>
                    <p className="text-[15px]">
                      Domain Type:{" "}
                      <span
                        className={`p-0 rounded-full text-sm font-semibold ${
                          source.domain_type === "trusted"
                            ? " text-green-500"
                            : " text-yellow-300"
                        }`}
                      >
                        {source.domain_type}
                      </span>
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

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
