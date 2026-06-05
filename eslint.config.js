import eslintReactPlugin from '@eslint-react/eslint-plugin'
import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginRouter from '@tanstack/eslint-plugin-router'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from "eslint/config"
import globals from 'globals'
import path from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  ...pluginRouter.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@eslint-react': eslintReactPlugin,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      'react-hooks/refs': 'off',
      'react-hooks/static-components': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true, extraHOCs: [
          'createFileRoute',
          'createLazyFileRoute',
          'createRootRoute',
          'createRootRouteWithContext',
          'createLink',
          'createRoute',
          'createLazyRoute'
        ] }
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      "@eslint-react/no-missing-key": "error",
    }
  },
)
