module.exports = {
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
    'plugin:react-redux/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['jsx-a11y', 'prettier', 'react-redux'],
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'linebreak-style': 0,
    'jsx-quotes': 'off',
    'global-require': 'off',
    'no-unused-vars': 'off',
    'react-redux/useSelector-prefer-selectors': 'off'
  },
  globals: {
    fetch: false
  }
};
