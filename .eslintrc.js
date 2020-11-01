module.exports = {
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react'
  ],
  plugins: ['jsx-a11y', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': 0,
    'jsx-quotes': 'off',
    'global-require': 'off'
  },
  globals: {
    fetch: false
  }
};
