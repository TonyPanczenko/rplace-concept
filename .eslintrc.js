module.exports = {
  'env': {
    'browser': true,
    'node': true,
    'es2021': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'react/react-in-jsx-scope': 'off',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'off',
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ]
  },
  'ignorePatterns': ['dist/*', 'build/*'],
  'settings': {
    'react': {
      'createClass': 'createReactClass', // Regex for Component Factory to use,
      'pragma': 'React',  // Pragma to use, default to "React"
      'fragment': 'Fragment',  // Fragment to use (may be a property of <pragma>), default to "Fragment"
      'version': 'detect', // React version. "detect" automatically picks the version you have installed.
    },
    'propWrapperFunctions': [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      { 'property': 'freeze', 'object': 'Object' },
      { 'property': 'myFavoriteWrapper' },
      // for rules that check exact prop wrappers
      { 'property': 'forbidExtraProps', 'exact': true }
    ],
    'componentWrapperFunctions': [
      // The name of any function used to wrap components, e.g. Mobx `observer` function. If this isn't set, components wrapped by these functions will be skipped.
      'observer', // `property`
      { 'property': 'styled' }, // `object` is optional
      { 'property': 'observer', 'object': 'Mobx' },
      { 'property': 'observer', 'object': '<pragma>' } // sets `object` to whatever value `settings.react.pragma` is set to
    ],
  }
};
