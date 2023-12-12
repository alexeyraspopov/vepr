export default {
  plugins: ["prettier-plugin-jsdoc"],
  printWidth: 100,
  jsdocPrintWidth: 80,
  proseWrap: "always",
  trailingComma: "all",
  overrides: [{ files: "*.md", options: { printWidth: 80 } }],
};
