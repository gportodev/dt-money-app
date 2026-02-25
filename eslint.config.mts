import js from "@eslint/js";
import eslint from '@eslint/js';
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactNative from 'eslint-plugin-react-native';
import { defineConfig } from "eslint/config";

export default defineConfig([
  js.configs.recommended,
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-native': pluginReactNative
     },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
]);
