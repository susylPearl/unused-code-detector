export default {
  useEslintrc: false,
  baseConfig: {
    extends: ["eslint:recommended"],
    plugins: ["unused-imports"],
    parserOptions: {
      ecmaVersion: "latest",
    },
    env: {
      es6: true,
    },
    rules: {
      "no-unused-vars": ["error"],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
    },
  },
};
