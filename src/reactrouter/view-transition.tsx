// https://github.com/remix-run/react-router/blob/dev/examples/view-transitions/src/App.tsx
// 基于 React Router 实现的视图过渡动画示例
// 功能：
// 1. 页面切换动画：使用 View Transitions API 实现平滑过渡
// 2. 多种过渡类型：支持同步、异步加载和延迟加载的过渡
// 3. 图片画廊：展示图片列表到详情的过渡动画
// 4. 表单交互：处理表单提交过程中的过渡状态
//
// 主要使用的 React Router API：
// - useViewTransitionState：获取视图过渡状态
// - viewTransition：Link、Form 等组件的过渡属性
// - useNavigation：获取导航状态
// - defer/Await：处理延迟加载数据
// - useSubmit: 处理表单提交
//
// 实现要点：
// 1. 视图过渡设计：
//    - 使用 viewTransition 属性触发过渡
//    - 通过 CSS 自定义过渡动画
//    - 处理不同类型数据加载的过渡
//
// 2. 图片画廊过渡：
//    - 列表到详情的平滑动画
//    - 保持图片上下文连续性
//    - 支持返回时的反向动画
//
// 3. 加载状态处理：
//    - 同步过渡的即时反馈
//    - 异步加载的过渡动画
//    - Suspense 配合延迟加载
//
// 4. 用户体验优化：
//    - 平滑的过渡动画
//    - 加载状态指示
//    - 保持界面响应性

