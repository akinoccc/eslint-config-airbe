import defineConfig from './dist/index.mjs'

export default defineConfig({
  js: true,
  ts: true,
  vue: true,
  ignores: ['dist/*', 'node_modules/*'],
})
