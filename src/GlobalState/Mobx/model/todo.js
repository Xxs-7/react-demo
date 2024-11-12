import { observable } from "mobx";

export default class TodoModel {
  store;
  id;
  @observable content;
  @observable doned;

  constructor(store, id, content, doned) {
    this.store = store;
    this.id = id;
    this.content = content;
    this.doned = doned;
  }

  toggle() {
    this.doned = !this.doned;
  }

  destroy() {
    this.store.todos.remove(this);
  }

  setContent(content) {
    this.content = content;
  }

  toJS() {
    return {
      id: this.id,
      content: this.content,
      completed: this.completed,
    };
  }

  static fromJS(store, object) {
    return new TodoModel(store, object.id, object.content, object.doned);
  }
}
