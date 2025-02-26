// https://github.com/remix-run/react-router/blob/dev/examples/navigation-blocking/src/App.tsx
// 基于 React Router 实现的导航拦截示例
// 功能：
// 1. 表单状态保护：防止用户意外离开未保存的表单
// 2. 导航确认：提供用户确认机制
// 3. 状态追踪：监控表单状态和导航历史
// 4. 条件拦截：根据条件决定是否阻止导航
//
// 主要使用的 API：
// - useBlocker：实现导航拦截
// - BlockerFunction：定义拦截条件
//
// 实现要点：
// 1. 表单状态管理：
//    - 追踪表单数据变化
//    - 判断表单是否被修改
//    - 处理表单提交后的状态重置
//
// 2. 拦截器设计：
//    - 自定义拦截条件
//    - 处理不同的拦截状态
//    - 提供用户操作选项
//
// 3. 用户体验优化：
//    - 清晰的状态提示
//    - 友好的确认界面
//    - 保持导航历史可见

// useBlock
// blocker 返回的值
// {
//   state: "unblocked" | "blocked" | "proceeding"; 没有拦截 | 拦截 | 正在处理
//   proceed: () => void; 继续跳转
//   reset: () => void; 取消拦截
// }

import * as React from "react";
import type { Blocker, BlockerFunction } from "react-router-dom";
import { useActionData } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Form,
  json,
  Link,
  Outlet,
  Route,
  RouterProvider,
  useBlocker,
  useLocation,
} from "react-router-dom";

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<h2>Index</h2>} />
      <Route path='one' element={<h2>One</h2>} />
      <Route path='two' element={<h2>Two</h2>} />
      <Route
        path='three'
        action={() => json({ ok: true })}
        element={
          <>
            <h2>Three</h2>
            <ImportantForm />
          </>
        }
      />
      <Route path='four' element={<h2>Four</h2>} />
      <Route path='five' element={<h2>Five</h2>} />
    </Route>
  )
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} />;
}

function Layout() {
  let [historyIndex, setHistoryIndex] = React.useState(window.history.state?.idx);
  let location = useLocation();

  // Expose the underlying history index in the UI for debugging
  React.useEffect(() => {
    setHistoryIndex(window.history.state?.idx);
  }, [location]);

  // Give us meaningful document titles for popping back/forward more than 1 entry
  React.useEffect(() => {
    document.title = location.pathname;
  }, [location]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Navigation Blocking Example</h1>

        <nav className='bg-white shadow-sm rounded-lg p-4 mb-6'>
          <div className='flex flex-wrap gap-4'>
            <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
              Index
            </Link>
            <Link to='/one' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
              One
            </Link>
            <Link to='/two' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
              Two
            </Link>
            <Link to='/three' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
              Three (Form with blocker)
            </Link>
            <Link to='/four' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
              Four
            </Link>
            <Link to='/five' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
              Five
            </Link>
          </div>
        </nav>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <p className='text-gray-600 mb-4'>
            Current location (index): {location.pathname} ({historyIndex})
          </p>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function ImportantForm() {
  let actionData = useActionData() as { ok: boolean } | undefined;
  let [value, setValue] = React.useState("");
  // Allow the submission navigation to the same route to go through
  let shouldBlock = React.useCallback<BlockerFunction>(
    ({ currentLocation, nextLocation }) => value !== "" && currentLocation.pathname !== nextLocation.pathname,
    [value]
  );
  let blocker = useBlocker(shouldBlock);

  // Clean the input after a successful submission
  React.useEffect(() => {
    if (actionData?.ok) {
      setValue("");
    }
  }, [actionData]);

  // Reset the blocker if the user cleans the form
  React.useEffect(() => {
    if (blocker.state === "blocked" && value === "") {
      blocker.reset();
    }
  }, [blocker, value]);

  return (
    <div className='space-y-6'>
      <p className='text-gray-700'>
        Is the form dirty?{" "}
        {value !== "" ? (
          <span className='text-red-600 font-medium'>Yes</span>
        ) : (
          <span className='text-green-600 font-medium'>No</span>
        )}
      </p>

      <Form method='post' className='space-y-4'>
        <div className='space-y-2'>
          <label className='block text-gray-700'>
            Enter some important data:
            <input
              name='data'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                       focus:border-blue-500 focus:ring-blue-500'
            />
          </label>
        </div>
        <button
          type='submit'
          className='px-4 py-2 bg-blue-600 text-white font-medium rounded-lg
                   hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2 transition-colors'
        >
          Save
        </button>
      </Form>

      {blocker ? <ConfirmNavigation blocker={blocker} /> : null}
    </div>
  );
}

function ConfirmNavigation({ blocker }: { blocker: Blocker }) {
  if (blocker.state === "blocked") {
    return (
      <div className='mt-6 p-4 bg-red-50 border border-red-100 rounded-lg'>
        <p className='text-red-600 mb-4'>Blocked the last navigation to {blocker.location.pathname}</p>
        <div className='space-x-4'>
          <button
            onClick={() => blocker.proceed?.()}
            className='px-4 py-2 bg-red-600 text-white font-medium rounded-lg
                     hover:bg-red-700 focus:outline-none focus:ring-2 
                     focus:ring-red-500 focus:ring-offset-2 transition-colors'
          >
            Let me through
          </button>
          <button
            onClick={() => blocker.reset?.()}
            className='px-4 py-2 bg-gray-600 text-white font-medium rounded-lg
                     hover:bg-gray-700 focus:outline-none focus:ring-2 
                     focus:ring-gray-500 focus:ring-offset-2 transition-colors'
          >
            Keep me here
          </button>
        </div>
      </div>
    );
  }

  if (blocker.state === "proceeding") {
    return <p className='mt-4 text-orange-600'>Proceeding through blocked navigation</p>;
  }

  return <p className='mt-4 text-green-600'>Blocker is currently unblocked</p>;
}
