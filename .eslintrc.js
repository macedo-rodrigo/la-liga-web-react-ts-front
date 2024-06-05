module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json", // Usar el nuevo archivo tsconfig.eslint.json
  },
  plugins: ["react", "@typescript-eslint", "import", "jsx-a11y", "react-hooks"],
  ignorePatterns: ["build/*", ".eslintrc.js"],
  rules: {
    semi: "off",
    "space-before-function-paren": "off",
    quotes: [2, "double"],
    "quote-props": [2, "consistent"],
    "multiline-ternary": "off",
    "comma-dangle": "off",
    "@typescript-eslint/quotes": [2, "double"],
    "@typescript-eslint/semi": "off",
    "@typescript-eslint/space-before-function-paren": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: { delimiter: "semi", requireLast: true },
        singleline: { delimiter: "semi", requireLast: true },
      },
    ],
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/restrict-plus-operands": "off", // Deshabilitar la regla problemática
    "react/jsx-indent": [2, 2],
    "react/prop-types": "off",
    "jsx-quotes": [2, "prefer-double"],
    "react/no-unescaped-entities": "off",
    "import/order": ["error", { "newlines-between": "always" }],
    "import/no-unresolved": "error",
    "import/named": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
