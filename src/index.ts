import eslint from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

import type { TSESLint } from '@typescript-eslint/utils'
import {ESLint, Linter} from 'eslint'
import { isPlainObject } from './utils'

type EslintFlagConfig = (Linter.FlatConfig | TSESLint.FlatConfig.Config)
type CustomConfigItem = Linter.RulesRecord | boolean

interface AirBeConfig {
  js?: CustomConfigItem,
  ts?: CustomConfigItem,
  vue?: CustomConfigItem,
  ignores?: string[],
  globals?: ESLint.Globals,
}

const defineConfig = (config: AirBeConfig, ...customFlatConfigs: EslintFlagConfig[]): EslintFlagConfig[] => {
  const eslintConfig: EslintFlagConfig[] = [],
    { js, ts, vue, ignores, globals } = config

  if (js) {
    const jsRules: Linter.RulesRecord = {
      ...eslint.configs.recommended.rules,
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'indent': ['error', 2],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'multi', 'consistent'],
      'default-case': 'warn',
      'default-case-last': 'warn',
      'no-await-in-loop': 'warn',
      'no-console': 'warn',

      'no-use-before-define': 'error',
      'no-eval': 'error',
    }
    if (isPlainObject(js))
      Object.assign(jsRules, js)


    eslintConfig.push({ rules: jsRules })
  }

  if (ts) {
    const tsRules: Linter.RulesRecord = {
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',

      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/dot-notation': 'warn',
    }

    if (isPlainObject(ts))
      Object.assign(tsRules, ts)


    eslintConfig.push(...tseslint.configs.recommendedTypeChecked, ...tseslint.configs.stylisticTypeChecked, { rules: tsRules })
  }

  if (vue) {
    const vueRules: Linter.RulesRecord = {
      'vue/multi-word-component-names': 'off',
      'vue/no-duplicate-attributes': ['warn', {
        'allowCoexistClass': true,
        'allowCoexistStyle': true
      }],
      'vue/no-parsing-error': ['error', {
        'duplicate-attribute': false
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

    if (isPlainObject(vue))
      Object.assign(vueRules, vue)


    eslintConfig.push(
      ...pluginVue.configs['flat/recommended'],
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
      {
        rules: vueRules,
      }
    )
  }

  if (Array.isArray(ignores))
    eslintConfig.push({
      ignores,
    })

  if(isPlainObject(globals))
    eslintConfig.push({
      languageOptions: {
        globals
      }
    })


  eslintConfig.push({
    files: ['*.json'],
    rules: {
      'no-invalid-meta': 'off',
      'quotes': ['error', 'double'],
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  })

  if (Array.isArray(customFlatConfigs))
    eslintConfig.push(...customFlatConfigs)

  return eslintConfig
}

export default defineConfig
