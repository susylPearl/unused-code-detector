export default {
  useEslintrc: false,
  baseConfig: {
    extends: ["eslint:recommended", "plugin:react/recommended"],
    plugins: ["react", "unused-imports"],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      es6: true,
      browser: true,
    },
    rules: {
      "no-unused-vars": ["error"],
      "unused-imports/no-unused-imports": "error", // Detect unused imports
      "unused-imports/no-unused-vars": "error", // Detect unused variables
      "react/prop-types": "off", // Optionally turn off prop-types rule if you're using TypeScript
    },
  },
};
