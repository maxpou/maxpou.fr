module.exports = {
  "env": {
    "browser": true,
    "es6": true,
  },
  "plugins": [
    "react",
  ],
  "globals": {
    "graphql": false,
  },
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true,
    },
  },
  "rules": {
    "react/jsx-uses-vars": 2,
    "no-unused-vars": "warn",
    'no-console': [
      'warn',
      {
        allow: [
          'error',
          'warn',
        ],
      },
    ],
  }
}