import * as React from "react";
import {
  Await,
  createBrowserRouter,
  defer,
  Form,
  json,
  Link,
  NavLink,
  Outlet,
  RouterProvider,
  useViewTransitionState,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from "react-router-dom";

const images = [
  "https://remix.run/blog-images/headers/the-future-is-now.jpg",
  "https://remix.run/blog-images/headers/waterfall.jpg",
  "https://remix.run/blog-images/headers/webpack.png",
  "https://remix.run/blog-images/headers/remix-conf.jpg",
];

const router = createBrowserRouter([
  {
    path: "/",
    Component() {
      let navigation = useNavigation();

      return (
        <div className='min-h-screen bg-gray-50'>
          {navigation.state !== "idle" && <div className='fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse' />}
          <div className='max-w-6xl mx-auto px-4 py-8'>
            <Nav />
            <main className='mt-8'>
              <Outlet />
            </main>
          </div>
        </div>
      );
    },
    children: [
      {
        index: true,
        Component() {
          React.useEffect(() => {
            document.title = "Home";
          }, []);
          return <h1>Home</h1>;
        },
      },
      {
        path: "loader",
        async loader() {
          await new Promise((r) => setTimeout(r, 1000));
          return json({ message: "LOADER DATA" });
        },
        Component() {
          let data = useLoaderData() as { message: string };
          React.useEffect(() => {
            document.title = "Loader";
          }, []);
          return (
            <>
              <h1>Loader Page</h1>
              <p>Loader Data: {data.message}</p>
            </>
          );
        },
      },
      {
        path: "action",
        async action() {
          await new Promise((r) => setTimeout(r, 1000));
          return json({ message: "ACTION DATA" });
        },
        Component() {
          let data = useActionData() as { message: string } | undefined;
          React.useEffect(() => {
            document.title = "Action";
          }, []);
          return (
            <>
              <h1>Action Page</h1>
              <p>Action Data: {data?.message}</p>
            </>
          );
        },
      },
      {
        path: "defer",
        async loader({ request }) {
          console.log(request);

          return defer({
            critical: "CRITICAL PATH DATA",
            lazy: new Promise((r) => setTimeout(() => r("LAZY DATA"), 1000)),
          });
        },
        Component() {
          let data = useLoaderData() as {
            critical: string;
            lazy: Promise<string>;
          };
          React.useEffect(() => {
            document.title = "Defer";
          }, []);
          return (
            <>
              <h1>Defer</h1>
              <p>Critical Data: {data.critical}</p>
              <React.Suspense fallback={<p>Suspense boundary in the route...</p>} key={useLocation().key}>
                <Await resolve={data.lazy}>{(value) => <p>Lazy Data: {value}</p>}</Await>
              </React.Suspense>
            </>
          );
        },
      },
      {
        path: "defer-no-boundary",
        async loader({ request }) {
          let value = new URL(request.url).searchParams.get("value") || "";
          return defer({
            value,
            critical: "CRITICAL PATH DATA - NO BOUNDARY " + value,
            lazy: new Promise((r) => setTimeout(() => r("LAZY DATA - NO BOUNDARY " + value), 1000)),
          });
        },
        Component() {
          let data = useLoaderData() as {
            value: string;
            data: string;
            critical: string;
            lazy: Promise<string>;
          };
          React.useEffect(() => {
            document.title = "Defer (No Boundary)";
          }, []);
          return (
            <>
              <h1>Defer No Boundary {data.value}</h1>
              <p>Critical Data: {data.critical}</p>
              <div>
                <Await resolve={data.lazy}>{(value) => <p>Lazy Data: {value}</p>}</Await>
              </div>
            </>
          );
        },
      },
      {
        path: "images",
        Component() {
          React.useEffect(() => {
            document.title = "Images";
          }, []);
          return (
            <div className='image-list'>
              <h1>Image List</h1>
              <div>
                {images.map((src, idx) => (
                  // Adds 'transitioning' class to the <a> during the transition
                  // <NavLink key={src} to={`/images/${idx}`} viewTransition>
                  //   <p>Image Number {idx}</p>
                  //   <img src={src} alt={`Img ${idx}`} />
                  // </NavLink>

                  // Render prop approach similar to isActive/isPending
                  // <NavLink key={src} to={`/images/${idx}`} viewTransition>
                  //   {({ isTransitioning }) => (
                  //     <div className={isTransitioning ? "transitioning" : ""}>
                  //       <p>Image Number {idx}</p>
                  //       <img src={src} alt={`Img ${idx}`} />
                  //     </div>
                  //   )}
                  // </NavLink>

                  // Manual hook based approach
                  <NavImage key={src} src={src} idx={idx} />
                ))}
              </div>
            </div>
          );
        },
      },
      {
        path: "images/:id",
        Component() {
          let params = useParams();
          React.useEffect(() => {
            document.title = "Image " + params.id;
          }, [params.id]);
          return (
            <div className={`image-detail`}>
              <h1>Image Number {params.id}</h1>
              <img src={images[Number(params.id)]} alt={`${params.id}`} />
            </div>
          );
        },
      },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function NavImage({ src, idx }: { src: string; idx: number }) {
  let href = `/images/${idx}`;
  let vt = useViewTransitionState(href);
  return (
    <>
      <Link to={href} viewTransition>
        <p style={{ viewTransitionName: vt ? "image-title" : "" }}>Image Number {idx}</p>
        <img src={src} alt={`Img ${idx}`} style={{ viewTransitionName: vt ? "image-expand" : "" }} />
      </Link>
    </>
  );
}

function Nav() {
  let navigate = useNavigate();
  let submit = useSubmit();

  return (
    <nav className='bg-white shadow-sm rounded-lg p-6'>
      <ul className='space-y-6'>
        <li className='space-y-2'>
          <Link to='/' className='text-lg text-gray-700 hover:text-blue-600 transition-colors'>
            Home
          </Link>
          <p className='text-sm text-gray-500'>
            The / route has no loader is should be an immediate/synchronous transition
          </p>
        </li>
        <li className='space-y-2'>
          <Link to='/loader' className='text-lg text-gray-700 hover:text-blue-600 transition-colors' viewTransition>
            Loader with delay
          </Link>{" "}
          <button style={{ display: "inline-block" }} onClick={() => navigate("/loader", { viewTransition: true })}>
            via useNavigate
          </button>
          <p className='text-sm text-gray-500'>
            The /loader route has a 1 second loader delay, and updates the DOM synchronously upon completion
          </p>
        </li>
        <li className='space-y-2'>
          <Form method='post' action='/action' style={{ display: "inline-block" }} viewTransition>
            <button type='submit' style={{ display: "inline-block" }}>
              Action with delay
            </button>
          </Form>{" "}
          <button
            style={{ display: "inline-block" }}
            onClick={() =>
              submit(
                {},
                {
                  method: "post",
                  action: "/action",
                  viewTransition: true,
                }
              )
            }
          >
            via useSubmit
          </button>
          <p className='text-sm text-gray-500'>
            The /action route has a 1 second action delay, and updates the DOM synchronously upon completion
          </p>
        </li>
        <li className='space-y-2'>
          <Link to='/images' className='text-lg text-gray-700 hover:text-blue-600 transition-colors' viewTransition>
            Image Gallery Example
          </Link>
        </li>
        <li className='space-y-2'>
          <Link to='/defer' className='text-lg text-gray-700 hover:text-blue-600 transition-colors' viewTransition>
            Deferred Data
          </Link>
          <p className='text-sm text-gray-500'>
            The /defer route has 1s defer call that suspends and has it's own Suspense boundary
          </p>
        </li>
        <li className='space-y-2'>
          <Link
            to='/defer-no-boundary'
            className='text-lg text-gray-700 hover:text-blue-600 transition-colors'
            viewTransition
          >
            Deferred Data (without boundary)
          </Link>
          <p className='text-sm text-gray-500'>
            The /defer-no-boundary route has a 1s defer that suspends without a Suspense boundary in the destination
            route. This relies on React.startTransition to "freeze" the current UI until the deferred data resolves
          </p>
        </li>
      </ul>
    </nav>
  );
}

export default function ViewTransitionExample() {
  return <RouterProvider router={router} />;
}
