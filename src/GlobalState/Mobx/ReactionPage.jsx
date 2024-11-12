import {
  makeObservable,
  observable,
  autorun,
  action,
  reaction,
  when,
} from "mobx";
import { observer } from "mobx-react";
import React from "react";

class Store {
  count = 0;

  constructor() {
    makeObservable(this, {
      count: observable,
      increment: action,
    });

    autorun(() => console.log("autorun:", this.count)); // 输出: 0, 1, 2, ...

    reaction(
      () => this.count < 3, // 返回的是数据，不仅是 true/false，state 变化前后返回值相同则不会执行副作用
      () => {
        console.log("reaction:", this.count);
      }
    );

    when(
      () => this.count % 2 === 1,
      () => {
        console.log("when:", this.count);
      }
    );
  }

  increment() {
    this.count += 1;
  }
}

const store = new Store();
function ReactionPage() {
  return (
    <div className="p-2 rounded-md border">
      <h2>autoRun, reaction, when</h2>
      <div>{store.count}</div>
      <button
        onClick={() => store.increment()}
        className="bg-blue-500 px-4 py-2 m-2 rounded"
      >
        {" "}
        +1
      </button>
    </div>
  );
}

export default observer(ReactionPage);
