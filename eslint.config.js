const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^react$',
              '^react-native$',
              '^react',
              '^react-native',
              '^@react',
              '^@react-native',
              '^expo',
              '^@expo',
              '^@?\\w',
              '^@/',
              '^\\.',
            ],
          ],
        },
      ],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'never',
          prev: 'import',
          next: 'import',
        },
      ],
      'simple-import-sort/exports': 'error',
      'no-trailing-spaces': ['error', { skipBlankLines: false, ignoreComments: false }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1, maxBOF: 0 }],
    },
  },
]);
