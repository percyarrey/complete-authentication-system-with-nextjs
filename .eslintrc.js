module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals", // Next.js recommended rules
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "off", // Disable the rule for explicit any
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the react version
    },
  },
};
