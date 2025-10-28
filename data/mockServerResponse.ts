import { FakeNewsAnalysis } from "../types";

export const mockData: FakeNewsAnalysis = {
  headline: "trimmedHeadline",
  timestamp: new Date().toISOString(),
  final_verdict: {
    verdict: "Unclear — Conflicting Information",
    confidence: "Moderate",
    score: 0.57,
    components: {
      claim_verification: 0.32,
      source_credibility: 0.51,
      clickbait_detection: 0.98,
      network_propagation: 0.59,
    },
  },
  components: {
    clickbait: { score: 0.02 },
    source_credibility: {
      score: 0.51,
      trusted_count: 2,
      suspicious_count: 0,
    },
    network: { score: 0.59, domain_diversity: 0.97 },
    claim_verification: { score: 0.32, source_details: [] },
  },
};
