import { ConfidenceLevel, VConfig } from "@/types";
import * as FA from "react-icons/fa";

export const verdictConfig: Record<ConfidenceLevel, VConfig> = {
    "Very High": {
        class: "fas fa-check-circle",
        color: "#2ecc71",
        icon: FA.FaCheckCircle,
    },
    "High": {
        class: "fas fa-check-circle",
        color: "#27ae60",
        icon: FA.FaCheckCircle,
    },
    "Moderate": {
        class: "fas fa-exclamation-triangle",
        color: "#f39c12",
        icon: FA.FaExclamationTriangle,
    },
    "Low": {
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