import type { TSESLint } from '@typescript-eslint/utils'
import type { Linter } from 'eslint'

export type EslintFlagConfig = (Linter.FlatConfig | TSESLint.FlatConfig.Config | Linter.BaseConfig)
export type CustomConfigItem = Linter.RulesRecord | boolean
