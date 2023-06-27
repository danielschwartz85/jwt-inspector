// eslint-disable-next-line no-undef
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', 'prettier', 'eslint-plugin-react-hooks', 'unused-imports'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 110,
        semi: false,
        endOfLine: 'auto',
      },
    ],
    'unused-imports/no-unused-imports-ts': 'warn',
  },
}
