使用 vite 默认创建的项目，ESLint 帮我们创建了 .eslintrc.cjs 配置文件（cjs 是指 CommonJS 格式）。

生成的配置文件继承了 `eslint:recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended` ，我们如果需要配置自己的 lint 规则可以在 rules 中添加。

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ]
  }
}
```

### 配置项解读配置项解读

1. **root**:
   - **`root: true`**：表示此配置文件是项目的根配置文件，ESLint 在找到此文件后不会再向上查找其他配置文件。
2. **env**:
   - **`env: { browser: true, es2020: true }`**：设置代码运行的环境。
     - **`browser: true`**：代码运行在浏览器环境中，预定义浏览器的全局变量（如 **`window`**）。
     - **`es2020: true`**：启用 ES2020 的语法支持。
3. **extends**:
   - **`extends`**：扩展现有的 ESLint 配置，这些配置提供了一组预定义的规则。
     - **`'eslint:recommended'`**：启用 ESLint 推荐的规则。
     - **`'plugin:@typescript-eslint/recommended'`**：启用 TypeScript 的 ESLint 插件推荐的规则，适用于 TypeScript 项目。
     - **`'plugin:react-hooks/recommended'`**：启用 React Hooks 的 ESLint 插件推荐的规则，确保 React Hooks 的正确使用。
4. **ignorePatterns**:
   - **`ignorePatterns: ['dist', '.eslintrc.cjs']`**：指定 ESLint 应忽略的文件和目录。
     - **`dist`**：忽略打包后的输出目录。
     - **`.eslintrc.cjs`**：忽略另一个 ESLint 配置文件。
5. **parser**:
   - **`parser: '@typescript-eslint/parser'`**：使用 TypeScript ESLint 解析器来解析 TypeScript 代码。
6. **plugins**:
   - **`plugins: ['react-refresh']`**：使用 **`react-refresh`** 插件，该插件帮助实现 React 组件的快速刷新（Hot Reloading）。
7. **rules**:
   - **`rules`**：自定义 ESLint 规则。
     - **`'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]`**：配置 **`react-refresh`** 插件的规则。
       - **`'warn'`**：将此规则设置为警告级别。'warn'：将此规则设置为警告级别。
       - **`{ allowConstantExport: true }`**：允许导出常量组件。
  

## rules
### 1. **启用或禁用规则**

每个规则可以通过设置为 `"off"`, `"warn"`, 或 `"error"` 来关闭、发出警告或报错。例如：

```jsx
module.exports = {
  rules: {
    "no-console": "warn", // 使用 console.log 时发出警告
    "no-debugger": "error", // 使用 debugger 时报错
    "eqeqeq": "off" // 允许使用 == 和 != 而不是 === 和 !==
  }
};

```

### 2. **自定义规则的具体行为**

有些规则允许你传递额外的配置选项来调整它们的行为。例如：

```jsx
module.exports = {
  rules: {
    "quotes": ["error", "single"], // 强制使用单引号，且不符合时报错
    "indent": ["error", 2], // 强制使用 2 个空格缩进
    "max-len": ["warn", { "code": 80 }] // 每行最多 80 个字符，超过时发出警告
  }
};

```

### 3. **结合多个选项进行配置**

某些规则允许更复杂的配置，通过数组传递多种选项：

```jsx
module.exports = {
  rules: {
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "comma-dangle": ["error", "always-multiline"], // 在多行结构中要求使用拖尾逗号
    "object-curly-spacing": ["error", "always"] // 对象大括号内要求使用空格
  }
};

```

### 4. **覆盖 ESLint 默认行为**

你可以通过配置 `rules` 覆盖 ESLint 的默认规则。例如：

```jsx
module.exports = {
  rules: {
    "no-var": "error", // 禁止使用 var
    "prefer-const": "error", // 强制使用 const 代替 let
    "no-underscore-dangle": "off" // 允许在标识符中使用下划线
  }
};
```

### 5. **使用插件规则**

当你使用 ESLint 插件时，你可以引用插件的规则。例如，使用 `eslint-plugin-react` 来处理 React 特定的规则：

```jsx
module.exports = {
  plugins: ["react"],
  rules: {
    "react/jsx-uses-react": "off", // 在 React 17+ 中不再需要显式引入 React
    "react/jsx-uses-vars": "error" // 确保 JSX 中使用的变量被正确标识
  }
};
```

### 6. **嵌套规则**

有时，你可能希望在某个特定文件或文件夹中定义不同的规则。这可以通过 `overrides` 配置来实现：

```jsx
module.exports = {
  overrides: [
    {
      files: ["*.test.js"],
      rules: {
        "no-unused-expressions": "off" // 测试文件中允许未使用的表达式
      }
    }
  ]
};

```

### 总结

`rules` 部分是 ESLint 配置文件的核心，通过它你可以精确控制代码质量检查的细节。理解和合理配置这些规则能够极大地提升团队的代码一致性和代码质量。