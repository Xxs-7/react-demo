import { useState, Suspense } from "react";
import Spin from "../img/spin.svg";
import { fetchData, remove } from "../helper";
import { queryClient } from "../index";
import { ErrorBoundary } from "react-error-boundary";

const cache = new Map();

export function createResource(fn) {
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      const promise = fn(...args).then(
        (result) => {
          cache.set(key, { status: "fulfilled", value: result });
        },
        (reason) => {
          cache.set(key, { status: "rejected", reason });
        }
      );
      cache.set(key, { status: "pending", promise });
    }

    const cached = cache.get(key);
    if (cached.status === "pending") throw cached.promise;
    if (cached.status === "rejected") throw cached.reason;
    return cached.value;
  };
}

export const fetchPeopleResource = createResource(fetchData);

type ListItemDataType = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

export const List = ({ onClick }: { data?: any; onClick?: (id: string) => void }) => {
  const data = fetchPeopleResource("people", 1000);

  return !data?.length ? (
    <strong>No data available</strong>
  ) : (
    <ul>
      {data?.map((x: any, index: number) => (
        <li key={index} onClick={() => onClick?.(x.id)}>
          <div>#{x.id}</div>
          <div>{x.name}</div>
          <div>{x.phone}</div>
          <div>{x.email}</div>
        </li>
      ))}
    </ul>
  );
};

const BusySign = () => <Spin className='logo' />;

function Demo() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div>
          There was an error! <button onClick={() => resetErrorBoundary()}>Try again</button>
          <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
        </div>
      )}
    >
      <Suspense fallback={<BusySign />}>
        <List
        // onClick={
        //   (id: string) => deleteItem({ id }) // setRoute?.(`details/${id}`)
        // }
        />
      </Suspense>
    </ErrorBoundary>
  );
}

export default {
  Component: Demo,
  route: "Suspense Base",
  order: 6,
};
