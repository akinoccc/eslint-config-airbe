"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_js = __toESM(require("@eslint/js"));
var import_typescript_eslint = __toESM(require("typescript-eslint"));
var import_eslint_plugin_vue = __toESM(require("eslint-plugin-vue"));
var import_vue_eslint_parser = __toESM(require("vue-eslint-parser"));

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
      ...import_js.default.configs.recommended,
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
      ...import_typescript_eslint.default.configs.recommendedTypeChecked,
      ...import_typescript_eslint.default.configs.stylisticTypeChecked,
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
          parser: import_vue_eslint_parser.default,
          parserOptions: {
            parser: import_typescript_eslint.default.parser,
            projectService: true,
            EXPERIMENTAL_useProjectService: true,
            ecmaFeatures: {
              jsx: true
            }
          }
        }
      },
      ...import_eslint_plugin_vue.default.configs["flat/recommended"]
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
