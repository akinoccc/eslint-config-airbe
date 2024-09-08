import { Linter } from 'eslint'
import unusedImports from 'eslint-plugin-unused-imports'
import { CustomConfigItem, type EslintFlagConfig } from '../types'
import { isPlainObject } from '../utils'

export function getUnusedImportsConfig(unusedImportsConfig?: CustomConfigItem, useTpeScriptEslint?: boolean): EslintFlagConfig[] {
  if (unusedImportsConfig) {
    const unusedImportsRules: Linter.RulesRecord = {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    }

    if (useTpeScriptEslint && (unusedImportsConfig === true || unusedImportsConfig['unused-imports/no-unused-vars'] !== 'off'))
      Object.assign(unusedImportsRules, { '@typescript-eslint/no-unused-vars': 'off' })

    if (isPlainObject(unusedImportsConfig))
      Object.assign(unusedImportsRules, unusedImportsConfig)

    return [
      {
        plugins: {
          'unused-imports': unusedImports,
        },
        rules: unusedImportsRules,
      },
    ]
  }
  return []
}
