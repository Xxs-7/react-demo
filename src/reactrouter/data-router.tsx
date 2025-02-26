// https://github.com/remix-run/react-router/blob/dev/examples/data/src/App.tsx
// 基于 React Router 实现的数据加载和管理示例
// 功能：
// 1. 展示数据加载状态（导航中、重新验证中、fetcher 进行中）
// 2. Todo 列表的增删改查
// 3. 延迟加载数据的处理
//
// 主要使用的 React Router API：
// - useNavigation：获取当前导航状态，监听全局的页面加载和提交状态
// - useRevalidator：手动触发数据重新验证（重新执行 loader）
// - useFetchers：获取所有 fetcher 的状态
// - useLoaderData：获取当前路由的 loader 数据
// - Form：处理表单提交
// - fetcher.Form：处理局部表单提交，不影响页面导航
// - Await：处理延迟加载的数据
//
// 实现要点：
// 1. 数据加载和状态管理：
//    - 使用 loader 函数加载路由数据
//    - 通过 useLoaderData 在组件中获取数据
//    - 使用 useNavigation 展示加载状态
//    - 支持手动触发数据重新验证
//
// 2. 表单交互和数据更新：
//    - Form 组件处理完整页面提交
//    - fetcher.Form 处理局部数据更新
//    - action 函数处理表单提交
//    - 自动重新验证相关数据
//
// 3. 延迟加载优化：
//    - defer 延迟加载非关键数据
//    - Await 组件处理异步数据展示
//    - Suspense 提供加载状态
//    - 错误边界处理加载失败
//
// 4. 用户体验优化：
//    - 全局加载状态指示器
//    - 乐观更新 UI
//    - 平滑的加载过渡
//    - 友好的错误处理

import * as React from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import {
  Await,
  createBrowserRouter,
  defer,
  Form,
  Link,
  Outlet,
  RouterProvider,
  useAsyncError,
  useAsyncValue,
  useFetcher,
  useFetchers,
  useLoaderData,
  useNavigation,
  useParams,
  useRevalidator,
  useRouteError,
} from "react-router-dom";

// import type { Todos } from "./todos";
// import { addTodo, deleteTodo, getTodos } from "./todos";

export interface Todos {
  [key: string]: string;
}

const TODOS_KEY = "todos";

export const uuid = () => Math.random().toString(36).substr(2, 9);

