import eslint from '@eslint/js'
import type { Linter } from 'eslint'
import type { CustomConfigItem, EslintFlagConfig } from '../types'
import { isPlainObject } from '../utils'

export function getJsConfig(jsConfig?: CustomConfigItem): EslintFlagConfig[] {
  if (jsConfig) {
    const jsRules: Linter.RulesRecord = {
      "prefer-template": "warn",
      'no-def': 'off',

      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi', 'consistent'],

      'default-case': 'warn',
      'default-case-last': 'warn',
      'no-await-in-loop': 'warn',
      'no-console': 'warn',

      'no-use-before-define': 'error',
      'no-eval': 'error',
    }
    if (isPlainObject(jsConfig))
      Object.assign(jsRules, jsConfig)

    return [eslint.configs.recommended, { rules: jsRules }]
  }
  return []
}
