import React from "react";
// import RadixUIPage from "@/library/radixUI/radixUIPage";
// import BasicComponent from "./basic";
// import TooltipDemo from "./library/radixUI/Tooltip";
// import ShadcnUi from "./library/shadcn-ui";
// import CheckboxDemo from "./library/radixUI/checkboxdemo";
// import Layout from "./style/layout";
// import TwComponent from "./style/tailwind";
// import ReactTabelDemo from "./library/react-table";
// import HeightDemo from "./style/height";
// import AnimateDemo from "./style/animation";
// import SuggestionDemo from "./basic/suggestionInput/intputTipDemo";
import AntdComponents from "./library/antd";
// import CssDemo from "./style/css";
// import LessDemo from "./style/less";
import ScrollbarOverlay from "./components/myComponents/scrollbar/scrollbar-overlay/scrollbar";
import MobileModalTipDemo from "./components/myComponents/modal/mobileBottomModal";
import { BasicModalDemo } from "./components/myComponents/modal/basicModal";
import ModalDemo from "./components/myComponents/modal";
import { Uploader } from "./components/myComponents/imageUpload";
import ButtonUsage from "./library/mui/button";
import ERPApp from "./app/shangguigu_antd";
// import SpringDemo from "./animate/spring";
import BasicTDemo from "./components/myComponents/tooltip/basicT";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import MyComponent from "./components/myComponents";
import HTML from "./basic/html_css";
import CssDemo from "./basic/style";
import CardsCarousel from "./basic/style/animate/spring/cards-carousel";
import SpringDemo from "./basic/style/animate/spring";
import LexicalRichEditor from "./library/lexical";
import LexicalEditorDemo1 from "./library/lexical/demo1";
import FiberPage from "./React/fiberPage";
import TicTacToe from "./React/tutorial/tic-tac-toe";
import RefComp from "./React/tutorial/useRef";
import ContextDemo from "./React/tutorial/useContext";
import ScrollDemo from "./components/myComponents/scrollbar/scoll";
import ReactQueryDemo from "./library/react-query";
import UseEffectDemo from "./React/hooks/useEffect";
import FormDemo from "./basic/html_css/form";

// import SimplebarReactDemo from "./components/outer/simplebar-react/simplebar";
// import Simplebar2Demo from "./components/outer/simplebar-basic/simplebar2";

export default function App() {
  const routes = [
    { path: "/", label: "Home", component: <h1>Hello React</h1> },

    // basic
    { path: "/HTML", label: "HTML Demo", component: <HTML /> },
    { path: "/Form", label: "Form Demo", component: <FormDemo /> },

    { path: "/CSS", label: "CSS Demo", component: <CssDemo /> },
    { path: "/component/scrollbar/scoll", label: "Scrollbar Demo", component: <ScrollDemo /> },
    { path: "/component/scrollbar/overlayScrollbar", label: "Overlay Scrollbar", component: <ScrollbarOverlay /> },

    // library
    { path: "/AntdComponents", label: "Ant Design Components", component: <AntdComponents /> },

    // react
    { path: "/react/tuturial/TicTacToe", label: "TicTacToe Tutorial", component: <TicTacToe /> },
    { path: "/react/tuturial/useRef", label: "useRef Tutorial", component: <RefComp /> },
    { path: "/react/tuturial/useContext", label: "useContext Tutorial", component: <ContextDemo /> },
    { path: "/React/fiber", label: "React Fiber", component: <FiberPage /> },
    { path: "/React/useEffect", label: "useEffect Tutorial", component: <UseEffectDemo /> },

    // mycomponent
    { path: "/MyComponent", label: "My Custom Components", component: <MyComponent /> },

    // application
    { path: "/ERPApp/*", label: "ERP Application", component: <ERPApp /> },

    // animation
    { path: "/animation/spring", label: "Spring Animation", component: <SpringDemo /> },
    { path: "/animated/spring/card", label: "Spring Card Animation", component: <CardsCarousel /> },

    // library
    { path: "/library/lexicaldemo1", label: "Lexical Demo 1", component: <LexicalEditorDemo1 /> },
    { path: "/library/lexical", label: "Lexical Rich Editor", component: <LexicalRichEditor /> },

    { path: "/library/react-query", label: "React Query", component: <ReactQueryDemo /> },
    // 404
    { path: "*", label: "404 - Not Found", component: <h1>404</h1> },
  ];

  const renderNav = () => {
    return (
      <>
        {routes.map(({ path, label }) => {
          return (
            <Link to={path} key={path} className='p-1 flex rounded-lg text-nowrap'>
              {label}
            </Link>
          );
        })}
      </>
    );
  };
  return (
    <BrowserRouter>
      <div className='h-screen w-full flex '>
        <div className='p-2 flex flex-col border-r-2 border-gray-500'>{renderNav()}</div>
        <div className='w-full h-full p-2'>
          <Routes>
            {routes.map(({ path, component }) => {
              return <Route path={path} element={component} />;
            })}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
