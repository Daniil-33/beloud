/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	root: true,
	extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    // '@vue/eslint-config-prettier'
  ],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	rules: {
		'@vue/no-unused-vars': 'error',
		'@vue/attributes-order': 'on',
		'@vue/require-default-prop': 'off',
		'array-bracket-newline': ['error', { multiline: true }],
	},
}
