import defineConfig from './dist/index.mjs'

export default defineConfig({
  js: true,
  ts: true,
  vue: true,
  stylistic: true,
  importX: true,
  unusedImports: true,
  ignores: ['dist/*', 'node_modules/*', '.eslint-config-inspector'],
  globals: {
    ref: true,
  },
})
