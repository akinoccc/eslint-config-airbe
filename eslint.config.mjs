import defineConfig from './dist/index.mjs'
console.log(defineConfig()[6].languageOptions)
export default defineConfig()

export default defineConfig({
  js: true,
  ts: true,
  vue: true,
  ignores: ['dist/*', 'node_modules/*'],
})

// export default [
//   eslint.configs.recommended,
//   ...pluginVue.configs['flat/recommended'],
//   ...tseslint.config(...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked),
//   {
//     languageOptions: {
//       parser: vueParser,
//       parserOptions: {
//         parser: tseslint.parser,
//         projectService: true,
//         EXPERIMENTAL_useProjectService: true,
//         ecmaFeatures: {
//           jsx: true
//         },
//       },
//     },
//     rules: {
//       // override/add rules settings here
//       'quotes': ['error', 'single'],
//       'no-multiple-empty-lines': ['error', { max: 1 }],
//       '@typescript-eslint/no-explicit-any': 'warn',
//       '@typescript-eslint/no-unsafe-argument': 'off',
//     }
//   }
// ]
