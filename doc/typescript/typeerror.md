is not a valid JSX element type

`jsx: "react"` 是 TypeScript 配置文件 `tsconfig.json` 中的一个选项，它告诉 TypeScript 编译器如何处理 `.tsx` 文件中的 JSX 语法。这个配置项的主要作用和用途如下：

### 作用

1. **启用 JSX 解析**:
    - 当 `jsx` 选项设置为 `"react"` 时，TypeScript 编译器会启用对 JSX 语法的支持，允许在 TypeScript 文件中使用 JSX。这样你就可以在 `.tsx` 文件中编写类似于 HTML 的 JSX 代码。
2. **指定 JSX 的编译结果**:
    - `jsx: "react"` 会将 JSX 代码编译成 `React.createElement` 调用。这是 React 的标准运行时编译模式。

### 可选值

`jsx` 选项有多个可选值，每个值对应不同的编译行为：

1. **`"preserve"`**:
    - 保留 JSX 语法，不对其进行转换。编译后的输出文件仍然包含 JSX，需要一个后续的转换工具（如 Babel）来处理 JSX。
    
    ```json
    {
      "compilerOptions": {
        "jsx": "preserve"
      }
    }
    
    ```
    
2. **`"react"`**:
    - 将 JSX 语法转换为 `React.createElement` 调用。这是最常用的选项，适用于使用 React 的项目。
    
    ```json
    {
      "compilerOptions": {
        "jsx": "react"
      }
    }
    
    ```
    
3. **`"react-jsx"` 和 `"react-jsxdev"`**:
    - 从 TypeScript 4.1 开始引入，支持新的 JSX 转换（不需要显式导入 React）。
    - `"react-jsx"`：用于生产环境。
    - `"react-jsxdev"`：用于开发环境，包含更多调试信息。
    
    ```json
    {
      "compilerOptions": {
        "jsx": "react-jsx"
      }
    }
    
    ```
    
4. **`"react-native"`**:
    - 将 JSX 语法转换为 `React.createElement`，但保留文件扩展名为 `.jsx`。常用于 React Native 项目。
    
    ```json
    {
      "compilerOptions": {
        "jsx": "react-native"
      }
    }
    
    ```
    

### 示例配置文件

你的 `tsconfig.json` 文件中，`jsx: "react"` 选项配置如下：

```json
{
  "compilerOptions": {
    "allowJs": true,
    "target": "ES2020",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "removeComments": true,
    "noImplicitAny": false,
    "moduleResolution": "node",
    "jsx": "react",
    "outDir": "dist",
    "lib": ["dom", "es5", "scripthost", "es6", "ES2017"],
    "downlevelIteration": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}

```

### 解释

- **`jsx: "react"`**: 启用 JSX 语法支持，并将 JSX 编译为 `React.createElement` 调用。
- **其他配置项**: 例如 `allowJs`, `target`, `sourceMap`, `emitDecoratorMetadata` 等，分别用于允许 JavaScript 文件、设置目标 ECMAScript 版本、生成源映射文件、启用装饰器元数据等。

### 总结

`jsx: "react"` 是一个重要的 TypeScript 编译选项，它告诉编译器如何处理 `.tsx` 文件中的 JSX 语法，使得 TypeScript 能够正确解析和编译 JSX 代码，从而在 React 项目中使用 TypeScript 和 JSX。


      Type 'ReactElement<any, string | JSXElementConstructor<any>>' is not assignable to type 'ReactNode'.
        Property 'children' is missing in type 'ReactElement<any, string | JSXElementConstructor<any>>' but required in type 'ReactPortal'.ts(2786)

      
      原因: 因为你的其他库依赖了@types/react或者@types/react-dom，比如项目安装了react-router这个库, 而这个库又安装了18版本的@types/react，导致多个ts校验不通过。

