import defineConfig from './dist/index.mjs'

export default defineConfig({
  js: true,
  ts: true,
  vue: true,
  stylistic: true,
  ignores: ['dist/*', 'node_modules/*'],
  globals: {
    ref: true,
  },
})
