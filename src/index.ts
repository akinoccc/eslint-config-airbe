import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

import type { Linter } from 'eslint'
import type { TSESLint } from '@typescript-eslint/utils'
import { isPlainObject } from './utils'

type EslintFlagConfig = (Linter.FlatConfig | TSESLint.FlatConfig.Config)
type CustomConfigItem = Linter.RulesRecord | boolean

const defineConfig = (customConfig: {
  js?: CustomConfigItem,
  ts?: CustomConfigItem,
  vue?: CustomConfigItem,
  ignores?: string[],
}): EslintFlagConfig[] => {
  const eslintConfig: EslintFlagConfig[] = []
  const customRuleRecord: Linter.RulesRecord = {}
  const { js, ts, vue, ignores } = customConfig

  if (js) {
    const jsConfig: EslintFlagConfig = {
      ...eslint.configs.recommended,
      rules: {
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'indent': ['error', 2],
      },
    }
    if (isPlainObject(js)) {
      Object.assign(customRuleRecord, js)
    }

    eslintConfig.push(jsConfig)
  }

  if (ts) {
    const tsConfigs: EslintFlagConfig[] = [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        rules: {
          '@typescript-eslint/prefer-nullish-coalescing': 'off'
        }
      }
    ]

    if (isPlainObject(ts)) {
      Object.assign(customRuleRecord, ts)
    }

    eslintConfig.push(...tsConfigs)
  }

  if (vue) {
    const vueConfigs: EslintFlagConfig[] = [
      {
        languageOptions: {
          parser: vueParser,
          parserOptions: {
            parser: tseslint.parser,
            projectService: true,
            EXPERIMENTAL_useProjectService: true,
            ecmaFeatures: {
              jsx: true
            },
          },
        },
      },
      ...pluginVue.configs['flat/recommended']
    ]

    if (isPlainObject(vue)) {
      Object.assign(customRuleRecord, vue)
    }

    eslintConfig.push(...vueConfigs)
  }

  if (Array.isArray(ignores)) {
    eslintConfig.push({
      ignores,
    })
  }

  return eslintConfig
}

export default defineConfig
