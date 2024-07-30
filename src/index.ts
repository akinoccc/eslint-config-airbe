import { ESLint } from 'eslint'
import type { CustomConfigItem, EslintFlagConfig } from './types'
import { isPlainObject } from './utils'
import { getImportConfig, getJsConfig, getStylisticConfig, getTsConfig, getVueConfig } from './configs'

interface AirBeConfig {
  js?: CustomConfigItem
  ts?: CustomConfigItem
  vue?: CustomConfigItem
  stylistic?: CustomConfigItem
  importx?: CustomConfigItem
  ignores?: string[]
  globals?: ESLint.Globals
}

const defineConfig = (config: AirBeConfig, ...customFlatConfigs: EslintFlagConfig[]): EslintFlagConfig[] => {
  const { js, ts, vue, stylistic, importx, ignores, globals } = config

  const eslintConfig: EslintFlagConfig[] = [
    ...getJsConfig(js),
    ...getTsConfig(ts),
    ...getVueConfig(vue),
    ...getStylisticConfig(stylistic),
    ...getImportConfig(importx),
  ]

  if (Array.isArray(ignores))
    eslintConfig.push({
      ignores,
    })

  if (isPlainObject(globals))
    eslintConfig.push({
      languageOptions: {
        globals,
      },
    })

  eslintConfig.push({
    files: ['*.json'],
    rules: {
      'no-invalid-meta': 'off',
      '@stylistic/quotes': ['error', 'double'],
      '@stylistic/quote-props': ['error', 'always'],
      '@stylistic/comma-dangle': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  })

  if (Array.isArray(customFlatConfigs))
    eslintConfig.push(...customFlatConfigs)

  return eslintConfig
}

export default defineConfig
