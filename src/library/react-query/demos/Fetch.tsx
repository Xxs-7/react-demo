import React, { useEffect } from "react";
import { fetchData } from "../helper";
import { List } from "../list";

function Demo() {
  const [data, setData] = React.useState([]);

  const initialData = async () => {
    try {
      setData(await fetchData("people"));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  return <List items={data} />;
}

export default {
  Component: Demo,
  route: "fetch",
  order: 1,
};
