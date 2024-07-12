// src/index.ts
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";

// src/utils.ts
var isPlainObject = (obj) => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

// src/index.ts
var defineConfig = (customConfig) => {
  const eslintConfig = [];
  const customRuleRecord = {};
  const { js, ts, vue, ignores } = customConfig;
  if (js) {
    const jsConfig = {
      ...eslint.configs.recommended,
      rules: {
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "indent": ["error", 2]
      }
    };
    if (isPlainObject(js)) {
      Object.assign(customRuleRecord, js);
    }
    eslintConfig.push(jsConfig);
  }
  if (ts) {
    const tsConfigs = [
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      {
        rules: {
          "@typescript-eslint/prefer-nullish-coalescing": "off"
        }
      }
    ];
    if (isPlainObject(ts)) {
      Object.assign(customRuleRecord, ts);
    }
    eslintConfig.push(...tsConfigs);
  }
  if (vue) {
    const vueConfigs = [
      {
        languageOptions: {
          parser: vueParser,
          parserOptions: {
            parser: tseslint.parser,
            projectService: true,
            EXPERIMENTAL_useProjectService: true,
            ecmaFeatures: {
              jsx: true
            }
          }
        }
      },
      ...pluginVue.configs["flat/recommended"]
    ];
    if (isPlainObject(vue)) {
      Object.assign(customRuleRecord, vue);
    }
    eslintConfig.push(...vueConfigs);
  }
  if (Array.isArray(ignores)) {
    eslintConfig.push({
      ignores
    });
  }
  return eslintConfig;
};
var src_default = defineConfig;
export {
  src_default as default
};
