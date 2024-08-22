// https://github.com/MFinnnne/react-admin

import React, { Component } from "react";
// import "antd/dist/antd.less";
import Login from "./pages/login";
import Admin from "./pages/admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";

function ERPApp() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/*' element={<Admin />} />
        <Route path='Login' element={<Login />} />
      </Routes>
    </Provider>
  );
}

export default ERPApp;
