import React from "react";
import * as FA from "react-icons/fa";

const MetricsExplanation: React.FC = () => {
  return (
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
          Whether the headline uses sensational language to attract clicks.
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
  );
};

export default MetricsExplanation;
