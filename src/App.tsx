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
import ScrollbarOverlay from "./myComponents/scrollbar/scrollbar-overlay/scrollbar";
import MobileModalTipDemo from "./myComponents/modal/mobileBottomModal";
import { BasicModalDemo } from "./myComponents/modal/basicModal";
import ModalDemo from "./myComponents/modal";
import { Uploader } from "./myComponents/imageUpload";
import ButtonUsage from "./library/mui/button";
import ERPApp from "./app/shangguigu_antd";
// import SpringDemo from "./animate/spring";
import BasicTDemo from "./myComponents/tooltip/basicT";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyComponent from "./myComponents";
import HTML from "./basic/html_css";
import CssDemo from "./basic/style";

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
        {/* library */}
        <Route path='/AntdComponents' element={<AntdComponents />} />

        {/* mycomponent */}
        <Route path='/MyComponent' element={<MyComponent />} />
        {/* application */}
        <Route path='/ERPApp/*' element={<ERPApp />} />

        {/* <Route path='/animation' element={< />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
