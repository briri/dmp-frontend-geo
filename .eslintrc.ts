module.exports = {
  env: {
    node: true,
    'jest/globals': true,
  },
  extends: ['esnext', 'plugin:jsx-a11y/recommended'],
  plugins: ['@typescript-eslint', 'jest', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  rules: {
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/semi': ['error', 'never'],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'debug', 'info'],
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-floating-promises': ['warn'],
  },
  parserOptions: {
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
  },
}
