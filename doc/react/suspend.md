## suspend

目前函数组件的声明大致如下：

```jsx
function component() {
  ...
  return ....
}
```

而异步代码是不能直接出现在组件声明中，通常是

```jsx
useEffect(() => {
  const initFn = async () => {
    ....
  }
  initFn();
},[])
```

也就是涉及组件初始化的异步代码（http请求），是通过 useEffect 等 hook实现的。

未来能否有异步组件呢？组件能直接使用异步任务返回的数据，例如：

```jsx
async function component() {
  ...
  const data = await fetchData();
  return ....
}
```

而 suspend 是两者的过渡，通过子组件中 throw 一个 promise，让组件在加载数据时暂停渲染，直到数据加载完成。具体见原理一节。

### 用处

1. **异步加载组件**：
   **`Suspense`** 组件可以用来包裹那些需要异步加载的组件。当组件正在加载时，**`Suspense`** 会展示其 **`fallback`** 属性中指定的内容，通常是一个加载动画或占位符 。
2. **延迟数据加载**：
   除了异步加载组件，**`Suspense`** 也可以用于等待数据加载。当某个组件需要的数据还未加载完成时，**`Suspense`** 会显示备用内容，直到数据加载完成为止 。
3. **灵活性**：
   加载数据的组件不必是 **`Suspense`** 边界的直接子组件。可以将需要异步加载的组件移动到另一个组件中，而不会影响 **`Suspense`** 的行为 。

本质上是一个特殊的 error boundary, 需要与支持 Suspense 的框架或库结合使用，以实现数据加载和渲染的最佳效果。

### 结果

在异步的中间态展示 fallback 内容，在完成之后展示正常的组件。

### 原理

suspend 如何知道组件渲染过程中异步加载数据？
答： 自组件将 pending 状态的 promise 当成 error throw 出来

```js
function wrapPromise(promise) {
  let status = 'pending'
  let result

  let suspender = promise.then(
    (res) => {
      status = 'success'
      result = res
    },
    (err) => {
      status = 'error'
      result = err
    }
  )
  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw result
      } else {
        return result
      }
    }
  }
}
```

在组件中：

```jsx
function Component() {
  const data = wrapPromise(fetchData()).read()
  return <div>{data}</div>
}
```

当 `fetchData` throw 的 promise 为 pending 时， suspend 组件渲染 fallback，
当该 promise 变为 success/error 时，suspend 重新渲染正常的组件。

suspend 组件捕获 promise 简单实现：

```jsx
class Suspense extends React.Component {
  state = {
    promise: null
  }

  componentDidCatch(e) {
    if (e instanceof Promise) {
      this.setState(
        {
          promise: e
        },
        () => {
          e.then(() => {
            this.setState({
              promise: null
            })
          })
        }
      )
    }
  }

  render() {
    const { fallback, children } = this.props
    const { promise } = this.state
    return <>{promise ? fallback : children}</>
  }
}
```

## react-cache

peerdependency 的 react 还是 16.3，搞笑
没啥热度和更新。
实际上还可以使用 react-query/swr

## errorboundary

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
```

对 suspend 的支持

1. **React Cache**：
   React Cache 是一个官方实验性库，提供与 Suspense 兼容的数据请求功能，帮助实现数据获取和缓存。
2. **Relay**：
   Relay 是 Facebook 提供的 GraphQL 客户端，已经集成了对 Suspense 的支持，使得在处理数据时更高效和便捷。
3. **SWR**：
   由 Vercel 团队开发的 SWR 库支持 React Suspense，可以轻松处理数据请求和缓存。SWR 提供了内置的 Suspense 支持，使其在数据获取时非常强大。
4. **React Query**：
   React Query 是一个强大的数据同步库，支持与 Suspense 集成，允许在组件挂起期间处理异步数据请求。它还提供了丰富的功能来管理数据缓存和状态。
