- startTransition
- useTransition
- useDeferredValue

## 概念

**并发模式下的状态更新分类**:
在React的并发模式中，更新被分为不同的优先级类别，其中某些更新（如输入处理）被认为是紧急的，而其他更新（如从服务器获取数据）则被认为是非紧急更新，可以中断或者延后更新。例如输入框的输入处理，它需要立即更新，而根据输入内容展示的搜索联想（从服务器获取数据）的更新则可以延后处理。

## 使用

### 基本使用

```jsx
function comonent() {
  const [isPending, startTransition] = useTransition();
  ...;

  return ...;
}
```

`idPending`
`isPending` 提供了一个标识，标志着是否有一个`startTransition`正在执行，可以根据`isPending`来设置过渡状态的样式。

`startTransition`
用来处理执行 state 更改，标志着非紧急更新，如果有更重要的更新要处理，react 可以中断或延后这个次要更新。当存在多个 transition，他们会被合并，旧的会被遗弃。

### 结合业务

主要是提升渲染性能，避免不必要的渲染过多的占用 JS 线程导致页面卡顿。

- 结合路由加载
- 列表数据的加载，搜索框的联想
- 组件交互时复杂动画的渲染

## 原理

### best-practice

## startTransition

`startTransition(scope) `
`startTransition` 函数可以将 state 更新标记为 transition。

- 没有提供一种跟踪 Transition 是否处于待定状态的方法。
- 只有当你能访问某个 state 的 set 函数时，你才能将它的更新包裹到 Transition 中。如果你想根据 props 或自定义 Hook 的返回值来启动一个 transition，请尝试使用 useDeferredValue。
- 你传递给 startTransition 的函数必须是同步的。React 会立即执行此函数，将其执行期间发生的所有 state 更新标记为 transition。如果你想试着稍后执行更多的 state 更新（例如，在 timeout 中），它们不会被标记为转换。
- 一个被标记为 Transition 的 state 更新时将会被其他 state 更新打断。例如，如果你在 Transition 内部更新图表组件，但在图表重新渲染时在输入框中打字，则 React 将先处理输入 state 更新，之后才会重新启动对图表组件的渲染工作。
- Transition 更新不能用于控制文本输入。
- 如果有多个正在进行的 transition，当前 React 会将它们集中在一起处理。这是一个限制，在未来的版本中可能会被移除。

## useDeferredValue

和useTransition一样，useDeferredValue只会中断或延迟UI的渲染，不会阻止网络请求。
useDeferredValue与<Suspense>结合使用，在useDeferredValue更新时，<Suspense>的fallback是不会出现的，页面上是继续显示useDeferredValue的旧值。这一点和useTransition不一样。

- 当同一个`useDeferredValue`在渲染前接收到多次不同的值时，只有最后一个会被渲染。想象一下，前端在做大数据量查询的时候，我们当然希望只有最后一次查询的数据成功渲染。
- 和`useTransition`一样，`useDeferredValue`只会中断或延迟UI的渲染，**不会阻止网络请求**。
- `useDeferredValue`与`<Suspense>`结合使用，在`useDeferredValue`更新时，`<Suspense>`的fallback是不会出现的，页面上是继续显示`useDeferredValue`的旧值。这一点和`useTransition`不一样。
