import type { CustomConfigItem } from "../types";
import {Linter} from "eslint";
import {isPlainObject} from "../utils";
import stylisticEslint from "@stylistic/eslint-plugin";

export default function getStylisticConfig(stylisticConfig?: CustomConfigItem) {
  if (stylisticConfig) {
    const stylisticRules: Linter.RulesRecord = {
      '@stylistic/no-trailing-spaces': ['error', { skipBlankLines: true }],
    }

    if (isPlainObject(stylisticConfig))
      Object.assign(stylisticRules, stylisticConfig)

    return [
      stylisticEslint.configs.customize({
        quoteProps: 'as-needed',
      }),
      {
        rules: stylisticRules,
      },
    ]
  }
  return []
}
