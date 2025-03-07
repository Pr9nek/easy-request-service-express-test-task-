  import globals from "globals";
  import pluginJs from "@eslint/js";
  import tseslint from "typescript-eslint";


  /** @type {import('eslint').Linter.Config[]} */
  export default [
    {files: ["**/*.{js,mjs,cjs,ts}"]},
    {languageOptions: { globals: {...globals.browser, ...globals.node} }},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
  
    {
      rules: {
        "no-underscore-dangle": ["error", { "allow": ["_id"] }],
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            "js": "never",
            "ts": "never"
          }
        ]
      }
    }
  
  ];