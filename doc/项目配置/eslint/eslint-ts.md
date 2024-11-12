- [ ] 默认配置
- [ ] 如何修改默认配置？即 tsconfig.json 和 .eslintrc.json

与 TypeScript 的集成
在使用 TypeScript 时，ESLint 需要额外的配置来理解 TypeScript 的语法。例如，通过使用 `@typescript-eslint/parser` 作为解析器，使 ESLint 能够解析 TypeScript 文件。你还可以使用 `@typescript-eslint/eslint-plugin` 来加载 TypeScript 专用的规则。

* ESLint 可以通过 @typescript-eslint/parser 解析 TypeScript 文件，并结合 tsconfig.json 中的配置（如路径别名、编译目标等）来准确地理解 TypeScript 代码的结构。
* 当 ESLint 分析 TypeScript 文件时，它需要了解 TypeScript 的类型信息、路径别名等，而这些信息通常存储在 tsconfig.json 中。@typescript-eslint/parser 可以通过指定 project 选项来找到 tsconfig.json 并使用其中的配置信息。

