import { Linter } from 'eslint'
import eslintImportX from 'eslint-plugin-import-x'
import { CustomConfigItem, type EslintFlagConfig } from '../types'
import { isPlainObject } from '../utils'

export function getImportConfig(importConfig?: CustomConfigItem): EslintFlagConfig[] {
  if (importConfig) {
    const importRules: Linter.RulesRecord = {
      'import-x/no-absolute-path': 'error',
      'import-x/no-unused-modules': 'warn',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
    }

    if (isPlainObject(importConfig))
      Object.assign(importRules, importConfig)

    return [
      eslintImportX.configs.typescript,
      {
        plugins: {
          'import-x': eslintImportX,
        },
        settings: {
          'import-x/resolver': {
            typescript: true,
          },
        },
        rules: importRules,
      },
    ]
  }
  return []
}
