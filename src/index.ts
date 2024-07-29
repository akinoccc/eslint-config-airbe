import { ESLint } from 'eslint'
import { isPlainObject } from './utils'
import type { CustomConfigItem, EslintFlagConfig } from "./types";
import getJsConfig from "./configs/js";
import getTsConfig from "./configs/ts";
import getVueConfig from "./configs/vue";
import getStylisticConfig from "./configs/stylistic";

interface AirBeConfig {
  js?: CustomConfigItem
  ts?: CustomConfigItem
  vue?: CustomConfigItem
  stylistic?: CustomConfigItem
  ignores?: string[]
  globals?: ESLint.Globals
}

const defineConfig = (config: AirBeConfig, ...customFlatConfigs: EslintFlagConfig[]): EslintFlagConfig[] => {
  const  { js, ts, vue, stylistic, ignores, globals } = config

  const eslintConfig: EslintFlagConfig[] = [
      ...getJsConfig(js),
      ...getTsConfig(ts),
      ...getVueConfig(vue),
      ...getStylisticConfig(stylistic),
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
