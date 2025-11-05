module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:jsx-a11y/recommended", "prettier"],
  plugins: ["@typescript-eslint", "jsx-a11y"],
  rules: {
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
  ignorePatterns: ["node_modules", ".next", "dist", "*.config.js", "*.config.cjs", "pnpm-lock.yaml"],
};
