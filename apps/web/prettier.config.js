/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  jsxSingleQuote: true,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '^types$',
    '^types/(.*)$',
    '^config/(.*)$',
    '^lib/(.*)$',
    '^components/(.*)$',
    '^styles/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
};
