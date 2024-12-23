import React from "react";
import { Dependencies, Header } from "./header";
import { NavMenu, useRoute } from "./Route";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

const App = () => {
  const { route, param, setRoute, Component } = useRoute();

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <Header />
      <NavMenu {...{ setRoute }} />
      {!!Component ? <Component {...{ setRoute, param, route }} /> : <Dependencies />}
    </div>
  );
};

const ReactQueryDemo = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
export default ReactQueryDemo;
