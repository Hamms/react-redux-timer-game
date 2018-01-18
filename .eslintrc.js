module.exports = {
  "parser": "babel-eslint",

  "extends": [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
  ],

  "plugins": [
    "react",
  ],

  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "ecmaVersion": 6,
      "experimentalObjectRestSpread": true
    }
  },

  "env": {
    "es6": true,
    "browser": true
  },

  "rules": {
    "import/no-named-as-default": false,
    "no-console": ["error"],
    "no-multi-spaces": ["warn"],
    "react/jsx-boolean-value": ["warn"],
    "react/jsx-no-bind": ["warn", {ignoreRefs: true}],
    "react/jsx-pascal-case": ["warn"],
    "react/no-is-mounted": ["warn"],
    "react/no-multi-comp": ["warn"],
    "react/no-string-refs": ["warn"],
    "react/prefer-es6-class": ["warn"],
    "react/prefer-stateless-function": ["warn"],
    "react/require-render-return": ["warn"],
    "react/sort-comp": ["warn"],
  }
};
