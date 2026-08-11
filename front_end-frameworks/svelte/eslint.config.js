import js from '@eslint/js'
import globals from 'globals'
import pluginSvelte from 'eslint-plugin-svelte'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...pluginSvelte.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },
]
