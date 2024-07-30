import type { Linter } from 'eslint'
import { isPlainObject } from '../utils'
import eslint from '@eslint/js'
import type { CustomConfigItem, EslintFlagConfig } from '../types'

export function getJsConfig(jsConfig?: CustomConfigItem): EslintFlagConfig[] {
  if (jsConfig) {
    const jsRules: Linter.RulesRecord = {
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
