import React, { Suspense, useEffect } from "react";
import useSWR from "swr";

const BaseFetchPage = () => {
  const [data, setData] = React.useState();
  useEffect(() => {
    (async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setData(data[0]);
    })();
  }, []);
  return (
    <div>
      <div>SwrPage</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};

const fetcher = (path: string): Promise<{ name: string }> => {
  const url = `https://jsonplaceholder.typicode.com/${path}`;
  return fetch(url).then((res) => res.json());
};

const SwrPage = () => {
  const { data, error, isLoading } = useSWR("posts", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // 渲染数据
  return <div>hello {data?.name}!</div>;
};

export default function Page() {
  return (
    <div className='w-screen m-2 p-2 space-y-2 divide-y-1 border rounded-md'>
      <BaseFetchPage />
      <Suspense fallback={<div>loading</div>}>
        <SwrPage />
      </Suspense>
    </div>
  );
}
