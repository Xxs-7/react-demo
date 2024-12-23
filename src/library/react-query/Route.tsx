import { useState } from "react";

type ComponentType = ({ setRoute, param }: { setRoute?: (uri: string) => void; param?: string }) => JSX.Element;
type ModuleType = {
  Component: ComponentType;
  route: string;
  order: number;
};
const MODULES: Record<string, ModuleType> = import.meta.glob("./demos/**.tsx", {
  eager: true,
  import: "default",
});

type ComponentDictType = Record<string, ComponentType>;
const DEMO_DICT: ComponentDictType = Object.values(MODULES)
  .sort((a: ModuleType, b: ModuleType) => (a.order < b.order ? -1 : 1))
  .reduce((accu: ComponentDictType, x: ModuleType) => {
    accu[x.route] = x.Component;
    return accu;
  }, {} as ComponentDictType);

export const NavMenu = ({ setRoute }: { setRoute: (name: string) => void }) => (
  <div className='menu'>
    <button onClick={() => setRoute("")}>Clear</button>

    {Object.keys(DEMO_DICT).map((x, index) => (
      <button key={index} onClick={() => setRoute(x)}>
        demo {x}
      </button>
    ))}
  </div>
);

export const useRoute = () => {
  const [route, setRoute] = useState<string>("");
  const r = route.split("/");
  const Component = DEMO_DICT[r[0]];

  return {
    route,
    param: r[1],
    setRoute,
    Component,
  };
};
