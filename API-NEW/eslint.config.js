// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPrettier from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPrettier,
  {
    rules: {
      'react/jsx-key': 'off',
      'object-curly-spacing': ['error', 'always'],
      quotes: ['error', 'single'],
      'arrow-spacing': 'error',
      'block-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', {
        before: false,
        after: true,
      }],
      'eol-last': ['error', 'always'],
      'func-call-spacing': ['error', 'never'],
      'jsx-quotes': ['error', 'prefer-double'],
      'key-spacing': ['error'],
      'max-len': ['error', {
        code: 120,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      }],
      'no-trailing-spaces': ['error'],
      'no-whitespace-before-property': ['error'],
      semi: 'off',
      '@typescript-eslint/semi': ['error'],
      'default-case': ['error'],
      'dot-notation': ['error'],
      eqeqeq: ['error'],
      'no-console': ['error'],
      'no-else-return': ['error'],
      'no-inline-comments': ['error'],
      'no-lone-blocks': ['error'],
      'no-unneeded-ternary': ['error'],
      'no-unused-expressions': ['error'],
      'no-var': ['error'],
      'prefer-const': ['error'],
      'yoda': ['error', 'never'],
      'space-infix-ops': ['error'],
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/member-delimiter-style': ['error'],
    },
  },
);
