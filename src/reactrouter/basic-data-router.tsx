import { createBrowserRouter, RouterProvider, useLoaderData } from "react-router-dom";

let router = createBrowserRouter([
  {
    path: "/",
    // loader 可以为异步
    // loader: async () => {
    //   // 模拟 API 调用
    //   const response = await fetch('https://api.example.com/data');
    //   const data = await response.json();
    //   return data;

    //   // 或者使用 setTimeout 模拟延迟
    //   // return new Promise((resolve) => {
    //   //   setTimeout(() => {
    //   //     resolve({ message: "异步加载的数据" });
    //   //   }, 1000);
    //   // });
    // },
    loader: () => ({ message: "hello data router" }),
    Component() {
      let data = useLoaderData() as { message: string };
      return <h1>{data.message}</h1>;
    },
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

// 如果 loader 里需要得到参数，静态（固定的）和动态，
// 静态：写死的。
// 敏感数据用 state 传递，来自其他页面跳转而来
// 需要持久化的数据存储在浏览器持久化存储
// 需要分享的数据放在 URL 中
// let router = createBrowserRouter([
//   {
//     // 1. URL 参数示例：/user/:id?name=张三
//     path: "/user/:id",
//     loader: async ({ params, request }: LoaderFunctionArgs) => {
//       // 从 URL 获取参数
//       const userId = params.id; // 从路径参数获取
//       const searchParams = new URL(request.url).searchParams;
//       const name = searchParams.get('name'); // 从查询字符串获取

//       // 2. 从浏览器存储获取参数
//       const token = localStorage.getItem('token');
//       const theme = sessionStorage.getItem('theme');

//       // 3. 获取页面跳转时传递的 state
//       // 注意：state 需要在组件内通过 useLocation 获取

//       // 4. 静态参数
//       const apiVersion = 'v1';

//       // 发起请求
//       const response = await fetch(`https://api.example.com/${apiVersion}/users/${userId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         }
//       });

//       return response.json();
//     },
//     Component() {
//       const data = useLoaderData() as any;
//       // 获取页面跳转时的 state
//       const location = useLocation(); // 直接 location.state 获取，刷新页面会丢失 state
//       const navigationState = location.state;

//       return (
//         <div>
//           <h1>{data.name}</h1>
//           {/* 显示从 state 中获取的数据 */}
//           {navigationState?.from && (
//             <p>来自页面: {navigationState.from}</p>
//           )}
//         </div>
//       );
//     },
//   },
// ]);

// // 1. URL 参数的使用
// 访问 /user/123?name=张三

// // 2. 浏览器存储的使用
// localStorage.setItem('token', 'your-token');
// sessionStorage.setItem('theme', 'dark');

// // 3. 页面跳转传递 state
// // 在其他组件中使用 navigate 跳转
// import { useNavigate } from 'react-router-dom';

// function OtherComponent() {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/user/123', {
//       state: {
//         from: '首页',
//         otherData: '其他数据'
//       }
//     });
//   };

//   return <button onClick={handleClick}>跳转到用户页面</button>;
// }
