# eslint-config-airbe

[![npm](https://img.shields.io/npm/v/eslint-config-airbe)](https://npmjs.com/package/eslint-config-airbe)


> [!NOTE]
> A eslint config preset.

## Install

```bash
npm install eslint-config-airbe --save-dev
```

## Usage

```js
import defineConfig from 'eslint-config-airbe'

export default defineConfig({
  js: {
    "no-console": "error"
  },
  ts: true,
  vue: true,
  stylistic: true,
  importx: true,
  ignores: ["node_modules"],
  globals: {
    bar: true,
    foo: "readonly",
    baz: "writable",
  }
})
```
