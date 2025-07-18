import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface ErrorProps {
  error: string;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error-container">
      <FaExclamationCircle className="error-icon" />
      <div>
        <h2 className="error-title">Analysis Error</h2>
        <p className="error-message">{error}</p>
      </div>
    </div>
  );
};

export default Error;
