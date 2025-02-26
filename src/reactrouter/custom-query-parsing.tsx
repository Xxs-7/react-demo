// https://github.com/remix-run/react-router/blob/dev/examples/custom-query-parsing/src/App.tsx
// 基于 React Router 实现的复杂查询参数处理示例
// 功能：
// 1. 复杂数据序列化：将 JavaScript 对象序列化到 URL 查询参数
// 2. 表单状态持久化：通过 URL 保存和恢复表单状态
// 3. 状态共享：支持通过 URL 分享应用状态
// 4. 实时同步：表单变化自动更新 URL
//
// 主要使用的 React Router API：
// - useSearchParams：读取和修改 URL 查询参数
// - Link：基础路由导航组件
// - BrowserRouter：提供路由上下文
//
// 实现要点：
// 1. 自定义 useQueryParam hook：
//    - 封装 useSearchParams 处理查询参数
//    - 使用 JSURL 处理复杂数据结构
//    - 支持类型安全的参数读写
// 2. 表单状态管理：
//    - 监听表单变化自动更新 URL
//    - 首次加载时从 URL 还原状态
//    - 处理表单默认值
// 3. 用户体验优化：
//    - URL 更新不触发页面刷新
//    - 支持浏览器前进后退
//    - 保持表单交互的流畅性

import * as React from "react";
import * as JSURL from "jsurl";
import type { NavigateOptions } from "react-router-dom";
import { Routes, Route, Link, useSearchParams, BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Custom Query Parsing Example</h1>

        <div className='prose prose-gray max-w-none mb-8'>
          <p className='text-gray-600'>
            This example demonstrates how to store a complex data structure in a URL query parameter.
          </p>

          <p className='text-gray-600'>
            Each time a field in the form below changes, the URL is updated with a serialized version of the form's
            values. To see the effect this has, manipulate some fields in the form. Then, copy the URL in the address
            bar and paste it into a new tab in your browser to see the form in the exact same state as when you left it!
          </p>
        </div>

        <Routes>
          <Route index element={<Home />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/**
 * This custom hook is a wrapper around `useSearchParams()` that parses and
 * serializes the search param value using the JSURL library, which permits any
 * JavaScript value to be safely URL-encoded.
 *
 * It's a good example of how React hooks offer a great deal of flexibility when
 * you compose them together!
 *
 * TODO: rethink the generic type here, users can put whatever they want in the
 * URL, probably best to use runtime validation with a type predicate:
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
function useQueryParam<T>(key: string): [T | undefined, (newQuery: T, options?: NavigateOptions) => void] {
  let [searchParams, setSearchParams] = useSearchParams();
  let paramValue = searchParams.get(key);

  let value = React.useMemo(() => JSURL.parse(paramValue), [paramValue]);

  let setValue = React.useCallback(
    (newQuery: T, options?: NavigateOptions) => {
      let newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, JSURL.stringify(newQuery));
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [value, setValue];
}

interface Pizza {
  toppings: string[];
  crust: string;
  extraSauce: boolean;
}

function Home() {
  let [pizza, setPizza] = useQueryParam<Pizza>("pizza");

  if (!pizza) {
    pizza = { toppings: [], crust: "regular", extraSauce: false };
  }

  function handleChange(event: React.ChangeEvent<HTMLFormElement>) {
    let form = event.currentTarget;
    let formData = new FormData(form);

    let pizza: Pizza = {
      toppings: formData.getAll("toppings") as string[],
      crust: formData.get("crust") as string,
      extraSauce: formData.get("extraSauce") === "on",
    };

    setPizza(pizza, { replace: true });
  }

  return (
    <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100'>
      <form onChange={handleChange} className='space-y-8'>
        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900'>What would you like on your pizza?</h3>

          <div className='space-y-2'>
            <label className='flex items-center space-x-3'>
              <input
                defaultChecked={pizza.toppings.includes("pepperoni")}
                type='checkbox'
                name='toppings'
                value='pepperoni'
                className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
              />
              <span className='text-gray-700'>Pepperoni</span>
            </label>
            <label className='flex items-center space-x-3'>
              <input
                defaultChecked={pizza.toppings.includes("bell-peppers")}
                type='checkbox'
                name='toppings'
                value='bell-peppers'
                className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
              />
              <span className='text-gray-700'>Bell Peppers</span>
            </label>
            <label className='flex items-center space-x-3'>
              <input
                defaultChecked={pizza.toppings.includes("olives")}
                type='checkbox'
                name='toppings'
                value='olives'
                className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
              />
              <span className='text-gray-700'>Olives</span>
            </label>
          </div>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-medium text-gray-900'>Choose your crust:</h3>
          <div className='space-y-2'>
            <label className='flex items-center space-x-3'>
              <input
                type='radio'
                name='crust'
                value='regular'
                defaultChecked={pizza.crust === "regular"}
                className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
              />
              <span className='text-gray-700'>Regular Crust</span>
            </label>
            <label className='flex items-center space-x-3'>
              <input
                type='radio'
                name='crust'
                value='thin'
                defaultChecked={pizza.crust === "thin"}
                className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
              />
              <span className='text-gray-700'>Thin Crust</span>
            </label>
            <label className='flex items-center space-x-3'>
              <input
                type='radio'
                name='crust'
                value='deep-dish'
                defaultChecked={pizza.crust === "deep-dish"}
                className='h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500'
              />
              <span className='text-gray-700'>Deep Dish</span>
            </label>
          </div>
        </div>

        <div>
          <label className='flex items-center space-x-3'>
            <input
              type='checkbox'
              name='extraSauce'
              defaultChecked={pizza.extraSauce}
              className='h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500'
            />
            <span className='text-gray-700'>Extra Sauce</span>
          </label>
        </div>
      </form>

      <hr className='my-8 border-gray-200' />

      <div className='space-y-4'>
        <h3 className='text-lg font-medium text-gray-900'>Current form values:</h3>
        <pre className='bg-gray-50 p-4 rounded-lg text-sm font-mono text-gray-700 whitespace-pre-wrap'>
          {JSON.stringify(pizza || {}, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div className='text-center py-8'>
      <h2 className='text-2xl font-semibold text-red-600 mb-4'>Nothing to see here!</h2>
      <p className='mb-4'>
        <Link to='/' className='text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline'>
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
