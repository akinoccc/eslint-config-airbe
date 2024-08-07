import { Linter } from 'eslint'
import { isPlainObject } from '../utils'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tseslint from 'typescript-eslint'
import type { CustomConfigItem, EslintFlagConfig } from '../types'

export function getVueConfig(vueConfig?: CustomConfigItem): EslintFlagConfig[] {
  if (vueConfig) {
    const vueRules: Linter.RulesRecord = {
      'vue/multi-word-component-names': 'off',
      'vue/no-duplicate-attributes': ['warn', {
        allowCoexistClass: true,
        allowCoexistStyle: true,
      }],
      'vue/no-parsing-error': ['error', {
        'duplicate-attribute': false,
      }],
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        singleline: {
          max: 1,
        },
        multiline: {
          max: 1,
        },
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'beside',
        multiline: 'below',
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
      'vue/attribute-hyphenation': 'error',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-useless-mustaches': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/padding-line-between-blocks': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],
    }

    if (isPlainObject(vueConfig))
      Object.assign(vueRules, vueConfig)

    return [
      ...pluginVue.configs['flat/recommended'],
      {
        languageOptions: {
          parser: vueParser,
          parserOptions: {
            parser: tseslint.parser,
            projectService: true,
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
      },
      {
        rules: vueRules,
      },
    ]
  }
  return []
}
