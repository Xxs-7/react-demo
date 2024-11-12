一般 ESLint 用于检测代码风格代码规范，Prettier 用于对代码进行格式化。

# 配置和使用
配置文件
**文件名**: `.prettierrc`, `.prettierrc.json`, 
**文件名**: `prettier.config.js` 或 `.prettierrc.js`

## 配置项

```js
// 配置几个常用的就可以
module.exports = {
  // 一行最多多少个字符
  printWidth: 150,
  // 指定每个缩进级别的空格数
  tabWidth: 2,
  // 使用制表符而不是空格缩进行
  useTabs: true,
  // 在语句末尾打印分号
  semi: true,
  // 使用单引号而不是双引号
  singleQuote: true,
  // 更改引用对象属性的时间 可选值"<as-needed|consistent|preserve>"
  quoteProps: 'as-needed',
  // 在JSX中使用单引号而不是双引号
  jsxSingleQuote: false,
  // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
  trailingComma: 'es5',
  // 在对象文字中的括号之间打印空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // 在jsx中把'>' 是否单独放一行
  bracketSameLine: false,
  // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
  arrowParens: 'always',
  // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
  rangeStart: 0,
  rangeEnd: Infinity,
  // 指定要使用的解析器，不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准 always\never\preserve
  proseWrap: 'preserve',
  // 指定HTML文件的全局空格敏感度 css\strict\ignore
  htmlWhitespaceSensitivity: 'css',
  // Vue文件脚本和样式标签缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
  endOfLine: 'lf'
}
```

## 格式化命令

一般的命令都是`prettier --write` ，这会格式化我们整个项目中的所有代码，为了避免这种情况，有两种方式：

✅ 方式一：在原有命令后面加上文件限制 `prettier --write src/`，表示只格式化 src 文件下的所有文件；

文件名：`.prettierignore`
配置：

使用这种方式，要增加的忽略文件太多了，好麻烦的，如果大家想练手自己配置玩一下，可以去 Prettier 中文网 看一看格式啥的【进首页 ➡ 点击头部 开发文档 ➡ 左侧导航栏 用法 ➡ 忽略代码】；

```txt
// 忽略以 .git .svn .hg 为后缀的文件
**/.git
**/.svn
**/.hg

// 忽略 node_modules 下的所有文件
**/node_modules
**/dist
**/mock
**/public
```

## vscode 配置

- 安装插件 Prettier - Code formatter
- `alt + shift + f`: 格式化当前文件快捷键
- 保存时自动格式化: `"editor.formatOnSave": true`
- vscode 配置文件: `.vscode/settings.json`
- 如果项目下没有 `prettier` 文件，默认使用全局配置


.vscode/settings
奇怪的问题
* Prettier - Code formatter 无法识别 .prettier 配置文件
* Prettier 配置文件修改后，需要刷新或者等一下才能生效