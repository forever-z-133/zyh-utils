module.exports = {
  ignorePatterns: [
    '*.md',
    '*.html',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  parser: '@babel/eslint-parser',
  rules: {
    semi: 2,
    quotes: [2, 'single'],
    indent: [2, 2, { SwitchCase: 1 }],
    'quote-props': [2, 'as-needed'],
    'no-multi-spaces': 2,
    'no-trailing-spaces': 2,
    'no-unused-vars': 1,
    'eol-last': 2,
    'arrow-parens': [2, 'as-needed'],
    'no-empty': [2, { allowEmptyCatch: true }],
    'object-shorthand': 2,
  },
};
