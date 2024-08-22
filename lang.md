# mobx
## 核心概念
* 响应式
* 不可变

## 基础 demo
* 创建一个 store，
  * 设置 observable state
  * 设置 computed state （也就是文档所说的 derived）
  * 设置 action 修改 state
* 创建一个 observer 组件
  * 使用 store 的 state
  * 展示 computed state
  * 使用 action 修改 state，展示响应式效果

## store
* makeObservable/makeAutoObservable
* observable
* computed
* action

## component
observer
action
inject

## 注意事项

## 总结
* 掌握如何创建 store
  * Observables: 使用 observable 来创建可观察的状态，这些状态可以是对象、数组等。
  * Actions: 使用 action 来定义可以修改状态的操作。
  * Reactions: 使用 autorun、when、reaction 等来创建对状态的响应式效果。
  * computed 来创建基于状态的计算属性。
* 组件 reactive:  
  使用 @observer 装饰器或 observer 函数，使 React 组件能够响应 MobX 状态的变化。
* 异步 action   
  使用 action 和 flow 来处理同步和异步的状态更新。
* 多 store 情况下，创建 root store 管理多个 store，内部存储这些 store 的引用。  
  并且 store 可以分为 domain store 和 ui store，domain store 负责业务逻辑，ui store 负责 UI 逻辑。
* 使用 fetch 或其他 HTTP 请求库来与后端 API 进行交互。处理异步操作，例如数据的加载和保存。

深入（原理，应用，生态）
MobX Middlewares: 使用 Middlewares 来截获和处理 actions，可以用于日志记录、调试等目的。
MobX Derivations and Reactions: 更深入地了解和使用 MobX 的衍生（derivation）和反应（reaction），这包括 reaction、when、autorun 的详细用法。
MobX and Immer Integration: 结合 Immer 库来实现更简单的状态更新，避免手动编写不可变的更新逻辑。
MobX Tree Shaking: 了解如何优化 MobX 的使用，以便于 Tree Shaking，减小最终打包体积。
MobX and TypeScript Best Practices: 使用 TypeScript 时，了解如何最佳地结合 MobX，包括类型定义、泛型、和 TypeScript 的高级用法。
MobX and React Context API Integration: 了解如何与 React 的 Context API 集成，以在应用的不同组件之间传递和共享 MobX stores。
MobX and Code Splitting: 在使用代码分割时，了解如何处理异步加载的模块中的状态。

资料
https://blog.logrocket.com/using-mobx-for-large-scale-enterprise-state-management/
使用 mobx 制作的包含 api，router，react 的多 store 应用

https://ironlu233.github.io/posts/17/1.html
mobx 的实践经验

https://cn.mobx.js.org/
mobx 中文文档