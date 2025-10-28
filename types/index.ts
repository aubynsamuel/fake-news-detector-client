import * as FA from "react-icons/fa";

interface SourceDetails {
  url: string;
  semantic_similarity: number;
  domain_weight: number;
  domain_type: "neutral" | "suspicious" | "trusted" | string;
  relevant_sentences: string[];
}

export interface FakeNewsAnalysis {
  headline: string;
  timestamp: string;
  final_verdict: {
    verdict: string;
    confidence: "Very High" | "High" | "Moderate" | "Low" | "Very Low" | string;
    score: number;
    components: {
      claim_verification: number;
      source_credibility: number;
      clickbait_detection: number;
      network_propagation: number;
    };
  };
  components: {
    clickbait: {
      score: number;
    };
    source_credibility: {
      score: number;
      trusted_count: number;
      suspicious_count: number;
    };
    network: {
      score: number;
      domain_diversity: number;
    };
    claim_verification: {
      score: number;
      source_details: SourceDetails[];
    };
  };
}

export interface ResultsProps {
  results: FakeNewsAnalysis;
}

export type ConfidenceLevel = "Very High" | "High" | "Moderate" | "Low" | "Very Low";

export interface VConfig {
  class: string; color: string; icon: typeof FA.FaCheckCircle
}