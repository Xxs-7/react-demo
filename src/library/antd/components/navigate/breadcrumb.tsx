// import { Breadcrumb, Button } from "antd";
// import React, { useState, useEffect } from "react";
// import { Link, useHistory, useLocation } from "react-router-dom";
// // const BreadcrumbDemo = () => {
// //   const defaultItems = [
// //     {
// //       path: "/index",
// //       title: "home",
// //     },
// //     {
// //       path: "/first",
// //       title: "first",
// //       children: [
// //         {
// //           path: "/general",
// //           title: "General",
// //         },
// //         {
// //           path: "/layout",
// //           title: "Layout",
// //         },
// //         {
// //           path: "/navigation",
// //           title: "Navigation",
// //         },
// //       ],
// //     },
// //     {
// //       path: "/second",
// //       title: "second",
// //     },
// //   ];

// //   const [items, setItems] = useState(defaultItems);

// //   // 点击切换 path
// //   const onClick = (...args) => {
// //     console.log(...args);
// //   };

//   function itemRender(currentRoute, params, items, paths) {
//     const isLast = currentRoute?.path === items[items.length - 1]?.path;

//     return isLast ? (
//       <span>{currentRoute.title}</span>
//     ) : (
//       <a href={`/${paths.join("/")}`}>{currentRoute.title}</a>
//     );
//   }

// //   return <Breadcrumb itemRender={itemRender} items={items} onClick={onClick} />;
// // };

// const BreadcrumbDemo = () => {
//   const history = useHistory();
//   const location = useLocation();
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const pathSnippets = location.pathname.split("/").filter((i) => i);
//     const breadcrumbItems = pathSnippets.map((_, index) => {
//       const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
//       return {
//         path: url,
//         title: pathSnippets[index],
//       };
//     });

//     setItems(breadcrumbItems);
//   }, [location.pathname]);

//   const handleClick = (path) => {
//     history.push(path);
//   };

//   return (
//     <Breadcrumb>
//       {items.map((item, index) => (
//         <Breadcrumb.Item key={item.path}>
//           {index !== items.length - 1 ? (
//             <Link to={item.path} onClick={() => handleClick(item.path)}>
//               {item.title || "home"}
//             </Link>
//           ) : (
//             <span>{item.title || "home"}</span>
//           )}
//         </Breadcrumb.Item>
//       ))}
//     </Breadcrumb>
//   );
// };

// export default BreadcrumbDemo;

import React, { useState } from "react";
import { Breadcrumb } from "antd";

// defaultItems + path => items
const defaultItems = [
  {
    path: "/index",
    title: "home",
  },
  {
    path: "/index/first",
    title: "first",
  },
  {
    path: "/index/first/second",
    title: "second",
  },
];

const BreadcrumbDemo = () => {
  const [items, setItems] = useState(defaultItems);

  const handleClick = (path, title?) => {
    console.log("%c [ title ]-118", "font-size:13px; background:pink; color:#bf2c9f;", title);
    // Find the corresponding item in the defaultItems
    let newItems = [];

    const findItem = (items, path) => {
      for (let item of items) {
        if (path && path.startsWith(item.path)) {
          // newItems.push(item);
          // findItem(item, path);
        }
      }
      return [];
    };

    findItem(defaultItems, path);
    setItems(newItems);
  };

  function itemRender(currentRoute, params, items, paths) {
    console.log("%c [ paths ]-136", "font-size:13px; background:pink; color:#bf2c9f;", paths);
    console.log("%c [ params ]-136", "font-size:13px; background:pink; color:#bf2c9f;", params);

    const isLast = currentRoute?.path === items[items.length - 1]?.path;
    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <a onClick={() => handleClick(currentRoute?.path)}>{currentRoute.title}</a>
    );
  }

  return (
    <div>
      <Breadcrumb items={items} itemRender={itemRender} />
    </div>
  );
};

export default BreadcrumbDemo;
