// https://github.com/remix-run/react-router/blob/dev/examples/error-boundary/src/App.tsx
// 基于 React Router 实现的错误边界处理示例
// 功能：
// 1. 多层级错误边界：支持路由级别和组件级别的错误处理
// 2. 错误类型区分：区分处理 HTTP 错误响应和运行时错误
// 3. 错误恢复：提供错误状态下的用户操作选项
// 4. 加载状态处理：展示数据加载过程中的临时状态
//
// 主要使用的 React Router API：
// - useRouteError：获取路由错误信息
// - isRouteErrorResponse：判断是否为路由错误响应
// - errorElement：定义路由级别的错误处理组件
// - RouterProvider：提供加载状态展示
//
// 实现要点：
// 1. 错误边界层级设计：
//    - 根级错误边界处理未捕获的错误
//    - 路由级错误边界处理特定业务错误
//    - 错误向上冒泡机制
// 2. 错误处理策略：
//    - HTTP 状态码错误处理
//    - 数据格式错误处理
//    - 运行时错误处理
// 3. 用户体验优化：
//    - 友好的错误提示
//    - 清晰的恢复操作指引
//    - 优雅的加载状态展示

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import { isRouteErrorResponse, json, Link, useLoaderData, useRouteError } from "react-router-dom";

// import {
//   Fallback,
//   Layout,
//   RootErrorBoundary,
//   Project,
//   ProjectErrorBoundary,
//   projectLoader,
// } from "./routes";
interface Project {
  id: string;
  name: string;
  owner: string;
  deadline: string;
  cost: string;
}

export function Fallback() {
  return (
    <div className='text-center py-12 text-gray-600'>
      <p>Performing initial data "load"</p>
    </div>
  );
}

export function projectLoader({ params }: LoaderFunctionArgs) {
  if (params.projectId === "unauthorized") {
    throw json({ contactEmail: "administrator@fake.com" }, { status: 401 });
  }
  if (params.projectId === "broken") {
    // Uh oh - in this flow we somehow didn't get our data nested under `project`
    // and instead got it at the root - this will cause a render error!
    return json({
      id: params.projectId,
      name: "Break Some Stuff",
      owner: "The Joker",
      deadline: "June 2022",
      cost: "FREE",
    });
  }
  return json({
    project: {
      id: params.projectId,
      name: "Build Some Stuff",
      owner: "Joe",
      deadline: "June 2022",
      cost: "$5,000 USD",
    },
  });
}

export function Layout() {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <nav className='mb-8'>
        <div className='flex space-x-4'>
          <Link to='/projects/authorized' className='text-blue-600 hover:text-blue-800 font-medium'>
            Authorized Project
          </Link>
          <span className='text-gray-300'>|</span>
          <Link to='/projects/unauthorized' className='text-blue-600 hover:text-blue-800 font-medium'>
            Unauthorized Project
          </Link>
          <span className='text-gray-300'>|</span>
          <Link to='/projects/broken' className='text-blue-600 hover:text-blue-800 font-medium'>
            Broken Project
          </Link>
        </div>
      </nav>

      <div className='prose prose-gray max-w-none mb-8'>
        <p className='text-gray-600'>
          This example shows the flexibility of{" "}
          <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>
            &lt;Route errorElement&gt;
          </code>
        </p>

        <ul className='space-y-2 text-gray-600'>
          <li>
            Clicking the "Authorized Project" link will take you to the happy path where we successfully load and render
            the details for a project.
          </li>
          <li>
            Clicking the "Unauthorized Project" link will simulate a case where the user does not have access to the
            given project, so our loader can throw a 401 response that is handled in-context by a{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>
              &lt;ProjectErrorBoundary&gt;
            </code>
            .
          </li>
          <li>
            Clicking the "Broken Project" link will return some malformed data causing a render error. This is beyond
            what{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>
              &lt;ProjectErrorBoundary&gt;
            </code>{" "}
            can handle, so it re-throws the error and it gets handled by{" "}
            <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>
              &lt;RootErrorBoundary&gt;
            </code>{" "}
            instead.
          </li>
        </ul>
      </div>

      <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-100'>
        <Outlet />
      </div>
    </div>
  );
}

export function Project() {
  let { project } = useLoaderData() as { project: Project };

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold text-gray-900'>Project Name: {project.name}</h1>
      <div className='space-y-2 text-gray-600'>
        <p>Owner: {project.owner}</p>
        <p>Deadline: {project.deadline}</p>
        <p>Cost: {project.cost}</p>
      </div>
    </div>
  );
}

export function ProjectErrorBoundary() {
  let error = useRouteError();

  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error;
  }

  return (
    <div className='text-center py-8'>
      <h1 className='text-2xl font-bold text-red-600 mb-4'>You do not have access to this project</h1>
      <p className='text-gray-600'>
        Please reach out to{" "}
        <a href={`mailto:${error.data.contactEmail}`} className='text-blue-600 hover:text-blue-800 underline'>
          {error.data.contactEmail}
        </a>{" "}
        to obtain access.
      </p>
    </div>
  );
}

export function RootErrorBoundary() {
  let error = useRouteError() as Error;

  return (
    <div className='text-center py-12'>
      <h1 className='text-3xl font-bold text-red-600 mb-6'>Uh oh, something went terribly wrong 😩</h1>
      <pre className='bg-gray-50 p-4 rounded-lg text-sm font-mono text-gray-700 mb-6'>
        {error.message || JSON.stringify(error)}
      </pre>
      <button
        onClick={() => (window.location.href = "/")}
        className='px-6 py-3 bg-blue-600 text-white font-medium rounded-lg
                 hover:bg-blue-700 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2
                 transition-colors shadow-sm hover:shadow'
      >
        Click here to reload the app
      </button>
    </div>
  );
}

let router = createBrowserRouter([
  {
    path: "/",
    // loader: async function loader() {
    //   await new Promise((resolve) => setTimeout(resolve, 5000));
    //   return [];
    // },
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Outlet />,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: "projects/:projectId",
            element: <Project />,
            errorElement: <ProjectErrorBoundary />,
            loader: projectLoader,
          },
        ],
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  // 路由初始化加载期间（当路由配置正在异步加载时）
  // 当路由发生错误但没有定义 errorElement 时
  // 当路由正在进行数据加载（使用 loader）时
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}
