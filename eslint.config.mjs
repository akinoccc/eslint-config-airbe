import defineConfig from 'eslint-config-airbe'

export default defineConfig({
  js: true,
  ts: true,
  vue: true,
  ignores: ['dist/*', 'node_modules/*'],
})
