import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["modules/**/*.js"],
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-implicit-coercion": "warn",
    },
    languageOptions: {
      ecmaVersion: 2017,
      globals: {
        ...globals.browser,
        ...globals.builtin,
      },
    },
    linterOptions: {
      noInlineConfig: true,
    },
  },
];
