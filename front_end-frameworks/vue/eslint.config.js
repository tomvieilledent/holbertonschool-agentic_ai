import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      // On conserve les noms de composants du projet React (Button, Hero, Contact…).
      'vue/multi-word-component-names': 'off',
      // Les props optionnelles reproduisent les valeurs par défaut du code React.
      'vue/require-default-prop': 'off',
      // Mise en forme déléguée à Prettier (évite les conflits de formatage).
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
    },
  },
]
