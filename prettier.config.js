const path = require('path');

/** @type {import('prettier').Config} */
const prettierConfig = {
  printWidth: 80,
  trailingComma: "none",
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  arrowParens: 'avoid',
  requirePragma: true,
  endOfLine: 'auto',
  overrides: [
    {
      files: path.resolve(__dirname, 'src', '**', '*.ts'),
      options: {
        parser: 'typescript'
      }
    }
  ]
};

module.exports = prettierConfig;
