import React from "react";
import { Link, useNavigate, createBrowserRouter, RouterProvider } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/about")}>Go to About</button>
    </div>
  );
};

const About: React.FC = () => (
  <div>
    <h1>About Page</h1>
    <Link to='/'>Go to Home</Link>
  </div>
);

const NotFound: React.FC = () => (
  <div>
    <h1>404 - Not Found</h1>
    <Link to='/'>Back to Home</Link>
  </div>
);

// 常规
// const App: React.FC = () => {
//   return (
//     <div className='w-full h-screen flex flex-col justify-center items-center'>
//       <Router>
//         <nav>
//           <Link to='/'>Home</Link> | <Link to='/about'>About</Link>
//         </nav>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/about' element={<About />} />
//           <Route path='*' element={<NotFound />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/About",
    element: <About />,
    // loader: fetchUser, // 页面加载前获取数据
  },
]);

const App = () => (
  <div className='w-full h-screen flex flex-col justify-center items-center'>
    <RouterProvider router={router} />
  </div>
);

export default App;
