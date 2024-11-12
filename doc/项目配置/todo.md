- [ ] prettier lint tsconfig husky

关于前端项目的prettier lint，需要了解什么？以下内容是不是？除了这些还有吗？
1. 设置格式化规则，并结合 ide vscode 的 settings.json 以及 Prettier - Code formatter 插件，在编辑代码时自动格式化
2. 设置 lint 规则，在运行代码时自动进行代码检查
3. 设置 tsconfig，在编辑代码时，ide 能自动进行报错
4. 设置 ts 的lint 规则，在pnpm run dev 时自动进行报错
5. 设置 husky 钩子函数，在 commit 时自动格式化代码，并且如果出现 lint 错误时停止
6. 修改 prettier 配置文件，并且同步 lint 配置
7. 修改 lint 规则，并且同步 prettier 配置文件

能讲讲 eslintrc 中 extends parser plugins 是什么吗？
`extends` 用于扩展和继承现有的 ESLint 配置。你可以继承多个配置，这些配置可以是 ESLint 内置的、社区维护的或你自己的配置。

- **内置配置**：例如 `"eslint:recommended"`，这是 ESLint 自带的一组推荐规则。
- **插件推荐配置**：例如 `"plugin:@typescript-eslint/recommended"`，这是 TypeScript ESLint 插件提供的一组推荐规则。
- **共享配置**：例如 `"airbnb"` 或 `"prettier"`，这些是社区共享的配置，需要安装相应的 npm 包。
  
`parser` 指定用于解析代码的解析器。默认解析器是 `espree`，但是如果你使用 TypeScript 或其他语言扩展，你需要指定相应的解析器。

- **默认解析器**：`espree`
- **TypeScript 解析器**：`@typescript-eslint/parser`
- **Babel 解析器**：`babel-eslint`

`plugins` 用于引入 ESLint 插件，这些插件可以提供额外的规则或功能。插件通常与 `extends` 配合使用，以启用插件提供的规则。

- **TypeScript 插件**：`@typescript-eslint`
- **React 插件**：`react`、`react-hooks`
- **Jest 插件**：`jest`

`rule` 覆盖插件规则


prettier 的配置和使用
配置文件 .prettierrc

eslint 的配置和使用
配置文件 