// https://github.com/remix-run/react-router/blob/dev/examples/modal-route-with-outlet/src/App.tsx
// 基于 React Router 实现的模态框路由示例
// 功能：
// 1. 模态框路由：通过 URL 驱动模态框的显示和隐藏
// 2. 图片画廊：支持图片列表和详情模态框展示
// 3. 状态保持：模态框关闭后保持父路由状态
// 4. 无障碍设计：支持键盘导航和屏幕阅读器
//
// 主要使用的组件：
// - @reach/dialog：实现无障碍的模态框组件
// - Dialog：处理模态框的显示、隐藏和焦点管理
//
// 实现要点：
// 1. 模态框路由设计：
//    - 使用子路由渲染模态框内容
//    - 通过 Outlet 在父组件中渲染模态框
//    - 保持父路由内容可见
//
// 2. 交互体验优化：
//    - 支持点击返回关闭模态框
//    - 模态框打开时锁定背景滚动
//    - 自动聚焦关闭按钮
//
// 3. 图片展示优化：
//    - 响应式图片布局
//    - 图片加载优化
//    - 统一的图片展示样式
//
// 4. 无障碍支持：
//    - ARIA 标签支持
//    - 键盘导航支持
//    - 焦点管理

import * as React from "react";
import { Outlet, Link, useNavigate, useParams, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

let IMAGES = [
  {
    id: 0,
    title: "Enjoying a cup of coffee",
    src: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2Mzg4Ng&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 1,
    title: "Magical winter sunrise",
    src: "https://images.unsplash.com/photo-1618824834718-92f8469a4dd1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDAzMw&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 2,
    title: "Dalmatian and pumpkins",
    src: "https://images.unsplash.com/photo-1633289944756-6295be214e16?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDA3Nw&ixlib=rb-1.2.1&q=80&w=400",
  },
  {
    id: 3,
    title: "Fall into Autumn 🍂🐶",
    src: "https://images.unsplash.com/photo-1633172905740-2eb6730c95b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzMzM2NDEwMg&ixlib=rb-1.2.1&q=80&w=400",
  },
];

function getImageById(id: number) {
  return IMAGES.find((image) => image.id === id);
}

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "gallery",
        Component: Gallery,
        children: [
          {
            path: "img/:id",
            Component: ImageView,
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

export function Layout() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-4'>Outlet Modal Example</h1>
        <p className='text-gray-600 mb-8'>
          This is a modal example using createBrowserRouter that drives modal displays through URL segments. The modal
          is a child route of its parent and renders in the Outlet.
        </p>

        <nav className='mb-8'>
          <ul className='flex space-x-6'>
            <li>
              <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/gallery' className='text-blue-600 hover:text-blue-800 font-medium transition-colors'>
                Gallery
              </Link>
            </li>
          </ul>
        </nav>

        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div className='prose prose-gray max-w-none'>
      <h2 className='text-2xl font-bold text-gray-900 mb-4'>Home</h2>
      <p className='text-gray-600'>
        Click over to the{" "}
        <Link to='/gallery' className='text-blue-600 hover:text-blue-800 font-medium'>
          Gallery
        </Link>{" "}
        route to see the modal in action
      </p>
      <Outlet />
    </div>
  );
}

export function Gallery() {
  return (
    <div>
      <h2 className='text-2xl font-bold text-gray-900 mb-4'>Gallery</h2>
      <p className='text-gray-600 mb-8'>
        Click on an image, you'll notice that you still see this route behind the modal. The URL will also change as its
        a child route of <code className='bg-gray-100 px-2 py-1 rounded text-blue-600 text-sm font-mono'>/gallery</code>
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {IMAGES.map((image) => (
          <Link
            key={image.id}
            to={`img/${image.id}`}
            className='block overflow-hidden rounded-lg hover:opacity-90 transition-opacity'
          >
            <img
              className='w-full h-auto aspect-square object-cover rounded-lg'
              src={image.src}
              alt={image.title}
              loading='lazy'
            />
          </Link>
        ))}
        <Outlet />
      </div>
    </div>
  );
}

export function ImageView() {
  let navigate = useNavigate();
  let { id } = useParams<"id">();
  let image = getImageById(Number(id));
  let buttonRef = React.useRef<HTMLButtonElement>(null);

  function onDismiss() {
    navigate(-1);
  }

  if (!image) {
    throw new Error(`No image found with id: ${id}`);
  }

  return (
    <Dialog
      aria-labelledby='label'
      onDismiss={onDismiss}
      initialFocusRef={buttonRef}
      className='fixed inset-4 sm:inset-8 md:inset-16 bg-white rounded-xl p-4 sm:p-6 
                shadow-2xl outline-none overflow-auto'
    >
      <div className='max-w-2xl mx-auto'>
        <h1 id='label' className='text-2xl font-bold text-gray-900 mb-4'>
          {image.title}
        </h1>

        <img className='w-full h-auto rounded-lg mb-6' src={image.src} alt={image.title} loading='lazy' />

        <button
          ref={buttonRef}
          onClick={onDismiss}
          className='w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium 
                   rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:ring-offset-2 transition-colors'
        >
          Close
        </button>
      </div>
    </Dialog>
  );
}
