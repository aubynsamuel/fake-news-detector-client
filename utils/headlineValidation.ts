export interface ValidationError {
  type: "length" | "empty" | "pattern" | "content";
  message: string;
}

export const invalidPatterns = [
  {
    regex: /^[^a-zA-Z]*$/,
    message: "Headline must contain at least some alphabetic characters",
  },
  {
    regex: /^\s*$/,
    message: "Headline cannot be only whitespace",
  },
  {
    regex: /^[.,!?;:]+/,
    message: "Headline should not start with punctuation",
  },
  {
    regex: /[.,!?;:]{3,}/,
    message: "Avoid excessive punctuation",
  },
  // {
  //   regex: /\b([A-Z]{4,})\b/,
  //   message: "Avoid excessive use of ALL CAPS words",
  // },
  {
    regex: /(.)\1{4,}/,
    message: "Avoid repeated characters (e.g., 'aaaaa')",
  },
  {
    regex: /^\d+$/,
    message: "Headline cannot be only numbers",
  },
  {
    regex: /^[^a-zA-Z0-9\s.,!?;:'"()-]+$/,
    message: "Headline contains too many special characters",
  },
];

export const validateHeadline = (text: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  const trimmedText = text.trim();

  // Check if empty
  if (!trimmedText) {
    errors.push({
      type: "empty",
      message: "Headline cannot be empty",
    });
    return errors;
  }

  // Check minimum length
  if (trimmedText.length < 10) {
    errors.push({
      type: "length",
      message: "Headline must be at least 10 characters long",
    });
  }

  // Check for invalid patterns
  invalidPatterns.forEach((pattern) => {
    if (pattern.regex.test(trimmedText)) {
      errors.push({
        type: "pattern",
        message: pattern.message,
      });
    }
  });

  // Additional content validation
  const wordCount = trimmedText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  if (wordCount < 3) {
    errors.push({
      type: "content",
      message: "Headline should contain at least 3 words",
    });
  }

  return errors;
};
