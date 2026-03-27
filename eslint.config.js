import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import importPlugin from 'eslint-plugin-import'
import { defineConfig, globalIgnores } from 'eslint/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', path.resolve(__dirname, './src')],
            ['@layouts', path.resolve(__dirname, './src/layouts')],
            ['@pages', path.resolve(__dirname, './src/pages')],
            ['@assets', path.resolve(__dirname, './src/assets')],
            ['@components', path.resolve(__dirname, './src/components')],
            ['@routes', path.resolve(__dirname, './src/routes')],
            ['@utils', path.resolve(__dirname, './src/utils')],
            ['@hooks', path.resolve(__dirname, './src/hooks')],
            ['@store', path.resolve(__dirname, './src/store')],
            ['@services', path.resolve(__dirname, './src/services')],
            ['@styles', path.resolve(__dirname, './src/styles')],
            ['@config', path.resolve(__dirname, './src/config')],
            ['@i18n', path.resolve(__dirname, './src/i18n')],
          ],
          extensions: ['.js', '.jsx', '.json'],
        },
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'import/no-unresolved': 'error',
    },
  },
])
