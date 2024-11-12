https://eslint.nodejs.cn/docs/latest/use/configure/configuration-files

1. **安装与配置**：
   - 安装 ESLint：使用 npm 或 yarn 安装 ESLint 到项目中。
   - 初始化 ESLint 配置：使用命令行工具生成 ESLint 配置文件（如 .eslintrc.json）。
2. **配置文件**：
   - .eslintrc 文件：理解和配置 ESLint 的主要配置文件，定义规则、解析器、环境等。
   - 配置规则：设置和自定义 ESLint 规则，根据项目需要启用、禁用或修改规则的行为。
   - 解析器：配置不同的解析器（如 babel-eslint）以支持最新的 JavaScript 语法或特性。
3. **插件与扩展**：
   - 使用插件：安装和配置 ESLint 插件以支持特定的框架或库（如 React、Vue）。
   - 扩展配置：使用已有的 ESLint 配置扩展（如 eslint-config-airbnb、eslint-config-prettier）以简化规则配置。
4. **命令行使用**：
   - 运行 ESLint：通过命令行运行 ESLint 检查代码，理解基本命令和参数（如 eslint .、--fix）。
   - 处理输出：理解和处理 ESLint 的输出，修复报告的问题。
5. **与编辑器集成**：
   - 编辑器插件：安装和配置编辑器插件（如 VSCode ESLint 插件）以在代码编写时实时显示 ESLint 报告。
   - 自动修复：配置编辑器自动修复常见的 ESLint 报告问题，提高开发效率。
6. **与工具链集成**：
   - 集成到构建过程：在构建工具（如 Webpack、Gulp）中集成 ESLint，以在构建时自动运行代码检查。
   - 与 Git Hooks 集成：使用工具（如 Husky、Lint-Staged）在 Git 提交时运行 ESLint，确保提交代码的质量。

用于识别和报告 JavaScript 代码中存在的问题的工具

使用 vite 默认创建的项目，ESLint 帮我们创建了 .eslintrc.cjs 配置文件（cjs 是指 CommonJS 格式）。

生成的配置文件继承了 "eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended" ，我们如果需要配置自己的 lint 规则可以在 rules 中添加。

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

### **配置项解读配置项解读**

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

### **总结**

这个 ESLint 配置文件设置了一个针对 TypeScript 和 React 项目的代码检查环境，扩展了推荐的规则集，并添加了一些特定插件（如 **`react-refresh`**）来支持 React 组件的快速刷新。它还忽略了打包输出目录和另一个 ESLint 配置文件，确保检查范围仅限于源代码。通过自定义规则，开发者可以确保代码质量和一致性，并提高开发效率。

vite-plugin-eslint 报错
https://blog.csdn.net/m0_53022813/article/details/137379480
https://html-eslint.org/docs/rules

```shell
 pnpm run lint:

> react-demo@0.0.0 lint /Users/xuxunsheng/Desktop/workspace/demo/react-demo/react-demo
> eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 "/Users/xuxunsheng/Desktop/workspace/demo/react-demo/react-demo/vite.config.ts"


/Users/xuxunsheng/Desktop/workspace/demo/react-demo/react-demo/src/App.tsx
  21:64  error  Replace `⏎··········count·is·{count}⏎········` with `count·is·{count}`                                                            prettier/prettier
  28:36  error  Replace `⏎········Click·on·the·Vite·and·React·logos·to·learn·more⏎······` with `Click·on·the·Vite·and·React·logos·to·learn·more`  prettier/prettier

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.
```

prettier/prettier 规则报错：

- 跟哪个配置项有问题啊？
- 怎么修改啊，lint-staged 不是应该自动修正吗？

eslint中包含三类规则：代码质量检查、代码错误检查、代码风格检查
prettier包含：代码风格检查

将 prettier 的 `printWidth` 改成 80 就好了。
可能vscode prettier 插件是 80，而项目内配置为 100 了。


**`eslint-config-prettier`** 和 **`eslint-plugin-prettier`** 是两个用于集成和配置 Prettier 与 ESLint 的 npm 包。它们主要用来在项目中同时使用 ESLint 和 Prettier，并解决它们之间的冲突，确保代码风格和质量的一致性。


### **`eslint-config-prettier`**

### **用途**

**`eslint-config-prettier`** 是一个用于关闭所有与 Prettier 冲突的 ESLint 规则的配置。Prettier 是一个代码格式化工具，而 ESLint 是一个代码质量和风格检查工具。当两者结合使用时，某些 ESLint 规则可能与 Prettier 的格式化规则冲突。**`eslint-config-prettier`** 通过禁用这些冲突的 ESLint 规则，确保 Prettier 的格式化规则可以正确应用。

### **使用方法使用方法**

1. **安装**：
   `pnpm install --save-dev eslint-config-prettier`
2. **配置**：
   在 ESLint 配置文件（如 **`.eslintrc.json`** 或 **`.eslintrc.js`**）中扩展 **`prettier`**：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ]
}
```

### **`eslint-plugin-prettier`**

### **用途**

**`eslint-plugin-prettier`** 是一个 ESLint 插件，用于将 Prettier 作为 ESLint 规则运行。这意味着 Prettier 可以作为 ESLint 的一部分运行，并在 ESLint 的输出中报告格式化问题。这种集成使得可以在代码编辑器中实时看到 Prettier 的格式化问题，并通过 ESLint 的 CLI 工具来自动修复这些问题。

### **使用方法**

1. **安装**：

```shell
npm install --save-dev eslint-plugin-prettier prettier
```

2. **配置**：
   在 ESLint 配置文件中添加 **`prettier`** 插件，并在规则中启用 Prettier：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### **示例完整配置**

结合使用 **`eslint-config-prettier`** 和 **`eslint-plugin-prettier`** 的完整示例配置：

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

### **总结**

- **`eslint-config-prettier`**：用于关闭与 Prettier 冲突的 ESLint 规则，确保 Prettier 的格式化规则可以生效。
- **`eslint-plugin-prettier`**：将 Prettier 作为 ESLint 规则运行，使得 Prettier 的格式化问题可以通过 ESLint 进行报告和自动修复。

通过这两个包的结合，您可以同时享受 ESLint 的代码质量检查和 Prettier 的代码格式化能力，而无需担心两者之间的冲突。

## 参考

https://juejin.cn/post/7202896198608863269
https://prettier.nodejs.cn/docs/en/precommit.html
https://antfu.me/posts/why-not-prettier-zh

