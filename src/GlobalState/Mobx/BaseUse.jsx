import { observer } from "mobx-react";
import { observable, action, makeObservable, autorun } from "mobx";

class TodoStore {
  todos = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      // pendingRequests: observable,
      // completedTodosCount: computed,
      // report: computed,
      addTodo: action,
    });
    autorun(() => console.log(this.report));
    this.getDataFromRemote();
  }

  getDataFromRemote() {
    // 模拟从服务器获取数据
    // fetch("/api/todos")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // 将从服务器获取的数据初始化到 store
    //     this.todos = data;
    //   })
    //   .catch((error) => console.error("Error fetching data:", error));
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
  }

  refreshTodo() {
    this.fetchDataFromServer();
  }

  addTodo(content) {
    this.todos.push({
      content,
      doned: false,
      id: this.todos.length,
    });
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  removeTodo(todo) {
    const index = this.todos.indexOf(todo);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }

  toggleTodoDone(todo, done) {}
}

const todoStore = new TodoStore();

const ENTER_KEY = 13;
const TodoItem = observer(({ todo }) => {
  const onToggleCompleted = action(() => {
    todo.doned = !todo.doned;
  });
  return (
    <div className="grid grid-cols-[1fr] items-center gap-6  rounded-md">
      <div className="grid grid-cols-[auto_1fr] items-center gap-3 rounded-md px-2 hover:bg-slate-600">
        <input
          type="checkbox"
          className="size-3.5 rounded-sm border border-slate-300 accent-pink-500"
          checked={todo.doned}
          onChange={onToggleCompleted}
        />
        <span className="select-none peer-checked:text-slate-400 peer-checked:line-through">
          {todo.content}
        </span>
      </div>
      {/* <div>D</div> */}
    </div>
  );
});

export default observer(() => {
  // const todos = getTodo();
  const store = todoStore;

  const handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = event.target.value.trim();

    if (val) {
      store.addTodo(val);
    }
  };

  return (
    <div className="relative flex flex-col min-w-full min-h-screen p-2">
      <ul className="flex flex-col space-y-3">
        {store.todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
      <label className="block absolute bottom-0 left-0 right-0 m-2">
        <input
          type="text"
          name="content"
          className="mt-1 px-3 py-1 text-black bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          placeholder="what to do today"
          autoFocus={true}
          onKeyDown={handleNewTodoKeyDown}
        />
      </label>
    </div>
  );
});
