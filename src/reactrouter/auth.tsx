// https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
// 基于 React Router 实现的身份验证示例
// 功能：
// 1. 路由保护：未登录用户无法访问受保护的路由
// 2. 登录重定向：访问受保护路由时重定向到登录页面
// 3. 登录后跳转：成功登录后返回之前尝试访问的页面 state 存储来源路径
// 4. 用户状态管理：维护全局登录状态
//
// 主要使用的 React Router API：
// - useNavigate：处理页面跳转
// - useLocation：获取当前路由信息
// - Navigate：声明式重定向组件
// - Outlet：渲染子路由
//
// 实现要点：
// 1. 使用 AuthProvider 管理认证状态
// 2. RequireAuth 组件包装需要保护的路由
// 3. 登录页面记录来源路径，登录成功后跳回

import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  username: "",
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { fakeAuthProvider };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <PublicPage />,
      },

      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/protected",
        element: (
          <RequireAuth>
            <ProtectedPage />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Auth Example</h1>

        <div className='space-y-4 text-gray-600 mb-8'>
          <p>
            This example demonstrates a simple login flow with three pages: a public page, a protected page, and a login
            page. In order to see the protected page, you must first login. Pretty standard stuff.
          </p>

          <p>
            First, visit the public page. Then, visit the protected page. You're not yet logged in, so you are
            redirected to the login page. After you login, you are redirected back to the protected page.
          </p>

          <p>
            Notice the URL change each time. If you click the back button at this point, would you expect to go back to
            the login page? No! You're already logged in. Try it out, and you'll see you go back to the page you visited
            just *before* logging in, the public page.
          </p>
        </div>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div className='space-y-6'>
      <div className='bg-gray-50 p-4 rounded-lg'>
        <AuthStatus />
      </div>

      <ul className='flex space-x-6'>
        <li>
          <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium'>
            Public Page
          </Link>
        </li>
        <li>
          <Link to='/protected' className='text-blue-600 hover:text-blue-800 font-medium'>
            Protected Page
          </Link>
        </li>
      </ul>

      <div className='mt-6'>
        <Outlet />
      </div>
    </div>
  );
}

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p className='text-gray-600'>You are not signed in.</p>;
  }

  return (
    <p className='flex items-center justify-between'>
      <span className='text-green-600'>Welcome {auth.user}!</span>
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
        className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  return children;
}

function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let username = formData.get("username") as string;
    auth.signin(username, () => {
      navigate(from, { replace: true });
    });
  }

  return (
    <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-100'>
      <h2 className='text-2xl font-semibold mb-6 text-gray-800'>登录</h2>
      <p className='text-gray-600 mb-6'>您需要登录才能访问 {from}</p>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            用户名
            <input
              name='username'
              type='text'
              placeholder='请输入用户名'
              className='mt-2 block w-full px-4 py-3 rounded-md border border-gray-300 
                       bg-gray-50 text-gray-900 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition-colors'
            />
          </label>
        </div>
        <button
          type='submit'
          className='w-full px-4 py-3 bg-blue-600 text-white rounded-md
                   hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-colors duration-200 font-medium'
        >
          登录
        </button>
      </form>
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

function ProtectedPage() {
  return (
    <div className='bg-white p-6 rounded-lg shadow-sm'>
      <h3 className='text-2xl font-semibold mb-4'>Protected</h3>
    </div>
  );
}
