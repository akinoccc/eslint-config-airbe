import { Linter } from 'eslint';
import { TSESLint } from '@typescript-eslint/utils';

type EslintFlagConfig = (Linter.FlatConfig | TSESLint.FlatConfig.Config);
type CustomConfigItem = Linter.RulesRecord | boolean;
declare const defineConfig: (customConfig: {
    js?: CustomConfigItem;
    ts?: CustomConfigItem;
    vue?: CustomConfigItem;
    ignores?: string[];
}) => EslintFlagConfig[];

export { defineConfig as default };
