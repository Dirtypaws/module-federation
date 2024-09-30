/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import airbnb from 'eslint-config-airbnb-base';

export default [
  {
    ignores: ['**/dist/*', '**/node_modules/*', '.eslintrc.js', '.prettierrc.js'],
  },
  {
    files: ['**/*.ts', '**/*.ts'],
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    languageOptions: {
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 2020,
      },
    },

    rules: {
      ...airbnb.rules,
      semi: 'off',
      '@typescript-eslint/semi': 'error',
      '@typescript-eslint/member-delimiter-style': [
        'error',
        {
          multiline: {
            delimiter: 'semi',
            requireLast: true,
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false,
          },
          multilineDetection: 'brackets',
        },
      ],
      indent: 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'class',
          format: ['PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],
      'no-extra-semi': 'warn',
      curly: 'warn',
      quotes: ['error', 'single', { allowTemplateLiterals: true }],
      eqeqeq: 'error',
      'constructor-super': 'warn',
      'prefer-const': [
        'warn',
        {
          destructuring: 'all',
        },
      ],
      'no-buffer-constructor': 'warn',
      'no-caller': 'warn',
      'no-case-declarations': 'warn',
      'no-debugger': 'warn',
      'no-duplicate-case': 'warn',
      'no-duplicate-imports': 'warn',
      'no-eval': 'warn',
      'no-async-promise-executor': 'warn',
      'no-new-wrappers': 'warn',
      'no-redeclare': 'off',
      'no-sparse-arrays': 'warn',
      'no-throw-literal': 'warn',
      'no-unsafe-finally': 'warn',
      'no-unused-labels': 'warn',
      'no-restricted-globals': [
        'warn',
        'name',
        'length',
        'event',
        'closed',
        'external',
        'status',
        'origin',
        'orientation',
        'context',
      ],
      'no-var': 'warn',
    },
  },
];
