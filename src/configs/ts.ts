import type { Linter } from 'eslint'
import type { CustomConfigItem, EslintFlagConfig } from '../types'
import { isPlainObject } from '../utils'
import tseslint from 'typescript-eslint'

export function getTsConfig(tsConfig?: CustomConfigItem): EslintFlagConfig[] {
  if (tsConfig) {
    const tsRules: Linter.RulesRecord = {
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/dot-notation': 'warn',
    }

    if (isPlainObject(tsConfig))
      Object.assign(tsRules, tsConfig)

    return [...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked, {
      languageOptions: {
        parserOptions: {
          parser: tseslint.parser,
          projectService: true,
        },
      },
      rules: tsRules,
    }]
  }
  return []
}
