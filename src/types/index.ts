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
    };
  };
}