export function saveTodos(todos: Todos): void {
  return localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function initializeTodos(): Todos {
  let todos: Todos = new Array(10)
    .fill(null)
    .reduce((acc, _, index) => Object.assign(acc, { [uuid()]: `Seeded Todo #${index + 1}` }), {});
  saveTodos(todos);
  return todos;
}

export function getTodos(): Todos {
  let todos: Todos | null = null;
  try {
    // @ts-expect-error OK to throw here since we're catching
    todos = JSON.parse(localStorage.getItem(TODOS_KEY));
  } catch (e) {}
  if (!todos) {
    todos = initializeTodos();
  }
  return todos;
}

export function addTodo(todo: string): void {
  let newTodos = { ...getTodos() };
  newTodos[uuid()] = todo;
  saveTodos(newTodos);
}

export function deleteTodo(id: string): void {
  let newTodos = { ...getTodos() };
  delete newTodos[id];
  saveTodos(newTodos);
}

export function resetTodos(): void {
  localStorage.removeItem(TODOS_KEY);
  initializeTodos();
}

let router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: Home,
      },
      {
        path: "todos",
        action: todosAction,
        loader: todosLoader,
        Component: TodosList,
        ErrorBoundary: TodosBoundary,
        children: [
          {
            path: ":id",
            loader: todoLoader,
            Component: Todo,
          },
        ],
      },
      {
        path: "deferred",
        loader: deferredLoader,
        Component: DeferredPage,
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export function sleep(n: number = 500) {
  return new Promise((r) => setTimeout(r, n));
}

export function Fallback() {
  return <p>Performing initial data load</p>;
}

// Layout
export function Layout() {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) => ["loading", "submitting"].includes(f.state));

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-5xl mx-auto p-8'>
        <header className='mb-12'>
          <h1 className='text-4xl font-bold text-gray-800 mb-6'>Data Router Example</h1>
          <div className='prose prose-gray max-w-none'>
            <p className='text-gray-600'>
              This example demonstrates some of the core features of React Router including nested &lt;Route&gt;s,
              &lt;Outlet&gt;s, &lt;Link&gt;s, and using a "*" route to render a "not found" page.
            </p>
          </div>
        </header>

        {/* 状态指示器 */}
        <div className='fixed top-4 right-4 space-y-2 z-50'>
          {navigation.state !== "idle" && (
            <p className='bg-blue-100 text-blue-700 px-4 py-2 rounded-md shadow-sm border border-blue-200'>
              Navigation in progress...
            </p>
          )}
          {revalidator.state !== "idle" && (
            <p className='bg-purple-100 text-purple-700 px-4 py-2 rounded-md shadow-sm border border-purple-200'>
              Revalidation in progress...
            </p>
          )}
          {fetcherInProgress && (
            <p className='bg-green-100 text-green-700 px-4 py-2 rounded-md shadow-sm border border-green-200'>
              Fetcher in progress...
            </p>
          )}
        </div>

        <nav className='bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100'>
          <ul className='flex flex-wrap gap-6'>
            {[
              { to: "/", label: "Home" },
              { to: "/todos", label: "Todos" },
              { to: "/deferred", label: "Deferred" },
              { to: "/404", label: "404 Link" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className='text-blue-600 hover:text-blue-800 font-medium transition-colors
                           hover:underline decoration-2 underline-offset-4'
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => revalidator.revalidate()}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                         transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2'
              >
                Revalidate Data
              </button>
            </li>
          </ul>
        </nav>

        <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 mb-8'>
          <div className='space-y-4 text-gray-600'>
            <p>
              Click on over to{" "}
              <Link to='/todos' className='text-blue-600 hover:text-blue-800 font-medium hover:underline'>
                /todos
              </Link>{" "}
              and check out these data loading APIs!
            </p>
            <p>
              Or, checkout{" "}
              <Link to='/deferred' className='text-blue-600 hover:text-blue-800 font-medium hover:underline'>
                /deferred
              </Link>{" "}
              to see how to separate critical and lazily loaded data in your loaders.
            </p>
            <p>Keep an eye on the top-right hand corner to see when we're actively navigating.</p>
          </div>
        </div>

        <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// Home
interface HomeLoaderData {
  date: string;
}

export async function homeLoader(): Promise<HomeLoaderData> {
  await sleep();
  return {
    date: new Date().toISOString(),
  };
}

export function Home() {
  let data = useLoaderData() as HomeLoaderData;
  return (
    <>
      <h2>Home</h2>
      <p>Date from loader: {data.date}</p>
    </>
  );
}

// Todos
export async function todosAction({ request }: ActionFunctionArgs) {
  await sleep();

  let formData = await request.formData();

  // Deletion via fetcher
  if (formData.get("action") === "delete") {
    let id = formData.get("todoId");
    if (typeof id === "string") {
      deleteTodo(id);
      return { ok: true };
    }
  }

  // Addition via <Form>
  let todo = formData.get("todo");
  if (typeof todo === "string") {
    addTodo(todo);
  }

  return new Response(null, {
    status: 302,
    headers: { Location: "/todos" },
  });
}

export async function todosLoader(): Promise<Todos> {
  await sleep();
  return getTodos();
}

export function TodosList() {
  let todos = useLoaderData() as Todos;
  let navigation = useNavigation();
  let formRef = React.useRef<HTMLFormElement>(null);

  // If we add and then we delete - this will keep isAdding=true until the
  // fetcher completes it's revalidation
  let [isAdding, setIsAdding] = React.useState(false);
  React.useEffect(() => {
    if (navigation.formData?.get("action") === "add") {
      setIsAdding(true);
    } else if (navigation.state === "idle") {
      setIsAdding(false);
      formRef.current?.reset();
    }
  }, [navigation]);

  return (
    <div className='space-y-8'>
      <header>
        <h2 className='text-3xl font-bold text-gray-800 mb-4'>Todos</h2>
        <p className='text-gray-600'>
          This todo app uses a &lt;Form&gt; to submit new todos and a &lt;fetcher.form&gt; to delete todos.
        </p>
      </header>

      <ul className='divide-y divide-gray-100'>
        <li className='py-3'>
          <Link to='/todos/junk' className='text-red-600 hover:text-red-800 hover:underline'>
            Click this link to force an error in the loader
          </Link>
        </li>
        {Object.entries(todos).map(([id, todo]) => (
          <li key={id} className='py-3'>
            <TodoItem id={id} todo={todo} />
          </li>
        ))}
      </ul>

      <Form method='post' ref={formRef} className='space-y-4'>
        <input type='hidden' name='action' value='add' />
        <div className='flex gap-4'>
          <input
            name='todo'
            className='flex-1 px-4 py-3 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     bg-gray-50 transition-all'
            placeholder='Add new todo...'
          />
          <button
            type='submit'
            disabled={isAdding}
            className='px-6 py-3 bg-blue-600 text-white rounded-lg font-medium
                     hover:bg-blue-700 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all shadow-sm hover:shadow'
          >
            {isAdding ? "Adding..." : "Add Todo"}
          </button>
        </div>
      </Form>

      <Outlet />
    </div>
  );
}

export function TodosBoundary() {
  let error = useRouteError() as Error;
  return (
    <>
      <h2>Error 💥</h2>
      <p>{error.message}</p>
    </>
  );
}

interface TodoItemProps {
  id: string;
  todo: string;
}

export function TodoItem({ id, todo }: TodoItemProps) {
  let fetcher = useFetcher();
  let isDeleting = fetcher.formData != null;

  return (
    <div className='flex items-center justify-between group'>
      <Link to={`/todos/${id}`} className='text-gray-700 hover:text-blue-600 font-medium group-hover:underline'>
        {todo}
      </Link>
      <fetcher.Form method='post'>
        <input type='hidden' name='action' value='delete' />
        <button
          type='submit'
          name='todoId'
          value={id}
          disabled={isDeleting}
          className='px-4 py-2 text-sm bg-red-100 text-red-600 rounded-lg
                   hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all focus:outline-none focus:ring-2 
                   focus:ring-red-500 focus:ring-offset-2'
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
    </div>
  );
}

// Todo
export async function todoLoader({ params }: LoaderFunctionArgs): Promise<string> {
  await sleep();
  let todos = getTodos();
  if (!params.id) {
    throw new Error("Expected params.id");
  }
  let todo = todos[params.id];
  if (!todo) {
    throw new Error(`Uh oh, I couldn't find a todo with id "${params.id}"`);
  }
  return todo;
}

export function Todo() {
  let params = useParams();
  let todo = useLoaderData() as string;
  return (
    <>
      <h2>Nested Todo Route:</h2>
      <p>id: {params.id}</p>
      <p>todo: {todo}</p>
    </>
  );
}

// Deferred Data
interface DeferredRouteLoaderData {
  critical1: string;
  critical2: string;
  lazyResolved: Promise<string>;
  lazy1: Promise<string>;
  lazy2: Promise<string>;
  lazy3: Promise<string>;
  lazyError: Promise<string>;
}

const rand = () => Math.round(Math.random() * 100);
const resolve = (d: string, ms: number) => new Promise((r) => setTimeout(() => r(`${d} - ${rand()}`), ms));
const reject = (d: Error | string, ms: number) =>
  new Promise((_, r) =>
    setTimeout(() => {
      if (d instanceof Error) {
        d.message += ` - ${rand()}`;
      } else {
        d += ` - ${rand()}`;
      }
      r(d);
    }, ms)
  );

export async function deferredLoader() {
  return defer({
    critical1: await resolve("Critical 1", 250),
    critical2: await resolve("Critical 2", 500),
    lazyResolved: Promise.resolve("Lazy Data immediately resolved - " + rand()),
    lazy1: resolve("Lazy 1", 1000),
    lazy2: resolve("Lazy 2", 1500),
    lazy3: resolve("Lazy 3", 2000),
    lazyError: reject(new Error("Kaboom!"), 2500),
  });
}

export function DeferredPage() {
  let data = useLoaderData() as DeferredRouteLoaderData;
  return (
    <div>
      {/* Critical data renders immediately */}
      <p>{data.critical1}</p>
      <p>{data.critical2}</p>

      {/* Pre-resolved deferred data never triggers the fallback */}
      <React.Suspense fallback={<p>should not see me!</p>}>
        <Await resolve={data.lazyResolved}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>

      {/* Deferred data can be rendered using a component + the useAsyncValue() hook */}
      <React.Suspense fallback={<p>loading 1...</p>}>
        <Await resolve={data.lazy1}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>

      <React.Suspense fallback={<p>loading 2...</p>}>
        <Await resolve={data.lazy2}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>

      {/* Or you can bypass the hook and use a render function */}
      <React.Suspense fallback={<p>loading 3...</p>}>
        <Await resolve={data.lazy3}>{(data: string) => <p>{data}</p>}</Await>
      </React.Suspense>

      {/* Deferred rejections render using the useAsyncError hook */}
      <React.Suspense fallback={<p>loading (error)...</p>}>
        <Await resolve={data.lazyError} errorElement={<RenderAwaitedError />}>
          <RenderAwaitedData />
        </Await>
      </React.Suspense>
    </div>
  );
}

function RenderAwaitedData() {
  let data = useAsyncValue() as string;
  return <p>{data}</p>;
}

function RenderAwaitedError() {
  let error = useAsyncError() as Error;
  return (
    <p style={{ color: "red" }}>
      Error (errorElement)!
      <br />
      {error.message} {error.stack}
    </p>
  );
}
