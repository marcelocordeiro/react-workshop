import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier'; // Renamed to avoid conflict
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest';

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'html']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      prettier: prettierPlugin, // Explicitly add the plugin
    },
    rules: {
      'prettier/prettier': 'error', // Enable the prettier rule
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    // Test files get the Jest globals (describe, it, expect, jest, ...)
    // without needing an import, the same way JUnit annotations are
    // available in your test source set but not in main.
    files: ['**/*.test.{ts,tsx}', 'src/test/**/*.{ts,tsx}'],
    plugins: { jest: jestPlugin },
    languageOptions: {
      globals: { ...globals.jest, ...globals.node },
    },
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
    },
  },
  prettierConfig, // Add eslint-config-prettier as a separate config object
]);
