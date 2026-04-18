import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettierPlugin from 'eslint-plugin-prettier' // <-- IMPORT NUEVO
import prettierConfig from 'eslint-config-prettier' // <-- IMPORT NUEVO
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  {
    files: ['**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig, // <-- NUEVO: Desactiva reglas en conflicto
    ],

    // --> NUEVO: Permite ejecutar Prettier desde ESLint
    plugins: {
      prettier: prettierPlugin,
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // --> NUEVO: Forzar la eliminacion de punto y coma al final de la instruccion
      semi: 'off',
      '@typescript-eslint/semi': 'off', // por si acaso

      // --> NUEVO: Ejecuta Prettier como regla de ESLint
      'prettier/prettier': [
        'error',
        {
          semi: false,
          endOfLine: 'auto',
        },
      ],
    },
  },
])
