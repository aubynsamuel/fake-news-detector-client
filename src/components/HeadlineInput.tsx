import React from 'react';
import * as FA from 'react-icons/fa';

interface HeadlineInputProps {
  headline: string;
  setHeadline: (value: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  analyzeHeadline: () => void;
  loading: boolean;
}

const HeadlineInput: React.FC<HeadlineInputProps> = ({ headline, setHeadline, handleKeyDown, analyzeHeadline, loading }) => {
  return (
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
  );
};

export default HeadlineInput;
