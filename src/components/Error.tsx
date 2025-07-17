import React from 'react';
import * as FA from 'react-icons/fa';

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
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

export default Error;
