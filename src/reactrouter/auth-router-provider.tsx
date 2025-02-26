// https://github.com/remix-run/react-router/blob/dev/examples/auth-router-provider/src/App.tsx
// 核心功能：
// 1. 路由级数据加载：使用 loader 预加载路由数据
// 2. 表单处理：使用 action 处理表单提交
// 3. 智能重定向：登录后返回用户之前访问的页面
// 4. 加载状态管理：显示路由切换和数据加载状态
//
// 主要 API：
// 1. Form：处理表单提交，自动与 action 函数集成
// 2. useActionData：获取 action 函数的返回值（如表单验证错误）
// 3. useRouteLoaderData：访问指定路由的 loader 数据
// 4. useNavigation：监控路由切换和数据加载状态
// 5. useLocation：获取当前路由信息（用于重定向）
// 6. useFetcher：执行不触发路由切换的数据操作（如后台登出）
//
// 实现特点：
// - 使用 RouterProvider 替代 BrowserRouter
// - 通过 loader/action 实现数据与路由的紧密集成
// - 支持并发数据加载和乐观性更新
// - 自动处理加载和错误状态

import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";

interface AuthProvider {
  isAuthenticated: boolean;
  username: null | string;
  signin(username: string): Promise<void>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: null,
  async signin(username: string) {
    await new Promise((r) => setTimeout(r, 2000)); // fake delay
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = username;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 2000)); // fake delay
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = "";
  },
};

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />;
}

const LoadingIndicator = () => {
  const navigation = useNavigation();
  console.log("navigation", navigation);
  return (
    <div>
      {navigation.state === "loading" && <p>Loading...</p>}
      {navigation.state === "submitting" && <p>Submitting...</p>}
    </div>
  );
};

function Layout() {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Auth Example using RouterProvider</h1>

      <div className='space-y-4 text-gray-600 mb-8'>
        <p>
          This example demonstrates a simple login flow with three pages: a public page, a protected page, and a login
          page. In order to see the protected page, you must first login. Pretty standard stuff.
        </p>

        <p>
          First, visit the public page. Then, visit the protected page. You're not yet logged in, so you are redirected
          to the login page. After you login, you are redirected back to the protected page.
        </p>

        <p>
          Notice the URL change each time. If you click the back button at this point, would you expect to go back to
          the login page? No! You're already logged in. Try it out, and you'll see you go back to the page you visited
          just *before* logging in, the public page.
        </p>
      </div>

      <LoadingIndicator />

      <div className='bg-gray-50 p-4 rounded-lg mb-6'>
        <AuthStatus />
      </div>

      <ul className='flex space-x-6 mb-8'>
        <li>
          <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
            Public Page
          </Link>
        </li>
        <li>
          <Link to='/protected' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
            Protected Page
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}

function AuthStatus() {
  let { user } = useRouteLoaderData("root") as { user: string | null };
  let fetcher = useFetcher();
  let isLoggingOut = fetcher.formData != null;
  // 这里的 Form 使用的是 fetcher，不是普通的 Form（loginPage中）,不能使用 navigation.state 获取表单提交的状态
  // let isLoggingOut = fetcher.state === "submitting";

  if (!user) {
    return <p className='text-gray-600'>You are not logged in.</p>;
  }

  return (
    <div className='flex items-center justify-between'>
      <p className='text-green-600 font-medium'>Welcome {user}!</p>
      <fetcher.Form method='post' action='/logout'>
        <button
          type='submit'
          disabled={isLoggingOut}
          className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
}

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function LoginPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";
  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;
  // let isLoggingIn = navigation.state === "submitting";
  let actionData = useActionData() as { error: string } | undefined;

  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>登录</h2>
      <p className='text-gray-600 mb-6'>您需要登录才能访问 {from}</p>

      <Form method='post' replace className='space-y-6'>
        <input type='hidden' name='redirectTo' value={from} />
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            用户名
            <input
              name='username'
              className='mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 
                       bg-gray-50 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-colors'
              placeholder='请输入用户名'
            />
          </label>
        </div>

        <button
          type='submit'
          disabled={isLoggingIn}
          className='w-full px-4 py-3 bg-blue-600 text-white rounded-md
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-colors duration-200 font-medium'
        >
          {isLoggingIn ? "登录中..." : "登录"}
        </button>

        {actionData && actionData.error ? <p className='text-red-500 text-sm mt-2'>{actionData.error}</p> : null}
      </Form>
    </div>
  );
}

function PublicPage() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h3 className='text-2xl font-semibold mb-4'>Public</h3>
    </div>
  );
}

async function protectedLoader({ request }: LoaderFunctionArgs) {
  await Promise.resolve((resolve) => {
    setTimeout(resolve, 4000);
  });
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!fakeAuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

function ProtectedPage() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h3 className='text-2xl font-semibold mb-4'>Protected</h3>
    </div>
  );
}
