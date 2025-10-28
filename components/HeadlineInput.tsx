/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from "react";
import { FaSearch, FaSpinner, FaExclamationTriangle } from "react-icons/fa";
import { validateHeadline, ValidationError } from "../utils/headlineValidation";

interface HeadlineInputProps {
  headline: string;
  setHeadline: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  analyzeHeadline: () => void;
  loading: boolean;
}

const HeadlineInput: React.FC<HeadlineInputProps> = ({
  headline,
  setHeadline,
  handleKeyDown,
  analyzeHeadline,
  loading,
}) => {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    const errors = validateHeadline(headline);
    setValidationErrors(errors);
  }, [headline]);

  const enhancedHandleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      if (validationErrors.length === 0) {
        analyzeHeadline();
      } else {
        setShowErrors(true);
      }
    } else {
      handleKeyDown(e);
    }
  };

  const enhancedAnalyzeHeadline = () => {
    if (validationErrors.length === 0) {
      setShowErrors(false);
      analyzeHeadline();
    } else {
      setShowErrors(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setHeadline(value);

    // Hide errors when user starts typing if they were showing
    if (showErrors && value.trim().length > 0) {
      setShowErrors(false);
    }
  };

  const hasErrors = validationErrors.length > 0;
  const shouldShowErrors = showErrors && hasErrors;

  return (
    <>
      <div className="input-area">
        <div className="w-full relative">
          <textarea
            id="headline"
            value={headline}
            onChange={handleInputChange}
            onKeyDown={enhancedHandleKeyDown}
            placeholder="e.g. New study reveals surprising benefits of chocolate..."
            className={`headline-textarea ${hasErrors ? "error" : ""} ${shouldShowErrors ? "show-errors" : ""
              }`}
            rows={3}
            aria-describedby={shouldShowErrors ? "headline-errors" : undefined}
            aria-invalid={hasErrors}
          />
        </div>

        {/* Error messages */}
        {shouldShowErrors && (
          <div key={"index"} className="input-error-message">
            <FaExclamationTriangle className="input-error-icon" />
            <span>{validationErrors[0].message}</span>
          </div>
        )}

        <button
          className={`analyze-button`}
          onClick={enhancedAnalyzeHeadline}
          title={
            !loading && hasErrors ? validationErrors[0].message : undefined
          }
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <FaSearch />
              <span>Analyze</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default HeadlineInput;
