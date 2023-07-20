module.exports = {
  root: true,
  env: {
    es2020: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
    },
    project: ["tsconfig.json"],
  },
  settings: {
    noInlineConfig: true,
    node: {
      tryExtensions: [".js", ".json", ".node", ".ts", ".d.ts"],
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "airbnb-typescript/base",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  rules: {
    "import/extensions": 0,
    "linebreak-style": 0,
    "node/no-unsupported-features/es-syntax": 0,
    "no-underscore-dangle": 0,
    "import/prefer-default-export": 0,
    "@typescript-eslint/no-var-requires": 0,
    "import/no-extraneous-dependencies": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/naming-convention": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
};
