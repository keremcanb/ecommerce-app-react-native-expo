module.exports = {
  extends: [
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
    'plugin:react-redux/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['jsx-a11y', 'prettier', 'react-redux', 'react-native'],
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
    'react-redux/useSelector-prefer-selectors': 'off',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-case-declarations': 'off',
    'default-case': 'off',
    'no-console': 'off'
  },
  globals: {
    fetch: false
  }
};
