import { ESLint } from 'eslint'
import type { CustomConfigItem, EslintFlagConfig } from './types'
import { isPlainObject } from './utils'
import { getImportConfig, getJsConfig, getStylisticConfig, getTsConfig, getVueConfig } from './configs'
import { getUnusedImportsConfig } from './configs/unusedImports'

interface AirBeConfig {
  js?: CustomConfigItem
  ts?: CustomConfigItem
  vue?: CustomConfigItem
  stylistic?: CustomConfigItem
  importX?: CustomConfigItem
  unusedImports?: CustomConfigItem
  ignores?: string[]
  globals?: ESLint.Globals
}

/**
 * 定义ESLint配置。
 *
 * @param {AirBeConfig} config - 包含自定义配置项的对象。
 * @param {...EslintFlagConfig} customFlatConfigs - 额外的自定义配置数组。
 * @returns {EslintFlagConfig[]} 返回ESLint配置数组。
 */
const defineConfig = (config: AirBeConfig, ...customFlatConfigs: EslintFlagConfig[]): EslintFlagConfig[] => {
  const {
    js,
    ts,
    vue,
    stylistic,
    importX,
    unusedImports,
    ignores,
    globals,
  } = config

  const eslintConfig: EslintFlagConfig[] = [
    ...getJsConfig(js),
    ...getTsConfig(ts),
    ...getVueConfig(vue),
    ...getStylisticConfig(stylistic),
    ...getImportConfig(importX),
    ...getUnusedImportsConfig(unusedImports),
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
