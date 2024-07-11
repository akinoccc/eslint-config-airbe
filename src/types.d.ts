declare module '@eslint/js' {
  import type { Linter } from 'eslint'

  const configs : {
    all: Linter.FlatConfig[]
    recommended: Linter.FlatConfig[]
  }
}

declare module 'eslint-plugin-vue' {
  import type { Linter } from 'eslint'

  const configs: {
    'flat/base': Linter.FlatConfig[]
    'flat/essential': Linter.FlatConfig[]
    'flat/recommended': Linter.FlatConfig[]
    'flat/strongly-recommended': Linter.FlatConfig[]
  }
}
