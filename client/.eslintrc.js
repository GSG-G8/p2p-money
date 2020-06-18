module.exports = {
  extends: ["airbnb", "prettier", "prettier/react"],
  // babel-eslint parser is used to support experimental features not supported in ESLint itself yet
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      impliedStrict: true //enable global strict mode (if ecmaVersion is 5 or greater)
    }
  },
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true
  },
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "react/state-in-constructor": 0,
    //  allow .js extensions for JSX.
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "react/jsx-props-no-spreading": "off",
    "no-nested-ternary" :"off",
    quotes: [
      2,
      "single",
      {
        avoidEscape: true, // allows strings to use single-quotes or double-quotes so long as the string contains a quote that would have to be escaped otherwise
        allowTemplateLiterals: true // allows strings to use backtick
      }
    ],
    // configure the prettier plugin
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
        singleQuote: true
      }
    ]
  },
  plugins: ["react", "prettier"]
};