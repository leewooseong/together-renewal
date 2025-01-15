/** @type {import("prettier").Config} */

const path = require('path');

module.exports = {
  arrowParens: 'avoid',
  bracketSpacing: false,
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  vueIndentScriptAndStyle: true,
  parser: 'typescript',
  filepath: '',
  requirePragma: false,
  insertPragma: false,
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200,
      },
    },
  ],
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: path.join(__dirname, 'tailwind.config.ts'), // path 지정
};
