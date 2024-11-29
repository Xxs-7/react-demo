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
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

// import SimplebarReactDemo from "./components/outer/simplebar-react/simplebar";
// import Simplebar2Demo from "./components/outer/simplebar-basic/simplebar2";

export default function App() {
  return (
    // <div>
    //   {/* basic */}
    //   {/* <HTML /> */}
    //   {/* <BasicComponent /> */}
    //   {/* <RadixUIPage /> */}
    //   {/* <ShadcnUi /> */}
    //   {/* <TooltipDemo /> */}
    //   {/* <CheckboxDemo /> */}
    //   {/* <Layout /> */}
    //   {/* <TwComponent /> */}
    //   {/* <ReactTabelDemo /> */}
    //   {/* <HeightDemo /> */}
    //   {/* <AnimateDemo /> */}
    //   {/* <SuggestionDemo /> */}
    //   {/* <CssDemo/> */}
    //   {/* <SimplebarReactDemo/> */}
    //   {/* <Simplebar2Demo/> */}

    //   {/* custome components */}
    //   {/* <BasicTDemo /> */}

    //   {/* style */}
    //   {/*
    //   <LessDemo /> */}
    //   {/* <ScrollbarOverlay /> */}

    //   {/* <MobileModalTipDemo /> */}
    //   {/* <BasicModalDemo /> */}
    //   {/* <ModalDemo /> */}
    //   {/* <Uploader
    //     needCrop
    //     cropProps={{
    //       aspectRatio: 1,
    //     }}
    //   /> */}
    //   {/* <ButtonUsage /> */}
    //   {/* <SvgDemo /> */}

    //   {/* <AntdComponents /> */}

    //
    //

    // </div>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Hello React</h1>} />

        {/* basic */}
        <Route path='/HTML' element={<HTML />} />
        <Route path='/CSS' element={<CssDemo />} />
        <Route path='/component/scrollbar/scoll' element={<ScrollDemo />} />
        <Route path='/component/scrollbar/overlayScrollbar' element={<ScrollbarOverlay />} />
        {/* library */}
        <Route path='/AntdComponents' element={<AntdComponents />} />

        {/* react */}
        <Route path='/react/tuturial/TicTacToe' element={<TicTacToe />} />
        <Route path='/react/tuturial/useRef' element={<RefComp />} />
        <Route path='/react/tuturial/useContext' element={<ContextDemo />} />

        <Route path='/React/fiber' element={<FiberPage />} />

        {/* mycomponent */}
        <Route path='/MyComponent' element={<MyComponent />} />
        {/* application */}
        <Route path='/ERPApp/*' element={<ERPApp />} />

        <Route path='/animation/spring' element={<SpringDemo />} />
        <Route path='animated/spring/card' element={<CardsCarousel />} />

        <Route path='/library/lexicaldemo1' element={<LexicalEditorDemo1 />} />
        <Route path='/library/lexical' element={<LexicalRichEditor />} />

        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
