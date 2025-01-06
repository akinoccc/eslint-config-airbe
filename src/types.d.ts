import type { TSESLint } from '@typescript-eslint/utils'
import type { Linter } from 'eslint'
import type { Config } from 'typescript-eslint'

export type EslintFlagConfig = Config | Linter.FlatConfig | TSESLint.FlatConfig.Config | Linter.BaseConfig
export type CustomConfigItem = Linter.RulesRecord | boolean
