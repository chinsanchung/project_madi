var path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "airbnb-base",
    "prettier/@typescript-eslint",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "no-console": "off",
    "prettier/prettier": "off",
    "linebreak-style": "off",
    "comma-dangle": "off",
    "no-underscore-dangle": "off",
    "camelcase": "off",
    "class-methods-use-this": "off",
    "import/extensions": ["off"],
    "quotes": ["off", "single"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "nonblock-statement-body-position": "any",
  },
  ignorePatterns: [
    "node_modules",
    "lib",
    "tsconfig-paths-bootstrap.js",
    ".eslintrc.js",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project: path.join(__dirname, "/tsconfig.json"),
      },
    },
  },
};
