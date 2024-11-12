import React from "react";

import { observable, flow, makeObservable, runInAction } from "mobx";
import { observer } from "mobx-react";

class Store {
  data = [];
  state = "pending"; // "pending", "done" or "error"
  fetchDataFlow = null; // 用于存储 flow 返回的对象

  constructor() {
    makeObservable(this, {
      data: observable,
      state: observable,
      fetchData: flow,
    });
  }

  fetchData = function* () {
    this.state = "pending";
    try {
      const response = yield fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const result = yield response.json();
      this.data = result;
      this.state = "done";
    } catch (error) {
      this.state = "error";
    }
  };

  // 调用此方法来开始获取数据
  startFetchingData() {
    try {
      this.fetchDataFlow = this.fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  // 调用此方法来取消获取数据
  cancelFetchingData() {
    if (this.fetchDataFlow) {
      this.fetchDataFlow.cancel();
    }
    runInAction(() => {
      this.state = "cancelled";
    });
  }
}

const store = new Store();

function FlowPage() {
  return (
    <div>
      <h2>FlowPage</h2>
      <div className="p-2 rounded-md space-y-2">
        <div className="p-2">state: {store.state}</div>
        <div className="p-2">data: {JSON.stringify(store.data)}</div>
        <button
          className="border p-2 rounded-md"
          onClick={() => store.startFetchingData()}
        >
          Fetch Data
        </button>
        <button
          className="border p-2 rounded-md"
          onClick={() => store.cancelFetchingData()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default observer(FlowPage);
