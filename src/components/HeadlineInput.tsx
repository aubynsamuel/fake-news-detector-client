import React from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

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
  return (
    <div className="input-area">
      <textarea
        id="headline"
        value={headline}
        onChange={(e) => setHeadline(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. New study reveals surprising benefits of chocolate..."
        className="headline-textarea"
        rows={3}
      />
      <button
        className="analyze-button"
        onClick={analyzeHeadline}
        disabled={loading}
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
  );
};

export default HeadlineInput;
