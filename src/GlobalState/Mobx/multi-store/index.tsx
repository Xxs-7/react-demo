import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import AppContext from "./app-context";
import AppStore from "./stores/app";
import AppApi from "./apis/app";
import HomePage from "./pages/home";
import PostPage from "./pages/post";
import UserPage from "./pages/user";

const store = new AppStore();
const api = new AppApi(store);

export default function Index() {
  return (
    <AppContext.Provider value={{ store, api }}>
      <BrowserRouter>
        <Routes>
          <Route path='/user/:userId' Component={UserPage} />
          <Route path='/post/:postId' Component={PostPage} />
          <Route path='/' Component={HomePage} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
